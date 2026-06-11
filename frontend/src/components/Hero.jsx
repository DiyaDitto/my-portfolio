import { useState, useEffect } from "react";
import Particles         from "./Particles";
import Spotlight         from "./Spotlight";
import { useMagnetic }   from "../hooks/useMagnetic";

const TYPING_LINES = ["building things", "that matter."];

function useTypingEffect(lines) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIndex >= lines.length) { setDone(true); return; }
    if (charIndex <= lines[lineIndex].length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const updated = [...prev];
          updated[lineIndex] = lines[lineIndex].slice(0, charIndex);
          return updated;
        });
        setCharIndex((c) => c + 1);
      }, 55);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex, done, lines]);

  return { displayed, done };
}

export default function Hero({ hero }) {
  if (!hero) return null;
  const { name, label, description } = hero;
  const { displayed, done } = useTypingEffect(TYPING_LINES);

  const magPrimary = useMagnetic(0.25);
  const magOutline = useMagnetic(0.25);
  const magResume  = useMagnetic(0.25);

  return (
    <section id="hero" style={{ position: "relative" }}>
      <Particles />
      <Spotlight />

      <div className="hero-grid-line v" style={{ left: "33.33%", zIndex: 2 }} />
      <div className="hero-grid-line v" style={{ left: "66.66%", zIndex: 2 }} />
      <div className="hero-grid-line h" style={{ top: "40%",    zIndex: 2 }} />

      <div style={{ position: "relative", zIndex: 3 }}>
        <p className="hero-label fade-0">// {label}</p>

        <h1 className="hero-name fade-1">
          <span>{name}</span>
          {TYPING_LINES.map((line, i) => (
            <span key={i} className="dim">
              {displayed[i] || ""}
              {!done && i === (displayed.length - 1 >= 0 ? displayed.length - 1 : 0) && (
                <span className="cursor">|</span>
              )}
            </span>
          ))}
        </h1>

        <p className="hero-desc fade-2">{description}</p>

        <div className="hero-cta fade-3">
          <a ref={magPrimary} href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a ref={magOutline} href="#contact" className="btn btn-outline">
            Get in Touch
          </a>
          
        <a    ref={magResume}
            href="/resume.pdf"
            download="Diya_Ditto_Resume.pdf"
            className="btn btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </div>

        <div className="scroll-hint fade-4">scroll</div>
      </div>
    </section>
  );
}