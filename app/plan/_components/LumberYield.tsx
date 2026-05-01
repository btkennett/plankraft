import type { BoardLayout } from "@/lib/plan/types";

const DEFAULT_FILL = "oklch(0.55 0.08 50)";

function computeYield(b: BoardLayout): number {
  const total = b.pieces.reduce((sum, p) => sum + p.width, 0);
  if (total <= 0) return 0;
  const waste = b.pieces.filter((p) => p.isWaste).reduce((sum, p) => sum + p.width, 0);
  return Math.round(((total - waste) / total) * 100);
}

export default function LumberYield({ boards }: { boards: BoardLayout[] }) {
  return (
    <div className="s5-second-cell">
      <div className="s5-second-h">Lumber yield · cut diagram</div>
      {boards.map((b, idx) => {
        const computedYield = computeYield(b);
        return (
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
              <span>YIELD {computedYield}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
