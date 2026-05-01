"use client";

import type { Step } from "@/lib/plan/types";

interface Props {
  steps: Step[];
  activeStep: number;
  onSelectStep: (idx: number) => void;
}

export default function BuildStepsRail({ steps, activeStep, onSelectStep }: Props) {
  return (
    <aside className="s5-rail s5-rail-r">
      <div className="s5-rail-section">
        <div className="s5-rail-h">
          <span>Build sequence</span>
          <span className="count">
            {activeStep + 1}/{steps.length}
          </span>
        </div>
        <div>
          {steps.map((s, i) => (
            <div
              key={i}
              className={`s5-step ${activeStep === i ? "active" : ""}`}
              onClick={() => onSelectStep(i)}
            >
              <div className="s5-step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="s5-step-body">
                <div className="s5-step-title">{s.title}</div>
                <div className="s5-step-meta">{s.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
