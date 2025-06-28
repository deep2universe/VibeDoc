import React from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAppStore } from '../../stores/appStore';

export const Header: React.FC = () => {
  const { toggleNavigation } = useAppStore();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPodcastEditorPage = location.pathname.includes('/video/');

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        {!isHomePage && (
          <button
            onClick={toggleNavigation}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Centered content for home page */}
      {isHomePage && (
        <div className="flex-grow flex justify-center">
          <div className="font-mono">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Vibe Documentation
            </h1>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Hide theme toggle on podcast editor page */}
        {!isPodcastEditorPage && <ThemeToggle />}
      </div>
    </header>
  );
};