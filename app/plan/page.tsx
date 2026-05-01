import { SAMPLE_NIGHTSTAND } from "@/lib/plan/sample";
import { decodePlan } from "@/lib/plan/encode";
import PlanView from "./_components/PlanView";

interface Props {
  searchParams: Promise<{ d?: string }>;
}

export default async function PlanPage({ searchParams }: Props) {
  const sp = await searchParams;
  const fromUrl = sp.d ? decodePlan(sp.d) : null;
  const plan = fromUrl ?? SAMPLE_NIGHTSTAND;
  return <PlanView plan={plan} isSample={!fromUrl} />;
}
