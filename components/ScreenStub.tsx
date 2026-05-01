import Link from "next/link";

interface ScreenStubProps {
  eyebrow: string;
  headline: React.ReactNode;
  subtitle: string;
  back?: { href: string; label: string };
  next?: { href: string; label: string };
  phase: string;
}

export default function ScreenStub({ eyebrow, headline, subtitle, back, next, phase }: ScreenStubProps) {
  return (
    <main className="screen" style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="eyebrow" style={{ color: "var(--sienna)" }}>
            {eyebrow}
          </span>
          <span className="rule" style={{ flex: 1, maxWidth: 120 }} />
          <span className="eyebrow">{phase}</span>
        </div>

        <h1 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)" }}>
          {headline}
        </h1>

        <p className="serif" style={{ fontSize: 18, lineHeight: 1.5, color: "var(--ink-soft)", maxWidth: 480 }}>
          {subtitle}
        </p>

        <div className="rule" style={{ width: 240, marginTop: 16 }} />

        <p className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {phase} · Coming next
        </p>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48 }}>
        {back ? (
          <Link href={back.href} className="btn btn-ghost">
            ← {back.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="btn btn-primary">
            {next.label} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
