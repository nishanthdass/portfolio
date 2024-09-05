import React from "react";
import DocumentBox from "./shapes/DocumentBox";
import { TargetProvider, AnimatingProvider } from "./context/TargetContext"; // Update with your actual path

// Declare initial positions for 10 boxes in a checker pattern
const initialPositions = {
  "document-box-1": { left: 100, top: 100, right: 160, bottom: 160, className: "box box-1" },
  "document-box-2": { left: 200, top: 100, right: 260, bottom: 160, className: "box box-2" },
  "document-box-3": { left: 100, top: 200, right: 160, bottom: 260, className: "box box-3" },
  "document-box-4": { left: 200, top: 200, right: 260, bottom: 260, className: "box box-4" },
};

const PoliticaFactCheckerComponent: React.FC = () => {
  return (
    <TargetProvider>
      <AnimatingProvider>
        <div className="project-column">
          <div className="pfc-demo">
            {Object.keys(initialPositions).map((id) => (
              <DocumentBox
                key={id}
                id={id}
                position={initialPositions[id]}
              />
            ))}
          </div>
        </div>
      </AnimatingProvider>
    </TargetProvider>
  );
};

export default PoliticaFactCheckerComponent;
