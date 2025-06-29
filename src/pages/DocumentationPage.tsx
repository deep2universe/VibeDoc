import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Menu, Copy, Eye, Code, Github } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { MarkdownRenderer } from '../components/documentation/MarkdownRenderer';
import { NavigationSidebar } from '../components/documentation/NavigationSidebar';
import { Logo } from '../components/common/Logo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { loadMarkdownContent } from '../utils/documentation';

export const DocumentationPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const { 
    viewMode, 
    toggleViewMode, 
    navigationOpen, 
    toggleNavigation,
    currentRepository,
    currentMarkdownContent,
    setCurrentMarkdownContent,
    activeFile,
    setActiveFile
  } = useAppStore();
  
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Reference to the scrollable content div
  const contentRef = useRef<HTMLDivElement>(null);

  // Load documentation when component mounts or params change
  useEffect(() => {
    const loadDocumentation = async () => {
      if (!currentRepository?.docPath) {
        setError('No documentation path found. Please select a tutorial from the homepage.');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Load index.md content
        const indexPath = `${currentRepository.docPath}/index.md`;
        const indexContent = await loadMarkdownContent(indexPath);
        
        // Set the initial content to index.md
        setCurrentMarkdownContent(indexContent);
        setActiveFile('index');
        
      } catch (err) {
        console.error('Error loading documentation:', err);
        setError(err instanceof Error ? err.message : 'Failed to load documentation');
        
        // Fallback to mock content
        const mockContent = `# ${repo}\n\nDocumentation for ${owner}/${repo} could not be loaded.\n\n${err instanceof Error ? err.message : 'Unknown error occurred'}`;
        setCurrentMarkdownContent(mockContent);
      } finally {
        setLoading(false);
      }
    };
    
    loadDocumentation();
  }, [owner, repo, currentRepository, setCurrentMarkdownContent, setActiveFile]);

  // Load specific chapter content when activeFile changes
  useEffect(() => {
    const loadChapterContent = async () => {
      if (!currentRepository?.docPath) return;
      
      try {
        // If activeFile is 'index', load the index.md file
        if (activeFile === 'index') {
          const indexPath = `${currentRepository.docPath}/index.md`;
          const indexContent = await loadMarkdownContent(indexPath);
          setCurrentMarkdownContent(indexContent);
          return;
        }
        
        // Otherwise, find and load the specific chapter
        if (!activeFile || !currentRepository?.chapters) return;
        
        // Find the chapter filename
        const chapter = currentRepository.chapters.find(ch => ch.id === activeFile);
        if (!chapter) return;
        
        const chapterPath = `${currentRepository.docPath}/${chapter.filename}`;
        const content = await loadMarkdownContent(chapterPath);
        setCurrentMarkdownContent(content);
      } catch (err) {
        console.error('Error loading chapter:', err);
        setCurrentMarkdownContent(`# Error\n\nFailed to load chapter: ${activeFile}\n\n${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };
    
    loadChapterContent();
    
    // Reset scroll position when activeFile changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeFile, currentRepository, setCurrentMarkdownContent]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentMarkdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkClick = (filename: string) => {
    if (!currentRepository?.chapters) return;
    
    // Find the chapter by filename
    const chapter = currentRepository.chapters.find(ch => ch.filename === filename);
    if (chapter) {
      setActiveFile(chapter.id);
      
      // Reset scroll position immediately
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const getDisplayUrl = () => {
    if (currentRepository?.url) {
      return currentRepository.url.replace('https://github.com/', '');
    }
    return `${owner}/${repo}`;
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-gray-500 dark:text-gray-400 font-mono">
            Loading documentation...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Navigation Sidebar */}
      <NavigationSidebar 
        open={navigationOpen}
        onClose={() => toggleNavigation()}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4 relative">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleNavigation}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </button>
            
            {/* Repository URL with GitHub link */}
            <a
              href={currentRepository?.url || `https://github.com/${owner}/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>{getDisplayUrl()}</span>
            </a>
            
            {error && (
              <div className="text-xs font-mono text-red-500 dark:text-red-400">
                (Error: {error.split('.')[0]})
              </div>
            )}
          </div>

          {/* Centered VibeDoc Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1 font-mono">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-1">
              <span>Vi</span>
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <Logo className="w-6 h-6" />
              </a>
              <span>eDoc</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle - positioned before the view mode buttons */}
            <ThemeToggle />
            
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={toggleViewMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                  viewMode === 'html'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                HTML
              </button>
              <button
                onClick={toggleViewMode}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-mono transition-colors ${
                  viewMode === 'markdown'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Code className="w-3 h-3" />
                Markdown
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <Copy className="w-3 h-3" />
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
          </div>
        </div>

        {/* Content - with ref for scroll control */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto bg-white dark:bg-gray-900"
        >
          <div className="max-w-4xl mx-auto p-8">
            {viewMode === 'html' ? (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownRenderer content={currentMarkdownContent} onLinkClick={handleLinkClick} />
              </div>
            ) : (
              <pre className="font-mono text-sm text-gray-900 dark:text-white whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border">
                {currentMarkdownContent}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};