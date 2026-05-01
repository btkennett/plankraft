import type { BoardLayout } from "@/lib/plan/types";

const DEFAULT_FILL = "oklch(0.55 0.08 50)";

export default function LumberYield({ boards }: { boards: BoardLayout[] }) {
  return (
    <div className="s5-second-cell">
      <div className="s5-second-h">Lumber yield · cut diagram</div>
      {boards.map((b, idx) => (
        <div key={idx} className="s5-board">
          <div className="s5-board-strip">
            {b.pieces.map((pc, pidx) => (
              <div
                key={pidx}
                className={`s5-board-pc ${pc.isWaste ? "waste" : ""}`}
                style={{
                  flex: pc.width,
                  ...(pc.isWaste ? null : { background: b.fill ?? DEFAULT_FILL }),
                }}
              >
                {pc.label}
              </div>
            ))}
          </div>
          <div className="s5-board-spec">
            <span>{b.spec}</span>
            <span>YIELD {b.yield}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
