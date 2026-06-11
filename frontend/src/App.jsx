import { useState } from "react";
import { usePortfolio } from "./hooks/usePortfolio";
import PageLoader    from "./components/PageLoader";
import ProgressBar   from "./components/ProgressBar";
import CustomCursor  from "./components/CustomCursor";
import NavBar        from "./components/NavBar";
import Hero          from "./components/Hero";
import About         from "./components/About";
import Skills        from "./components/Skills";
import Projects      from "./components/Projects";
import Education     from "./components/Education";
import Contact       from "./components/Contact";
import Footer        from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import GithubGraph from "./components/GithubGraph";
import { useLenis } from "./hooks/useLenis";
function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "1.5rem", color: "var(--muted)",
    }}>
      <div className="spinner" />
      <p style={{ fontFamily: "var(--mono)", fontSize: "0.78rem", letterSpacing: "0.1em" }}>
        loading portfolio…
      </p>
    </div>
  );
}

function ErrorScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "1rem", color: "var(--muted)",
      padding: "2rem", textAlign: "center",
    }}>
      <p style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "#f87171" }}>
        ⚠ Could not connect to the backend.
      </p>
      <p style={{ fontFamily: "var(--mono)", fontSize: "0.72rem" }}>
        Make sure the Express server is running on port 5000.
      </p>
      <code style={{
        fontFamily: "var(--mono)", fontSize: "0.72rem",
        background: "var(--surface)", padding: "0.5rem 1rem",
        border: "1px solid var(--border)", borderRadius: "4px",
        color: "var(--accent)",
      }}>
        cd backend && node server.js
      </code>
    </div>
  );
}

export default function App() {
  const { data, loading, error } = usePortfolio();
  const [loaderDone, setLoaderDone] = useState(false);
  useLenis();
  if (loading) return <LoadingScreen />;
  if (error)   return <ErrorScreen />;

  return (
    <>
      {!loaderDone && <PageLoader onDone={() => setLoaderDone(true)} />}
      <ProgressBar />
      <CustomCursor />
      <NavBar    name={data.hero.name} />
      <Hero      hero={data.hero} />
      <About     about={data.about} />
      <Skills    skills={data.skills} />
      <Projects  projects={data.projects} />
      <Education education={data.education} />
       <Experience     experience={data.experience} />
      <Certifications certifications={data.certifications} />
      <GithubGraph    username="DiyaDitto" />
      <Contact       contact={data.contact} />
      <Footer    name={data.hero.name} />
      <BackToTop />
    </>
  );
}