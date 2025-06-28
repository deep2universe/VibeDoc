import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { MermaidDiagram } from './MermaidDiagram';

interface Props {
  content: string;
  onLinkClick?: (filename: string) => void;
}

export const MarkdownRenderer: React.FC<Props> = ({ content, onLinkClick }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      // GEÄNDERT: Optionen für rehypeHighlight hinzugefügt
      rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }], rehypeRaw]}
      components={{
        // Custom component for Mermaid blocks
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          
          // Mermaid-Block-Logik
          if (!inline && match && match[1] === 'mermaid') {
            // GEÄNDERT: .trim() hinzugefügt, um den String zu bereinigen
            return <MermaidDiagram chart={String(children).trim()} />;
          }
          
          // Inline-Code-Styling
          if (inline) {
            return (
              <code 
                className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }
          
          // Standard-Code-Block-Styling (für andere Sprachen)
          // `rehypeHighlight` hat hier bereits seine Arbeit getan, wenn die Sprache unterstützt wird
          return (
            <pre className="bg-gray-900 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          );
        },
        
        // Custom link handler for internal chapter links
        a: ({ href, children, ...props }) => {
          if (href && href.endsWith('.md') && onLinkClick) {
            return (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onLinkClick(href);
                }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-mono"
              >
                {children}
              </button>
            );
          }
          
          return (
            <a 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-mono"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          );
        },
        
        // ... (der Rest deiner Komponenten bleibt unverändert)
        
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              {children}
            </table>
          </div>
        ),
        
        th: ({ children }) => (
          <th className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-left font-mono font-semibold">
            {children}
          </th>
        ),
        
        td: ({ children }) => (
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">
            {children}
          </td>
        ),
        
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold font-mono mb-6 mt-8 text-gray-900 dark:text-white">
            {children}
          </h1>
        ),
        
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold font-mono mb-4 mt-8 text-gray-900 dark:text-white">
            {children}
          </h2>
        ),
        
        h3: ({ children }) => (
          <h3 className="text-xl font-bold font-mono mb-3 mt-6 text-gray-900 dark:text-white">
            {children}
          </h3>
        ),
        
        p: ({ children }) => (
          <p className="mb-4 font-mono leading-relaxed text-gray-700 dark:text-gray-300">
            {children}
          </p>
        ),
        
        ul: ({ children }) => (
          <ul className="mb-4 pl-6 space-y-2 font-mono text-gray-700 dark:text-gray-300 list-disc">
            {children}
          </ul>
        ),
        
        ol: ({ children }) => (
          <ol className="mb-4 pl-6 space-y-2 font-mono text-gray-700 dark:text-gray-300 list-decimal">
            {children}
          </ol>
        ),
        
        li: ({ children }) => (
          <li className="leading-relaxed">
            {children}
          </li>
        ),
        
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 font-mono italic text-gray-700 dark:text-gray-300">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};