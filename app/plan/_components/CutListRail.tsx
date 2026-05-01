"use client";

import type { Cut } from "@/lib/plan/types";

interface Props {
  cuts: Cut[];
  activePartId: string | null;
  onPartHover: (id: string | null) => void;
}

export default function CutListRail({ cuts, activePartId, onPartHover }: Props) {
  return (
    <aside className="s5-rail">
      <div className="s5-rail-section">
        <div className="s5-rail-h">
          <span>Cut list</span>
          <span className="count">{cuts.length} pcs</span>
        </div>
        <div>
          {cuts.map((c) => (
            <div
              key={c.id}
              className={`s5-cut ${activePartId === c.id ? "active" : ""}`}
              onMouseEnter={() => onPartHover(c.id)}
              onMouseLeave={() => onPartHover(null)}
            >
              <span className="s5-cut-id">{c.id}</span>
              <div>
                <div className="s5-cut-name">{c.name}</div>
                <div className="s5-cut-spec">{c.spec}</div>
              </div>
              <span className="s5-cut-dim">
                {c.w}×{c.h}
                <br />
                <span style={{ opacity: 0.6 }}>×{c.t}″</span>
              </span>
              <span className="s5-cut-qty">×{c.qty}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
