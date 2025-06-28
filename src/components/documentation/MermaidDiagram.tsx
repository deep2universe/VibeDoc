import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, X, ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';
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

  // Initialize mermaid for the zoomed diagram using mermaid.render
  useEffect(() => {
    if (isZoomed && zoomElementRef.current) {
      const renderMermaid = async () => {
        try {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            useMaxWidth: true, // Add this option to make Mermaid respect container width
          });

          const id = `mermaid-zoom-${Math.random().toString(36).substr(2, 9)}`;
          
          // Use mermaid.render to get the SVG directly
          const { svg } = await mermaid.render(id, chart);
          
          // Create a container div to hold the SVG
          const container = document.createElement('div');
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'center';
          
          // Insert the SVG into the container
          container.innerHTML = svg;
          
          // Get the SVG element
          const svgElement = container.querySelector('svg');
          if (svgElement) {
            // Make the SVG fill its container
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            svgElement.style.maxWidth = 'none';
            svgElement.style.maxHeight = 'none';
            svgElement.style.display = 'block'; // Add display: block to avoid inline behavior
            
            // Remove any fixed width/height attributes that might constrain scaling
            svgElement.removeAttribute('width');
            svgElement.removeAttribute('height');
            
            // Center the diagram content within the SVG
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            // Find the g element that contains the actual diagram
            const gElement = svgElement.querySelector('g');
            if (gElement) {
              // Ensure the transform origin is centered
              gElement.style.transformOrigin = 'center center';
            }
          }
          
          // Clear the zoom element and append the container
          if (zoomElementRef.current) {
            zoomElementRef.current.innerHTML = '';
            zoomElementRef.current.appendChild(container);
          }
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
          if (zoomElementRef.current) {
            zoomElementRef.current.innerHTML = `<div class="p-4 text-red-500 dark:text-red-400 font-mono">Error rendering diagram: ${error.message}</div>`;
          }
        }
      };
      
      renderMermaid();
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
            className="p-4 max-w-full overflow-x-auto"
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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-7xl w-full h-[90vh] flex flex-col overflow-hidden">
            {/* Header with close button */}
            <div className="flex items-center justify-end p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleZoomToggle}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Main content area with diagram */}
            <div className="flex-1 overflow-hidden">
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
                limitToBounds={false}
                wheel={{ step: 0.1 }}
                id="mermaid-zoom-wrapper"
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Zoom controls */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-1 border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => zoomOut()}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        aria-label="Zoom out"
                      >
                        <ZoomOut className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => zoomIn()}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        aria-label="Zoom in"
                      >
                        <ZoomIn className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        aria-label="Reset zoom"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                      <div className="px-2 text-sm font-mono text-gray-500 dark:text-gray-400">
                        <Move className="w-4 h-4 inline mr-1" /> Drag to pan
                      </div>
                    </div>
                    
                    {/* Diagram content with zoom functionality */}
                    <TransformComponent 
                      wrapperClassName="w-full h-full" 
                      contentClassName="w-full h-full flex items-center justify-center"
                    >
                      <div 
                        ref={zoomElementRef} 
                        className="w-full h-full flex items-center justify-center"
                        style={{ minWidth: '100%', minHeight: '100%' }}
                      />
                    </TransformComponent>
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