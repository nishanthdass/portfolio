import React from "react";
import DocumentBox from "./shapes/DocumentBox";
import { TargetProvider, AnimatingProvider } from "./context/TargetContext"; // Update with your actual path


// Declare initial positions for 10 boxes in a checker pattern
const initialPositions = {
  "document-box-1": { left: 100, top: 100, right: 160, bottom: 160, className: "box box-1" },
  "document-box-2": { left: 200, top: 100, right: 260, bottom: 160, className: "box box-2" },
  "document-box-3": { left: 100, top: 200, right: 160, bottom: 260, className: "box box-3" },
  "document-box-4": { left: 200, top: 200, right: 260, bottom: 260, className: "box box-4" },
  "document-box-5": { left: 100, top: 300, right: 160, bottom: 360, className: "box box-5" },
  "document-box-6": { left: 200, top: 300, right: 260, bottom: 360, className: "box box-6" },
  "document-box-7": { left: 100, top: 400, right: 160, bottom: 460, className: "box box-7" },
  "document-box-8": { left: 200, top: 400, right: 260, bottom: 460, className: "box box-8" },
  "document-box-9": { left: 100, top: 500, right: 160, bottom: 560, className: "box box-9" },
  "document-box-10": { left: 200, top: 500, right: 260, bottom: 560, className: "box box-10" },
  "document-box-11": { left: 300, top: 100, right: 360, bottom: 160, className: "box box-11" },
  "document-box-12": { left: 400, top: 100, right: 460, bottom: 160, className: "box box-12" },
  "document-box-13": { left: 300, top: 200, right: 360, bottom: 260, className: "box box-13" },
  "document-box-14": { left: 400, top: 200, right: 460, bottom: 260, className: "box box-14" },
  "document-box-15": { left: 300, top: 300, right: 360, bottom: 360, className: "box box-15" },
  "document-box-16": { left: 400, top: 300, right: 460, bottom: 360, className: "box box-16" },
  "document-box-17": { left: 300, top: 400, right: 360, bottom: 460, className: "box box-17" },
  "document-box-18": { left: 400, top: 400, right: 460, bottom: 460, className: "box box-18" },
  "document-box-19": { left: 300, top: 500, right: 360, bottom: 560, className: "box box-19" },
  "document-box-20": { left: 400, top: 500, right: 460, bottom: 560, className: "box box-20" },
};
const boxDivs = [
  "speeches-interviews-pressreleases",
  "videos",
  // "scrapping-tool",
  // "speech-to-text",
  // "scrapping-docs",
  // "speech-text-docs",
  // "parsed-docs",
  // "chunks",
  // "embedding-model-1",
  // "embedding-model-2",
  // "vector-data-1",
  // "vector-data-2",
  // "vector-database"
];


const PoliticaFactCheckerComponent: React.FC = () => {
  return (
    <TargetProvider>
      <AnimatingProvider>
        <div className="project-column">
          <div className="pfc-demo">
            {Object.keys(initialPositions).map((id, index) => (
              boxDivs[index] ?
              <DocumentBox
                key={id}
                id={id}
                position={initialPositions[id]}
              >
                 <div className={boxDivs[index]}> hi! </div> 
              </DocumentBox>
              : null
            ))}
          </div>
        </div>
      </AnimatingProvider>
    </TargetProvider>
  );
};

export default PoliticaFactCheckerComponent;
