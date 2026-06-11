import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

const links = ["about", "skills", "projects", "education", "contact"];

export default function NavBar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "";
      links.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <span className="nav-logo">
          {name?.toLowerCase().replace(" ", ".") ?? "portfolio"}
        </span>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              
            <a    href={`#${l}`}
                style={{
                  color: active === l ? "var(--accent)" : "",
                  transition: "color 0.2s",
                }}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title="Toggle theme"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              color: "#6ee7b7",
              cursor: "pointer",
              padding: "0.4rem 0.6rem",
              fontSize: "0.9rem",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            {theme === "dark" ? "☀︎" : "☾"}
          </button>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span style={{ background: menuOpen ? "transparent" : "var(--text)" }} />
            <span style={{
              background: "var(--text)",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              background: "var(--text)",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="mobile-menu"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <ul>
          {links.map((l) => (
            <li key={l}>
              
            <a    href={`#${l}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: active === l ? "var(--accent)" : "var(--text)",
                }}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}