import { useRef, useEffect } from "react";

export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.display = "inline-block";

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      el.style.transform  = "translate(0, 0)";
    };

    const onEnter = () => {
      el.style.transition = "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
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