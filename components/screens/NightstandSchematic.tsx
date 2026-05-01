interface NightstandSchematicProps {
  dim: { w: string; d: string; h: string };
}

export default function NightstandSchematic({ dim }: NightstandSchematicProps) {
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

  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <pattern id="schematic-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--rule-soft)" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#schematic-grid)" />

      <g stroke="var(--ink)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d={`M ${a1[0]} ${a1[1]} L ${a2[0]} ${a2[1]} L ${a3[0]} ${a3[1]} L ${a4[0]} ${a4[1]} Z`}
          strokeDasharray="3 3"
          opacity="0.4"
        />
        <path
          d={`M ${b1[0]} ${b1[1]} L ${b2[0]} ${b2[1]} L ${b3[0]} ${b3[1]} L ${b4[0]} ${b4[1]} Z`}
          fill="rgba(255,255,255,0.5)"
        />
        <line x1={a1[0]} y1={a1[1]} x2={b1[0]} y2={b1[1]} />
        <line x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} />
        <line x1={a3[0]} y1={a3[1]} x2={b3[0]} y2={b3[1]} />
        <line x1={a4[0]} y1={a4[1]} x2={b4[0]} y2={b4[1]} />

        <rect x={cx - W / 2 + 14} y={cy - H + 18} width={W - 28} height={H * 0.35} fill="rgba(0,0,0,0.04)" />
        <circle cx={cx} cy={cy - H + 18 + H * 0.175} r="3" fill="var(--sienna)" stroke="none" />
      </g>

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
    </svg>
  );
}
