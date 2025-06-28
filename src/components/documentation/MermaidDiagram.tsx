import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface Props {
  chart: string;
}

export const MermaidDiagram: React.FC<Props> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
      });

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      elementRef.current.innerHTML = `<div class="mermaid" id="${id}">${chart}</div>`;
      mermaid.init(undefined, elementRef.current.querySelector('.mermaid'));
    }
  }, [chart]);

  return (
    <div className="my-8 flex justify-center">
      <div
        ref={elementRef}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 max-w-full overflow-x-auto"
      />
    </div>
  );
};