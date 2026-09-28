import type { PointerEvent } from "react";
import { useReducedMotion, useSpring } from "motion/react";
import { SOFT_SPRING } from "./constants";

// Efeitos de ponteiro só fazem sentido com mouse; no toque ficam desligados
const isMouse = (e: PointerEvent) => e.pointerType === "mouse";

export function useTilt(maxDeg = 8) {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, SOFT_SPRING);
  const rotateY = useSpring(0, SOFT_SPRING);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!isMouse(e) || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxDeg * 2);
    rotateX.set(-py * maxDeg * 2);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    style: { rotateX, rotateY, transformPerspective: 600 },
    handlers: { onPointerMove, onPointerLeave },
  };
}

export function useSpotlight(size = 320) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 380, damping: 40 });
  const y = useSpring(0, { stiffness: 380, damping: 40 });
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!isMouse(e) || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - size / 2);
    y.set(e.clientY - rect.top - size / 2);
    opacity.set(1);
  };

  const onPointerLeave = () => opacity.set(0);

  return { layer: { x, y, opacity, size }, handlers: { onPointerMove, onPointerLeave } };
}
