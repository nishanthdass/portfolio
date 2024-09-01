import React, { useCallback } from "react";
import useDragger from "../../hooks/useDragger";


interface DocumentBoxProps {
  id: string;
  className?: string;
  left: number;
  top: number;
  onPositionChange: (id: string, newPosition: { left: number; top: number }) => void;
  setTargetID: (targetId: string | null) => void;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({
  id,
  className = "box",
  left,
  top,
  onPositionChange,
  setTargetID,
}) => {

  // Use the custom hook to handle drag and position, passing the overlap handler
  useDragger(id, left, top, onPositionChange, setTargetID);

  return (
    <div
      id={id}
      className={className}
      style={{ position: "absolute", left: left, top: top }}
    />
  );
};

export default DocumentBox;
