export type ArchetypeId =
  | "nightstand"
  | "bookshelf"
  | "table"
  | "bench"
  | "box"
  | "frame";

export type PlanStyle = "sketch" | "blueprint" | "render";
export type ToolStatus = "OWN" | "NEED" | "BUILD";

export interface Cut {
  id: string; // single letter A, B, C…
  name: string;
  spec: string;
  w: number;
  h: number;
  t: number;
  qty: number;
}

export interface Step {
  title: string;
  meta: string;
}

export interface BoardPiece {
  cutId: string;
  label: string;
  width: number;
  isWaste?: boolean;
}

export interface BoardLayout {
  spec: string; // "8/4 WALNUT · 8' × 10″ × 1¾″"
  pieces: BoardPiece[];
  yield: number; // 0–100
  fill?: string; // optional override per board
}

export interface BomItem {
  label: string;
  price: number;
}

export interface Tool {
  name: string;
  status: ToolStatus;
  note?: string;
}

export interface ExplodedPart {
  cutId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  offsetX?: number;
  offsetY?: number;
}

export interface Plan {
  number: number; // 042
  archetype: ArchetypeId;
  draftedSeconds: number;
  title: { lead: string; emphasis: string }; // "Walnut" + "nightstand."
  subtitle: string; // "One drawer. Tapered legs. Nothing else."

  banner: {
    footprint: { w: number; d: number; h: number; unit: "in" };
    buildHours: number;
    skill: string;
    sessions: number;
    materialCost: number;
    materialSummary: string; // "Walnut · poplar · ply · oil"
  };

  cuts: Cut[];
  steps: Step[];
  lumber: BoardLayout[];
  bom: BomItem[];
  tools: Tool[];

  exploded: ExplodedPart[];

  meta: {
    revision: string; // "REV A"
    wood: string;
    joinery: string;
  };
}
