"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const STEPS = [
  { path: "/brief", label: "Describe" },
  { path: "/inspiration", label: "Inspiration" },
  { path: "/measurements", label: "Measurements" },
  { path: "/drafting", label: "Generate" },
  { path: "/plan", label: "Plan" },
] as const;

function activeIndex(pathname: string): number {
  if (pathname === "/") return 0;
  const idx = STEPS.findIndex((s) => pathname === s.path || pathname.startsWith(`${s.path}/`));
  return idx === -1 ? 0 : idx;
}

export default function Chrome() {
  const pathname = usePathname();
  const stepIdx = activeIndex(pathname);

  return (
    <header className="chrome">
      <Link href="/" className="chrome-mark" style={{ textDecoration: "none", color: "inherit" }}>
        <span className="dot" />
        Plankraft
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--ink-faint)",
            letterSpacing: "0.1em",
            marginLeft: 8,
            fontWeight: 400,
          }}
        >
          Vol. I · № 042
        </span>
      </Link>

      <nav className="steps" aria-label="Workflow steps">
        {STEPS.map((s, i) => (
          <Fragment key={s.path}>
            <Link
              href={s.path}
              className={`step ${i === stepIdx ? "active" : ""} ${i < stepIdx ? "done" : ""}`}
              style={{ textDecoration: "none" }}
            >
              {String(i + 1).padStart(2, "0")} · {s.label}
            </Link>
            {i < STEPS.length - 1 && <span style={{ opacity: 0.3 }}>—</span>}
          </Fragment>
        ))}
      </nav>
    </header>
  );
}
