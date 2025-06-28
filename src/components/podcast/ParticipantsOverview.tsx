import React from 'react';
import { X, User } from 'lucide-react';
import { Participant } from '../../stores/appStore';

interface Props {
  participants: Participant[];
  onClose: () => void;
}

export const ParticipantsOverview: React.FC<Props> = ({ participants, onClose }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
          Podcast Hosts
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold ${
                index === 0
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}>
                {participant.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-mono font-semibold text-gray-900 dark:text-white">
                  {participant.name}
                </h3>
                <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                  {participant.role}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Personality
                </span>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {participant.personality}
                </p>
              </div>
              
              <div>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Background
                </span>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {participant.background}
                </p>
              </div>
              
              <div>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Speaking Style
                </span>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {participant.speaking_style}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};