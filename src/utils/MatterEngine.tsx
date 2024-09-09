import { useEffect, useRef } from 'react';
import { Engine, Render, Runner, World} from 'matter-js';

function FlowChartCollisionEngine({ children }) {
  const sceneRef = useRef(null);
  const engineRef = useRef(Engine.create());
  const renderRef = useRef<Render | null>(null);
  const runnerRef = useRef<Runner | null>(null);

  useEffect(() => {
    const parentElement = sceneRef.current;

    // Function to initialize the renderer size based on parent element size
    const initializeRenderer = () => {
      if (!parentElement) return;

      renderRef.current = Render.create({
        element: parentElement,
        engine: engineRef.current,
        options: {
          width: parentElement.clientWidth,
          height: parentElement.clientHeight,
          wireframes: false,
          pixelRatio: window.devicePixelRatio,
        },
      });
    };

    initializeRenderer();

    // Initialize the runner
    runnerRef.current = Runner.create();

    // Run the engine and the renderer
    Runner.run(runnerRef.current, engineRef.current);
    Render.run(renderRef.current);

    // Update render size on window resize
    const handleResize = () => {
      if (renderRef.current) {
        const { clientWidth, clientHeight } = parentElement;
        renderRef.current.canvas.width = clientWidth;
        renderRef.current.canvas.height = clientHeight;
        renderRef.current.bounds.max.x = clientWidth;
        renderRef.current.bounds.max.y = clientHeight;
        renderRef.current.options.width = clientWidth;
        renderRef.current.options.height = clientHeight;
        Render.setPixelRatio(renderRef.current, window.devicePixelRatio); // added this

      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      Render.stop(renderRef.current);
      Runner.stop(runnerRef.current);
      World.clear(engineRef.current.world);
      Engine.clear(engineRef.current);
      renderRef.current.canvas.remove();
      renderRef.current.textures = {};
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render the container div with full size
  return (
    <div ref={sceneRef} style={{ width: '100%', height: '100%', border: '1px solid black' }}>
      {children(engineRef.current, renderRef.current)}
    </div>
  );
}

export default FlowChartCollisionEngine;
