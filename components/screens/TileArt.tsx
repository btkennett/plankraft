export type TileKind = "leg" | "pull" | "dovetail" | "slab" | "finish" | "apron" | "grain" | "sketch";

const ink = "rgba(35, 25, 15, 0.55)";
const inkDeep = "rgba(30, 20, 12, 0.85)";
const wood = "rgba(80, 50, 30, 0.88)";
const woodLight = "rgba(120, 78, 48, 0.75)";
const woodDark = "rgba(48, 28, 16, 0.92)";
const brass = "rgba(180, 142, 70, 0.95)";
const brassDark = "rgba(120, 88, 40, 0.95)";

export default function TileArt({ kind }: { kind: TileKind }) {
  switch (kind) {
    case "leg":
      return (
        <g>
          <path d="M85 14 L92 14 L100 126 L78 126 Z" fill={wood} />
          <path d="M85 14 L92 14 L91 22 L86 22 Z" fill={woodDark} />
          <path
            d="M83 30 L91 30 M82 50 L93 50 M81 75 L94 75 M80 100 L95 100"
            stroke={woodDark}
            strokeWidth="0.4"
            opacity="0.5"
          />
          <g stroke={inkDeep} strokeWidth="0.7" fill={inkDeep}>
            <line x1="115" y1="14" x2="115" y2="126" />
            <path d="M112 18 L115 14 L118 18 M112 122 L115 126 L118 122" fill="none" />
          </g>
          <text x="122" y="73" fontFamily="var(--mono)" fontSize="9" fill={inkDeep} letterSpacing="0.05em">
            22&quot;
          </text>
          <text x="122" y="86" fontFamily="var(--serif)" fontStyle="italic" fontSize="10" fill={ink}>
            3° taper
          </text>
        </g>
      );
    case "pull":
      return (
        <g>
          <rect x="40" y="48" width="120" height="14" rx="2" fill={brass} />
          <rect x="40" y="48" width="120" height="3" fill="rgba(255,230,180,0.6)" />
          <rect x="40" y="59" width="120" height="3" fill={brassDark} />
          <circle cx="52" cy="55" r="2" fill={brassDark} />
          <circle cx="148" cy="55" r="2" fill={brassDark} />
          <circle cx="52" cy="78" r="2" fill={inkDeep} />
          <circle cx="148" cy="78" r="2" fill={inkDeep} />
          <line x1="52" y1="62" x2="52" y2="78" stroke={inkDeep} strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="148" y1="62" x2="148" y2="78" stroke={inkDeep} strokeWidth="0.6" strokeDasharray="2 2" />
          <text x="100" y="100" fontFamily="var(--mono)" fontSize="8" textAnchor="middle" fill={inkDeep} letterSpacing="0.1em">
            4&quot; BRASS · MATTE
          </text>
        </g>
      );
    case "dovetail":
      return (
        <g>
          <path
            d="M40 40 L60 40 L66 56 L86 56 L80 40 L100 40 L106 56 L126 56 L120 40 L150 40 L150 70 L40 70 Z"
            fill={wood}
          />
          <path
            d="M150 75 L170 75 L170 130 L40 130 L40 110 L60 110 L66 94 L86 94 L80 110 L100 110 L106 94 L126 94 L120 110 L150 110 Z"
            fill={woodLight}
          />
          <g stroke={inkDeep} strokeWidth="0.5" fill="none" strokeDasharray="2 3" opacity="0.6">
            <line x1="60" y1="40" x2="60" y2="110" />
            <line x1="86" y1="40" x2="86" y2="110" />
            <line x1="100" y1="40" x2="100" y2="110" />
            <line x1="126" y1="40" x2="126" y2="110" />
          </g>
          <text x="105" y="32" fontFamily="var(--mono)" fontSize="7" textAnchor="middle" fill={inkDeep} letterSpacing="0.1em">
            THROUGH DOVETAIL · 1:8
          </text>
        </g>
      );
    case "slab":
      return (
        <g>
          <path
            d="M14 50 Q35 38 70 46 Q105 52 140 44 Q170 40 188 56 L186 86 Q165 96 138 90 Q108 84 78 92 Q42 100 18 88 Z"
            fill={wood}
          />
          <ellipse cx="80" cy="68" rx="6" ry="4" fill={woodDark} />
          <ellipse cx="80" cy="68" rx="3" ry="2" fill="rgba(20,12,6,0.9)" />
          <path d="M20 60 Q60 56 100 62 T185 62" stroke={woodDark} strokeWidth="0.5" fill="none" opacity="0.6" />
          <path d="M20 70 Q60 66 100 72 T185 70" stroke={woodDark} strokeWidth="0.6" fill="none" opacity="0.7" />
          <path d="M20 80 Q60 76 100 82 T185 80" stroke={woodDark} strokeWidth="0.4" fill="none" opacity="0.5" />
          <text x="100" y="120" fontFamily="var(--serif)" fontStyle="italic" fontSize="11" textAnchor="middle" fill={inkDeep}>
            natural edge
          </text>
        </g>
      );
    case "finish":
      return (
        <g>
          <rect x="14" y="28" width="56" height="84" fill="rgba(150,110,75,0.55)" />
          <rect x="72" y="28" width="56" height="84" fill="rgba(110,72,42,0.78)" />
          <rect x="130" y="28" width="56" height="84" fill="rgba(70,40,20,0.95)" />
          <rect x="135" y="30" width="6" height="80" fill="rgba(255,240,210,0.18)" />
          <text x="42" y="125" fontFamily="var(--mono)" fontSize="7" textAnchor="middle" fill={inkDeep} letterSpacing="0.08em">
            RAW
          </text>
          <text x="100" y="125" fontFamily="var(--mono)" fontSize="7" textAnchor="middle" fill={inkDeep} letterSpacing="0.08em">
            1 COAT
          </text>
          <text x="158" y="125" fontFamily="var(--mono)" fontSize="7" textAnchor="middle" fill={inkDeep} letterSpacing="0.08em">
            3 COATS
          </text>
          <text x="100" y="20" fontFamily="var(--serif)" fontStyle="italic" fontSize="10" textAnchor="middle" fill={inkDeep}>
            tung oil
          </text>
        </g>
      );
    case "apron":
      return (
        <g>
          <rect x="22" y="50" width="156" height="22" fill={wood} />
          <rect x="22" y="50" width="156" height="3" fill={woodDark} />
          <path d="M28 75 L36 75 L40 122 L24 122 Z" fill={woodDark} />
          <path d="M164 75 L172 75 L176 122 L160 122 Z" fill={woodDark} />
          <rect x="34" y="56" width="8" height="10" fill="none" stroke={inkDeep} strokeWidth="0.6" strokeDasharray="2 2" />
          <rect x="158" y="56" width="8" height="10" fill="none" stroke={inkDeep} strokeWidth="0.6" strokeDasharray="2 2" />
          <text x="100" y="44" fontFamily="var(--mono)" fontSize="7" textAnchor="middle" fill={inkDeep} letterSpacing="0.1em">
            M&amp;T · 5/8&quot; TENON
          </text>
        </g>
      );
    case "grain":
      return (
        <g>
          <rect x="0" y="0" width="200" height="140" fill="rgba(95,55,30,0.9)" />
          {Array.from({ length: 14 }).map((_, i) => {
            const y = 8 + i * 9.5;
            const wob = (i % 3) * 2;
            return (
              <path
                key={i}
                d={`M0 ${y} Q40 ${y - 2 + wob} 80 ${y + 1} T200 ${y + wob / 2}`}
                stroke="rgba(40,22,10,0.7)"
                strokeWidth={i % 4 === 0 ? "1" : "0.4"}
                fill="none"
                opacity={0.5 + (i % 3) * 0.15}
              />
            );
          })}
          <ellipse cx="140" cy="55" rx="9" ry="5" fill="rgba(30,15,5,0.9)" />
          <ellipse cx="140" cy="55" rx="5" ry="2.5" fill="rgba(15,8,2,1)" />
        </g>
      );
    case "sketch":
      return (
        <g>
          <g stroke={inkDeep} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M52 38 L148 38 L150 42 L50 42 Z" />
            <path d="M58 42 L58 96 M142 42 L142 96" />
            <path d="M58 96 L62 122 M62 122 L54 122 M58 96 L52 122" />
            <path d="M142 96 L138 122 M138 122 L146 122 M142 96 L148 122" />
            <line x1="58" y1="74" x2="142" y2="74" />
            <circle cx="100" cy="58" r="2" fill={inkDeep} />
          </g>
          <g stroke={inkDeep} strokeWidth="0.7" opacity="0.5">
            <path d="M40 50 L40 90 M36 52 L40 50 L44 52 M36 88 L40 90 L44 88" />
          </g>
          <text
            x="32"
            y="72"
            fontFamily="var(--serif)"
            fontStyle="italic"
            fontSize="9"
            fill={inkDeep}
            transform="rotate(-90 32 72)"
          >
            24&quot;
          </text>
          <text x="100" y="20" fontFamily="var(--serif)" fontStyle="italic" fontSize="11" textAnchor="middle" fill={ink}>
            napkin sketch
          </text>
        </g>
      );
    default:
      return null;
  }
}
