import { z } from "zod";

// Single-source-of-truth schema for an AI-generated Plan.
// Server: streamObject({ schema: PlanSchema })
// Client: experimental_useObject({ schema: PlanSchema })
// The TS Plan type in ./types.ts mirrors this; both must stay in sync.

const ArchetypeId = z.enum(["nightstand", "bookshelf", "table", "bench", "box", "frame"]);

const Cut = z.object({
  id: z.string().regex(/^[A-Z]$/, "single uppercase letter"),
  name: z.string(),
  spec: z.string(),
  w: z.number(),
  h: z.number(),
  t: z.number(),
  qty: z.number().int().positive(),
});

const Step = z.object({
  title: z.string(),
  meta: z.string(),
});

const BoardPiece = z.object({
  cutId: z.string(),
  label: z.string(),
  width: z.number(),
  isWaste: z.boolean().optional(),
});

const BoardLayout = z.object({
  spec: z.string(),
  yield: z.number().min(0).max(100),
  fill: z.string().optional(),
  pieces: z.array(BoardPiece),
});

const BomItem = z.object({
  label: z.string(),
  price: z.number(),
});

const Tool = z.object({
  name: z.string(),
  status: z.enum(["OWN", "NEED", "BUILD"]),
  note: z.string().optional(),
});

const ExplodedPart = z.object({
  cutId: z.string(),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  label: z.string().optional(),
  offsetX: z.number().optional(),
  offsetY: z.number().optional(),
});

export const PlanSchema = z.object({
  number: z.number().int().min(1).max(999),
  archetype: ArchetypeId,
  draftedSeconds: z.number().int().positive(),
  title: z.object({
    lead: z.string(),
    emphasis: z.string(),
  }),
  subtitle: z.string(),
  banner: z.object({
    footprint: z.object({
      w: z.number(),
      d: z.number(),
      h: z.number(),
      unit: z.literal("in"),
    }),
    buildHours: z.number(),
    skill: z.string(),
    sessions: z.number().int().positive(),
    materialCost: z.number(),
    materialSummary: z.string(),
  }),
  cuts: z.array(Cut),
  steps: z.array(Step),
  lumber: z.array(BoardLayout),
  bom: z.array(BomItem),
  tools: z.array(Tool),
  exploded: z.array(ExplodedPart),
  meta: z.object({
    revision: z.string(),
    wood: z.string(),
    joinery: z.string(),
  }),
});

export const PlanInputSchema = z.object({
  brief: z.string().min(1),
  dim: z.object({
    w: z.string(),
    d: z.string(),
    h: z.string(),
  }),
  wood: z.string(),
  joinery: z.string(),
  skill: z.string(),
  references: z
    .array(
      z.object({
        url: z.string(),
        label: z.string().optional(),
        tags: z.array(z.string()),
      }),
    )
    .optional(),
  activeTags: z.array(z.string()).optional(),
});

export type PlanInput = z.infer<typeof PlanInputSchema>;
