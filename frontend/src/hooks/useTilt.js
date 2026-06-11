import { useRef, useEffect } from "react";

export function useTilt(strength = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "transform 0.1s ease, box-shadow 0.3s ease";
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -strength;
      const rotateY = ((x - cx) / cx) *  strength;

      el.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
      el.style.boxShadow = `
        ${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(0,0,0,0.4),
        0 0 20px rgba(110,231,183,0.08)
      `;
    };

    const onLeave = () => {
      el.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
      el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
      el.style.boxShadow = "none";
    };

    const onEnter = () => {
      el.style.transition = "transform 0.1s ease, box-shadow 0.1s ease";
    };

    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);

    return () => {
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [strength]);

  return ref;
}