import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

export const ApiKeyPrompt: React.FC = () => {
  const { setShowApiKeyPrompt, setDoNotShowApiKeyPromptAgain, doNotShowApiKeyPromptAgain } = useAppStore();
  const [checked, setChecked] = useState(doNotShowApiKeyPromptAgain);

  const handleClose = () => {
    setShowApiKeyPrompt(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setDoNotShowApiKeyPromptAgain(e.target.checked);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-pulse-border"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <motion.h2 
            className="text-2xl font-mono font-bold text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            API Key is all you need
          </motion.h2>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-700 dark:text-gray-300 font-mono mb-4">
              To use the AI features of VibeDoc, you'll need API keys from:
            </p>
            
            <div className="flex flex-col items-center justify-center gap-6 my-8">
              <motion.a
                href="https://console.anthropic.com/account/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src="/images/anthropic_logo.svg" 
                  alt="Anthropic Logo" 
                  className="h-12 mb-3 opacity-90 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg";
                  }}
                />
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Anthropic Claude
                </span>
              </motion.a>
              
              <motion.a
                href="https://elevenlabs.io/app/api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src="/images/elevenlabs_logo.svg" 
                  alt="ElevenLabs Logo" 
                  className="h-12 mb-3 opacity-90 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.src = "https://eleven-public-cdn.elevenlabs.io/payloadcms/9trrmnj2sj8-logo-logo.svg";
                  }}
                />
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  ElevenLabs
                </span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-mono font-semibold mb-2 text-gray-900 dark:text-white">
              Getting Started
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-mono mb-4">
              For detailed setup instructions, check out our GitHub repository:
            </p>
            <a
              href="https://github.com/cpjet64/vibedoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300 font-mono text-sm"
            >
              <Github className="w-4 h-4" />
              cpjet64/vibedoc
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-mono font-semibold mb-2 text-gray-900 dark:text-white">
              Suggest New Repositories
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-mono">
              Want to see documentation for a specific repository? Leave a comment on our YouTube channel. We appreciate your support!
            </p>
          </motion.div>

          <motion.div 
            className="mt-8 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="checkbox"
              id="doNotShow"
              checked={checked}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="doNotShow"
              className="ml-2 text-sm font-mono text-gray-600 dark:text-gray-400"
            >
              Don't show this again
            </label>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <motion.button
            onClick={handleClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-mono text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};