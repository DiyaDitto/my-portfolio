import { useReveal } from "../hooks/useReveal";

export default function SectionHeader({ num, title }) {
  const ref = useReveal();
  return (
    <div className="section-header reveal" ref={ref}>
      <span className="section-num">{num}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
    </div>
  );
}