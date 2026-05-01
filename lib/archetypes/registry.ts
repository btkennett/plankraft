import type { ArchetypeId } from "@/lib/plan/types";
import type { ArchetypeRenderer } from "./types";
import NightstandRenderer from "./nightstand";

// Phase 3: only the nightstand archetype is implemented.
// Phase 6 will add bookshelf, table, bench, box, frame.
export const ARCHETYPE_RENDERERS: Record<ArchetypeId, ArchetypeRenderer | null> = {
  nightstand: NightstandRenderer,
  bookshelf: null,
  table: null,
  bench: null,
  box: null,
  frame: null,
};

export function getArchetypeRenderer(id: ArchetypeId): ArchetypeRenderer | null {
  return ARCHETYPE_RENDERERS[id];
}
