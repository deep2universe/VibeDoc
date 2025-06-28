import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  title, 
  className = "" 
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&fs=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-mono text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};