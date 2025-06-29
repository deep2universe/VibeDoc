import React, { useState } from 'react';
import { X, File, ChevronRight, ArrowLeft, FileText, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const NavigationSidebar: React.FC<Props> = ({ open, onClose }) => {
  const { 
    activeFile, 
    setActiveFile, 
    currentRepository
  } = useAppStore();
  
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['chapters']));
  const navigate = useNavigate();

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (itemId: string) => {
    setActiveFile(itemId);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCreatePodcastScript = () => {
    if (currentRepository) {
      navigate(`/video/${currentRepository.owner}/${currentRepository.name}`);
    }
  };

  const handleStartMediaPipeline = () => {
    if (currentRepository) {
      navigate(`/video/${currentRepository.owner}/${currentRepository.name}`);
    }
  };

  const renderNavItem = (item: { id: string; title: string; hasChildren?: boolean }) => {
    const hasChildren = item.hasChildren;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeFile === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => hasChildren ? toggleExpanded(item.id) : handleItemClick(item.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-mono text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors ${
            isActive 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {hasChildren ? (
            <ChevronRight 
              className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
            />
          ) : (
            <File className="w-3 h-3" />
          )}
          <span className="truncate">{item.title}</span>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-50 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation items - limited to 70% of viewport height with flex-1 and max-height */}
        <div className="flex-1 max-h-[70vh] overflow-y-auto px-4 custom-scrollbar">
          <div className="space-y-1 py-4">
            {/* Overview/Index - CHANGED: Always show as "Intro" */}
            {renderNavItem({ id: 'index', title: 'Intro' })}
            
            {/* Chapters */}
            {currentRepository?.chapters && currentRepository.chapters.length > 0 && (
              <>
                <div className="mt-4 mb-2">
                  <h3 className="text-xs font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3">
                    Chapters
                  </h3>
                </div>
                
                <div className="space-y-1">
                  {currentRepository.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => handleItemClick(chapter.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-mono text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors ${
                        activeFile === chapter.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <File className="w-3 h-3" />
                      <span className="truncate">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Media Pipeline Actions - positioned at bottom */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 px-4 pt-4 pb-4 space-y-3 flex-shrink-0">
          <button
            onClick={handleCreatePodcastScript}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl bg-white/10 dark:bg-gray-800/10"
          >
            <FileText className="w-4 h-4" />
            Create Podcast Script
          </button>
          
          <button
            onClick={handleStartMediaPipeline}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl bg-white/10 dark:bg-gray-800/10"
          >
            <Play className="w-4 h-4" />
            Review/Start Media Pipeline
          </button>
        </div>
      </div>
    </>
  );
};