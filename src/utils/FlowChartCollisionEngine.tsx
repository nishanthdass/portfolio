import { useEffect, useRef } from 'react';
import Matter, { Engine, Render, Runner, World, Bodies, Composite } from 'matter-js';
import useMatterDragger from '../hooks/useMatterDragger';

function FlowChartCollisionEngine({ children }) {
  const sceneRef = useRef(null);
  const engineRef = useRef(Engine.create());
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const compositeRef = useRef(Composite.create()); // Initialize the composite

  useEffect(() => {
    const parentElement = sceneRef.current;

    const initializeRenderer = () => {
      if (!parentElement) return;
      const canvasStyle = window.getComputedStyle(parentElement);
      const width = parseFloat(canvasStyle.width);
      const height = parseFloat(canvasStyle.height);

      renderRef.current = Render.create({
        element: parentElement,
        engine: engineRef.current,
        options: {
          width: width,
          height: height,
          wireframes: false,
          pixelRatio: window.devicePixelRatio,
        },
      });
    };

    initializeRenderer();

    runnerRef.current = Runner.create();

    // Run the engine and the renderer
    Runner.run(runnerRef.current, engineRef.current);
    Render.run(renderRef.current);

    // Add the composite to the world once on initial render
    World.add(engineRef.current.world, compositeRef.current);

    const adjustGroundPosition = () => {
      if (renderRef.current && sceneRef.current) {
        const canvasStyle = window.getComputedStyle(renderRef.current.canvas);
        const canvasWidth = parseFloat(canvasStyle.width);
        const canvasHeight = parseFloat(canvasStyle.height);
        
        const ground = Bodies.rectangle(
          canvasWidth / 2,
          canvasHeight - 25,
          canvasWidth,
          50,
          { isStatic: true }
        );

        // Add the ground to the composite
        Composite.add(compositeRef.current, ground);
      }
    };

    adjustGroundPosition(); // Initial setup for ground

    // Handle window resize
    const handleResize = () => {
      if (renderRef.current) {
        const { clientWidth, clientHeight } = parentElement;
        renderRef.current.canvas.width = clientWidth;
        renderRef.current.canvas.height = clientHeight;
        renderRef.current.bounds.max.x = clientWidth;
        renderRef.current.bounds.max.y = clientHeight;
        renderRef.current.options.width = clientWidth;
        renderRef.current.options.height = clientHeight;
        Render.setPixelRatio(renderRef.current, window.devicePixelRatio);
        adjustGroundPosition();
      }
    };

    window.addEventListener('resize', handleResize);

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
      {children && typeof children === 'function' ? children(engineRef.current, renderRef.current, compositeRef.current) : null}
    </div>
  );
}

export default FlowChartCollisionEngine;
