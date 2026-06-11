import { useReveal }   from "../hooks/useReveal";
import { useScramble } from "../hooks/useScramble";
import { useInView }   from "../hooks/useInView";

export default function SectionHeader({ num, title }) {
  const ref = useReveal();
  const { ref: inRef, inView } = useInView(0.5);
  const scrambled = useScramble(title, inView);

  return (
    <div className="section-header" ref={ref}>
      <span className="section-num" ref={inRef}>{num}</span>
      <h2 className="section-title">{scrambled}</h2>
      <div className="section-line" />
    </div>
  );
}