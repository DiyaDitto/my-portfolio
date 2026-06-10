import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const rafRef   = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const animate = () => {
      // Ring follows with lag
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.style.opacity   = "1";
      ringEl.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity   = "0";
      ringEl.style.opacity = "0";
    };

    // Grow ring on clickable elements
    const onHoverIn = () => {
      ringEl.style.width   = "44px";
      ringEl.style.height  = "44px";
      ringEl.style.borderColor = "var(--accent)";
      ringEl.style.marginLeft  = "-22px";
      ringEl.style.marginTop   = "-22px";
    };
    const onHoverOut = () => {
      ringEl.style.width   = "32px";
      ringEl.style.height  = "32px";
      ringEl.style.borderColor = "rgba(110,231,183,0.5)";
      ringEl.style.marginLeft  = "-16px";
      ringEl.style.marginTop   = "-16px";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    const clickables = document.querySelectorAll("a, button, .tag, .stat-box, .project-card");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Small instant dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "8px", height: "8px",
          background: "var(--accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "32px", height: "32px",
          border: "1.5px solid rgba(110,231,183,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transition: "opacity 0.3s, width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}