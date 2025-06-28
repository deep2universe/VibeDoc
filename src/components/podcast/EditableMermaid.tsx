import React, { useState } from 'react';
import { Edit3, Eye, Sparkles, Zap, Send } from 'lucide-react';
import { MermaidDiagram } from '../documentation/MermaidDiagram';

interface Props {
  content: string;
  onChange: (content: string) => void;
}

const AI_PROMPTS = [
  { id: 'simplify', label: 'Simplify', description: 'Make the diagram cleaner and easier to understand' },
  { id: 'detail', label: 'Add Detail', description: 'Include more information and connections' },
  { id: 'fix', label: 'Fix Errors', description: 'Correct syntax and structural issues' },
  { id: 'flowchart', label: 'Convert to Flowchart', description: 'Transform into a flowchart format' },
  { id: 'sequence', label: 'Convert to Sequence', description: 'Transform into a sequence diagram' },
  { id: 'mindmap', label: 'Convert to Mindmap', description: 'Transform into a mindmap format' },
];

export const EditableMermaid: React.FC<Props> = ({ content, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showAIPrompts, setShowAIPrompts] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleSave = () => {
    onChange(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleAIPrompt = (promptId: string) => {
    const prompt = AI_PROMPTS.find(p => p.id === promptId);
    if (prompt) {
      setAiPrompt(prompt.description);
    }
  };

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiPrompt.trim()) {
      // Mock AI improvement based on prompt
      console.log('AI improving mermaid with prompt:', aiPrompt);
      setAiPrompt('');
      setShowAIPrompts(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs font-mono text-gray-600 dark:text-gray-400">Mermaid</span>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isEditing ? <Eye className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setShowAIPrompts(!showAIPrompts)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* AI Prompts Overlay */}
      {showAIPrompts && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center px-4">
          <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4">
            {/* Enhanced glassmorphism background with centered content */}
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl">
              <div className="w-full max-w-4xl p-8">
                <form onSubmit={handleAISubmit} className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-blue-500" />
                    <h3 className="font-mono font-semibold text-lg text-gray-900 dark:text-white">
                      AI Diagram Improvements
                    </h3>
                  </div>

                  {/* Input field */}
                  <div className="relative">
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Describe how you want to improve this diagram..."
                      className="w-full resize-none rounded-xl border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-800/80 px-6 py-4 pr-16 font-mono text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 backdrop-blur-sm custom-scrollbar"
                      rows={3}
                      style={{ minHeight: '80px' }}
                    />
                    <button
                      type="submit"
                      disabled={!aiPrompt.trim()}
                      className="absolute bottom-4 right-4 p-2 rounded-lg bg-blue-300/60 hover:bg-blue-400/70 text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick prompts */}
                  <div className="space-y-4 pt-4 border-t border-white/20 dark:border-gray-700/20">
                    <h4 className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">
                      Quick Actions:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {AI_PROMPTS.map((prompt) => (
                        <button
                          key={prompt.id}
                          type="button"
                          onClick={() => handleAIPrompt(prompt.id)}
                          className="text-left p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 group"
                        >
                          <div className="font-mono text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {prompt.label}
                          </div>
                          <div className="font-mono text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                            {prompt.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cancel button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAIPrompts(false)}
                      className="px-8 py-3 bg-white/40 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200 font-mono text-sm backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded font-mono text-sm resize-none custom-scrollbar"
              placeholder="Enter mermaid diagram code..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-600 text-white rounded text-xs font-mono hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-600 text-white rounded text-xs font-mono hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <MermaidDiagram chart={content} />
        )}
      </div>
    </div>
  );
};