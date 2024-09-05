import { useState } from "react";

function usePositionAnimation() {

  const [springPositions, setSpringPositions] = useState({
    "document-box-1": { left: 100, top: 150, right: 160, bottom: 210, className: "box box-1" },
    "document-box-2": { left: 200, top: 250, right: 260, bottom: 310, className: "box box-2" },
  });

  // console.log(springPositions["document-box-2"]);
  const [targetId, setTargetId] = useState<string | null>(null);

  // Function to update positions
  const updateSpringPosition = (id, newPosition) => {
    setSpringPositions((prevPositions) => ({
      ...prevPositions,
      [id]: { ...prevPositions[id], ...newPosition },
    }));
  };

  const updateTargetId = (newTargetId) => {
    setTargetId(newTargetId);
  };

  return { springPositions, targetId, updateSpringPosition, updateTargetId };
}

export default usePositionAnimation;
