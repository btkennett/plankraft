import type { Plan } from "@/lib/plan/types";

export default function PlanBanner({ plan }: { plan: Plan }) {
  const { footprint, buildHours, skill, sessions, materialCost, materialSummary } = plan.banner;
  const totalCuts = plan.cuts.reduce((sum, c) => sum + c.qty, 0);

  return (
    <div className="s5-banner">
      <span className="stamp s5-stamp-corner">№ {String(plan.number).padStart(3, "0")} · Approved</span>

      <div className="s5-banner-cell">
        <div className="lbl">Footprint</div>
        <div className="val">
          {footprint.w} × {footprint.d} × <em>{footprint.h}″</em>
        </div>
        <div className="sub">W × D × H · imperial</div>
      </div>

      <div className="s5-banner-cell">
        <div className="lbl">Pieces</div>
        <div className="val">{plan.cuts.length}</div>
        <div className="sub">{totalCuts} cuts total</div>
      </div>

      <div className="s5-banner-cell">
        <div className="lbl">Build time</div>
        <div className="val">~{buildHours} hr</div>
        <div className="sub">
          {skill} · {sessions} sessions
        </div>
      </div>

      <div className="s5-banner-cell">
        <div className="lbl">Material cost</div>
        <div className="val">${materialCost}</div>
        <div className="sub">{materialSummary}</div>
      </div>
    </div>
  );
}
