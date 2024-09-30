import React, { useEffect } from "react";
import FlowChartCollisionEngine from "../utils/FlowChartCollisionEngine";
import { Bodies, Composite } from 'matter-js';

const PoliticaFactCheckerComponent: React.FC = () => {

  const addBodies = (composite) => {
    const box = Bodies.rectangle(400, 200, 80, 80, { restitution: 0.8 });
    Composite.add(composite, box); // Add the box to the composite
  };

  return (
    <div className="project-column">
      <div className="pfc-demo">
        <FlowChartCollisionEngine>
          {(engine, render, composite) => {
            useEffect(() => {
              if (engine && render && composite) {
                addBodies(composite); // Add bodies to the composite
              }
            }, [engine, render, composite]); // Ensure the effect runs when dependencies are ready
          }}
        </FlowChartCollisionEngine>
      </div>
    </div>
  );
};

export default PoliticaFactCheckerComponent;
