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
            
            <div className="flex flex-row items-center justify-center gap-6 my-8">
              <motion.a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="h-12 flex items-center justify-center text-gray-800 dark:text-gray-200">
                  <img 
                    src="/images/elevenlabs-symbol.svg" 
                    alt="ElevenLabs" 
                    className="h-12 w-auto"
                  />
                </div>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-3">
                  ElevenLabs
                </span>
              </motion.a>
              
              <motion.a
                href="https://www.anthropic.com/claude"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="h-12 flex items-center justify-center text-gray-800 dark:text-gray-200">
                  <img 
                    src="/images/antropic_short.svg" 
                    alt="Anthropic" 
                    className="h-12 w-auto"
                  />
                </div>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-3">
                  Anthropic
                </span>
              </motion.a>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 font-mono mt-4">
              Check out their subscription offers for the best pricing options for your needs.
            </p>
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
              href="https://github.com/deep2universe/VibeDoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300 font-mono text-sm"
            >
              <Github className="w-4 h-4" />
              deep2universe/VibeDoc
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
              Want to see documentation for a specific repository? Leave a comment on our <a 
                href="https://www.youtube.com/@Vibe_Doc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >YouTube channel</a>. We appreciate your support!
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
              Don't show this again (Note: If checked, AI functions will not work without valid API keys, and no further prompts will appear)
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