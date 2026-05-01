"use client";

import { useRouter } from "next/navigation";
import { usePlankraftState, type Joinery, type Skill, type Wood } from "@/lib/state";
import NightstandSchematic from "./NightstandSchematic";

const WOODS: Wood[] = ["Walnut", "White oak", "Cherry", "Maple", "Pine", "Other"];
const JOINERIES: Joinery[] = ["Dovetail", "Mortise & tenon", "Pocket screw", "Dowel", "Whatever's easiest"];
const SKILLS: Skill[] = ["Beginner", "Intermediate", "Advanced"];

export default function ScreenMeasurements() {
  const { data, setData } = usePlankraftState();
  const router = useRouter();

  const dimFields = [
    { tag: "Width", val: data.dim.w, key: "w" as const },
    { tag: "Depth", val: data.dim.d, key: "d" as const },
    { tag: "Height", val: data.dim.h, key: "h" as const },
  ];

  return (
    <section className="screen" id="screen-3">
      <div className="s3-wrap">
        <div className="s3-left">
          <div className="s1-eyebrow-row">
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--sienna)", fontWeight: 600 }}>
              III / IV
            </span>
            <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--rule)" }} />
            <span className="eyebrow">Constraints</span>
          </div>
          <h1 className="display s2-title">
            Set the <em>bones.</em>
          </h1>
          <p className="s2-sub">
            Close enough works. Standard lumber widths aren&apos;t optional — we round to them anyway.
          </p>

          <div className="s3-fields">
            <div className="s3-field-grp">
              <span className="s3-field-label">Overall dimensions</span>
              <div className="s3-dim-row">
                {dimFields.map((f) => (
                  <div key={f.tag} className="s3-dim-cell">
                    <span className="s3-dim-tag">{f.tag}</span>
                    <input
                      className="s3-dim-input"
                      type="text"
                      inputMode="decimal"
                      value={f.val}
                      onChange={(e) => setData({ ...data, dim: { ...data.dim, [f.key]: e.target.value } })}
                    />
                    <span className="s3-dim-unit">in</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="s3-field-grp">
              <span className="s3-field-label">Primary wood</span>
              <div className="s3-options">
                {WOODS.map((w) => (
                  <button
                    key={w}
                    type="button"
                    className={`s3-opt ${data.wood === w ? "on" : ""}`}
                    onClick={() => setData({ ...data, wood: w })}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="s3-field-grp">
              <span className="s3-field-label">Joinery preference</span>
              <div className="s3-options">
                {JOINERIES.map((j) => (
                  <button
                    key={j}
                    type="button"
                    className={`s3-opt ${data.joinery === j ? "on" : ""}`}
                    onClick={() => setData({ ...data, joinery: j })}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            <div className="s3-field-grp">
              <span className="s3-field-label">Skill level</span>
              <div className="s3-options">
                {SKILLS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`s3-opt ${data.skill === s ? "on" : ""}`}
                    onClick={() => setData({ ...data, skill: s })}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="s3-cta-row" style={{ marginTop: 40 }}>
            <button className="btn btn-ghost" type="button" onClick={() => router.push("/inspiration")}>
              ← Back
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => router.push("/drafting")}
              style={{ flex: 1, justifyContent: "center" }}
            >
              Generate plan <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>↗</span>
            </button>
          </div>
          <div className="s3-cta-meta" style={{ marginTop: 14 }}>
            ~30 seconds · you&apos;ll see the reasoning
          </div>
        </div>

        <div className="s3-schema">
          <div className="s3-schema-h">
            <div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                }}
              >
                Live preview
              </div>
              <div className="l serif" style={{ marginTop: 6 }}>
                {data.wood} · proportions
              </div>
            </div>
            <div className="r">
              {data.dim.w}″W
              <br />
              {data.dim.d}″D
              <br />
              {data.dim.h}″H
            </div>
          </div>
          <div className="s3-schema-svg">
            <NightstandSchematic dim={data.dim} wood={data.wood} joinery={data.joinery} skill={data.skill} />
          </div>
          <div className="s3-schema-foot">
            <span className="mono">{data.joinery.toUpperCase()}</span>
            <span className="mono">SKILL: {data.skill.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
