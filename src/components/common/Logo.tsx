import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  const { theme } = useTheme();
  
  const logoSrc = theme === 'dark' 
    ? 'https://vibedoc.s3.eu-central-1.amazonaws.com/black_circle_360x360.png'
    : 'https://vibedoc.s3.eu-central-1.amazonaws.com/white_circle_360x360.png';
  
  return (
    <img 
      src={logoSrc} 
      alt="VibeDoc" 
      className={`${className} transition-opacity duration-200`}
      onError={(e) => {
        // Fallback to text logo if image fails to load
        e.currentTarget.style.display = 'none';
        const textLogo = document.createElement('div');
        textLogo.textContent = 'VibeDoc';
        textLogo.className = `${className} font-mono font-bold flex items-center justify-center bg-blue-600 text-white rounded-full text-xs px-2`;
        e.currentTarget.parentNode?.insertBefore(textLogo, e.currentTarget);
      }}
    />
  );
};