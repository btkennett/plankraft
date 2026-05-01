import type { Tool } from "@/lib/plan/types";

const STATUS_CLASS = { OWN: "own", NEED: "need", BUILD: "need" } as const;

export default function ToolList({ tools }: { tools: Tool[] }) {
  return (
    <div className="s5-second-cell">
      <div className="s5-second-h">Tools · what you need</div>
      <div className="s5-tools">
        {tools.map((t) => (
          <div key={t.name} className="s5-tool">
            <span>
              {t.name}
              {t.note && <span style={{ opacity: 0.6 }}> {t.note}</span>}
            </span>
            <span className={STATUS_CLASS[t.status]}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
