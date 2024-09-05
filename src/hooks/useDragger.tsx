import { useEffect, useRef, useState } from "react";
import { useTarget } from "../components/context/TargetContext";


function useDragger(
  id: string,
  initialLeft: number,
  initialTop: number,
  initialRight: number,
  initialBottom: number,
  onPositionChange: (id: string, newPosition: { left: number; top: number; right: number; bottom: number; className: string }) => void,
  setTargetId: (targetId: string | null) => void,
  
) {
  // console.log(id, initialLeft, initialTop, initialRight, initialBottom);
  const isClicked = useRef<boolean>(false);
  const [targetIdQueue, setTargetIdQueue] = useState<(() => void)[]>([]);
  const { setCollisionIds } = useTarget();

  const coords = useRef<{ startX: number; startY: number; lastX: number; lastY: number }>({
    startX: 0,
    startY: 0,
    lastX: initialLeft,
    lastY: initialTop,
  });

  interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }

    // Function to detect collision between target and child
  const detectCollision = (targetRect: Rect, childRect: DOMRect, containerRect: DOMRect) => {
    const childLeft = childRect.left - containerRect.left;
    const childRight = childRect.right - containerRect.left;
    const childTop = childRect.top - containerRect.top;
    const childBottom = childRect.bottom - containerRect.top;

    return (
      targetRect.left < childRight &&
      targetRect.right > childLeft &&
      targetRect.top < childBottom &&
      targetRect.bottom > childTop
    );
  };

  

  const handleCollision  = (targetRect: Rect, containerRect: DOMRect, child: Element) => {
    
      const childRect = child.getBoundingClientRect();
      const childLeft = childRect.left - containerRect.left;
      const childRight = childRect.right - containerRect.left;
      const childTop = childRect.top - containerRect.top;
      const childBottom = childRect.bottom - containerRect.top;
      
      {
        const pushRight = targetRect.right - childLeft;
        const pushLeft = childRight - targetRect.left;
        const pushUp = childBottom - targetRect.top;
        const pushDown = targetRect.bottom - childTop;
       

        if (Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) && pushLeft < pushRight && pushUp < pushDown) {
          const newTop = childTop - pushLeft;
          const maxTop = targetRect.top - child.clientHeight;
          const adjustedTop = Math.max(newTop, maxTop);
          onPositionChange(child.id, {
            right: targetRect.left,
            left: targetRect.left - child.clientWidth,
            top: adjustedTop,
            bottom: adjustedTop + child.clientHeight,
            className: child.className
          });
        } else if (
          Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) &&
          pushLeft < pushRight &&
          pushUp > pushDown
        ) {
          const newTop = childTop + pushLeft;
          const maxTop = targetRect.bottom - child.clientHeight;
          const adjustedTop = Math.max(newTop, maxTop);
          onPositionChange(child.id, {
            right: targetRect.left,
            left: targetRect.left - child.clientWidth,
            top: adjustedTop,
            bottom: adjustedTop + child.clientHeight,
            className: child.className
          });
        }

        if (Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) && pushLeft > pushRight && pushUp < pushDown) {
          const newTop = childTop - pushRight;
          const maxTop = targetRect.top - child.clientHeight;
          const adjustedTop = Math.max(newTop, maxTop);
          onPositionChange(child.id, {
            right: targetRect.right + child.clientWidth,
            left: targetRect.right,
            top: adjustedTop,
            bottom: adjustedTop + child.clientHeight,
            className: child.className
          });
        } else if (
          Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) &&
          pushLeft > pushRight &&
          pushUp > pushDown
        ) {
          const newTop = childTop + pushRight;
          const maxTop = targetRect.bottom - child.clientHeight;
          const adjustedTop = Math.max(newTop, maxTop);
          onPositionChange(child.id, {
            right: targetRect.right + child.clientWidth,
            left: targetRect.right,
            top: adjustedTop,
            bottom: adjustedTop + child.clientHeight,
            className: child.className
          });
        }

        if (Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) && pushLeft < pushRight && pushUp < pushDown) {
          const newLeft = childLeft - pushUp;
          const maxLeft = targetRect.left - child.clientWidth;
          const adjustedLeft = Math.max(newLeft, maxLeft);
          onPositionChange(child.id, {
            right: adjustedLeft + child.clientWidth,
            left: adjustedLeft,
            top: targetRect.top - child.clientHeight,
            bottom: targetRect.top,
            className: child.className
          });
        } else if (
          Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) &&
          pushLeft > pushRight &&
          pushUp < pushDown
        ) {
          const newLeft = childLeft + pushUp;
          const maxLeft = targetRect.right - child.clientWidth;
          const adjustedLeft = Math.max(newLeft, maxLeft);
          onPositionChange(child.id, {
            right: adjustedLeft + child.clientWidth,
            left: adjustedLeft,
            top: targetRect.top - child.clientHeight,
            bottom: targetRect.top,
            className: child.className
          });
        }

        if (Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) && pushLeft < pushRight && pushUp > pushDown) {
          const newLeft = childLeft - pushDown;
          const maxLeft = targetRect.left - child.clientWidth;
          const adjustedLeft = Math.max(newLeft, maxLeft);
          onPositionChange(child.id, {
            right: adjustedLeft - child.clientWidth,
            left: adjustedLeft,
            top: targetRect.bottom,
            bottom: targetRect.bottom + child.clientHeight,
            className: child.className
          });
        } else if (
          Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) &&
          pushLeft > pushRight &&
          pushUp > pushDown
        ) {
          const newLeft = childLeft - pushDown;
          const maxLeft = targetRect.right - child.clientWidth;
          const adjustedLeft = Math.max(newLeft, maxLeft);
          onPositionChange(child.id, {
            right: adjustedLeft - child.clientWidth,
            left: adjustedLeft,
            top: targetRect.bottom,
            bottom: targetRect.bottom + child.clientHeight,
            className: child.className
          });
        }
      }  
  };
  

  const handleCollisionWithChildren = (targetRect: Rect, containerRect: DOMRect, otherChildren: Element[]) => {
    const collisionIds: string[] = [];

    for (const child of otherChildren) {
      const childRect = child.getBoundingClientRect();

      // Use detectCollision to check for collision
      if (detectCollision(targetRect, childRect, containerRect)) {
        collisionIds.push(child.id);
        handleCollision(targetRect, containerRect, child);
      } 
    }
    setCollisionIds(id, collisionIds); // Update context with collision IDs
  };

  const processQueue = () => {
    if (targetIdQueue.length > 0) {
      const [first, ...rest] = targetIdQueue;
      first(); // Execute the first function in the queue
      setTargetIdQueue(rest); // Remove the processed function
    }
  };
  

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with the given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const otherChildren = Array.from(container.children).filter((child) => child !== target);

    otherChildren.forEach((child) => {
      if (!child.style.left) {
        child.style.left = `${child.offsetLeft}px`;
      }
      if (!child.style.top) {
        child.style.top = `${child.offsetTop}px`;
      }
    });
    

    const onPointerDown = (e: PointerEvent) => {
      isClicked.current = true;
      setTargetId(target.id);
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      target.style.cursor = "grabbing";

      target.setPointerCapture(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      target.style.cursor = "grab";
      target.releasePointerCapture(e.pointerId);

    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isClicked.current) return;

      let nextX = e.clientX - coords.current.startX + coords.current.lastX;
      let nextY = e.clientY - coords.current.startY + coords.current.lastY;
      // console.log(nextX, nextY);

      if (nextX < 0) nextX = 0;
      if (nextY < 0) nextY = 0;
      if (nextX > container.offsetWidth - target.clientWidth)
        nextX = container.offsetWidth - target.clientWidth;
      if (nextY > container.offsetHeight - target.clientHeight)
        nextY = container.offsetHeight - target.clientHeight;

      const containerRect = container.getBoundingClientRect();

      const targetRect = {
        left: nextX,
        right: nextX + target.clientWidth,
        top: nextY,
        bottom: nextY + target.clientHeight,
      };

      setTargetIdQueue((prevQueue) => [
        ...prevQueue, 
        () => handleCollisionWithChildren(targetRect, containerRect, otherChildren) // Add function to queue
      ]);
      onPositionChange(id, { left: nextX, top: nextY, right: nextX + target.clientWidth, bottom: nextY + target.clientHeight, className: target.className });
    };

    target.addEventListener("pointerdown", onPointerDown);
    target.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerUp);

    return () => {
      target.removeEventListener("pointerdown", onPointerDown);
      target.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerUp);
    };
  }, [id, initialLeft, initialTop, initialRight, initialBottom, onPositionChange, setTargetId]);

  useEffect(() => {
    // Continually process the queue whenever it changes
    processQueue();
  }, [targetIdQueue]); // Runs whenever targetIdQueue changes

  return { onPositionChange };
}

export default useDragger;
