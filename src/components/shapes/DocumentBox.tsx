import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import useDragger from "../../hooks/useDragger";
import { useTarget, useAnimating } from "../context/TargetContext";

interface DocumentBoxProps {
  id: string;
  position: { left: number; top: number; right: number; bottom: number; className: string };
}

const DocumentBox: React.FC<DocumentBoxProps> = ({ id, position }) => {
  const initialPosition = useRef(position);
  const [localPosition, setLocalPosition] = useState(initialPosition.current);
  // Use shared contexts for target ID and animating positions
  const { targetId, setTargetId } = useTarget();
  const { animatingPositions, setAnimatingPosition } = useAnimating();
  const {collisions} = useTarget();


  const [spring, api] = useSpring(() => ({
    from: { left: initialPosition.current.left, top: initialPosition.current.top },
    to: { left: animatingPositions.left, top: animatingPositions.top },
    config: {
      mass: 5,
      friction: 40,
      tension: 100,
      precision: 0.0001,
      clamp: true,
    },
  }), [initialPosition]);
  
  useEffect(() => {

    const isColliding = targetId && collisions[targetId]?.includes(id);
    // console.log(`Box ${id} is colliding with target ${targetId}:`, isColliding);

    if (id !== targetId && isColliding) {
      const animatingPosition = animatingPositions[id] || initialPosition.current;
      api.start({
        from: { left: animatingPosition.left, top: animatingPosition.top },
        to: { left: initialPosition.current.left, top: initialPosition.current.top },
        config: {
          mass: 5,
          friction: 40,
          tension: 100,
          precision: 0.0001,
          clamp: true,
        },
      });
    } 
  },[animatingPositions])

  useDragger(
    id,
    localPosition.left,
    localPosition.top,
    localPosition.right,
    localPosition.bottom,
    (id, newPosition) => {
      if (id === targetId) {
        setLocalPosition(newPosition);
        setAnimatingPosition(id, null);
        initialPosition.current = newPosition;
      }
      if (id !== targetId) {
        setAnimatingPosition(id, newPosition); // Update animating positions for non-targets
      }
    },
    setTargetId,
  );

  return (
    <animated.div
      id={id}
      className={id !== targetId && animatingPositions[id] ? animatingPositions[id].className : localPosition.className}
      style={{
        position: "absolute",
        left: id !== targetId && animatingPositions[id] ? spring.left : localPosition.left,
        top: id !== targetId && animatingPositions[id] ? spring.top : localPosition.top,
      }}
    />
  );
};

export default DocumentBox;
