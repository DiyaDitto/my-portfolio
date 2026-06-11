import SectionHeader     from "./SectionHeader";
import { useReveal }     from "../hooks/useReveal";
import { useCounter }    from "../hooks/useCounter";
import { useInView }     from "../hooks/useInView";

function StatBox({ num, label }) {
  const { ref, inView } = useInView(0.5);

  const isInfinity = num === "∞";

  const count = isInfinity
    ? "∞"
    : useCounter(String(num), inView);

  return (
    <div className="stat-box" ref={ref}>
      <div
        className="stat-num"
        style={{
          fontSize: isInfinity
            ? "2.6rem"
            : undefined,

          fontWeight: isInfinity
            ? 700
            : undefined,
        }}
      >
        {count}
      </div>

      <div className="stat-label">
        {label}
      </div>
    </div>
  );
}

export default function About({ about }) {
  const r1 = useReveal(0,   "left");
  const r2 = useReveal(100, "up");
  const r3 = useReveal(200, "right");
  if (!about) return null;

  return (
    <section id="about">
      <SectionHeader num="01" title="About" />
      <div
        className="about-grid-full"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr 1fr",
          gap: "3.5rem",
          alignItems: "start",
        }}
      >
        {/* Photo */}
        <div ref={r1} style={{ width: "180px" }}>
          <div style={{
            width: "180px",
            height: "220px",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            overflow: "hidden",
            position: "relative",
          }}>
            <img
              src="/profile.png"
              alt="Diya Ditto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(20%)",
                transition: "filter 0.3s",
              }}
              onMouseEnter={(e) => e.target.style.filter = "grayscale(0%)"}
              onMouseLeave={(e) => e.target.style.filter = "grayscale(20%)"}
            />
            <div style={{
              position: "absolute",
              bottom: 0, right: 0,
              width: "40px", height: "40px",
              background: "var(--accent)",
              opacity: 0.15,
            }} />
          </div>
          <div style={{
            marginTop: "0.75rem",
            fontFamily: "var(--mono)",
            fontSize: "0.7rem",
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textAlign: "center",
          }}>
            diya.ditto
          </div>
        </div>

        {/* Text */}
        <div className="about-text" ref={r2}>
          {about.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>

        {/* Stats with counter */}
        <div className="about-stats" ref={r3}>
          {about.stats.map((s) => (
            <StatBox key={s.label} num={s.num} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}