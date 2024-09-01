import { useEffect, useRef, useState } from "react";

function useDragger(
  id: string,
  initialLeft: number,
  initialTop: number,
  onPositionChange: (id: string, newPosition: { left: number; top: number }) => void,
  setTargetId: (targetId: string | null) => void
) {
  const isClicked = useRef<boolean>(false);
  const targettIdRef = useRef<string | null>(null);
  
  const coords = useRef<{ startX: number; startY: number; lastX: number; lastY: number }>({
    startX: 0,
    startY: 0,
    lastX: initialLeft,
    lastY: initialTop,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with the given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const otherChildren = Array.from(container.children).filter(
      (child) => child !== target
    );

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
      targettIdRef.current = target.id;
      setTargetId(targettIdRef.current);
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      target.style.cursor = "grabbing";

      target.setPointerCapture(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      isClicked.current = false;
      targettIdRef.current = null;
      setTargetId(null);
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      target.style.cursor = "grab";
      target.releasePointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isClicked.current) return;

      let nextX = e.clientX - coords.current.startX + coords.current.lastX;
      let nextY = e.clientY - coords.current.startY + coords.current.lastY;

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
      let isOverlap = false;

      console.log(targetRect)
      for (let child of otherChildren) {
        const childRect = child.getBoundingClientRect();
        const childLeft = childRect.left - containerRect.left;
        const childRight = childRect.right - containerRect.left;
        const childTop = childRect.top - containerRect.top;
        const childBottom = childRect.bottom - containerRect.top;

        // const leftToRight = targetRect.left - childRight < 0;
        // const topToBottom = targetRect.top - childBottom < 0;
        // const rightToLeft = childLeft - targetRect.right < 0;
        // const bottomToTop = childTop - targetRect.bottom < 0;

        // const overlap = leftToRight && topToBottom && rightToLeft && bottomToTop;
        

        // console.log("target bottom: ", targetRect.bottom , "child top: ", childTop, "target bottom - child top: ", targetRect.bottom - childTop, "target height: ", target.clientHeight);

        // console.log(targetRect)
        // if (overlap) {
        //   isOverlap = true;
          // let newChildLeft = childLeft;
          // let newChildTop = childTop;
          

          // if (targetRect.right - childLeft < target.clientWidth) {
          //   // newChildLeft = targetRect.right;
          //   newChildLeft = targetRect.right
          //   console.log('target', targetRect.right);
          //   console.log('left', newChildLeft);
          // } 

          // if (targetRect.bottom - childTop < target.clientHeight ) {
          //   // newChildTop = targetRect.bottom;
          //   console.log('top');
          // } 
          
          // if (childRight - targetRect.left < target.clientWidth) {
          //   newChildLeft = targetRect.left - child.clientWidth;
          //   console.log('right');
          // }
          
          // if (childBottom - targetRect.top < target.clientHeight) {
          //   newChildTop = targetRect.top - child.clientHeight;
          //   console.log('bottom');
          // }
          
          // onPositionChange(child.id, { left: newChildLeft, top: newChildTop });
        // } else {
        //   isOverlap = false;
        // }
      }

      // setPosition({ left: nextX, top: nextY });
      onPositionChange(id, { left: nextX, top: nextY });
    };

    target.addEventListener("pointerdown", onPointerDown);
    target.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerUp);

    const cleanup = () => {
      target.removeEventListener("pointerdown", onPointerDown);
      target.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerUp);
    };

    return cleanup;
  }, [id, onPositionChange]);

  return { onPositionChange };
}

export default useDragger;
