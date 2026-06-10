import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

export default function Skills({ skills }) {
  const ref = useReveal();
  if (!skills) return null;

  return (
    <section id="skills">
      <SectionHeader num="02" title="Skills" />
      <div className="skills-grid reveal" ref={ref}>
        {skills.map((group, i) => (
          <div className="skill-group" key={i}>
            <div className="skill-group-label">{group.label}</div>
            <div className="skill-tags">
              {group.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}