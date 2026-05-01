"use client";

import { getArchetypeRenderer } from "@/lib/archetypes/registry";
import type { ArchetypeId, ExplodedPart, PlanStyle } from "@/lib/plan/types";

interface Props {
  archetype: ArchetypeId;
  parts: ExplodedPart[];
  style: PlanStyle;
  activePartId: string | null;
  onPartHover: (id: string | null) => void;
  widthCallout?: number;
}

const TOOL_LABELS = [
  { icon: "↔", title: "Pan", active: true },
  { icon: "↻", title: "Rotate", active: false },
  { icon: "⊕", title: "Zoom", active: false },
  { icon: "◫", title: "Section", active: false },
];

export default function ExplodedCanvas({
  archetype,
  parts,
  style,
  activePartId,
  onPartHover,
  widthCallout,
}: Props) {
  const Renderer = getArchetypeRenderer(archetype);
  const toolColor = style === "blueprint" ? "var(--blue-ink)" : "var(--ink)";
  const stampColor = style === "blueprint" ? "var(--blue-cyan)" : "var(--sienna)";

  return (
    <div className={`s5-canvas ${style}`}>
      <div className="s5-canvas-toolbar">
        {TOOL_LABELS.map((t) => (
          <button
            key={t.title}
            type="button"
            className={`s5-canvas-tool ${t.active ? "active" : ""}`}
            title={t.title}
            style={{ color: toolColor }}
          >
            {t.icon}
          </button>
        ))}
      </div>

      {Renderer ? (
        <Renderer
          parts={parts}
          style={style}
          activePartId={activePartId}
          onPartHover={onPartHover}
          widthCallout={widthCallout}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-faint)",
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Archetype &ldquo;{archetype}&rdquo; renderer coming in Phase 6
        </div>
      )}

      <div
        className="s5-canvas-meta"
        style={{ color: style === "blueprint" ? "var(--blue-ink)" : "var(--ink-soft)" }}
      >
        <div>
          <span className="acc" style={{ color: stampColor }}>
            EXPLODED ISO
          </span>
        </div>
        <div>30° axonometric</div>
        <div>Scale 1 : 6</div>
      </div>

      <div className="s5-canvas-stamp">
        <span className="stamp" style={{ color: stampColor, borderColor: stampColor }}>
          Plate I · of III
        </span>
      </div>
    </div>
  );
}
