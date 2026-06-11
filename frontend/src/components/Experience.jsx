import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

function TimelineItem({ exp, index, isLast }) {
// In TimelineItem:
const ref = useReveal(index * 120, "left");
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "0 2rem",
        position: "relative",
      }}
    >
      {/* Left — dot and line */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}>
        {/* Dot */}
        <div style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "var(--accent)",
          border: "2px solid var(--bg)",
          boxShadow: "0 0 8px rgba(110,231,183,0.5)",
          flexShrink: 0,
          marginTop: "4px",
          zIndex: 1,
        }} />
        {/* Line */}
        {!isLast && (
          <div style={{
            width: "1px",
            flex: 1,
            background: "var(--border)",
            minHeight: "60px",
          }} />
        )}
      </div>

      {/* Right — content */}
      <div style={{ paddingBottom: isLast ? 0 : "2.5rem" }}>
        <div style={{
          fontFamily: "var(--mono)",
          fontSize: "0.7rem",
          color: "var(--accent)",
          letterSpacing: "0.1em",
          marginBottom: "0.4rem",
        }}>
          {exp.duration}
        </div>
        <div style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: "0.2rem",
        }}>
          {exp.role}
        </div>
        <div style={{
          fontSize: "0.85rem",
          color: "var(--accent2)",
          marginBottom: "0.6rem",
          fontStyle: "italic",
        }}>
          {exp.company}
        </div>
        <p style={{
          fontSize: "0.88rem",
          color: "var(--muted)",
          lineHeight: 1.75,
          marginBottom: "0.75rem",
          maxWidth: "560px",
        }}>
          {exp.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {exp.tech.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience({ experience }) {
  if (!experience?.length) return null;
  return (
    <section id="experience" style={{
      borderTop: "1px solid var(--border)",
      padding: "6rem 4rem",
    }}>
      <SectionHeader num="05" title="Experience" />
      <div style={{ maxWidth: "700px" }}>
        {experience.map((exp, i) => (
          <TimelineItem
            key={i}
            exp={exp}
            index={i}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>
    </section>
  );
}