"use client";

import { useRouter } from "next/navigation";
import { usePlankraftState } from "@/lib/state";
import PaperPreview from "./PaperPreview";

const SUGGESTIONS = [
  "walnut nightstand with one drawer",
  "white oak floating bookshelf",
  "shaker coffee table 48×24",
  "cedar planter, weather-resistant",
  "live-edge slab desk",
] as const;

interface IconBtnProps {
  label: string;
  icon: string;
}

function IconBtn({ label, icon }: IconBtnProps) {
  return (
    <button
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "transparent",
        border: "1px solid var(--rule)",
        padding: "7px 12px",
        borderRadius: 2,
        fontSize: 12,
        color: "var(--ink-soft)",
        cursor: "pointer",
        fontFamily: "var(--sans)",
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      {label}
    </button>
  );
}

export default function ScreenDescribe() {
  const { data, setData } = usePlankraftState();
  const router = useRouter();

  return (
    <section className="screen" id="screen-1">
      <div className="s1-wrap">
        <div className="s1-left">
          <div className="s1-eyebrow-row">
            <span className="num">01 / 04</span>
            <span className="rule" style={{ flex: 1, maxWidth: 80 }} />
            <span className="eyebrow">Brief</span>
          </div>
          <h1 className="display s1-title">
            What are you<br />
            <em>building.</em>
          </h1>
          <p className="s1-sub">
            Plain language. The wood you&apos;ve got, the joinery you want, the space it needs to fill. No forms.
            No menus. Just say it.
          </p>

          <div className="s1-prompt">
            <div className="s1-prompt-label">The brief</div>
            <textarea
              className="s1-textarea"
              rows={4}
              value={data.brief}
              onChange={(e) => setData({ ...data, brief: e.target.value })}
              placeholder="A walnut nightstand. 24 inches. One drawer, tapered legs, oil finish. Nothing fancy — just right."
              autoFocus
            />
            <div className="s1-prompt-foot">
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <IconBtn label="Voice" icon="🎙" />
                <IconBtn label="Sketch" icon="✎" />
                <IconBtn label="Reference" icon="↗" />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/inspiration")}
                disabled={data.brief.trim().length === 0}
                style={{ opacity: data.brief.trim().length === 0 ? 0.4 : 1 }}
              >
                Continue
                <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>→</span>
              </button>
            </div>
          </div>

          <div className="s1-suggestions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="s1-suggest"
                type="button"
                onClick={() => setData({ ...data, brief: s.charAt(0).toUpperCase() + s.slice(1) })}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="s1-stack">
          <PaperPreview rotate />
          <PaperPreview />
          <PaperPreview hero />
          <div className="s1-stack-label">Studio Plankraft · 2026</div>
        </div>
      </div>
    </section>
  );
}
