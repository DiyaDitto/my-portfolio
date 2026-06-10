import { useState, useEffect } from "react";

export default function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLeaving(true);
            setTimeout(onDone, 600);
          }, 200);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Logo */}
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: "1.1rem",
        color: "var(--accent)",
        letterSpacing: "0.2em",
      }}>
        diya.ditto
      </div>

      {/* Progress track */}
      <div style={{
        width: "200px",
        height: "1px",
        background: "var(--border)",
        borderRadius: "1px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--accent)",
          boxShadow: "0 0 8px var(--accent)",
          transition: "width 0.1s ease",
          borderRadius: "1px",
        }} />
      </div>

      {/* Percentage */}
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: "0.7rem",
        color: "var(--muted)",
        letterSpacing: "0.15em",
      }}>
        {Math.min(Math.round(progress), 100)}%
      </div>
    </div>
  );
}