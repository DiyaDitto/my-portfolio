import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

export default function Education({ education }) {
  const ref = useReveal();
  if (!education) return null;
  const { degree, school, cgpa, relevant, years } = education;

  return (
    <section id="education">
      <SectionHeader num="04" title="Education" />
      <div className="edu-card reveal" ref={ref}>
        <div>
          <div className="edu-degree">{degree}</div>
          <div className="edu-school">{school}</div>
          <div className="edu-details">
            CGPA {cgpa} &nbsp;·&nbsp; Relevant: {relevant}
          </div>
        </div>
        <div className="edu-year">{years}</div>
      </div>
    </section>
  );
}