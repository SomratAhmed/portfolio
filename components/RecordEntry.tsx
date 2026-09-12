import type { Entry } from "@/content/cv";

export default function RecordEntry({ entry }: { entry: Entry }) {
  return (
    <article className="rec">
      <div className="rec-when">{entry.when}</div>
      <div>
        <h3>{entry.title}</h3>
        {entry.org && <p className="org">{entry.org}</p>}
        {entry.points && (
          <ul>
            {entry.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
        {entry.meta && <p className="meta">{entry.meta}</p>}
      </div>
    </article>
  );
}
