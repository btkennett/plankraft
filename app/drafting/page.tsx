import ScreenStub from "@/components/ScreenStub";

export default function DraftingPage() {
  return (
    <ScreenStub
      eyebrow="IV / IV"
      phase="Phase 4"
      headline={
        <>
          Drafting the{" "}
          <em style={{ color: "var(--sienna)", fontStyle: "italic" }}>plan.</em>
        </>
      }
      subtitle="Reading your brief, sourcing proportions, calculating cuts, optimizing yield, drafting assembly."
      back={{ href: "/measurements", label: "Measurements" }}
      next={{ href: "/plan", label: "See plan" }}
    />
  );
}
