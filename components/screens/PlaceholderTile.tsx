import TileArt, { type TileKind } from "./TileArt";

interface PlaceholderTileProps {
  label: string;
  hue?: number;
  kind: TileKind;
}

export default function PlaceholderTile({ label, hue = 60, kind }: PlaceholderTileProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, oklch(0.88 0.025 ${hue}) 0%, oklch(0.80 0.035 ${hue}) 100%)`,
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 140"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <TileArt kind={kind} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.14em",
          color: "rgba(0,0,0,0.35)",
          textTransform: "uppercase",
        }}
      >
        ref · {String(hue).padStart(3, "0")}
      </div>
      <div className="s2-placeholder" style={{ color: "var(--ink)", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}
