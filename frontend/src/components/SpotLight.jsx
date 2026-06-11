import { useEffect, useRef } from "react";

export default function Spotlight() {
  const spotRef = useRef(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `
        radial-gradient(
          600px circle at ${x}px ${y}px,
          rgba(110, 231, 183, 0.07),
          transparent 40%
        )
      `;
    };

    const hero = document.getElementById("hero");
    if (hero) hero.addEventListener("mousemove", onMove);
    return () => {
      if (hero) hero.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        transition: "background 0.1s ease",
      }}
    />
  );
}