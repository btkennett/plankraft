"use client";

import { useState } from "react";
import { getArchetypeRenderer } from "@/lib/archetypes/registry";
import type { ArchetypeId, ExplodedPart, PlanStyle } from "@/lib/plan/types";

interface Props {
  archetype: ArchetypeId;
  parts: ExplodedPart[];
  style: PlanStyle;
  activePartId: string | null;
  highlightedPartIds?: string[] | null;
  onPartHover: (id: string | null) => void;
  widthCallout?: number;
}

export default function ExplodedCanvas({
  archetype,
  parts,
  style,
  activePartId,
  highlightedPartIds,
  onPartHover,
  widthCallout,
}: Props) {
  const Renderer = getArchetypeRenderer(archetype);
  const toolColor = style === "blueprint" ? "var(--blue-ink)" : "var(--ink)";
  const stampColor = style === "blueprint" ? "var(--blue-cyan)" : "var(--sienna)";
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  return (
    <div className={`s5-canvas ${style}`}>
      <div className="s5-canvas-toolbar">
        <button
          type="button"
          className="s5-canvas-tool active"
          title="Reset view"
          style={{ color: toolColor }}
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
        >
          ⊙
        </button>
        <button
          type="button"
          className="s5-canvas-tool"
          title="Zoom in"
          style={{ color: toolColor }}
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
        >
          ⊕
        </button>
        <button
          type="button"
          className="s5-canvas-tool"
          title="Zoom out"
          style={{ color: toolColor }}
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
        >
          ⊖
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: "transform 0.18s ease-out",
        }}
      >
        {Renderer ? (
          <Renderer
            parts={parts}
            style={style}
            activePartId={activePartId}
            highlightedPartIds={highlightedPartIds ?? null}
            onPartHover={onPartHover}
            widthCallout={widthCallout}
          />
        ) : (
          <div
            style={{
              color: "var(--ink-faint)",
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Archetype &ldquo;{archetype}&rdquo; not yet rendered
          </div>
        )}
      </div>

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
        <div>{(zoom * 100).toFixed(0)}% zoom</div>
      </div>

      <div className="s5-canvas-stamp">
        <span className="stamp" style={{ color: stampColor, borderColor: stampColor }}>
          № {String(parts.length).padStart(2, "0")} parts
        </span>
      </div>
    </div>
  );
}
