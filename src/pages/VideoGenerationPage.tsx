import React from 'react';
import { useParams } from 'react-router-dom';

export const VideoGenerationPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white mb-8">
          Video Generation for {owner}/{repo}
        </h1>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            Video generation workflow coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};