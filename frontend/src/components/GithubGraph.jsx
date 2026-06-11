import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

export default function GitHubGraph({ username }) {
  const ref = useReveal(0, "up");

  if (!username) return null;

  return (
    <section
      id="github"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "4rem 2rem",
      }}
    >
      <SectionHeader num="07" title="GitHub Activity" />

      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Contribution Graph */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--surface)",
            padding: ".8rem",
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".55rem",
              color: "var(--muted)",
              letterSpacing: ".08em",
              marginBottom: ".7rem",
            }}
          >
            CONTRIBUTION GRAPH — {username}
          </div>

          {/* Smaller graph */}
          <img
            src={`https://ghchart.rshah.org/6ee7b7/${username}`}
            alt="GitHub contribution graph"
            style={{
              width: "100%",
              maxWidth: "750px",
              display: "block",
              margin: "0 auto",
              borderRadius: "6px",
              filter: "brightness(.95)",
            }}
          />
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: ".8rem",
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&bg_color=15171a&title_color=6ee7b7&icon_color=6ee7b7&text_color=e8eaf0&border_color=22252b`}
              alt="GitHub stats"
              style={{
                width: "100%",
                maxHeight: "220px",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&bg_color=15171a&title_color=6ee7b7&text_color=e8eaf0&border_color=22252b`}
              alt="Top languages"
              style={{
                width: "100%",
                maxHeight: "220px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Button */}
        <div
          style={{
            display: "flex",
           alignSelf: "flex-start"
          }}
        >
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
              fontSize: ".78rem",
              padding: ".55rem .9rem",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>

            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}