"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import type { Plan } from "@/lib/plan/types";
import { PlanSchema } from "@/lib/plan/schema";
import { encodePlan } from "@/lib/plan/encode";
import { usePlankraftState } from "@/lib/state";
import DraftingAnimation from "./DraftingAnimation";

const STAGES = [
  { label: "Reading your brief", meta: "interpreting language, weighting tags" },
  { label: "Sourcing reference proportions", meta: "9 inspiration tiles · 5 active tags" },
  { label: "Selecting joinery strategy", meta: "dovetail drawers · M&T frame" },
  { label: "Calculating cut list", meta: "rounding to standard lumber widths" },
  { label: "Optimizing for stock yield", meta: "1× 8/4 walnut · 1× ¾ ply" },
  { label: "Drafting assembly sequence", meta: "10 steps · ~14 hr total" },
  { label: "Rendering exploded view", meta: "isometric, 30° axonometric" },
] as const;

// Map field-arrival to active stage index 0..7
function computeStageFromObject(obj: Partial<Plan> | undefined): number {
  if (!obj) return 0;
  if (obj.exploded && obj.exploded.length > 0) return 7;
  if (obj.steps && obj.steps.length > 0) return 6;
  if (obj.lumber && obj.lumber.length > 0) return 5;
  if (obj.cuts && obj.cuts.length > 0) return 4;
  if (obj.banner) return 3;
  if (obj.title) return 2;
  if (obj.archetype || obj.subtitle || obj.number) return 1;
  return 0;
}

export default function ScreenDrafting() {
  const { data } = usePlankraftState();
  const router = useRouter();
  const submittedRef = useRef(false);
  const completedRef = useRef(false);

  const [postError, setPostError] = useState<string | null>(null);

  const { object, error, isLoading, submit } = useObject({
    api: "/api/plan",
    schema: PlanSchema,
    onFinish: ({ object: finalObject }) => {
      if (completedRef.current) return;
      if (!finalObject) {
        setPostError("Generation ended without a plan. Try again.");
        return;
      }
      const parsed = PlanSchema.safeParse(finalObject);
      if (!parsed.success) {
        setPostError("Plan was incomplete. Try a sharper brief or different dimensions.");
        return;
      }
      completedRef.current = true;
      const encoded = encodePlan(parsed.data as Plan);
      router.replace(`/plan?d=${encoded}`);
    },
  });

  const displayError = error?.message ?? postError;

  // Trigger generation on mount with current input.
  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    submit(data);
    // We deliberately do NOT include data in deps — submit once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stage = useMemo(() => computeStageFromObject(object as Partial<Plan> | undefined), [object]);
  const pct = Math.min(100, Math.round((stage / STAGES.length) * 100));
  const visibleSteps = stage === 0 && isLoading ? 1 : Math.min(STAGES.length, stage + (isLoading ? 1 : 0));

  return (
    <section className="screen" id="screen-4">
      <div className="s4-wrap">
        <div className="s4-left">
          <div className="s4-eyebrow-row">
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--sienna)", fontWeight: 600 }}>
              IV / IV
            </span>
            <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--rule)" }} />
            <span className="eyebrow">Drafting</span>
          </div>
          <h1 className="display s4-title">
            Drafting
            <br />
            the <em>plan.</em>
          </h1>

          <div className="s4-status">
            {displayError ? (
              <span style={{ color: "var(--sienna)" }}>● {displayError}</span>
            ) : (
              <>
                <span className="dot" />
                {stage < STAGES.length
                  ? `${STAGES[stage].label.toLowerCase()}…`
                  : "finishing up…"}
              </>
            )}
          </div>

          <div className="s4-log">
            {STAGES.slice(0, visibleSteps).map((s, i) => (
              <div
                key={i}
                className={`s4-log-item ${i < stage ? "done" : "active"}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="check">{i < stage ? "✓" : "·"}</span>
                <div className="s4-log-text">
                  <div className="s4-log-label">{s.label}</div>
                  <div className="s4-log-meta">{s.meta}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="s4-progress">
            <div className="s4-progress-bar">
              <div className="s4-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="s4-progress-pct">{pct}%</span>
          </div>

          {displayError && (
            <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <Link href="/measurements" className="btn btn-ghost">
                ← Adjust inputs
              </Link>
              <Link href="/plan" className="btn btn-primary">
                See sample plan instead
              </Link>
            </div>
          )}
        </div>

        <div className="s4-stage">
          <span className="s4-corner-tick tl" />
          <span className="s4-corner-tick tr" />
          <span className="s4-corner-tick bl" />
          <span className="s4-corner-tick br" />
          <div className="s4-stage-h">
            <span>Live draft</span>
            <span>{String(stage * 14).padStart(3, "0")} / 100</span>
          </div>
          <DraftingAnimation step={stage} />
        </div>
      </div>
    </section>
  );
}
