import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  lastUpdated: string;
  language: string;
  stars: number;
  url: string;
  docPath?: string;
  chapters?: Array<{
    id: string;
    title: string;
    filename: string;
  }>;
}

export interface Task {
  id: string;
  type: 'video_generation' | 'podcast_creation' | 'documentation';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  message: string;
  createdAt: string;
}

export interface Participant {
  name: string;
  role: string;
  personality: string;
  background: string;
  speaking_style: string;
}

export interface Visualization {
  type: 'markdown' | 'mermaid';
  content: string;
}

export interface Dialogue {
  dialogue_id: number;
  speaker: string;
  text: string;
  emotion: string;
  visualization: Visualization;
}

export interface Cluster {
  cluster_id: string;
  cluster_title: string;
  mckinsey_summary: string;
  dialogues: Dialogue[];
}

export interface PodcastMetadata {
  podcast_id: string;
  generated_at: string;
  project_name: string;
  generation_config: {
    preset: string;
    language: string;
    focus_areas: string[];
    custom_prompt: string;
    max_dialogues_per_cluster: number;
  };
  statistics: {
    total_clusters: number;
    total_dialogues: number;
    total_visualizations: number;
    average_dialogues_per_cluster: number;
  };
  mermaid_validation: {
    validated_at: string;
    total_mermaid_diagrams: number;
    corrections_applied: number;
    conversions_to_markdown: number;
    validation_version: string;
  };
}

export interface PodcastData {
  metadata: PodcastMetadata;
  participants: Participant[];
  clusters: Cluster[];
}

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Repository
  currentRepository: Repository | null;
  featuredRepositories: Repository[];
  setRepository: (repo: Repository | null) => void;
  setFeaturedRepositories: (repos: Repository[]) => void;
  
  // Documentation
  viewMode: 'html' | 'markdown';
  activeFile: string | null;
  navigationOpen: boolean;
  currentMarkdownContent: string;
  toggleViewMode: () => void;
  setActiveFile: (file: string | null) => void;
  toggleNavigation: () => void;
  setCurrentMarkdownContent: (content: string) => void;
  
  // Podcast Script Editor
  podcastData: PodcastData | null;
  selectedClusterId: string | null;
  expandedClusters: Set<string>;
  searchQuery: string;
  setPodcastData: (data: PodcastData | null) => void;
  setSelectedClusterId: (id: string | null) => void;
  toggleClusterExpansion: (clusterId: string) => void;
  expandAllClusters: () => void;
  collapseAllClusters: () => void;
  setSearchQuery: (query: string) => void;
  updateDialogue: (clusterId: string, dialogueId: number, updates: Partial<Dialogue>) => void;
  
  // Tasks
  tasks: Map<string, Task>;
  addTask: (task: Omit<Task, 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  
  // UI State
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
      
      // Repository
      currentRepository: null,
      featuredRepositories: [],
      setRepository: (repo) => set({ currentRepository: repo }),
      setFeaturedRepositories: (repos) => set({ featuredRepositories: repos }),
      
      // Documentation
      viewMode: 'html',
      activeFile: null,
      navigationOpen: true,
      currentMarkdownContent: '',
      toggleViewMode: () => set((state) => ({
        viewMode: state.viewMode === 'html' ? 'markdown' : 'html'
      })),
      setActiveFile: (file) => set({ activeFile: file }),
      toggleNavigation: () => set((state) => ({ navigationOpen: !state.navigationOpen })),
      setCurrentMarkdownContent: (content) => set({ currentMarkdownContent: content }),
      
      // Podcast Script Editor
      podcastData: null,
      selectedClusterId: null,
      expandedClusters: new Set(),
      searchQuery: '',
      setPodcastData: (data) => set({ podcastData: data }),
      setSelectedClusterId: (id) => set({ selectedClusterId: id }),
      toggleClusterExpansion: (clusterId) => set((state) => {
        const newExpanded = new Set(state.expandedClusters);
        if (newExpanded.has(clusterId)) {
          newExpanded.delete(clusterId);
        } else {
          newExpanded.add(clusterId);
        }
        return { expandedClusters: newExpanded };
      }),
      expandAllClusters: () => set((state) => {
        const allClusterIds = state.podcastData?.clusters.map(c => c.cluster_id) || [];
        return { expandedClusters: new Set(allClusterIds) };
      }),
      collapseAllClusters: () => set({ expandedClusters: new Set() }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      updateDialogue: (clusterId, dialogueId, updates) => set((state) => {
        if (!state.podcastData) return state;
        
        const newClusters = state.podcastData.clusters.map(cluster => {
          if (cluster.cluster_id === clusterId) {
            return {
              ...cluster,
              dialogues: cluster.dialogues.map(dialogue => 
                dialogue.dialogue_id === dialogueId 
                  ? { ...dialogue, ...updates }
                  : dialogue
              )
            };
          }
          return cluster;
        });
        
        return {
          podcastData: {
            ...state.podcastData,
            clusters: newClusters
          }
        };
      }),
      
      // Tasks
      tasks: new Map(),
      addTask: (task) => set((state) => {
        const tasks = new Map(state.tasks);
        tasks.set(task.id, { ...task, createdAt: new Date().toISOString() });
        return { tasks };
      }),
      updateTask: (id, updates) => set((state) => {
        const tasks = new Map(state.tasks);
        const task = tasks.get(id);
        if (task) {
          tasks.set(id, { ...task, ...updates });
        }
        return { tasks };
      }),
      removeTask: (id) => set((state) => {
        const tasks = new Map(state.tasks);
        tasks.delete(id);
        return { tasks };
      }),
      
      // UI State
      sidebarWidth: 300,
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
    }),
    {
      name: 'vibedoc-store',
      partialize: (state) => ({
        theme: state.theme,
        viewMode: state.viewMode,
        sidebarWidth: state.sidebarWidth,
      }),
    }
  )
);