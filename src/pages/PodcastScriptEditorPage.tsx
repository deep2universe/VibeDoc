import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Users, BarChart3, Play, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { DialogueBubble } from '../components/podcast/DialogueBubble';
import { ParticipantsOverview } from '../components/podcast/ParticipantsOverview';

export const PodcastScriptEditorPage: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();
  const {
    podcastData,
    setPodcastData,
    selectedClusterId,
    setSelectedClusterId,
    expandedClusters,
    toggleClusterExpansion,
    expandAllClusters,
    collapseAllClusters,
    searchQuery,
    setSearchQuery,
    currentDocumentation
  } = useAppStore();

  const [showParticipants, setShowParticipants] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPodcastScript = async () => {
      if (!owner || !repo) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Try to find the podcast JSON file
        const possiblePaths = [
          `/output/${repo}_en/podcast_`,
          `/output/${owner}_${repo}_en/podcast_`,
          `/output/${repo}/podcast_`,
        ];
        
        let podcastContent = null;
        
        for (const basePath of possiblePaths) {
          try {
            // Try to find any podcast JSON file in this directory
            // We'll need to try common podcast IDs or scan the directory
            const commonIds = ['19e70ba6', '9548d6fc', '4be32f81', '0fe1a4dc', '52e6408d'];
            
            for (const id of commonIds) {
              try {
                const response = await fetch(`${basePath}${id}_validated.json`);
                if (response.ok) {
                  podcastContent = await response.json();
                  break;
                }
              } catch (e) {
                // Try next ID
                continue;
              }
            }
            
            if (podcastContent) break;
          } catch (e) {
            // Try next path
            continue;
          }
        }
        
        if (!podcastContent) {
          throw new Error(`Podcast script not found for ${owner}/${repo}`);
        }
        
        setPodcastData(podcastContent);
        setSelectedClusterId('index');
        
      } catch (err) {
        console.error('Error loading podcast script:', err);
        setError(err instanceof Error ? err.message : 'Failed to load podcast script');
        
        // Fallback to mock data
        const { mockPodcastScript } = await import('../mockData/podcastScript');
        setPodcastData(mockPodcastScript);
        setSelectedClusterId('index');
      } finally {
        setLoading(false);
      }
    };
    
    loadPodcastScript();
  }, [owner, repo, setPodcastData, setSelectedClusterId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-gray-500 dark:text-gray-400 font-mono">
            Loading podcast script...
          </div>
        </div>
      </div>
    );
  }

  if (!podcastData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 font-mono">
            {error || 'Failed to load podcast script'}
          </div>
          <button
            onClick={handleBackClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-mono text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const filteredClusters = podcastData.clusters.filter(cluster => {
    if (selectedClusterId && cluster.cluster_id !== selectedClusterId) {
      return false;
    }
    
    if (searchQuery) {
      return cluster.dialogues.some(dialogue => 
        dialogue.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dialogue.speaker.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });

  const filteredDialogues = filteredClusters.flatMap(cluster => 
    cluster.dialogues.filter(dialogue => {
      if (searchQuery) {
        return dialogue.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
               dialogue.speaker.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    }).map(dialogue => ({ ...dialogue, clusterId: cluster.cluster_id }))
  );

  const handleGenerate = () => {
    // Mock generation process
    console.log('Starting podcast/video generation...');
  };

  const getDisplayUrl = () => {
    if (currentDocumentation?.repositoryUrl) {
      return currentDocumentation.repositoryUrl.replace('https://github.com/', '');
    }
    return `${owner}/${repo}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with Back Button */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          
          <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white mb-2">
            Media Pipeline Editor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            {getDisplayUrl()} • {podcastData.metadata.project_name}
            {error && (
              <span className="text-red-500 dark:text-red-400 ml-2">
                (Using fallback data)
              </span>
            )}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Participants Toggle */}
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-mono text-sm"
            >
              <Users className="w-4 h-4" />
              Hosts ({podcastData.participants.length})
            </button>

            {/* Statistics */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
              <BarChart3 className="w-4 h-4" />
              {podcastData.metadata.statistics.total_clusters} clusters • {podcastData.metadata.statistics.total_dialogues} dialogues
            </div>

            {/* Cluster Selection */}
            <select
              value={selectedClusterId || ''}
              onChange={(e) => setSelectedClusterId(e.target.value || null)}
              className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Clusters</option>
              {podcastData.clusters.map(cluster => (
                <option key={cluster.cluster_id} value={cluster.cluster_id}>
                  {cluster.cluster_title}
                </option>
              ))}
            </select>

            {/* Expand/Collapse Controls */}
            <div className="flex gap-2">
              <button
                onClick={expandAllClusters}
                className="px-3 py-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={collapseAllClusters}
                className="px-3 py-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dialogues..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Participants Overview */}
        {showParticipants && (
          <ParticipantsOverview 
            participants={podcastData.participants}
            onClose={() => setShowParticipants(false)}
          />
        )}

        {/* Dialogues */}
        <div className="space-y-6 mb-8">
          {filteredDialogues.map((dialogue) => (
            <DialogueBubble
              key={`${dialogue.clusterId}-${dialogue.dialogue_id}`}
              dialogue={dialogue}
              clusterId={dialogue.clusterId}
            />
          ))}
        </div>

        {/* Generation Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-mono font-semibold text-gray-900 dark:text-white mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                Review complete • {filteredDialogues.length} dialogues ready for processing
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-mono text-sm shadow-lg hover:shadow-xl"
              >
                <Play className="w-4 h-4" />
                Generate Media
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};