"use client";

import type { PlanStyle } from "@/lib/plan/types";

const OPTIONS: { value: PlanStyle; label: string }[] = [
  { value: "sketch", label: "Sketch" },
  { value: "blueprint", label: "Blueprint" },
  { value: "render", label: "3D" },
];

interface Props {
  value: PlanStyle;
  onChange: (v: PlanStyle) => void;
}

export default function PlanStyleToggle({ value, onChange }: Props) {
  return (
    <div
      className="mono"
      style={{
        display: "inline-flex",
        border: "1px solid var(--ink)",
        borderRadius: 2,
        overflow: "hidden",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
      role="radiogroup"
      aria-label="Plan style"
    >
      {OPTIONS.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            padding: "8px 14px",
            background: value === opt.value ? "var(--ink)" : "transparent",
            color: value === opt.value ? "var(--paper)" : "var(--ink-soft)",
            border: "none",
            borderLeft: i === 0 ? "none" : "1px solid var(--ink)",
            fontFamily: "inherit",
            fontSize: "inherit",
            letterSpacing: "inherit",
            textTransform: "inherit",
            cursor: "pointer",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
