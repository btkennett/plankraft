"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Plan, PlanStyle, ToolStatus } from "@/lib/plan/types";
import PlanBanner from "./PlanBanner";
import CutListRail from "./CutListRail";
import BuildStepsRail from "./BuildStepsRail";
import LumberYield from "./LumberYield";
import Bom from "./Bom";
import ToolList from "./ToolList";
import ExplodedCanvas from "./ExplodedCanvas";
import PlanStyleToggle from "./PlanStyleToggle";

// Heuristic: which cuts does a build step reference?
// Match cut.name tokens against step.title + step.meta.
function cutsForStep(plan: Plan, stepIdx: number): string[] {
  const step = plan.steps[stepIdx];
  if (!step) return [];
  const haystack = (step.title + " " + step.meta).toLowerCase();
  const hits: string[] = [];
  for (const cut of plan.cuts) {
    const tokens = cut.name.toLowerCase().split(/\s+/).filter((t) => t.length > 3);
    if (tokens.some((t) => haystack.includes(t))) hits.push(cut.id);
  }
  return hits;
}

const NEXT_STATUS: Record<ToolStatus, ToolStatus> = { OWN: "NEED", NEED: "BUILD", BUILD: "OWN" };

export default function PlanView({ plan, isSample = false }: { plan: Plan; isSample?: boolean }) {
  const [activePartId, setActivePartId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [planStyle, setPlanStyle] = useState<PlanStyle>("render");
  const [toolOverrides, setToolOverrides] = useState<Record<string, ToolStatus>>({});

  // Cuts highlighted from the active build step (overrides hover when no hover active)
  const stepCutIds = useMemo(() => cutsForStep(plan, activeStep), [plan, activeStep]);
  const effectiveActivePart = activePartId ?? (stepCutIds.length === 1 ? stepCutIds[0] : null);

  // Apply user overrides to tool statuses
  const tools = plan.tools.map((t) => ({ ...t, status: toolOverrides[t.name] ?? t.status }));

  const bomTotal = plan.bom.reduce((sum, item) => sum + item.price, 0);

  function cycleToolStatus(name: string) {
    setToolOverrides((prev) => {
      const current = prev[name] ?? plan.tools.find((t) => t.name === name)?.status ?? "OWN";
      return { ...prev, [name]: NEXT_STATUS[current] };
    });
  }

  return (
    <section className="screen" id="screen-5" style={{ padding: "96px 24px 80px" }}>
      <div className="s5-wrap">
        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div className="s1-eyebrow-row" style={{ marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--sienna)", fontWeight: 600 }}>
                {isSample ? "SAMPLE" : "PLAN"} · № {String(plan.number).padStart(3, "0")}
              </span>
              <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--rule)" }} />
              <span className="eyebrow">
                {isSample ? "Example output — your brief generates a different plan" : `Drafted in ${plan.draftedSeconds}s`}
              </span>
            </div>
            <h1 className="display" style={{ fontSize: "clamp(56px, 8vw, 112px)" }}>
              {plan.title.lead} <em style={{ fontStyle: "italic", color: "var(--sienna)" }}>{plan.title.emphasis}</em>
            </h1>
            <h1
              className="display"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                color: "var(--ink-soft)",
                marginTop: 4,
              }}
            >
              {plan.subtitle}
            </h1>
          </div>

          <div className="no-print" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <PlanStyleToggle value={planStyle} onChange={setPlanStyle} />
            <Link href="/brief" className="btn btn-ghost">
              ← Edit inputs
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                if (typeof window === "undefined") return;
                if (navigator.clipboard?.writeText) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <span style={{ fontSize: 14 }}>↗</span> Share
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
            >
              <span style={{ fontSize: 14 }}>↓</span> Export PDF
            </button>
          </div>
        </div>

        <PlanBanner plan={plan} />

        {/* Hero canvas */}
        <div className="s5-hero">
          <CutListRail cuts={plan.cuts} activePartId={activePartId} onPartHover={setActivePartId} />
          <ExplodedCanvas
            archetype={plan.archetype}
            parts={plan.exploded}
            style={planStyle}
            activePartId={effectiveActivePart}
            highlightedPartIds={activePartId ? null : stepCutIds}
            onPartHover={setActivePartId}
            widthCallout={plan.banner.footprint.w}
          />
          <BuildStepsRail steps={plan.steps} activeStep={activeStep} onSelectStep={setActiveStep} />
        </div>

        {/* Second tier */}
        <div className="s5-second">
          <LumberYield boards={plan.lumber} />
          <Bom items={plan.bom} total={bomTotal} />
          <ToolList tools={tools} onCycleStatus={cycleToolStatus} />
        </div>

        {/* Footer note */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
            borderTop: "1px solid var(--rule)",
            marginTop: 12,
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--ink-faint)",
            letterSpacing: "0.05em",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>
            PLANKRAFT · VOL. I · № {String(plan.number).padStart(3, "0")}
          </span>
          <span>
            {plan.meta.revision} · {plan.meta.wood.toUpperCase()} · {plan.meta.joinery.toUpperCase()}
          </span>
          <span>DIMS IN INCHES · THE REST IS SAWDUST</span>
        </div>
      </div>
    </section>
  );
}
