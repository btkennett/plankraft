"use client";

import { useRouter } from "next/navigation";
import PlaceholderTile from "./PlaceholderTile";
import type { TileKind } from "./TileArt";

interface InspirationCard {
  id: number;
  kind: TileKind;
  label: string;
  tags: string[];
  col: number;
  row: number;
  w: number;
  h: number;
  hue: number;
}

const CARDS: InspirationCard[] = [
  { id: 1, kind: "leg", label: "Mid-century leg", tags: ["tapered", "walnut"], col: 1, row: 1, w: 4, h: 3, hue: 50 },
  { id: 2, kind: "pull", label: "Brass pull", tags: ["hardware"], col: 5, row: 1, w: 3, h: 2, hue: 75 },
  { id: 3, kind: "dovetail", label: "Drawer joinery", tags: ["dovetail"], col: 8, row: 1, w: 5, h: 3, hue: 60 },
  { id: 4, kind: "slab", label: "Live edge top", tags: ["slab"], col: 5, row: 3, w: 3, h: 2, hue: 45 },
  { id: 5, kind: "finish", label: "Oil finish", tags: ["finish", "matte"], col: 1, row: 4, w: 3, h: 2, hue: 55 },
  { id: 6, kind: "apron", label: "Apron detail", tags: ["frame"], col: 4, row: 4, w: 4, h: 2, hue: 40 },
  { id: 7, kind: "grain", label: "Walnut grain", tags: ["material"], col: 8, row: 4, w: 5, h: 2, hue: 50 },
];

const ACTIVE_TAGS = ["tapered legs", "dovetail", "walnut", "matte oil", "low-profile pull", "+ add tag"];

export default function ScreenInspiration() {
  const router = useRouter();

  return (
    <section className="screen" id="screen-2">
      <div className="s2-wrap">
        <div className="s2-head">
          <div className="s2-head-left">
            <div className="s1-eyebrow-row">
              <span
                className="num"
                style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--sienna)", fontWeight: 600 }}
              >
                II / IV
              </span>
              <span style={{ flex: 1, maxWidth: 80, height: 1, background: "var(--rule)" }} />
              <span className="eyebrow">Inspiration</span>
            </div>
            <h1 className="display s2-title">
              Show me what
              <br />
              you <em>mean.</em>
            </h1>
            <p className="s2-sub">
              Drag it in. A photo from the shop, a screenshot, a napkin sketch. Tag what matters — the grain, the
              joint, the proportion — and the plan weights it.
            </p>
          </div>
          <div className="s2-tagger">
            <div className="s2-tagger-h">
              <span className="s2-tagger-label">Active tags</span>
              <span className="s2-tagger-count">7 pinned</span>
            </div>
            <div className="s2-tags">
              {ACTIVE_TAGS.map((t, i) => (
                <span
                  key={t}
                  className={`chip ${i < 4 ? "chip-active" : ""}`}
                  style={i === 5 ? { borderStyle: "dashed" } : undefined}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="s2-grid">
          {CARDS.map((c) => (
            <div
              key={c.id}
              className="s2-card"
              style={{
                gridColumn: `${c.col} / span ${c.w}`,
                gridRow: `${c.row} / span ${c.h}`,
              }}
            >
              <PlaceholderTile label={c.label} hue={c.hue} kind={c.kind} />
              <div className="s2-tags-on-card">
                {c.tags.map((t) => (
                  <span key={t} className="s2-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="s2-card s2-card-add" style={{ gridColumn: "1 / span 3", gridRow: "6 / span 2" }}>
            <span style={{ fontSize: 22, fontWeight: 300 }}>+</span>
            <span>Drop image or paste URL</span>
          </div>
          <div className="s2-card" style={{ gridColumn: "4 / span 4", gridRow: "6 / span 2" }}>
            <PlaceholderTile label="Sketchbook page" hue={65} kind="sketch" />
            <div className="s2-tags-on-card">
              <span className="s2-tag">freehand</span>
            </div>
          </div>
          <div className="s2-card" style={{ gridColumn: "8 / span 5", gridRow: "6 / span 2" }}>
            <PlaceholderTile label="Wood grain · walnut" hue={45} kind="grain" />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48 }}>
          <button className="btn btn-ghost" type="button" onClick={() => router.push("/brief")}>
            ← Back
          </button>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span
              className="mono"
              style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.05em" }}
            >
              9 references · 5 tags
            </span>
            <button className="btn btn-primary" type="button" onClick={() => router.push("/measurements")}>
              Continue <span style={{ fontSize: 12 }}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
