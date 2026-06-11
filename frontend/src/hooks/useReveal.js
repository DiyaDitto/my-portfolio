import { useEffect, useRef } from "react";

// direction: 'up' | 'down' | 'left' | 'right'
export function useReveal(delay = 0, direction = "up") {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getTransform = () => {
      switch (direction) {
        case "left":  return "translateX(-40px)";
        case "right": return "translateX(40px)";
        case "down":  return "translateY(-24px)";
        default:      return "translateY(24px)";
      }
    };

    el.style.opacity = "0";
    el.style.transform = getTransform();
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, direction]);

  return ref;
}