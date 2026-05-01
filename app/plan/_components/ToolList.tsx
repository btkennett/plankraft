"use client";

import type { Tool } from "@/lib/plan/types";

const STATUS_CLASS = { OWN: "own", NEED: "need", BUILD: "need" } as const;

interface Props {
  tools: Tool[];
  onCycleStatus?: (name: string) => void;
}

export default function ToolList({ tools, onCycleStatus }: Props) {
  return (
    <div className="s5-second-cell">
      <div className="s5-second-h" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span>Tools · what you need</span>
        {onCycleStatus && <span style={{ fontSize: 9, opacity: 0.6 }}>tap status to cycle</span>}
      </div>
      <div className="s5-tools">
        {tools.map((t) => (
          <div key={t.name} className="s5-tool">
            <span>
              {t.name}
              {t.note && <span style={{ opacity: 0.6 }}> {t.note}</span>}
            </span>
            {onCycleStatus ? (
              <button
                type="button"
                className={STATUS_CLASS[t.status]}
                onClick={() => onCycleStatus(t.name)}
                style={{
                  background: "none",
                  border: "1px dashed currentColor",
                  borderRadius: 999,
                  padding: "2px 8px",
                  cursor: "pointer",
                  font: "inherit",
                  letterSpacing: "inherit",
                }}
              >
                {t.status}
              </button>
            ) : (
              <span className={STATUS_CLASS[t.status]}>{t.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
