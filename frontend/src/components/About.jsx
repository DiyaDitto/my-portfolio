import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

export default function About({ about }) {
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  if (!about) return null;

  return (
    <section id="about">
      <SectionHeader num="01" title="About" />
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr 1fr",
        gap: "3.5rem",
        alignItems: "start",
      }}
      className="about-grid-full"
      >
        {/* Photo */}
        <div ref={r1} className="reveal" style={{ width: "180px" }}>
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
            {/* Accent corner */}
            <div style={{
              position: "absolute",
              bottom: 0, right: 0,
              width: "40px", height: "40px",
              background: "var(--accent)",
              opacity: 0.15,
            }} />
          </div>
          {/* Name tag below photo */}
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
        <div className="about-text reveal" ref={r2}>
          {about.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>

        {/* Stats */}
        <div className="about-stats reveal" ref={r3}>
          {about.stats.map((s) => (
            <div className="stat-box" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}