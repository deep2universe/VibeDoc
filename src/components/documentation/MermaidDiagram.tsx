import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, X, ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface Props {
  chart: string;
}

// Initialize mermaid configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
});

export const MermaidDiagram: React.FC<Props> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  
  // Render the preview diagram
  useEffect(() => {
    if (elementRef.current && chart) {
      try {
        // Generate a unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        
        // Clear previous content
        elementRef.current.innerHTML = '';
        
        // Render the diagram using mermaid.render() instead of mermaid.init()
        mermaid.render(id, chart)
          .then(({ svg }) => {
            // Make SVG responsive by removing fixed dimensions
            const scalableSvg = svg
              .replace(/width="\d+(\.\d+)?(pt|px)?"/, 'width="100%"')
              .replace(/height="\d+(\.\d+)?(pt|px)?"/, 'height="auto"')
              .replace(/style="max-width:.+?"/, 'style="max-width: 100%; height: auto;"');
            
            // Insert the SVG content directly
            if (elementRef.current) {
              elementRef.current.innerHTML = scalableSvg;
            }
          })
          .catch(error => {
            console.error('Error rendering preview diagram:', error);
            if (elementRef.current) {
              elementRef.current.innerHTML = `<div class="p-4 text-red-500 dark:text-red-400 font-mono">Error rendering diagram: ${error.message}</div>`;
            }
          });
      } catch (e) {
        console.error('Error rendering preview diagram:', e);
        if (elementRef.current) {
          elementRef.current.innerHTML = 'Error rendering diagram.';
        }
      }
    }
  }, [chart]);

  // Render the zoomed diagram when zoom mode is activated
  useEffect(() => {
    if (isZoomed && chart && !svgContent) {
      const renderZoomedDiagram = async () => {
        try {
          const id = `mermaid-zoom-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);

          // Make SVG responsive by removing fixed dimensions
          const scalableSvg = svg
            .replace(/width="\d+(\.\d+)?(pt|px)?"/, '')
            .replace(/height="\d+(\.\d+)?(pt|px)?"/, '')
            .replace(/style="max-width:.+?"/, 'style="max-width: 100%; height: auto;"');
            
          setSvgContent(scalableSvg);
        } catch (error) {
          console.error('Error rendering zoomed mermaid diagram:', error);
          setSvgContent(`<div class="p-4 text-red-500 dark:text-red-400 font-mono">Error rendering diagram: ${error.message}</div>`);
        }
      };

      renderZoomedDiagram();
    } else if (!isZoomed) {
      // Reset SVG content when zoom is closed
      setSvgContent('');
    }
  }, [isZoomed, chart, svgContent]);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      {/* Preview diagram */}
      <div className="my-4 flex justify-center">
        <div
          className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group w-full"
          onClick={handleZoomToggle}
        >
          {/* Container for the preview diagram */}
          <div
            ref={elementRef}
            className="p-4 flex justify-center items-center w-full min-h-[200px]"
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
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
            {/* Header with close button */}
            <div className="flex-shrink-0 flex items-center justify-end p-2 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleZoomToggle}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Main content area with diagram */}
            <div className="flex-1 overflow-hidden relative">
              <TransformWrapper
                initialScale={1}
                minScale={0.1}
                maxScale={8}
                centerOnInit
                limitToBounds={false}
                wheel={{ step: 0.2 }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Zoom controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-1 border border-gray-200 dark:border-gray-700">
                       <button onClick={() => zoomOut()} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Zoom out"><ZoomOut className="w-5 h-5" /></button>
                       <button onClick={() => zoomIn()} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Zoom in"><ZoomIn className="w-5 h-5" /></button>
                       <button onClick={() => resetTransform()} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Reset zoom"><RotateCcw className="w-5 h-5" /></button>
                       <div className="px-2 text-sm text-gray-500 dark:text-gray-400 select-none"><Move className="w-4 h-4 inline mr-1" />Drag to pan</div>
                    </div>
                    
                    {/* Diagram content with zoom functionality */}
                    <TransformComponent 
                      wrapperClass="!w-full !h-full"
                      contentClass="!w-full !h-full"
                    >
                      {svgContent ? (
                        <div
                          className="w-full h-full flex items-center justify-center p-4"
                          dangerouslySetInnerHTML={{ __html: svgContent }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          Loading diagram...
                        </div>
                      )}
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