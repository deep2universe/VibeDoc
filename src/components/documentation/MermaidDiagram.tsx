import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface Props {
  chart: string;
}

export const MermaidDiagram: React.FC<Props> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const zoomElementRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Initialize mermaid for the main diagram
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

  // Initialize mermaid for the zoomed diagram
  useEffect(() => {
    if (isZoomed && zoomElementRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
      });

      const id = `mermaid-zoom-${Math.random().toString(36).substr(2, 9)}`;
      zoomElementRef.current.innerHTML = `<div class="mermaid w-full h-full" id="${id}">${chart}</div>`;
      mermaid.init(undefined, zoomElementRef.current.querySelector('.mermaid'));
    }
  }, [isZoomed, chart]);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      {/* Main diagram with optimized spacing */}
      <div className="my-4 flex justify-center">
        <div
          className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group"
          onClick={handleZoomToggle}
        >
          <div
            ref={elementRef}
            className="p-2 max-w-full overflow-x-auto"
          />
          
          {/* Zoom button overlay */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1 bg-white dark:bg-gray-700 rounded-md shadow-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomToggle();
              }}
              aria-label="Zoom diagram"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Zoom overlay */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
            {/* Header - removed the title */}
            <div className="flex items-center justify-end p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleZoomToggle}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Zoom controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-1 border border-gray-200 dark:border-gray-700">
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                centerOnInit
                limitToBounds={false}
                wheel={{ step: 0.1 }}
                id="mermaid-zoom-wrapper"
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => zoomOut()}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        aria-label="Zoom out"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => zoomIn()}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        aria-label="Zoom in"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        aria-label="Reset zoom"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Diagram content with zoom functionality - removed flex centering classes */}
                    <div className="h-[calc(95vh-4rem)] overflow-hidden">
                      <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
                        <div ref={zoomElementRef} className="bg-white dark:bg-gray-800 w-full h-full" />
                      </TransformComponent>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};