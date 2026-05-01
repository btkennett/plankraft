import ScreenStub from "@/components/ScreenStub";

export default function PlanPage() {
  return (
    <ScreenStub
      eyebrow="PLAN · № 042"
      phase="Phase 3"
      headline={
        <>
          Walnut{" "}
          <em style={{ color: "var(--sienna)", fontStyle: "italic" }}>nightstand.</em>
        </>
      }
      subtitle="One drawer. Tapered legs. Nothing else. The hero plan view comes online in Phase 3."
      back={{ href: "/", label: "Home" }}
    />
  );
}
