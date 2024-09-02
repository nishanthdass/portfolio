import React, { useState } from "react";
import { useSpring } from "@react-spring/web";
import DocumentBox from "./shapes/documentBox";

const PoliticaFactCheckerComponent: React.FC = () => {
  const [positions, setPositions] = useState<{
    [key: string]: { left: number; top: number; right: number; bottom: number; className: string };
  }>({
    "document-box-1": { left: 100, top: 150, right: 160, bottom: 210, className: "box box-1" }, // Added right and bottom based on the width and height
    "document-box-2": { left: 200, top: 250, right: 260, bottom: 310, className: "box box-2" }, // Added right and bottom based on the width and height
  });

  const [targetId, setTargetID] = useState<string | null>(null);

  // Initialize springs with `left`, `top`, `right`, and `bottom` for all animations
  const springs = Object.keys(positions).reduce((acc, key) => {
    const [props, api] = useSpring(() => ({
      immediate: key === targetId,
      left: positions[key].left,
      top: positions[key].top,
      right: positions[key].right,
      bottom: positions[key].bottom,
      scale: 1,
      config: {
        mass: 7,
        friction: 120,
        tension: 360,
        precision: 0.1,
      },
    }));
    acc[key] = { props, api };
    return acc;
  }, {} as { [key: string]: { props: any; api: any } });

  // Function to update spring animations
  const updateSpring = (
    id: string,
    position: { left: number; top: number; right: number; bottom: number }
  ) => {
    const spring = springs[id];
    if (spring) {
      spring.api.start({
        left: position.left,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
      });
    }
  };

  // Function to handle position changes
  const handlePositionChange = (
    id: string,
    newPosition: { left: number; top: number; right: number; bottom: number }
  ) => {
    const spring = springs[id];
    if (id === targetId) {
      spring.api.set({
        left: newPosition.left,
        top: newPosition.top,
        right: newPosition.right,
        bottom: newPosition.bottom,
      });
      
      setPositions((prevPositions) => ({
        ...prevPositions,
        [targetId]: { ...prevPositions[targetId], ...newPosition },
      }));
      
    }
    if (id !== targetId) {
      // console.log(newPosition);
      // setPositions((prevPositions) => ({
      //   ...prevPositions,
      //   [id]: { ...prevPositions[id], ...newPosition },
      // }));
      spring.api.set({
        left: newPosition.left,
        top: newPosition.top,
        right: newPosition.right,
        bottom: newPosition.bottom,
      });
      updateSpring(id, positions[id]);
    }
  };

  return (
    <div className="project-column">
      <div className="pfc-demo">
        {Object.entries(positions).map(([id, { left, top, right, bottom, className }]) => (
          <DocumentBox
            key={id}
            id={id}
            className={className}
            // left={left} 
            // top={top}
            // right={right}
            // bottom={bottom}
            left={springs[id].props.left.get()} 
            top={springs[id].props.top.get()}
            right={springs[id].props.right.get()}
            bottom={springs[id].props.bottom.get()}
            onPositionChange={handlePositionChange}
            setTargetID={setTargetID}
          />
        ))}
      </div>
    </div>
  );
};

export default PoliticaFactCheckerComponent;
