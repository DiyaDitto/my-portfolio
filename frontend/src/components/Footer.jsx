export default function Footer({ name }) {
  return (
    <footer>
      <span className="footer-copy">
        © {new Date().getFullYear()} {name}. Designed & built from scratch.
      </span>
      <div className="footer-status">
        <div className="dot" />
        Open to opportunities
      </div>
    </footer>
  );
}