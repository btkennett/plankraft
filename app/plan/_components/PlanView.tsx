"use client";

import { useState } from "react";
import Link from "next/link";
import type { Plan, PlanStyle } from "@/lib/plan/types";
import PlanBanner from "./PlanBanner";
import CutListRail from "./CutListRail";
import BuildStepsRail from "./BuildStepsRail";
import LumberYield from "./LumberYield";
import Bom from "./Bom";
import ToolList from "./ToolList";
import ExplodedCanvas from "./ExplodedCanvas";
import PlanStyleToggle from "./PlanStyleToggle";

export default function PlanView({ plan }: { plan: Plan }) {
  const [activePartId, setActivePartId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [planStyle, setPlanStyle] = useState<PlanStyle>("render");

  const bomTotal = plan.bom.reduce((sum, item) => sum + item.price, 0);

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
                PLAN · № {String(plan.number).padStart(3, "0")}
              </span>
              <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--rule)" }} />
              <span className="eyebrow">Drafted in {plan.draftedSeconds}s</span>
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

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <PlanStyleToggle value={planStyle} onChange={setPlanStyle} />
            <Link href="/brief" className="btn btn-ghost">
              ← Edit inputs
            </Link>
            <button type="button" className="btn btn-ghost" disabled title="Phase 8">
              <span style={{ fontSize: 14 }}>↗</span> Share
            </button>
            <button type="button" className="btn btn-primary" disabled title="Phase 7">
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
            activePartId={activePartId}
            onPartHover={setActivePartId}
            widthCallout={plan.banner.footprint.w}
          />
          <BuildStepsRail steps={plan.steps} activeStep={activeStep} onSelectStep={setActiveStep} />
        </div>

        {/* Second tier */}
        <div className="s5-second">
          <LumberYield boards={plan.lumber} />
          <Bom items={plan.bom} total={bomTotal} />
          <ToolList tools={plan.tools} />
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
          <span>SCALE 1:6 · DIMS IN INCHES · THE REST IS SAWDUST</span>
        </div>
      </div>
    </section>
  );
}
