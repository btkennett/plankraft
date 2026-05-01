interface DraftingAnimationProps {
  step: number;
}

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

      {/* construction lines */}
      <g
        stroke="var(--sienna)"
        strokeWidth="0.5"
        opacity={draw >= 1 ? 0.5 : 0}
        style={{ transition: "opacity 0.4s" }}
      >
        <line x1="80" y1="80" x2="80" y2="340" />
        <line x1="320" y1="80" x2="320" y2="340" />
        <line x1="80" y1="340" x2="320" y2="340" />
        <line x1="80" y1="80" x2="320" y2="80" />
        <line x1="80" y1="80" x2="320" y2="340" strokeDasharray="2 4" />
        <line x1="320" y1="80" x2="80" y2="340" strokeDasharray="2 4" />
      </g>

      {/* iso form */}
      <g
        stroke="var(--ink)"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "opacity 0.6s" }}
      >
        {draw >= 2 && (
          <path
            d="M 110 130 L 200 100 L 290 130 L 290 310 L 200 340 L 110 310 Z"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: draw >= 2 ? 0 : 1200,
              transition: "stroke-dashoffset 1.2s ease-out",
            }}
          />
        )}
        {draw >= 3 && (
          <>
            <path d="M 110 130 L 200 160 L 290 130" />
            <line x1="200" y1="160" x2="200" y2="340" />
          </>
        )}
        {draw >= 4 && <rect x="125" y="180" width="150" height="60" fill="rgba(0,0,0,0.05)" />}
        {draw >= 5 && <circle cx="200" cy="210" r="3.5" fill="var(--sienna)" stroke="none" />}
        {draw >= 6 && (
          <>
            <path d="M 110 310 L 130 305 L 130 280 L 110 285 Z" fill="rgba(0,0,0,0.04)" />
            <path d="M 290 310 L 270 305 L 270 280 L 290 285 Z" fill="rgba(0,0,0,0.04)" />
          </>
        )}
      </g>

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
          <line x1="110" y1="360" x2="290" y2="360" />
          <text x="200" y="378" textAnchor="middle">
            22&quot;
          </text>
        </g>
      )}
      <style>{`@keyframes drafting-fade-in { to { opacity: 1; } }`}</style>
    </svg>
  );
}
