interface Props {
  dim: { w: string; d: string; h: string };
  wood?: string;
  joinery?: string;
  skill?: string;
}

const WOOD_COLORS: Record<string, string> = {
  Walnut: "oklch(0.38 0.060 50)",
  "White oak": "oklch(0.62 0.055 70)",
  Cherry: "oklch(0.50 0.090 35)",
  Maple: "oklch(0.78 0.045 85)",
  Pine: "oklch(0.82 0.060 90)",
  Other: "oklch(0.45 0.045 60)",
};

export default function NightstandSchematic({ dim, wood = "Walnut", joinery, skill }: Props) {
  const w = parseFloat(dim.w) || 22;
  const d = parseFloat(dim.d) || 16;
  const h = parseFloat(dim.h) || 24;
  const scale = 8;
  const W = w * scale;
  const D = d * scale;
  const H = h * scale;
  const cx = 200;
  const cy = 220;

  const iso = (x: number, y: number, z: number): [number, number] => [
    cx + (x - z) * 0.866,
    cy + (x + z) * 0.5 - y,
  ];

  const a1 = iso(-W / 2, 0, D / 2);
  const a2 = iso(W / 2, 0, D / 2);
  const a3 = iso(W / 2, 0, -D / 2);
  const a4 = iso(-W / 2, 0, -D / 2);
  const b1 = iso(-W / 2, H, D / 2);
  const b2 = iso(W / 2, H, D / 2);
  const b3 = iso(W / 2, H, -D / 2);
  const b4 = iso(-W / 2, H, -D / 2);

  const woodColor = WOOD_COLORS[wood] ?? WOOD_COLORS.Walnut;
  const detailLevel = skill === "Advanced" ? 2 : skill === "Intermediate" ? 1 : 0;

  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <pattern id="schematic-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--rule-soft)" strokeWidth="0.5" opacity="0.5" />
        </pattern>
        {/* Top-face wood-tone fill that follows the selected species */}
        <linearGradient id="schematic-top" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={woodColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={woodColor} stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#schematic-grid)" />

      <g stroke={woodColor} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d={`M ${a1[0]} ${a1[1]} L ${a2[0]} ${a2[1]} L ${a3[0]} ${a3[1]} L ${a4[0]} ${a4[1]} Z`}
          strokeDasharray="3 3"
          opacity="0.4"
        />
        <path
          d={`M ${b1[0]} ${b1[1]} L ${b2[0]} ${b2[1]} L ${b3[0]} ${b3[1]} L ${b4[0]} ${b4[1]} Z`}
          fill="url(#schematic-top)"
        />
        <line x1={a1[0]} y1={a1[1]} x2={b1[0]} y2={b1[1]} />
        <line x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} />
        <line x1={a3[0]} y1={a3[1]} x2={b3[0]} y2={b3[1]} />
        <line x1={a4[0]} y1={a4[1]} x2={b4[0]} y2={b4[1]} />

        {/* Skill-conditional construction marks */}
        {detailLevel >= 1 && (
          <>
            {/* Stretcher line low across front */}
            <line
              x1={a1[0]}
              y1={(a1[1] + b1[1]) / 2 + (b1[1] - a1[1]) * 0.25}
              x2={a2[0]}
              y2={(a2[1] + b2[1]) / 2 + (b2[1] - a2[1]) * 0.25}
              strokeDasharray="2 3"
              opacity="0.35"
            />
          </>
        )}
        {detailLevel >= 2 && (
          <>
            {/* Joinery callout — corner detail tick at front-right post */}
            <circle cx={b2[0]} cy={b2[1]} r="3.5" stroke="var(--sienna)" strokeWidth="0.8" />
          </>
        )}
      </g>

      {/* Dimension lines (always shown) */}
      <g stroke="var(--sienna)" strokeWidth="0.8" fill="var(--sienna)" fontFamily="var(--mono)" fontSize="10">
        <line x1={a1[0]} y1={a1[1] + 30} x2={a2[0]} y2={a2[1] + 30} />
        <line x1={a1[0]} y1={a1[1] + 26} x2={a1[0]} y2={a1[1] + 34} />
        <line x1={a2[0]} y1={a2[1] + 26} x2={a2[0]} y2={a2[1] + 34} />
        <text x={(a1[0] + a2[0]) / 2} y={a1[1] + 50} textAnchor="middle">
          {w}&quot;
        </text>

        <line x1={b3[0] + 26} y1={b3[1]} x2={a3[0] + 26} y2={a3[1]} />
        <line x1={b3[0] + 22} y1={b3[1]} x2={b3[0] + 30} y2={b3[1]} />
        <line x1={a3[0] + 22} y1={a3[1]} x2={a3[0] + 30} y2={a3[1]} />
        <text x={b3[0] + 36} y={(b3[1] + a3[1]) / 2 + 4}>
          {h}&quot;
        </text>
      </g>

      {/* Joinery callout tag — sienna pill in upper-right when detail ≥ 2 */}
      {detailLevel >= 2 && joinery && (
        <g transform="translate(280, 60)">
          <rect x="0" y="0" width="100" height="20" rx="2" fill="var(--sienna)" />
          <text
            x="50"
            y="13"
            textAnchor="middle"
            fontFamily="var(--mono)"
            fontSize="9"
            fill="var(--paper)"
            letterSpacing="0.08em"
          >
            {joinery.toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  );
}
