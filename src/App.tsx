import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { ProgressTracker } from './components/common/ProgressTracker';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { DocumentationPage } from './pages/DocumentationPage';
import { PodcastScriptEditorPage } from './pages/PodcastScriptEditorPage';
import { useAppStore } from './stores/appStore';
import { useTheme } from './hooks/useTheme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

function AppContent() {
  useTheme(); // Initialize theme
  const { tasks } = useAppStore();
  const location = useLocation();
  
  // Hide header on podcast editor pages and documentation pages
  const showHeader = !location.pathname.startsWith('/video/') && !location.pathname.startsWith('/docs/');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono">
      {showHeader && <Header />}
      
      <main className="transition-filter duration-300">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-pulse text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs/:owner/:repo" element={<DocumentationPage />} />
            <Route path="/video/:owner/:repo" element={<PodcastScriptEditorPage />} />
          </Routes>
        </Suspense>
      </main>
      
      {Array.from(tasks.values()).map(task => (
        task.status === 'running' && (
          <ProgressTracker key={task.id} task={task} />
        )
      ))}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;