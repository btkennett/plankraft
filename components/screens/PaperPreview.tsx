interface PaperPreviewProps {
  hero?: boolean;
  rotate?: boolean;
}

export default function PaperPreview({ hero, rotate }: PaperPreviewProps) {
  return (
    <div className="s1-paper">
      <div className="s1-paper-eyebrow">{hero ? "Plankraft No. 042" : "Reference"}</div>
      <div className="s1-paper-title serif">{hero ? <em>Nightstand</em> : "Joinery"}</div>
      <div className="s1-paper-svg">
        <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ maxHeight: 280 }}>
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink-faint)" strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          {hero ? (
            <g stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M60 100 L120 70 L180 100 L180 180 L120 210 L60 180 Z" />
              <path d="M60 100 L120 130 L180 100" />
              <path d="M120 130 L120 210" />
              <path d="M70 130 L170 130" strokeDasharray="2 3" opacity="0.5" />
              <path d="M75 145 L165 145 L165 168 L75 168 Z" fill="url(#hatch)" />
              <circle cx="120" cy="156" r="2.5" fill="var(--sienna)" stroke="none" />
              <g stroke="var(--sienna)" strokeWidth="0.8">
                <path d="M55 105 L55 175" />
                <path d="M52 108 L55 105 L58 108 M52 172 L55 175 L58 172" />
              </g>
              <text
                x="40"
                y="145"
                fontSize="9"
                fill="var(--sienna)"
                fontFamily="var(--mono)"
                transform="rotate(-90 40 145)"
              >
                24&quot;
              </text>
            </g>
          ) : rotate ? (
            <g stroke="var(--ink-soft)" strokeWidth="1" fill="none">
              <rect x="60" y="60" width="120" height="120" />
              <path d="M60 60 L180 180 M180 60 L60 180" strokeDasharray="2 4" opacity="0.4" />
              <circle cx="120" cy="120" r="40" />
            </g>
          ) : (
            <g stroke="var(--ink-soft)" strokeWidth="1" fill="none">
              <path d="M40 80 L40 160 L200 160 L200 80" />
              <path d="M40 80 L120 40 L200 80" />
              <rect x="80" y="100" width="80" height="40" fill="url(#hatch)" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
