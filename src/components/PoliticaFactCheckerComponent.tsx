import React from "react";
import DocumentBox from "./shapes/DocumentBox";
import usePositionAnimation from "../hooks/usePositionAnimation";

const PoliticaFactCheckerComponent: React.FC = () => {
  const { springPositions, targetId, updateSpringPosition, updateTargetId } = usePositionAnimation();

  return (
    <div className="project-column">
      <div className="pfc-demo">
        {Object.keys(springPositions).map((id) => (
          <DocumentBox
            key={id}
            id={id}
            springPositions={springPositions}
            targetId={targetId}
            updateSpringPosition={updateSpringPosition}
            updateTargetId={updateTargetId}
          />
        ))}
      </div>
    </div>
  );
};

export default PoliticaFactCheckerComponent;
