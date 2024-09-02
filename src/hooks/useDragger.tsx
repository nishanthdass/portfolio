import { useEffect, useRef } from "react";

function useDragger(
  id: string,
  initialLeft: number,
  initialTop: number,
  initialRight: number,
  initialBottom: number,
  onPositionChange: (id: string, newPosition: { left: number; top: number; right: number; bottom: number }) => void,
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

          for (const child of otherChildren) {
            const childRect = child.getBoundingClientRect();
            const childLeft = childRect.left - containerRect.left;
            const childRight = childRect.right - containerRect.left;
            const childTop = childRect.top - containerRect.top;
            const childBottom = childRect.bottom - containerRect.top;
            if (
              targetRect.left < childRight &&
              targetRect.right > childLeft &&
              targetRect.top < childBottom &&
              targetRect.bottom > childTop)
              {
                const pushRight = (targetRect.right - childLeft)
                const pushLeft = childRight - targetRect.left
                const pushUp = childBottom - targetRect.top
                const pushDown = (targetRect.bottom - childTop)


                if (Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) && pushLeft < pushRight && pushUp < pushDown) {
                  const newTop = childTop - pushLeft;
                  const maxTop = targetRect.top - child.clientHeight;
                  const adjustedTop = Math.max(newTop, maxTop); 
                  onPositionChange(child.id, { 
                    right: targetRect.left, 
                    left: targetRect.left - child.clientWidth , 
                    top: adjustedTop, // Smoothly move upward
                    bottom: adjustedTop + child.clientHeight,});
                    
                } else if (Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) && pushLeft < pushRight && pushUp > pushDown) {
                  const newTop = childTop + pushLeft; // Move downward in small steps
                  const maxTop = targetRect.bottom - child.clientHeight;
                  const adjustedTop = Math.max(newTop, maxTop); // Prevent abrupt jump
                  onPositionChange(child.id, {
                    right: targetRect.left,
                    left: targetRect.left - child.clientWidth,
                    top: adjustedTop, // Smoothly move upward
                    bottom: adjustedTop + child.clientHeight,});
                }



                if (Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) && pushLeft > pushRight && pushUp < pushDown) {
                  const newTop = childTop - pushRight;
                  const maxTop = targetRect.top - child.clientHeight;
                  const adjustedTop = Math.max(newTop, maxTop); 
                  onPositionChange(child.id, { 
                    right: targetRect.right + child.clientWidth, 
                    left: targetRect.right, 
                    top: adjustedTop, // Smoothly move upward
                    bottom: adjustedTop + child.clientHeight,});
                    
                } else if (Math.min(pushRight, pushLeft) < Math.min(pushUp, pushDown) && pushLeft > pushRight && pushUp > pushDown) {
                  const newTop = childTop + pushRight; // Move downward in small steps
                  const maxTop = targetRect.bottom - child.clientHeight;
                  const adjustedTop = Math.max(newTop, maxTop); // Prevent abrupt jump
                  onPositionChange(child.id, {
                    right: targetRect.right + child.clientWidth,
                    left: targetRect.right,
                    top: adjustedTop, // Smoothly move upward
                    bottom: adjustedTop + child.clientHeight,});
                }

                if (Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) && pushLeft < pushRight && pushUp < pushDown) {
                  const newLeft = childLeft - pushUp;
                  const maxLeft = targetRect.left - child.clientWidth;
                  const adjustedLeft = Math.max(newLeft, maxLeft); 
                  onPositionChange(child.id, { 
                    right: adjustedLeft + child.clientWidth, 
                    left: adjustedLeft, 
                    top: targetRect.top - child.clientHeight, // Smoothly move upward
                    bottom: targetRect.top});
                    
                } else if (Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) && pushLeft > pushRight && pushUp < pushDown) {
                  const newLeft = childLeft + pushUp;
                  const maxLeft = targetRect.right - child.clientWidth;
                  const adjustedLeft = Math.max(newLeft, maxLeft); 
                  onPositionChange(child.id, { 
                    right: adjustedLeft + child.clientWidth, 
                    left: adjustedLeft, 
                    top: targetRect.top - child.clientHeight, // Smoothly move upward
                    bottom: targetRect.top});
                }

                if (Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) && pushLeft < pushRight && pushUp > pushDown) {
                  const newLeft = childLeft - pushDown;
                  const maxLeft = targetRect.left - child.clientWidth;
                  const adjustedLeft = Math.max(newLeft, maxLeft); 
                  onPositionChange(child.id, { 
                    right: adjustedLeft - child.clientWidth, 
                    left: adjustedLeft, 
                    top: targetRect.bottom , // Smoothly move upward
                    bottom: targetRect.bottom + child.clientHeight});
                    
                } 
                else if (Math.min(pushRight, pushLeft) > Math.min(pushUp, pushDown) && pushLeft > pushRight && pushUp > pushDown) {
                  const newLeft = childLeft - pushDown;
                  const maxLeft = targetRect.right - child.clientWidth;
                  const adjustedLeft = Math.max(newLeft, maxLeft); 
                  onPositionChange(child.id, { 
                    right: adjustedLeft - child.clientWidth, 
                    left: adjustedLeft, 
                    top: targetRect.bottom , // Smoothly move upward
                    bottom: targetRect.bottom + child.clientHeight});
                }
              }
          }

          onPositionChange(id, { left: nextX, top: nextY, right: nextX + target.clientWidth, bottom: nextY + target.clientHeight })
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
  }, [id, initialLeft, initialTop, initialRight, initialBottom, onPositionChange, setTargetId]);
  return { onPositionChange };
}

export default useDragger;
