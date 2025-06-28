import React, { useState } from 'react';
import { Edit3, Eye, Sparkles } from 'lucide-react';
import { MarkdownRenderer } from '../documentation/MarkdownRenderer';

interface Props {
  content: string;
  onChange: (content: string) => void;
}

export const EditableMarkdown: React.FC<Props> = ({ content, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onChange(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleAIImprove = () => {
    // Mock AI improvement
    console.log('AI improving markdown content');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-mono text-gray-600 dark:text-gray-400">Markdown</span>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isEditing ? <Eye className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
          </button>
          <button
            onClick={handleAIImprove}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded font-mono text-sm resize-none custom-scrollbar"
              placeholder="Enter markdown content..."
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
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <MarkdownRenderer content={content} />
          </div>
        )}
      </div>
    </div>
  );
};