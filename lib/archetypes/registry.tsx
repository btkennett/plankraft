import type { ArchetypeId } from "@/lib/plan/types";
import type { ArchetypeRenderer } from "./types";
import GenericExplodedView from "./GenericExplodedView";

interface ArchetypeConfig {
  /** Italic hand-written annotation rendered in sketch mode (bottom-right corner). */
  sketchAnnotation?: string[];
  /** Human-readable label used in chrome / future UI. */
  label: string;
}

const ARCHETYPES: Record<ArchetypeId, ArchetypeConfig | null> = {
  nightstand: {
    label: "Nightstand",
    sketchAnnotation: ["tapered legs,", "3° splay"],
  },
  bookshelf: {
    label: "Bookshelf",
    sketchAnnotation: ["12″ shelf spacing", "dado-housed"],
  },
  table: {
    label: "Table",
    sketchAnnotation: ["apron drops 4″", "M&T to legs"],
  },
  bench: {
    label: "Bench",
    sketchAnnotation: ["splayed legs,", "5° rake"],
  },
  box: {
    label: "Box",
    sketchAnnotation: ["half-blind dovetails", "all four corners"],
  },
  frame: null,
};

function makeRenderer(config: ArchetypeConfig): ArchetypeRenderer {
  return (props) => <GenericExplodedView {...props} sketchAnnotation={config.sketchAnnotation} />;
}

const RENDERERS: Record<ArchetypeId, ArchetypeRenderer | null> = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([id, cfg]) => [id, cfg ? makeRenderer(cfg) : null]),
) as Record<ArchetypeId, ArchetypeRenderer | null>;

export function getArchetypeRenderer(id: ArchetypeId): ArchetypeRenderer | null {
  return RENDERERS[id];
}

export function getArchetypeLabel(id: ArchetypeId): string {
  return ARCHETYPES[id]?.label ?? id;
}

export const SUPPORTED_ARCHETYPES = (Object.keys(ARCHETYPES) as ArchetypeId[]).filter(
  (id) => ARCHETYPES[id] !== null,
);
