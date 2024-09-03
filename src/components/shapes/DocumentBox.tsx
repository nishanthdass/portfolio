import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import useDragger from "../../hooks/useDragger";

interface DocumentBoxProps {
  id: string;
  springPositions: {
    [key: string]: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    };
  };
  targetId: string | null;
  updateSpringPosition: (id: string, newPosition: Partial<{ left: number; top: number; right: number; bottom: number; className: string }>) => void;
  updateTargetId: (newTargetId: string | null) => void;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({ id, springPositions, targetId, updateSpringPosition, updateTargetId }) => {
  const pushedPosition = springPositions[id];
  const [localPosition, setLocalPosition] = React.useState(pushedPosition);

  // Determine if the current box is the target
  const isTarget = id === targetId;
  // Initialize spring only if this box is not the target 
  const [spring, api] = useSpring(() => ({
    from: { left: localPosition.left, top: localPosition.top },
    to: { left: pushedPosition.left, top: pushedPosition.top },
    config: {
      mass: 8,
      friction: 80,
      tension: 200,
      precision: 0.0001,
      clamp: true,
    },
    
  }), [pushedPosition]);

  

  // Update spring when position changes, only for non-targets
  useEffect(() => {
    if (isTarget) {
      setLocalPosition(pushedPosition);
    }
    if (!isTarget) {
      api.start({
        from: { left: pushedPosition.left, top: pushedPosition.top },
        to: { left: localPosition.left, top: localPosition.top },
        config: {
          mass: 8,
          friction: 80,
          tension: 200,
          precision: 0.0001,
          clamp: true,
        }
      });
    }
  }, [pushedPosition, api, isTarget]);

  // Initialize dragger hook for the specific box
  useDragger(id, pushedPosition.left, pushedPosition.top, pushedPosition.right, pushedPosition.bottom, updateSpringPosition, updateTargetId);

  // Render with spring for non-targets and direct position for the target
  return (
    <animated.div
      id={id}
      className={pushedPosition.className}
      style={{
        position: "absolute",
        left: isTarget ? pushedPosition.left : spring.left, // Direct position for target, spring for others
        top: isTarget ? pushedPosition.top : spring.top,   // Direct position for target, spring for others
      }}
    />
  );
};

export default DocumentBox;
