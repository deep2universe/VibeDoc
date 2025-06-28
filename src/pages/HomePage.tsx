import React, { useState } from 'react';
import { Github, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Repository, useAppStore } from '../stores/appStore';
import { useTheme } from '../hooks/useTheme';
import { YouTubeEmbed } from '../components/common/YouTubeEmbed';
import { tutorials } from '../data/tutorials';

const podcastVideos = [
  {
    id: 'WGJO4RWKHi4',
    title: 'bolt.new - Revolutionary AI-Powered Development Environment',
    repoUrl: 'https://github.com/stackblitz/bolt.new'
  },
  {
    id: 'xDoCJF7-lcI',
    title: 'prompt_en - Advanced Prompt Engineering Techniques',
    repoUrl: 'https://github.com/NirDiamant/Prompt_Engineering'
  },
  {
    id: 'vuK6xDvhVMM',
    title: 'prompt_de - Deutsche Prompt-Engineering Strategien',
    repoUrl: 'https://github.com/NirDiamant/Prompt_Engineering'
  },
  {
    id: 'JPoZYhjmbSs',
    title: 'IONOSCTL CLI - Cloud Infrastructure Management Tool',
    repoUrl: 'https://github.com/ionos-cloud/ionosctl'
  },
  {
    id: 'fEjkG5_hWJE',
    title: 'Vibe Coding (EN) - The Future of Intuitive Development',
    repoUrl: 'https://github.com/cpjet64/vibecoding'
  }
];

export const HomePage: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const navigate = useNavigate();
  const { setRepository } = useAppStore();
  const { theme } = useTheme();

  const validateGithubUrl = (url: string): boolean => {
    const githubRegex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/.*)?$/;
    return githubRegex.test(url);
  };

  const parseGithubUrl = (url: string): { owner: string; name: string } | null => {
    const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], name: match[2] };
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      const isValid = validateGithubUrl(repoUrl);
      setIsValidUrl(isValid);
      
      if (isValid) {
        const parsed = parseGithubUrl(repoUrl);
        if (parsed) {
          const repo: Repository = {
            id: `${parsed.owner}/${parsed.name}`,
            name: parsed.name,
            owner: parsed.owner,
            description: '',
            lastUpdated: new Date().toISOString(),
            language: 'Unknown',
            stars: 0,
            url: repoUrl,
          };
          setRepository(repo);
          navigate(`/docs/${parsed.owner}/${parsed.name}`);
        }
      }
    }
  };

  const handleRepoClick = (repo: Repository) => {
    setRepository(repo);
    navigate(`/docs/${repo.owner}/${repo.name}`);
  };

  const formatLastUpdated = (timestamp: string): string => {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  // Get the appropriate logo based on theme
  const logoSrc = theme === 'dark' 
    ? 'https://vibedoc.s3.eu-central-1.amazonaws.com/black_circle_360x360.png'
    : 'https://vibedoc.s3.eu-central-1.amazonaws.com/white_circle_360x360.png';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-1">
            <span>Vi</span>
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={logoSrc} 
                alt="VibeDoc Logo" 
                className="w-12 h-12 md:w-16 md:h-16 inline-block transition-opacity duration-200"
                onError={(e) => {
                  // Fallback to text 'b' if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.textContent = 'b';
                  fallback.className = 'inline-block';
                  e.currentTarget.parentNode?.insertBefore(fallback, e.currentTarget.nextSibling);
                }}
              />
            </a>
            <span>eDoc</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-mono mb-8 max-w-2xl mx-auto">
            Transform your GitHub repositories into beautiful documentation, 
            engaging videos, and immersive podcasts using AI.
          </p>

          {/* Repository input */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Github className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  if (!isValidUrl) setIsValidUrl(true);
                }}
                placeholder="https://github.com/owner/repository"
                className={`w-full pl-12 pr-12 py-4 text-lg font-mono border-2 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isValidUrl 
                    ? 'border-gray-300 dark:border-gray-600' 
                    : 'border-red-500 dark:border-red-400'
                }`}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            {!isValidUrl && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-2 font-mono">
                Please enter a valid GitHub repository URL
              </p>
            )}
          </form>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            Enter any public GitHub repository URL to get started
          </p>
        </div>

        {/* Featured Video Podcasts - Now at the top */}
        <div className="mb-16">
          <h2 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-8 text-center">
            Featured Video Podcasts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcastVideos.map((video) => (
              <div key={video.id} className="group">
                <YouTubeEmbed
                  videoId={video.id}
                  title={video.title}
                  className="transform transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Repository Link */}
                <div className="mt-4 px-1">
                  <a
                    href={video.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm font-mono text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  >
                    <Github className="w-4 h-4" />
                    <span className="truncate">
                      {video.repoUrl.replace('https://github.com/', '')}
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Documentation - Now below videos */}
        <div className="mb-8">
          <h2 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-8 text-center">
            Available Documentation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((repo) => (
              <div
                key={repo.id}
                onClick={() => handleRepoClick(repo)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-all duration-200 hover:shadow-lg group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {repo.owner}/{repo.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 font-mono">
                      {repo.description}
                    </p>
                  </div>
                </div>

                {/* Stats - Only showing last updated */}
                <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatLastUpdated(repo.lastUpdated)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features preview */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-8">
            What You Can Create
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-mono font-semibold text-lg mb-2">Documentation</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                Auto-generated, beautiful documentation from your codebase
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="font-mono font-semibold text-lg mb-2">Videos</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                Engaging video explanations of your project's architecture
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <h3 className="font-mono font-semibold text-lg mb-2">Podcasts</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                Interactive conversations about your code and concepts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};