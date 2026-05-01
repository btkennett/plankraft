"use client";

import type { ArchetypeRenderer } from "./types";

const CUTS_ORDER = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const NightstandRenderer: ArchetypeRenderer = ({ parts, style, activePartId, onPartHover, widthCallout = 22 }) => {
  const isBlue = style === "blueprint";
  const isRender = style === "render";

  const stroke = isBlue ? "var(--blue-ink)" : "var(--ink)";
  const accent = isBlue ? "var(--blue-cyan)" : "var(--sienna)";

  const woodFill = (i: number) => {
    if (isBlue) return "transparent";
    if (isRender) return `oklch(${0.55 - (i % 3) * 0.04} ${0.08 - (i % 3) * 0.01} ${48 + (i * 3) % 12})`;
    return `oklch(0.78 0.04 ${50 + (i * 7) % 30})`;
  };
  const woodStroke = isBlue ? "var(--blue-cyan)" : isRender ? "oklch(0.30 0.05 45)" : "var(--ink)";

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id="np-sketch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--rule-soft)" strokeWidth="0.6" opacity="0.5" />
        </pattern>
        <pattern id="np-blue-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--blue-rule)" strokeWidth="0.6" opacity="0.4" />
        </pattern>
        <pattern id="np-render-grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1" fill="var(--ink-faint)" opacity="0.2" />
        </pattern>
        <pattern id="np-grain1" width="200" height="20" patternUnits="userSpaceOnUse">
          <rect width="200" height="20" fill="oklch(0.52 0.07 48)" />
          <path d="M 0 5 Q 50 3 100 6 T 200 5" stroke="oklch(0.38 0.06 42)" strokeWidth="0.6" fill="none" opacity="0.5" />
          <path d="M 0 12 Q 60 14 120 11 T 200 13" stroke="oklch(0.32 0.05 40)" strokeWidth="0.4" fill="none" opacity="0.6" />
          <path d="M 0 18 Q 40 16 90 19 T 200 17" stroke="oklch(0.42 0.06 45)" strokeWidth="0.3" fill="none" opacity="0.5" />
        </pattern>
        <pattern id="np-grain2" width="160" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(2)">
          <rect width="160" height="20" fill="oklch(0.48 0.07 50)" />
          <path d="M 0 6 Q 40 4 80 7 T 160 6" stroke="oklch(0.34 0.06 44)" strokeWidth="0.5" fill="none" opacity="0.6" />
          <path d="M 0 14 Q 50 16 100 13 T 160 15" stroke="oklch(0.30 0.05 40)" strokeWidth="0.4" fill="none" opacity="0.5" />
        </pattern>
        <filter id="np-drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="4" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="np-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.5" />
        </filter>
      </defs>

      <rect
        width="1000"
        height="1000"
        fill={
          isBlue
            ? "url(#np-blue-grid)"
            : isRender
              ? "url(#np-render-grid)"
              : "url(#np-sketch-grid)"
        }
      />

      {/* explosion guide line */}
      <g stroke={accent} strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45">
        <line x1="500" y1="80" x2="500" y2="940" />
      </g>

      {/* parts */}
      <g style={{ transition: "all 0.4s" }}>
        {parts.map((p, i) => {
          const isActive = activePartId === p.cutId;
          const colorIdx = CUTS_ORDER.indexOf(p.cutId);
          let fill = woodFill(colorIdx);
          if (isRender) {
            fill = colorIdx % 2 === 0 ? "url(#np-grain1)" : "url(#np-grain2)";
          }
          return (
            <g
              key={`${p.cutId}-${i}`}
              onMouseEnter={() => onPartHover(p.cutId)}
              onMouseLeave={() => onPartHover(null)}
              style={{
                cursor: "pointer",
                transition: "transform 0.3s",
                transformOrigin: `${p.x + p.w / 2}px ${p.y + p.h / 2}px`,
                transform: isActive ? "scale(1.08)" : "scale(1)",
              }}
            >
              {isRender ? (
                <g filter="url(#np-drop-shadow)">
                  <polygon
                    points={`${p.x},${p.y} ${p.x + p.w},${p.y} ${p.x + p.w + 8},${p.y - 6} ${p.x + 8},${p.y - 6}`}
                    fill="oklch(0.62 0.06 50)"
                    stroke={woodStroke}
                    strokeWidth="0.8"
                  />
                  <polygon
                    points={`${p.x + p.w},${p.y} ${p.x + p.w + 8},${p.y - 6} ${p.x + p.w + 8},${p.y + p.h - 6} ${p.x + p.w},${p.y + p.h}`}
                    fill="oklch(0.36 0.06 44)"
                    stroke={woodStroke}
                    strokeWidth="0.8"
                  />
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={fill} stroke={woodStroke} strokeWidth="0.8" />
                </g>
              ) : (
                <rect
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  fill={fill}
                  fillOpacity={isBlue ? 0 : isActive ? 0.85 : 0.6}
                  stroke={isActive ? accent : isBlue ? "var(--blue-cyan)" : woodStroke}
                  strokeWidth={isActive ? 2 : style === "sketch" ? 1.6 : 1.2}
                  filter={style === "sketch" ? "url(#np-rough)" : undefined}
                />
              )}

              <text
                x={p.x + p.w / 2}
                y={p.y + p.h / 2 + 4}
                textAnchor="middle"
                fontFamily="var(--mono)"
                fontSize={Math.max(10, Math.min(p.w, p.h) * 0.5)}
                fontWeight="600"
                fill={isBlue ? "var(--blue-cyan)" : isRender ? "oklch(0.95 0.02 80)" : "var(--ink)"}
                opacity={p.w < 25 || p.h < 25 ? 0 : 0.7}
                pointerEvents="none"
              >
                {p.cutId}
              </text>
            </g>
          );
        })}
      </g>

      {/* labels */}
      <g fontFamily="var(--mono)" fontSize="12" fontWeight="500" fill={isBlue ? "var(--blue-ink)" : "var(--ink)"}>
        {parts
          .filter((p) => p.label)
          .map((p, i) => {
            const lx = p.x + p.w + (p.offsetX ?? 30);
            const ly = p.y + p.h / 2 + (p.offsetY ?? 4);
            const isActive = activePartId === p.cutId;
            return (
              <g key={`label-${i}`} opacity={isActive ? 1 : 0.55}>
                <line
                  x1={p.x + p.w + 4}
                  y1={p.y + p.h / 2}
                  x2={lx - 4}
                  y2={ly - 4}
                  stroke={isActive ? accent : isBlue ? "var(--blue-cyan)" : "var(--ink-faint)"}
                  strokeWidth="0.6"
                />
                <text x={lx} y={ly}>
                  {p.label}
                </text>
              </g>
            );
          })}
      </g>

      {/* width callout on top */}
      <g stroke={accent} fill={accent} fontFamily="var(--mono)" fontSize="11" strokeWidth="0.8">
        <line x1="280" y1="80" x2="720" y2="80" />
        <line x1="280" y1="74" x2="280" y2="86" />
        <line x1="720" y1="74" x2="720" y2="86" />
        <text x="500" y="68" textAnchor="middle" stroke="none" fontWeight="600">
          {widthCallout}″
        </text>
      </g>

      {/* hand-written sketch annotation */}
      {style === "sketch" && (
        <g transform="translate(770, 880) rotate(-4)">
          <text fontFamily="var(--serif)" fontStyle="italic" fontSize="20" fill="var(--ink-soft)">
            <tspan x="0" dy="0">tapered legs,</tspan>
            <tspan x="0" dy="22">3° splay</tspan>
          </text>
          <path d="M -10 -4 Q -30 30 -50 50" stroke="var(--ink-soft)" fill="none" strokeWidth="1" opacity="0.5" />
        </g>
      )}

      {/* blueprint scale bar */}
      {isBlue && (
        <g transform="translate(880, 920)" stroke="var(--blue-cyan)" fill="var(--blue-cyan)" strokeWidth="1">
          <line x1="0" y1="0" x2="80" y2="0" />
          <line x1="0" y1="-4" x2="0" y2="4" />
          <line x1="40" y1="-3" x2="40" y2="3" />
          <line x1="80" y1="-4" x2="80" y2="4" />
          <text x="40" y="20" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" stroke="none">
            6 INCHES
          </text>
        </g>
      )}
    </svg>
  );
};

export default NightstandRenderer;
