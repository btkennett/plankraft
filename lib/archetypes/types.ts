import type { ReactElement } from "react";
import type { ArchetypeId, ExplodedPart, PlanStyle } from "@/lib/plan/types";

export interface ArchetypeRendererProps {
  parts: ExplodedPart[];
  style: PlanStyle;
  activePartId: string | null;
  /** Cuts to glow without making them the single active hover target.
   *  Used when a build step references multiple cuts. Null = none. */
  highlightedPartIds?: string[] | null;
  onPartHover: (id: string | null) => void;
  /** Top-piece dimension callout (inches). */
  widthCallout?: number;
}

export type ArchetypeRenderer = (props: ArchetypeRendererProps) => ReactElement;

export type ArchetypeRegistry = Record<ArchetypeId, ArchetypeRenderer | null>;
