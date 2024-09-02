import React, { useCallback } from "react";
import useDragger from "../../hooks/useDragger";

interface DocumentBoxProps {
  id: string;
  className?: string;
  left: number;
  top: number;
  right: number; // Added right
  bottom: number; // Added bottom
  onPositionChange: (id: string, newPosition: { left: number; top: number; right: number; bottom: number }) => void; // Updated to include right and bottom
  setTargetID: (targetId: string | null) => void;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({
  id,
  className = "box",
  left,
  top,
  right,
  bottom,
  onPositionChange,
  setTargetID,
}) => {

  // Use the custom hook to handle drag and position, passing the overlap handler
  useDragger(id, left, top, right, bottom, onPositionChange, setTargetID);

  return (
    <div
      id={id}
      className={className}
      style={{
        position: "absolute",
        left: left,
        top: top,
        right: right, // Added right
        bottom: bottom, // Added bottom
      }}
    />
  );
};

export default DocumentBox;
