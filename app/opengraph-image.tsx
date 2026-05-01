import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Plankraft — AI woodworking plans";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (under next/og) does NOT understand oklch(); these hex values are
// approximations of the design tokens for thumbnail purposes.
const PAPER = "#ebe5d8";
const INK = "#3a342b";
const INK_SOFT = "#564c40";
const INK_FAINT = "#857c70";
const RULE = "#c7baa4";
const SIENNA = "#c47340";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          padding: "80px 96px",
          fontFamily: "Georgia, serif",
          color: INK,
          position: "relative",
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "ui-monospace, monospace",
            fontSize: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK_FAINT,
          }}
        >
          <div style={{ width: 10, height: 10, background: SIENNA, borderRadius: 999 }} />
          PLANKRAFT · VOL. I · № 042
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 132,
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            marginTop: 60,
          }}
        >
          A workshop&nbsp;
          <span style={{ display: "flex" }}>in your&nbsp;</span>
          <span style={{ fontStyle: "italic", color: SIENNA }}>pocket.</span>
        </div>

        {/* subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: INK_SOFT,
            lineHeight: 1.35,
            marginTop: 40,
            maxWidth: 880,
          }}
        >
          Describe a project. AI drafts the plan — cut list, exploded view, build sequence.
        </div>

        {/* footer rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 64,
            left: 96,
            right: 96,
            paddingTop: 22,
            borderTop: `1px solid ${RULE}`,
            fontFamily: "ui-monospace, monospace",
            fontSize: 14,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: INK_FAINT,
          }}
        >
          <span>Drafted by AI · Built by you</span>
          <span style={{ color: SIENNA }}>plankraft.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
