import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";
import { useTilt }   from "../hooks/useTilt";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function ProjectCard({ project, index }) {
  const revealRef = useReveal(index * 100, "left");
  const tiltRef   = useTilt(6);

  return (
    <div ref={revealRef}>
      <div
        ref={tiltRef}
        className="project-card"
        style={{ borderRadius: "8px" }}
      >
        <div>
          <div className="project-num">{project.num}</div>
          <div className="project-name">{project.name}</div>
          <p className="project-desc">{project.description}</p>
          <div className="project-tech">
            {project.tech.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
              <GithubIcon /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
              <LinkIcon /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  if (!projects) return null;
  return (
    <section id="projects">
      <SectionHeader num="03" title="Projects" />
      <div className="projects-list">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}