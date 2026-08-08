"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";
import { getMetricsForDateRange } from "@/lib/dashboardMetrics";

interface ResolutionRateChartProps {
  timeframe?: string;
  startDate?: string;
  endDate?: string;
}

export default function ResolutionRateChart({
  timeframe = "30d",
  startDate = "2026-07-09",
  endDate = "2026-08-08"
}: ResolutionRateChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const metrics = getMetricsForDateRange(startDate, endDate);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs h-[420px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded bg-slate-100" />
          <div className="h-4 w-40 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }

  // Custom light tooltip for dual bar inspection
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const received = payload.find((p: any) => p.dataKey === "received")?.value || 0;
      const resolved = payload.find((p: any) => p.dataKey === "resolved")?.value || 0;
      const rate = received > 0 ? ((resolved / received) * 100).toFixed(1) : 0;

      return (
        <div className="bg-white text-slate-900 p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs z-50">
          <p className="font-extrabold text-slate-800 mb-2 border-b border-slate-100 pb-1">
            Period: {label}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4 text-indigo-600 font-medium">
              <span>Received Reports:</span>
              <span className="font-bold">{received.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-emerald-600 font-medium">
              <span>Resolved Reports:</span>
              <span className="font-bold">{resolved.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-slate-900 pt-1.5 border-t border-slate-100">
              <span className="font-bold">Resolution Rate:</span>
              <span className="font-extrabold text-emerald-600">{rate}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between h-[420px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Resolution Rates Over Time
            </h3>
            <p className="text-xs text-slate-500">
              Volume of received vs. resolved grievances ({startDate} to {endDate})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200/60">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Avg. {metrics.resRateStr}</span>
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="w-full flex-1 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={metrics.barData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: "10px", fontSize: "12px", fontWeight: 600 }}
            />
            <Bar
              name="Reports Received"
              dataKey="received"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              name="Reports Resolved"
              dataKey="resolved"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Interval breakdown for {metrics.daysCount} day{metrics.daysCount > 1 ? "s" : ""}</span>
        <span className="font-bold text-slate-700">
          Target SLA Resolution: &gt; 80%
        </span>
      </div>
    </div>
  );
}
