import ThemeToggle from "./ThemeToggle";

const LINKS = [
  ["#focus", "Focus"],
  ["#research", "Research"],
  ["#experience", "Experience"],
  ["#skills", "Skills"],
  ["#education", "Education"],
  ["#contact", "Contact"],
] as const;

export default function Masthead({ name }: { name: string }) {
  return (
    <header className="mast">
      <div className="wrap mast-in">
        <div className="sig">
          {name}
          <em>.</em>
        </div>
        <div className="mast-right">
          <nav className="nav">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
