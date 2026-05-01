import Link from "next/link";

export default function Home() {
  return (
    <main className="screen" style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        <span className="eyebrow">VOL. I · № 042</span>

        <h1
          className="display"
          style={{
            fontSize: "clamp(54px, 7vw, 96px)",
          }}
        >
          A workshop in your{" "}
          <em style={{ color: "var(--sienna)", fontStyle: "italic" }}>pocket.</em>
        </h1>

        <p
          className="serif"
          style={{
            fontSize: 20,
            lineHeight: 1.5,
            color: "var(--ink-soft)",
            maxWidth: 520,
          }}
        >
          Describe a project. Pin a few references. Set the bones. Plankraft drafts a complete build plan —
          cut list, exploded view, build sequence, lumber yield, bill of materials.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
          <Link href="/brief" className="btn btn-primary">
            Begin →
          </Link>
          <Link href="/plan" className="btn btn-ghost">
            See an example
          </Link>
        </div>

        <div className="rule" style={{ width: 240, marginTop: 32 }} />

        <p className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Drafted by AI · Built by you
        </p>
      </div>
    </main>
  );
}
