"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { CATEGORY_COLORS } from "@/lib/constants";
import { PieChart as PieIcon, Info } from "lucide-react";
import { getMetricsForDateRange } from "@/lib/dashboardMetrics";

// Category colors matching application theme
const CATEGORY_COLOR_MAP: Record<string, string> = {
  "Civic Issue": CATEGORY_COLORS.civic || "#6366f1",
  "Corruption": CATEGORY_COLORS.housing || "#f59e0b",
  "Safety": CATEGORY_COLORS.safety || "#1e3a8a",
  "Harassment": CATEGORY_COLORS.health || "#ec4899",
  "Health": "#10b981",
  "Housing": "#8b5cf6",
};

interface CategoryDonutChartProps {
  reports?: any[];
  timeframe?: string;
  startDate?: string;
  endDate?: string;
}

export default function CategoryDonutChart({
  reports = [],
  timeframe = "30d",
  startDate = "2026-07-09",
  endDate = "2026-08-08"
}: CategoryDonutChartProps) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mockMetrics = getMetricsForDateRange(startDate, endDate);
  
  let categoryData = mockMetrics.categoryData;
  let totalReports = mockMetrics.total;

  if (reports.length > 0) {
    totalReports = reports.length;
    const counts: Record<string, number> = {};
    reports.forEach(r => {
      const cat = (r.category || "").replace("_", " ");
      const formattedCat = cat.split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      counts[formattedCat] = (counts[formattedCat] || 0) + 1;
    });
    categoryData = Object.keys(counts).map(name => ({
      name,
      value: counts[name],
      percentage: ((counts[name] / totalReports) * 100).toFixed(1) + "%"
    }));
  }

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs h-[420px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100" />
          <div className="h-4 w-36 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }

  // Custom light tooltip renderer for Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const color = CATEGORY_COLOR_MAP[data.name] || "#6366f1";
      return (
        <div className="bg-white text-slate-900 p-3 rounded-xl shadow-xl border border-slate-200 text-xs z-50">
          <div className="flex items-center gap-2 font-bold mb-1.5 pb-1 border-b border-slate-100">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span>{data.name}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-600">
            <span>Total Cases:</span>
            <span className="font-bold text-slate-900">{data.value.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-600">
            <span>Share of Total:</span>
            <span className="font-bold text-indigo-600">{data.percentage}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between h-[420px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Reports by Category
            </h3>
            <p className="text-xs text-slate-500">
              {mockMetrics.daysCount} day{mockMetrics.daysCount > 1 ? "s" : ""} date range breakdown ({startDate} to {endDate})
            </p>
          </div>
        </div>
        <div className="group relative">
          <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-56 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-lg z-50">
            Hover over donut slices to inspect detailed report volume by category.
          </div>
        </div>
      </div>

      {/* Chart container with center donut label */}
      <div className="relative flex-1 w-full min-h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {categoryData.map((entry, index) => {
                const color = CATEGORY_COLOR_MAP[entry.name] || "#6366f1";
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={color}
                    stroke="none"
                    className="transition-all duration-200 cursor-pointer hover:opacity-85"
                  />
                );
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside donut hole */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-900">
            {totalReports.toLocaleString()}
          </span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Reports
          </span>
        </div>
      </div>

      {/* Custom category color legend */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
        {categoryData.map((item) => {
          const color = CATEGORY_COLOR_MAP[item.name] || "#6366f1";
          return (
            <div key={item.name} className="flex items-center gap-1.5 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-slate-700 font-semibold truncate">
                {item.name}
              </span>
              <span className="text-slate-400 text-[10px] ml-auto font-medium">
                {item.percentage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
