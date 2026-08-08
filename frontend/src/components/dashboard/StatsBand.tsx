"use client";

import React from "react";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";
import { getMetricsForDateRange } from "@/lib/dashboardMetrics";

interface StatsBandProps {
  reports?: any[];
  timeframe?: string;
  startDate?: string;
  endDate?: string;
}

export default function StatsBand({ reports = [], timeframe = "30d", startDate = "2026-07-09", endDate = "2026-08-08" }: StatsBandProps) {
  // Use real reports if provided, else fallback to mock metrics
  const mockMetrics = getMetricsForDateRange(startDate, endDate);
  
  const total = reports.length;
  const resolvedCount = reports.filter(r => r.status === "resolved").length;
  const urgentCount = reports.filter(r => r.escalated).length;
  const resRate = total > 0 ? ((resolvedCount / total) * 100).toFixed(1) : "0.0";
  const resRateStr = `${resRate}%`;
  const daysCount = mockMetrics.daysCount;
  
  const metrics = reports.length > 0 ? {
    total,
    resolvedCount,
    urgentCount,
    resRateStr,
    avgTimeStr: "2.1d", // Hardcoded avg time for now
    daysCount
  } : mockMetrics;

  const stats = [
    {
      id: "total-reports",
      label: "Total Reports Filed",
      value: metrics.total.toLocaleString(),
      change: "+12.4%",
      isPositive: true,
      subtext: `Past ${metrics.daysCount} day${metrics.daysCount > 1 ? "s" : ""} volume`,
      icon: FileText,
      iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      accentBorder: "border-indigo-500",
    },
    {
      id: "resolution-rate",
      label: "Resolution Rate",
      value: metrics.resRateStr,
      change: "+4.1%",
      isPositive: true,
      subtext: `${metrics.resolvedCount.toLocaleString()} cases resolved`,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      accentBorder: "border-emerald-500",
    },
    {
      id: "avg-time",
      label: "Avg. Resolution Time",
      value: metrics.avgTimeStr,
      change: "-18.5%",
      isPositive: true,
      subtext: "Faster than SLA target (2.5d)",
      icon: Clock,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      accentBorder: "border-blue-500",
    },
    {
      id: "pending-urgent",
      label: "High Priority Pending",
      value: metrics.urgentCount.toLocaleString(),
      change: "-8.7%",
      isPositive: true,
      subtext: "Requires officer dispatch",
      icon: AlertTriangle,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
      accentBorder: "border-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className="relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${stat.accentBorder}`} />
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {stat.label}
              </span>
              <div className={`p-2.5 rounded-xl ${stat.iconBg} transition-transform group-hover:scale-110`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </span>
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "bg-rose-50 text-rose-700 border border-rose-200/60"
                }`}
              >
                {stat.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 border-t border-slate-100 pt-2.5">
              <Activity className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{stat.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
