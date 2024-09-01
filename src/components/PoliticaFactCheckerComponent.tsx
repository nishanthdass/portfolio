import React, { useState } from "react";
import { useSpring } from "@react-spring/web";
import DocumentBox from "./shapes/documentBox";

const PoliticaFactCheckerComponent: React.FC = () => {
  const [positions, setPositions] = useState<{
    [key: string]: { left: number; top: number; className: string };
  }>({
    "document-box-1": { left: 100, top: 150, className: "box box-1" },
    "document-box-2": { left: 200, top: 250, className: "box box-2" },
  });

  const [targetId, setTargetID] = useState<string | null>(null);

  // Initialize springs with `left` and `top` for all animations
  const springs = Object.keys(positions).reduce((acc, key) => {
    const [props, api] = useSpring(() => ({
      immediate: key === targetId,
      left: positions[key].left,
      top: positions[key].top,
      scale: 1,
      config: key => {
        if (key !== targetId) {
          return {
            mass: 5,
            friction: 120,
            tension: 600,
            precision: 0.1,
          }
        }
      },
      
    }));
    acc[key] = { props, api };
    return acc;
  }, {} as { [key: string]: { props: any; api: any } });

  // Function to update spring animations
  const updateSpring = (
    id: string,
    newPosition: { left: number; top: number }
  ) => {
    const spring = springs[id];
    if (spring) {
      spring.api.start({
        left: newPosition.left,
        top: newPosition.top,
      });
    }
  };

  // Function to handle position changes
  const handlePositionChange = (
    id: string,
    newPosition: { left: number; top: number }
  ) => {
    // Update the positions state


    const spring = springs[id];
    if (spring && id === targetId) {
      spring.api.set({ left: newPosition.left, top: newPosition.top });
    } 
    if (id !== targetId) {
      // console.log("targetId", targetId, positions[targetId]);
      // console.log("id", id, "Position", positions[id]);
      // console.log("id", id, "newPosition", newPosition);
      // push non target box here
      // spring.api.set({ left: newPosition.left, top: newPosition.top });
      // updateSpring(id, positions[id]);
    }
    setPositions((prevPositions) => ({
      ...prevPositions,
      [targetId ]: { ...prevPositions[targetId], ...newPosition },
    }));
  };

  return (
    <div className="project-column">
      <div className="pfc-demo">
        {Object.entries(positions).map(([id, { left, top, className }]) => (
          <DocumentBox
            key={id}
            id={id}
            className={className}
            left={springs[id].props.left.get()} // Use spring values consistently
            top={springs[id].props.top.get()}
            onPositionChange={handlePositionChange}
            setTargetID={setTargetID}
          />
        ))}
      </div>
    </div>
  );
};

export default PoliticaFactCheckerComponent;
