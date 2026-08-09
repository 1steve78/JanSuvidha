"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Download,
  RefreshCw,
  Activity
} from "lucide-react";
import { api } from "@/lib/api";
import StatsBand from "@/components/dashboard/StatsBand";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import ResolutionRateChart from "@/components/dashboard/ResolutionRateChart";

// ─────────────────────────────────────────────────────────────────────────────
// Main Public Dashboard Page
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [timeframe, setTimeframe] = useState<string>("30d");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [metricsData, setMetricsData] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayStr();
  const [startDate, setStartDate] = useState<string>("2026-08-01");
  const [endDate, setEndDate] = useState<string>(todayStr);

  const loadMetrics = async (days?: number) => {
    setIsRefreshing(true);
    try {
      const data = await api.getPublicDashboardMetrics(days);
      if (data) setMetricsData(data);
    } catch (err) {
      console.warn("Failed to load public metrics:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let days = undefined;
    if (timeframe === "7d") days = 7;
    else if (timeframe === "30d") days = 30;
    else if (timeframe === "90d") days = 90;
    
    loadMetrics(days);
  }, [timeframe]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePresetTimeframe = (tf: string) => {
    setTimeframe(tf);
    setShowDatePicker(false);
    const today = new Date();

    let days = 30;
    if (tf === "7d") days = 7;
    if (tf === "30d") days = 30;
    if (tf === "90d") days = 90;
    if (tf === "1y") days = 365;

    const start = new Date(today.getTime() - days * 24 * 3600 * 1000);
    const startStr = start.toISOString().split("T")[0];
    setStartDate(startStr);
    setEndDate(todayStr);
  };

  const handleRefresh = async () => {
    let days = undefined;
    if (timeframe === "7d") days = 7;
    else if (timeframe === "30d") days = 30;
    else if (timeframe === "90d") days = 90;
    await loadMetrics(days);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FBFF] flex items-center justify-center pt-[72px]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBFF] text-slate-900 pt-[72px]">
      <div className="flex-1 min-w-0 flex flex-col relative overflow-x-hidden">
        
        {/* ─────────── PUBLIC DASHBOARD METRICS VIEW ─────────── */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <Activity className="w-6 h-6 text-indigo-600" />
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Public Analytics Dashboard
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200/80">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Real-time grievance telemetry, category breakdown, and district-wide resolution metrics.
              </p>
            </div>

            {/* Actions & Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`p-1.5 rounded-lg flex items-center gap-1 font-bold transition-all ${
                    timeframe === "custom" || showDatePicker
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Select Custom Date Range"
                >
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Custom</span>
                </button>

                {["7d", "30d", "90d", "1y"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => handlePresetTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                      timeframe === tf
                        ? "bg-white text-indigo-600 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tf}
                  </button>
                ))}

                {showDatePicker && (
                  <div className="absolute right-0 top-12 z-50 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        Custom Date Range
                      </span>
                      <button
                        onClick={() => setShowDatePicker(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1.5 py-0.5 rounded"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          max={todayStr}
                          onChange={(e) => {
                            const val = e.target.value;
                            setStartDate(val > todayStr ? todayStr : val);
                            setTimeframe("custom");
                          }}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          min={startDate}
                          max={todayStr}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEndDate(val > todayStr ? todayStr : val);
                            setTimeframe("custom");
                          }}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>

                      <button
                        onClick={() => {
                          setTimeframe("custom");
                          setShowDatePicker(false);
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-lg text-xs transition-all shadow-xs"
                      >
                        Apply Range
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleRefresh}
                className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 transition-all text-xs flex items-center gap-1.5 shadow-xs"
                title="Refresh metrics"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
              </button>
            </div>
          </div>

          {/* Stats Summary Cards */}
          <StatsBand timeframe={timeframe} startDate={startDate} endDate={endDate} preAggregatedData={metricsData} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CategoryDonutChart timeframe={timeframe} startDate={startDate} endDate={endDate} preAggregatedData={metricsData?.categoryData} />
            <ResolutionRateChart timeframe={timeframe} startDate={startDate} endDate={endDate} preAggregatedData={metricsData?.barData} />
          </div>
        </div>
      </div>
    </div>
  );
}
