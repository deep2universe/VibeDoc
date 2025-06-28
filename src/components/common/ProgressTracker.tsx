import React from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Task } from '../../stores/appStore';
import { useAppStore } from '../../stores/appStore';

interface Props {
  task: Task;
}

export const ProgressTracker: React.FC<Props> = ({ task }) => {
  const { removeTask, updateTask } = useAppStore();
  const [expanded, setExpanded] = React.useState(false);

  const handleCancel = () => {
    removeTask(task.id);
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'running': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTaskTypeLabel = (type: Task['type']) => {
    switch (type) {
      case 'video_generation': return 'Video Generation';
      case 'podcast_creation': return 'Podcast Creation';
      case 'documentation': return 'Documentation';
      default: return 'Task';
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={87.96}
                    strokeDashoffset={87.96 - (87.96 * task.progress) / 100}
                    className="text-blue-500 transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold">
                    {Math.round(task.progress)}%
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-mono font-semibold text-sm">
                  {getTaskTypeLabel(task.type)}
                </h3>
                <p className={`text-xs font-mono ${getStatusColor(task.status)}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={handleCancel}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-mono">
            {task.message}
          </p>
        </div>

        {/* Expandable details */}
        {expanded && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-500 dark:text-gray-400">Started:</span>
                <span>{new Date(task.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <span>{task.type}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-500 dark:text-gray-400">ID:</span>
                <span className="truncate ml-2">{task.id}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};