export default function Section({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <div className="sec-head">
        <h2>{title}</h2>
        {count && <span className="count">{count}</span>}
      </div>
      {children}
    </section>
  );
}
