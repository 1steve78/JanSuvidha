// Page 3 — Results (/match/results)
// Ranked, color-coded scheme cards with confidence bar + eligibility reasons + doc checklist
import ResultsSummary from "@/components/results/ResultsSummary";
import SchemeCard from "@/components/results/SchemeCard";

export default function MatchResultsPage() {
  return (
    <>
      <ResultsSummary />
      {/* map matched schemes -> <SchemeCard key={scheme.id} scheme={scheme} /> */}
    </>
  );
}
