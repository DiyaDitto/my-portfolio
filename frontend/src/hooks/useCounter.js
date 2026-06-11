import { useEffect, useRef, useState } from "react";

export function useCounter(target, trigger = true, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    // Extract number from strings like "8+", "4+"
    const num = parseInt(target);
    if (isNaN(num)) return;

    const suffix = target.replace(/[0-9]/g, "");
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * num);
      setCount(current + suffix);

      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };

    requestAnimationFrame(animate);
  }, [trigger, target, duration]);

  return count || "0";
}