import type { ReactElement } from "react";
import type { ArchetypeId, ExplodedPart, PlanStyle } from "@/lib/plan/types";

export interface ArchetypeRendererProps {
  parts: ExplodedPart[];
  style: PlanStyle;
  activePartId: string | null;
  onPartHover: (id: string | null) => void;
  /** Top-piece dimension callout (inches). Optional — archetype renderer decides whether to draw it. */
  widthCallout?: number;
}

export type ArchetypeRenderer = (props: ArchetypeRendererProps) => ReactElement;

export type ArchetypeRegistry = Record<ArchetypeId, ArchetypeRenderer | null>;
