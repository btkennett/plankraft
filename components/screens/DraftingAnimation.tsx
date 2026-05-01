interface DraftingAnimationProps {
  step: number;
}

/**
 * Abstract drafting visual — fills in a page of architectural marks as the
 * stream progresses. Deliberately NOT archetype-specific (no nightstand
 * silhouette) so it works for tables, bookshelves, benches, boxes, etc.
 */
export default function DraftingAnimation({ step }: DraftingAnimationProps) {
  const draw = step;
  return (
    <svg viewBox="0 0 400 400" className="s4-stage-svg">
      <defs>
        <pattern id="drafting-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--rule-soft)" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#drafting-grid)" />

      {/* Construction frame — appears at stage 1 */}
      <g stroke="var(--sienna)" strokeWidth="0.5" opacity={draw >= 1 ? 0.5 : 0} style={{ transition: "opacity 0.4s" }}>
        <line x1="60" y1="60" x2="60" y2="340" />
        <line x1="340" y1="60" x2="340" y2="340" />
        <line x1="60" y1="340" x2="340" y2="340" />
        <line x1="60" y1="60" x2="340" y2="60" />
        <line x1="60" y1="60" x2="340" y2="340" strokeDasharray="2 4" />
        <line x1="340" y1="60" x2="60" y2="340" strokeDasharray="2 4" />
      </g>

      {/* Iso volume outline — stage 2; sized as a generic block, not a nightstand */}
      <g stroke="var(--ink)" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {draw >= 2 && (
          <path
            d="M 100 130 L 200 90 L 300 130 L 300 300 L 200 340 L 100 300 Z"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: draw >= 2 ? 0 : 1200,
              transition: "stroke-dashoffset 1.2s ease-out",
            }}
          />
        )}
        {draw >= 3 && (
          <>
            <path d="M 100 130 L 200 170 L 300 130" />
            <line x1="200" y1="170" x2="200" y2="340" />
          </>
        )}
      </g>

      {/* Cut-list tally marks — stage 4. Tiny ledger of dashes filling in. */}
      {draw >= 4 && (
        <g stroke="var(--ink-soft)" strokeWidth="1" opacity="0.6" style={{ transition: "opacity 0.4s" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={66} y1={365 + (i % 2) * 6} x2={78} y2={365 + (i % 2) * 6} transform={`translate(${i * 14} 0)`} />
          ))}
        </g>
      )}

      {/* Yield-bar mark — stage 5 */}
      {draw >= 5 && (
        <g style={{ animation: "drafting-fade-in 0.6s ease-out forwards", opacity: 0 }}>
          <rect x="60" y="50" width="280" height="6" fill="rgba(0,0,0,0.06)" />
          <rect x="60" y="50" width="245" height="6" fill="var(--sienna)" />
        </g>
      )}

      {/* Sequence ticks — stage 6: vertical step ledger */}
      {draw >= 6 && (
        <g
          stroke="var(--ink)"
          strokeWidth="0.8"
          opacity="0.5"
          style={{ animation: "drafting-fade-in 0.6s ease-out forwards" }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={356} y1={70 + i * 26} x2={372} y2={70 + i * 26} />
          ))}
        </g>
      )}

      {/* Dimension callouts — stage 7 */}
      {draw >= 7 && (
        <g
          stroke="var(--sienna)"
          strokeWidth="0.8"
          fill="var(--sienna)"
          fontFamily="var(--mono)"
          fontSize="10"
          opacity="0"
          style={{ animation: "drafting-fade-in 0.6s ease-out forwards" }}
        >
          <line x1="100" y1="370" x2="300" y2="370" />
          <line x1="100" y1="364" x2="100" y2="376" />
          <line x1="300" y1="364" x2="300" y2="376" />
        </g>
      )}
      <style>{`@keyframes drafting-fade-in { to { opacity: 1; } }`}</style>
    </svg>
  );
}
