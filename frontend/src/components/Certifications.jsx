import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

function CertCard({ cert, index }) {
  const ref = useReveal(index * 100);
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "1.5rem 1.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "1rem",
        transition: "background 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1c1f24";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--surface)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div>
        <div style={{
          fontSize: "0.95rem",
          fontWeight: 600,
          marginBottom: "0.3rem",
          color: "var(--text)",
        }}>
          {cert.name}
        </div>
        <div style={{
          fontFamily: "var(--mono)",
          fontSize: "0.75rem",
          color: "var(--accent2)",
          marginBottom: "0.25rem",
        }}>
          {cert.issuer}
        </div>
        <div style={{
          fontFamily: "var(--mono)",
          fontSize: "0.7rem",
          color: "var(--muted)",
        }}>
          {cert.date}
        </div>
      </div>
 <a
      
        href={cert.link}
        target="_blank"
        rel="noreferrer"
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.7rem",
          color: "var(--muted)",
          textDecoration: "none",
          border: "1px solid var(--border)",
          borderRadius: "3px",
          padding: "0.35rem 0.75rem",
          whiteSpace: "nowrap",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.color = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--muted)";
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15,3 21,3 21,9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        View
      </a>
    </div>
  );
}

export default function Certifications({ certifications }) {
  const ref = useReveal();
  if (!certifications?.length) return null;

  return (
    <section id="certifications" style={{ borderTop: "1px solid var(--border)", padding: "6rem 4rem" }}>
      <SectionHeader num="05" title="Certifications" />
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {certifications.map((c, i) => (
          <CertCard key={i} cert={c} index={i} />
        ))}
      </div>
    </section>
  );
}