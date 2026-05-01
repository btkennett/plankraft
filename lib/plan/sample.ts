import type { Plan } from "./types";

// Sample plan for the design's reference project — walnut nightstand.
// Used as Phase 3 fixture; replaced by AI-streamed plans in Phase 4.
export const SAMPLE_NIGHTSTAND: Plan = {
  number: 42,
  archetype: "nightstand",
  draftedSeconds: 28,
  title: { lead: "Walnut", emphasis: "nightstand." },
  subtitle: "One drawer. Tapered legs. Nothing else.",

  banner: {
    footprint: { w: 22, d: 16, h: 24, unit: "in" },
    buildHours: 14,
    skill: "Intermediate",
    sessions: 3,
    materialCost: 214,
    materialSummary: "Walnut · poplar · ply · oil",
  },

  cuts: [
    { id: "A", name: "Top panel", spec: "8/4 walnut, jointed glue-up", w: 22, h: 16, t: 1.0, qty: 1 },
    { id: "B", name: "Side panels", spec: "4/4 walnut", w: 16, h: 22, t: 0.75, qty: 2 },
    { id: "C", name: "Back panel", spec: "¼ walnut ply", w: 21, h: 22, t: 0.25, qty: 1 },
    { id: "D", name: "Bottom shelf", spec: "4/4 walnut", w: 21, h: 15, t: 0.75, qty: 1 },
    { id: "E", name: "Drawer front", spec: "4/4 walnut", w: 19.5, h: 5.25, t: 0.75, qty: 1 },
    { id: "F", name: "Drawer sides", spec: "½ poplar", w: 14, h: 5, t: 0.5, qty: 2 },
    { id: "G", name: "Drawer back", spec: "½ poplar", w: 19, h: 4.5, t: 0.5, qty: 1 },
    { id: "H", name: "Drawer bottom", spec: "¼ ply", w: 18.5, h: 13.5, t: 0.25, qty: 1 },
    { id: "I", name: "Drawer runners", spec: "hardwood", w: 14, h: 0.75, t: 0.5, qty: 2 },
    { id: "J", name: "Tapered legs", spec: "8/4 walnut", w: 1.5, h: 22, t: 1.5, qty: 4 },
  ],

  steps: [
    { title: "Mill rough lumber square", meta: "joint · plane · rip · crosscut · 2.5 hr" },
    { title: "Glue up top panel", meta: "edge-joint, biscuit · 1 hr clamp + 24 hr cure" },
    { title: "Cut tapers on legs", meta: "tablesaw jig · 0.75 hr" },
    { title: "Cut dado for back panel", meta: "router or tablesaw · 0.5 hr" },
    { title: "Cut mortises in side panels", meta: "for stretcher tenons · 1.5 hr" },
    { title: "Dovetail drawer corners", meta: "hand-cut or jig · 2 hr" },
    { title: "Dry-fit & adjust", meta: "verify squareness · 0.5 hr" },
    { title: "Sand to 220 grit", meta: "all surfaces · 1.5 hr" },
    { title: "Apply oil finish", meta: "3 coats, 24 hr between · 1 hr active" },
    { title: "Install drawer & hardware", meta: "runners, pull · 0.5 hr" },
  ],

  lumber: [
    {
      spec: "8/4 WALNUT · 8' × 10″ × 1¾″",
      yield: 91,
      pieces: [
        { cutId: "A", label: "A · TOP", width: 22 },
        { cutId: "B", label: "B · SIDE", width: 22 },
        { cutId: "B", label: "B · SIDE", width: 22 },
        { cutId: "waste", label: "waste", width: 6, isWaste: true },
      ],
    },
    {
      spec: "4/4 WALNUT · 6' × 9″ × ¾″",
      yield: 94,
      fill: "oklch(0.5 0.06 50)",
      pieces: [
        { cutId: "D", label: "D · SHELF", width: 21 },
        { cutId: "E", label: "E · DRAW FRT", width: 19.5 },
        { cutId: "J", label: "J·LEG", width: 6 },
        { cutId: "J", label: "J·LEG", width: 6 },
        { cutId: "J", label: "J·LEG", width: 6 },
        { cutId: "J", label: "J·LEG", width: 6 },
        { cutId: "waste", label: "w.", width: 4, isWaste: true },
      ],
    },
  ],

  bom: [
    { label: "8/4 walnut, 8' × 10″", price: 92 },
    { label: "4/4 walnut, 6' × 9″", price: 58 },
    { label: "½″ poplar, 4'", price: 14 },
    { label: "¼″ walnut ply, 2×4", price: 28 },
    { label: "Brass pull, 3″", price: 12 },
    { label: "Tung oil, pint", price: 10 },
  ],

  tools: [
    { name: "Tablesaw", status: "OWN" },
    { name: "Jointer (or hand plane)", status: "OWN" },
    { name: "Planer", status: "OWN" },
    { name: "Router + ¼″ straight bit", status: "OWN" },
    { name: "Dovetail jig", note: "or hand chisels", status: "NEED" },
    { name: "Random-orbit sander", status: "OWN" },
    { name: "4× pipe clamps, 36″+", status: "NEED", note: "have 2" },
    { name: "Tapering jig", status: "BUILD" },
  ],

  // Exploded layout — viewBox 0..1000 square. Y increases downward.
  // Stack from bottom (legs) to top (top panel).
  exploded: [
    { cutId: "J", x: 220, y: 720, w: 30, h: 180, label: "J · leg", offsetX: -120, offsetY: 30 },
    { cutId: "J", x: 320, y: 740, w: 30, h: 180 },
    { cutId: "J", x: 650, y: 740, w: 30, h: 180 },
    { cutId: "J", x: 750, y: 720, w: 30, h: 180, label: "J ·×4", offsetX: 100, offsetY: 30 },
    { cutId: "D", x: 320, y: 670, w: 360, h: 30, label: "D · bottom shelf" },
    { cutId: "I", x: 340, y: 580, w: 100, h: 12, label: "I · runners ×2" },
    { cutId: "I", x: 560, y: 580, w: 100, h: 12 },
    { cutId: "H", x: 380, y: 520, w: 240, h: 14, label: "H · drawer bottom" },
    { cutId: "G", x: 380, y: 470, w: 240, h: 14, label: "G · drawer back" },
    { cutId: "F", x: 350, y: 420, w: 14, h: 100, label: "F · sides ×2" },
    { cutId: "F", x: 636, y: 420, w: 14, h: 100 },
    { cutId: "E", x: 380, y: 360, w: 240, h: 32, label: "E · drawer front" },
    { cutId: "B", x: 280, y: 250, w: 18, h: 240, label: "B · L side" },
    { cutId: "B", x: 702, y: 250, w: 18, h: 240, label: "B · R side" },
    { cutId: "C", x: 320, y: 200, w: 360, h: 14, label: "C · back" },
    { cutId: "A", x: 280, y: 100, w: 440, h: 24, label: "A · top panel" },
  ],

  meta: { revision: "REV A", wood: "Walnut", joinery: "Dovetail" },
};
