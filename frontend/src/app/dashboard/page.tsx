// Page 6 — Public Dashboard (/dashboard)
// Stats band + reports-by-category donut + resolution-rate-over-time bar chart (+ optional map)
import StatsBand from "@/components/dashboard/StatsBand";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import ResolutionRateChart from "@/components/dashboard/ResolutionRateChart";

export default function DashboardPage() {
  return (
    <>
      <StatsBand />
      <CategoryDonutChart />
      <ResolutionRateChart />
    </>
  );
}
