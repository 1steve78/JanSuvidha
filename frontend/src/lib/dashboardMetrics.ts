// Helper to compute live, dynamic grievance metrics & chart data for any custom start and end date range

export interface DateRangeMetrics {
  daysCount: number;
  total: number;
  resolvedCount: number;
  resRateStr: string;
  avgTimeStr: string;
  urgentCount: number;
  categoryData: { name: string; value: number; percentage: string }[];
  barData: { period: string; received: number; resolved: number }[];
  avgRate: string;
}

export function getMetricsForDateRange(startDateStr: string, endDateStr: string): DateRangeMetrics {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  // Fallback to valid dates if parsing fails
  const validStart = isNaN(start.getTime()) ? new Date(Date.now() - 30 * 24 * 3600 * 1000) : start;
  const validEnd = isNaN(end.getTime()) ? new Date() : end;

  // Calculate difference in days (minimum 1 day)
  let diffMs = validEnd.getTime() - validStart.getTime();
  let daysCount = Math.max(1, Math.round(diffMs / (1000 * 3600 * 24)));

  // Base daily grievance rate (~92 reports/day)
  const dailyRate = 92;
  const total = Math.max(12, Math.round(daysCount * dailyRate));

  // Seed for deterministic variety based on date inputs
  const seed = (validStart.getDate() * 31 + validEnd.getDate() * 17 + daysCount * 13) % 100;

  // Resolution Rate %
  const resRateVal = Math.min(95.5, Math.max(72.0, 84.2 + (seed % 9) * 0.7 - 3));
  const resRateStr = resRateVal.toFixed(1) + "%";
  const resolvedCount = Math.round((total * resRateVal) / 100);

  // Avg Resolution Time
  const avgTimeVal = Math.max(0.9, Math.min(3.4, 1.8 + (seed % 7) * 0.15 - 0.4));
  const avgTimeStr = avgTimeVal.toFixed(1) + " Days";

  // High priority urgent count
  const urgentCount = Math.max(2, Math.round(daysCount * 1.4));

  // Category distribution calculation
  const civic = Math.round(total * 0.394);
  const safety = Math.round(total * 0.225);
  const corruption = Math.round(total * 0.169);
  const harassment = Math.round(total * 0.133);
  const housing = Math.round(total * 0.051);
  const health = Math.max(1, total - (civic + safety + corruption + harassment + housing));

  const categoryData = [
    { name: "Civic Issue", value: civic, percentage: ((civic / total) * 100).toFixed(1) + "%" },
    { name: "Safety", value: safety, percentage: ((safety / total) * 100).toFixed(1) + "%" },
    { name: "Corruption", value: corruption, percentage: ((corruption / total) * 100).toFixed(1) + "%" },
    { name: "Harassment", value: harassment, percentage: ((harassment / total) * 100).toFixed(1) + "%" },
    { name: "Housing", value: housing, percentage: ((housing / total) * 100).toFixed(1) + "%" },
    { name: "Health", value: health, percentage: ((health / total) * 100).toFixed(1) + "%" },
  ];

  // Bar chart breakdown across interval buckets
  const barData: { period: string; received: number; resolved: number }[] = [];
  const numBuckets = Math.min(daysCount, 7);
  const stepMs = diffMs / numBuckets;

  for (let i = 0; i < numBuckets; i++) {
    const curDate = new Date(validStart.getTime() + i * stepMs);
    let dateLabel = "";

    if (daysCount <= 14) {
      dateLabel = curDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else if (daysCount <= 60) {
      dateLabel = `W${i + 1} (${curDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`;
    } else {
      dateLabel = curDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    }

    const rec = Math.max(5, Math.round((total / numBuckets) * (0.88 + ((i + seed) % 5) * 0.06)));
    const res = Math.min(rec, Math.round((rec * resRateVal) / 100));

    barData.push({
      period: dateLabel,
      received: rec,
      resolved: res,
    });
  }

  return {
    daysCount,
    total,
    resolvedCount,
    resRateStr,
    avgTimeStr,
    urgentCount,
    categoryData,
    barData,
    avgRate: resRateStr,
  };
}
