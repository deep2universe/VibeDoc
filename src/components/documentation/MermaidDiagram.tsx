import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, X, ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface Props {
  chart: string;
}

// Eindeutige ID für Mermaid-Initialisierung, um Konflikte zu vermeiden
const MERMAID_CONFIG = {
  startOnLoad: false, // Wir steuern das Rendern manuell
  theme: 'default',
  securityLevel: 'loose',
};

// Initialisiere Mermaid nur einmal global
mermaid.initialize(MERMAID_CONFIG);

export const MermaidDiagram: React.FC<Props> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // NEU: State für den gerenderten SVG-Code des Zoom-Diagramms
  const [svgContent, setSvgContent] = useState<string>('');
  
  // GEÄNDERT: useEffect für das *Vorschau*-Diagramm (nicht im Zoom-Modus)
  // Dieser Effekt rendert das kleine Diagramm auf der Hauptseite.
  useEffect(() => {
    if (elementRef.current && chart) {
      const renderPreview = async () => {
        try {
          // Wir brauchen keine zufällige ID, da wir den Inhalt direkt setzen.
          const { svg } = await mermaid.render('preview-diagram', chart);
          if (elementRef.current) {
            elementRef.current.innerHTML = svg;
          }
        } catch (e) {
          console.error('Error rendering preview diagram:', e);
          if (elementRef.current) {
             elementRef.current.innerHTML = 'Error rendering diagram.';
          }
        }
      };
      renderPreview();
    }
  }, [chart]);

  // GEÄNDERT: useEffect für das *Zoom*-Diagramm.
  // Dieser Effekt wird nur aktiv, wenn der Zoom-Modus gestartet wird.
  useEffect(() => {
    // Nur ausführen, wenn der Zoom-Modus aktiv ist und wir den SVG-Code noch nicht haben.
    if (isZoomed && chart && !svgContent) {
      const renderZoomedDiagram = async () => {
        try {
          const id = `mermaid-zoom-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);

          // WICHTIG: Entferne die festen Breiten- und Höhenattribute vom SVG-Tag.
          // Dies erlaubt dem SVG, sich an den Container anzupassen (skalierbar zu werden).
          // Der viewBox-Attribut bleibt erhalten und sorgt für das richtige Seitenverhältnis.
          const scalableSvg = svg
            .replace(/width="\d+(\.\d+)?(pt|px)?"/, '')
            .replace(/height="\d+(\.\d+)?(pt|px)?"/, '')
            .replace(/style="max-width:.+?"/, 'style="max-width: 100%; height: auto;"');
            
          setSvgContent(scalableSvg);
        } catch (error) {
          console.error('Error rendering zoomed mermaid diagram:', error);
          // Zeige eine Fehlermeldung im SVG-Container an
          setSvgContent(`<div class="p-4 text-red-500 dark:text-red-400 font-mono">Error rendering diagram: ${error.message}</div>`);
        }
      };

      renderZoomedDiagram();
    } else if (!isZoomed) {
      // Optional: SVG-Code zurücksetzen, wenn der Zoom geschlossen wird, um Speicher zu sparen.
      setSvgContent('');
    }
  }, [isZoomed, chart, svgContent]);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      {/* Vorschau-Diagramm */}
      <div className="my-4 flex justify-center">
        <div
          className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group"
          onClick={handleZoomToggle}
        >
          {/* Container für das Vorschau-Diagramm */}
          <div
            ref={elementRef}
            className="p-4 flex justify-center items-center" // Zentrierung verbessert
          />
          
          {/* Zoom-Button Overlay */}
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

      {/* Zoom-Overlay */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
            {/* Header mit Schließen-Button */}
            <div className="flex-shrink-0 flex items-center justify-end p-2 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleZoomToggle}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Hauptinhaltsbereich mit Diagramm */}
            <div className="flex-1 overflow-hidden relative"> {/* Relative Position für die Controls */}
              <TransformWrapper
                initialScale={1}
                minScale={0.1} // Erlaube stärkeres Herauszoomen
                maxScale={8}
                centerOnInit
                limitToBounds={false} // Wichtig, damit große Diagramme verschoben werden können
                wheel={{ step: 0.2 }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Zoom-Steuerung */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-1 border border-gray-200 dark:border-gray-700">
                       <button onClick={() => zoomOut()} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Zoom out"><ZoomOut className="w-5 h-5" /></button>
                       <button onClick={() => zoomIn()} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Zoom in"><ZoomIn className="w-5 h-5" /></button>
                       <button onClick={() => resetTransform()} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Reset zoom"><RotateCcw className="w-5 h-5" /></button>
                       <div className="px-2 text-sm text-gray-500 dark:text-gray-400 select-none"><Move className="w-4 h-4 inline mr-1" />Drag to pan</div>
                    </div>
                    
                    {/* Diagramm-Inhalt mit Zoom-Funktionalität */}
                    <TransformComponent 
                      wrapperClass="!w-full !h-full" // Stellt sicher, dass der Wrapper den gesamten Platz einnimmt
                      contentClass="!w-full !h-full" // Stellt sicher, dass der Inhalts-Container den gesamten Platz einnimmt
                    >
                      {/* WICHTIG: Hier wird das SVG gerendert */}
                      {svgContent ? (
                        <div
                          className="w-full h-full flex items-center justify-center p-4" // Padding für Abstand zum Rand
                          // Das bereinigte SVG wird hier sicher eingefügt
                          dangerouslySetInnerHTML={{ __html: svgContent }}
                        />
                      ) : (
                        // Ladeanzeige, während Mermaid rendert
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