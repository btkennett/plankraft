import { SAMPLE_NIGHTSTAND } from "@/lib/plan/sample";
import PlanView from "./_components/PlanView";

export default function PlanPage() {
  // Phase 3: render the showpiece with the hardcoded nightstand plan.
  // Phase 4 wires AI generation; the page becomes /plan/[id] reading from URL hash.
  return <PlanView plan={SAMPLE_NIGHTSTAND} />;
}
