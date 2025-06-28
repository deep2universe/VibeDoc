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

  // Anthropic SVG component
  const Anthropic = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 58" className="h-12 w-auto">
      <path fill="currentColor" d="M499.297 37.878c-2.064 5.4-6.192 8.497-11.829 8.497c-9.368 0-15.084-6.67-15.084-17.55c0-11.037 5.716-17.708 15.084-17.708c5.637 0 9.765 3.097 11.83 8.497h12.623C508.824 7.703 499.536 0 487.468 0c-16.037 0-27.39 11.911-27.39 28.825c0 16.755 11.353 28.667 27.39 28.667c12.147 0 21.436-7.782 24.532-19.614zM423.39.97l22.163 55.588h12.153L435.544.97zm-25.634 24.697h-14.695V11.69h14.695c5.878 0 8.976 2.382 8.976 6.988s-3.098 6.988-8.976 6.988M398.312.97h-27.167v55.588h11.916v-20.17h15.251c12.63 0 20.336-6.671 20.336-17.71c0-11.037-7.705-17.708-20.336-17.708m-65.535 45.405c-9.367 0-15.083-6.67-15.083-17.55c0-11.037 5.716-17.708 15.083-17.708c9.288 0 14.924 6.67 14.924 17.708c0 10.88-5.636 17.55-14.924 17.55m0-46.375c-16.036 0-27.388 11.911-27.388 28.825c0 16.755 11.352 28.667 27.388 28.667c15.956 0 27.23-11.912 27.23-28.667C360.006 11.911 348.732 0 332.776 0m-72.068 11.69h14.691c5.877 0 8.974 2.145 8.974 6.195c0 4.05-3.097 6.194-8.974 6.194h-14.691zm35.577 6.195c0-10.483-7.703-16.915-20.33-16.915h-27.16v55.588h11.913V34.799h13.261l11.913 21.759h13.183l-13.19-23.416c6.62-2.545 10.41-7.905 10.41-15.257m-74.095 5.241h-26.2V.97h-11.909v55.588h11.91V33.846h26.2v22.712h11.908V.97H222.19zM125.296 11.69h18.659v44.868h11.91V11.69h18.658V.97h-49.227zm-21.034 28.191L79.253.971H65.756v55.587h11.512V17.646l25.01 38.912h13.496V.97h-11.512zM20.93 34.56l7.582-19.534l7.583 19.535zM22.158.97L0 56.558h12.39l4.532-11.674h23.182l4.53 11.674h12.39L34.867.97z"></path>
    </svg>
  );

  // ElevenLabs SVG component
  const ElevenLabs = () => (
    <svg viewBox="0 0 24 24" className="h-12 w-auto">
      <path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m7 14a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2h4v-2m-3-9a1 1 0 0 0-1 1v5h4v-5a1 1 0 0 0-1-1h-2m8 0a1 1 0 0 0-1 1v2h-2v-2a1 1 0 0 0-1-1h-1v8h1a1 1 0 0 0 1-1v-2h2v2a1 1 0 0 0 1 1h1V8h-1Z"/>
    </svg>
  );

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
                <div className="h-12 flex items-center justify-center text-gray-800 dark:text-gray-200">
                  <Anthropic />
                </div>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-3">
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
                <div className="h-12 flex items-center justify-center text-gray-800 dark:text-gray-200">
                  <ElevenLabs />
                </div>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-3">
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