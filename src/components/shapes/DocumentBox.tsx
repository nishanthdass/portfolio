import React, { useCallback } from "react";
import { animated } from "@react-spring/web";
import useDragger from "../../hooks/useDragger";

interface DocumentBoxProps {
  id: string;
  className?: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
  onPositionChange: (id: string, newPosition: { left: number; top: number; right: number; bottom: number }) => void;
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

  // Use the custom hook to handle drag and position
  useDragger(id, left, top, right, bottom, onPositionChange, setTargetID);

  return (
    <animated.div
      id={id}
      className={className}
      style={{
        position: "absolute",
        left,
        top,
        // You can decide whether to animate `right` and `bottom` or just `left` and `top`.
        // right,
        // bottom,
      }}
    />
  );
};

export default DocumentBox;
