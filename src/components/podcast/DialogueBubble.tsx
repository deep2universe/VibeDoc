import React, { useState } from 'react';
import { Bot, Edit3, Sparkles, Send, Zap } from 'lucide-react';
import { Dialogue } from '../../stores/appStore';
import { useAppStore } from '../../stores/appStore';
import { EditableMarkdown } from './EditableMarkdown';
import { EditableMermaid } from './EditableMermaid';

interface Props {
  dialogue: Dialogue;
  clusterId: string;
}

const AI_TEXT_PROMPTS = [
  { id: 'improve', label: 'Improve Flow', description: 'Make the dialogue more natural and engaging' },
  { id: 'shorten', label: 'Make Shorter', description: 'Condense while keeping key information' },
  { id: 'expand', label: 'Add Detail', description: 'Include more examples and explanations' },
  { id: 'casual', label: 'More Casual', description: 'Make the tone more conversational' },
  { id: 'technical', label: 'More Technical', description: 'Add technical depth and accuracy' },
  { id: 'enthusiasm', label: 'Add Enthusiasm', description: 'Make it more exciting and energetic' },
];

export const DialogueBubble: React.FC<Props> = ({ dialogue, clusterId }) => {
  const { updateDialogue } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(dialogue.text);
  const [showAIPrompts, setShowAIPrompts] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const isEmma = dialogue.speaker.toLowerCase() === 'emma';

  const handleTextSave = () => {
    updateDialogue(clusterId, dialogue.dialogue_id, { text: editedText });
    setIsEditing(false);
  };

  const handleTextCancel = () => {
    setEditedText(dialogue.text);
    setIsEditing(false);
  };

  const handleAIPrompt = (promptId: string) => {
    const prompt = AI_TEXT_PROMPTS.find(p => p.id === promptId);
    if (prompt) {
      setAiPrompt(prompt.description);
    }
  };

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiPrompt.trim()) {
      // Mock AI improvement based on prompt
      console.log('AI improving dialogue text:', aiPrompt);
      setAiPrompt('');
      setShowAIPrompts(false);
    }
  };

  const handleVisualizationChange = (content: string) => {
    updateDialogue(clusterId, dialogue.dialogue_id, {
      visualization: { ...dialogue.visualization, content }
    });
  };

  return (
    <div className={`flex ${isEmma ? 'justify-start' : 'justify-end'} mb-6`}>
      <div className={`max-w-4xl w-full ${isEmma ? 'mr-12' : 'ml-12'}`}>
        {/* Speaker indicator */}
        <div className={`flex items-center gap-2 mb-2 ${isEmma ? 'justify-start' : 'justify-end'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold ${
            isEmma 
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
          }`}>
            {dialogue.speaker.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400 capitalize">
            {dialogue.speaker}
          </span>
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
            #{dialogue.dialogue_id}
          </span>
        </div>

        {/* Dialogue bubble */}
        <div className={`rounded-2xl p-6 relative ${
          isEmma
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
            : 'bg-blue-600 dark:bg-blue-700 text-white'
        }`}>
          {/* AI actions - now always visible */}
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-1.5 rounded-lg transition-colors ${
                isEmma
                  ? 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  : 'hover:bg-blue-500 text-blue-100'
              }`}
            >
              <Edit3 className="w-3 h-3" />
            </button>
            <button
              onClick={() => setShowAIPrompts(!showAIPrompts)}
              className={`p-1.5 rounded-lg transition-colors ${
                isEmma
                  ? 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  : 'hover:bg-blue-500 text-blue-100'
              }`}
            >
              <Sparkles className="w-3 h-3" />
            </button>
          </div>

          {/* Text content */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm resize-none custom-scrollbar"
                rows={6}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleTextSave}
                  className="px-3 py-1 bg-green-600 text-white rounded text-xs font-mono hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleTextCancel}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-xs font-mono hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap pr-16">
              {dialogue.text}
            </p>
          )}
        </div>

        {/* AI Text Prompts Overlay */}
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
                        AI Text Improvements
                      </h3>
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        for {dialogue.speaker}
                      </span>
                    </div>

                    {/* Input field */}
                    <div className="relative">
                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Describe how you want to improve this dialogue..."
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
                        {AI_TEXT_PROMPTS.map((prompt) => (
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

        {/* Visualization */}
        <div className="mt-4">
          {dialogue.visualization.type === 'markdown' ? (
            <EditableMarkdown
              content={dialogue.visualization.content}
              onChange={handleVisualizationChange}
            />
          ) : (
            <EditableMermaid
              content={dialogue.visualization.content}
              onChange={handleVisualizationChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};