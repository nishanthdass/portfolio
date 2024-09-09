import { useEffect, useRef } from 'react';
import { World, Mouse, MouseConstraint, Events } from 'matter-js';

const useMatterDragger = (render, engine) => {
  const mouseConstraintRef = useRef(null);
  const isClickedRef = useRef(false);

  useEffect(() => {
    if (!render || !engine) return; // Ensure render and engine are available

    // Create mouse constraint
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    mouseConstraintRef.current = mouseConstraint;

    // Add mouse constraint to the world
    World.add(engine.world, mouseConstraint);

    // Event listeners for mouse events
    Events.on(mouseConstraint, 'mousedown', () => {
      isClickedRef.current = true;
    });

    Events.on(mouseConstraint, 'mouseup', () => {
      isClickedRef.current = false;
    });

    Events.on(mouseConstraint, 'startdrag', (event) => {
      console.log('Started dragging');
    });

    Events.on(mouseConstraint, 'enddrag', (event) => {
      console.log('Stopped dragging');
    });

    // Cleanup function to remove event listeners and constraints on unmount
    return () => {
      Events.off(mouseConstraint, 'mousedown');
      Events.off(mouseConstraint, 'mouseup');
      Events.off(mouseConstraint, 'startdrag');
      Events.off(mouseConstraint, 'enddrag');
      World.remove(engine.world, mouseConstraint);
      mouseConstraintRef.current = null;
    };
  }, [engine, render]);

  // Returning the mouseConstraint and isClicked state
  return { mouseConstraint: mouseConstraintRef.current, isClicked: isClickedRef.current };
};

export default useMatterDragger;
