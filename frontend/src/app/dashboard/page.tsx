"use client";

import React, { useState, useEffect } from "react";
import StatsBand from "@/components/dashboard/StatsBand";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import ResolutionRateChart from "@/components/dashboard/ResolutionRateChart";
import { api } from "@/lib/api";
import {
  ShieldAlert,
  Lock,
  UserCheck,
  Calendar,
  Download,
  RefreshCw,
  ArrowLeft,
  Clock,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Inbox
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<string>("30d");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  
  // Helper for formatted today string (YYYY-MM-DD)
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
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [dbReports, setDbReports] = useState<any[]>([]);

  const fetchReports = async () => {
    const token = localStorage.getItem("jan_suvidha_admin_auth_token");
    if (token) {
      try {
        const reports = await api.getAdminReports(token);
        setDbReports(reports);
      } catch (e) {
        console.error("Failed to load admin reports", e);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    // Check if admin token exists
    const token = localStorage.getItem("jan_suvidha_admin_auth_token");
    if (token) {
      setIsAdmin(true);
      fetchReports();
    }
  }, []);

  const handleAdminToggle = (status: boolean) => {
    setIsAdmin(status);
    if (!status) {
      localStorage.removeItem("jan_suvidha_admin_auth_token");
      localStorage.removeItem("jan_suvidha_admin_user");
    }
  };

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
    setIsRefreshing(true);
    await fetchReports();
    setIsRefreshing(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // -------------------------------------------------------------
  // NON-ADMIN ACCESS DENIED FALLBACK SCREEN
  // -------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-white flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Background decorative glows matching Hero/Report pages */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 text-center relative overflow-hidden">
          {/* Accent top border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-600" />

          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5 border border-rose-200/60">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-100/80 text-rose-800 mb-3 border border-rose-200/60">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Access Only</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            Access Restricted
          </h1>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            This analytics dashboard is reserved strictly for authorized municipal administrators and department officers. Normal user accounts do not have permission to view system metrics.
          </p>

          <div className="space-y-3">
            {/* Redirect to Admin Authentication Login Page */}
            <Link
              href="/admin/login"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 hover:from-blue-700 hover:to-indigo-700 active:bg-indigo-800 text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign In with Admin Credentials</span>
            </Link>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-3 rounded-xl border border-slate-200 transition-all text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home Page</span>
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-400">
            JanSuvidha Security & Access Control System
          </div>
        </div>
      </div>
    );
  }

  // Filter urgent/high priority database items (escalated = true)
  const urgentPriorityItems = dbReports.filter((r) => r.escalated === true);

  // -------------------------------------------------------------
  // ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-white text-slate-900">
      {/* Background decorative glows matching Hero & Report pages */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header Banner */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title & Badge */}
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Dashboard
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Real-time grievance telemetry, category breakdown, and officer resolution metrics
              </p>
            </div>

            {/* Actions & Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Timeframe & Custom Date Range Selector */}
              <div className="relative flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs">
                {/* Active Calendar Custom Range Button */}
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

                {/* Custom Date Range Popover */}
                {showDatePicker && (
                  <div className="absolute right-0 top-12 z-50 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        Custom Date Range (Past & Present Only)
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
                          Start Date (Past / Present)
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          max={todayStr}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val > todayStr) {
                              setStartDate(todayStr);
                            } else {
                              setStartDate(val);
                            }
                            setTimeframe("custom");
                          }}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          End Date (Past / Present)
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          min={startDate}
                          max={todayStr}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val > todayStr) {
                              setEndDate(todayStr);
                            } else {
                              setEndDate(val);
                            }
                            setTimeframe("custom");
                          }}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div className="text-[10px] text-slate-500 font-medium bg-indigo-50/50 p-2 rounded-lg border border-indigo-100">
                        Future dates disabled. You can only query past and present records up to today ({todayStr}).
                      </div>

                      <button
                        onClick={() => {
                          setTimeframe("custom");
                          setShowDatePicker(false);
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-lg text-xs transition-all shadow-xs"
                      >
                        Apply Date Range
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 transition-all text-xs flex items-center gap-1.5 shadow-xs"
                title="Refresh metrics"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
              </button>

              {/* Export report summary button */}
              <button
                onClick={() => alert("Downloading Admin Grievance Analytics Summary PDF/CSV...")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all text-xs shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>

              {/* Admin Logout / Exit Admin Mode */}
              <button
                onClick={() => handleAdminToggle(false)}
                className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 font-semibold px-3.5 py-2.5 rounded-xl transition-all text-xs"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Exit Admin</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Statistics Summary Cards */}
        <section>
          <StatsBand timeframe={timeframe} startDate={startDate} endDate={endDate} />
        </section>

        {/* Charts Grid: Category Donut & Resolution Bar Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryDonutChart timeframe={timeframe} startDate={startDate} endDate={endDate} />
          <ResolutionRateChart timeframe={timeframe} startDate={startDate} endDate={endDate} />
        </section>

        {/* Admin Action Queue / Recent High Priority Escalations */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs group hover:border-indigo-300 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-100">
            <div>
              <Link href="/admin/priority" className="inline-flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600">
                  Urgent Action Queue (Admin Priority)
                </h3>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs text-slate-500 mt-0.5">
                Click section or button below to view the dedicated priority management page.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200/80">
                {urgentPriorityItems.length} Urgent in DB
              </span>

              <Link
                href="/admin/priority"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl transition-all shadow-xs"
              >
                <span>Open Priority Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Database Driven Table (Strictly NO random data) */}
          {urgentPriorityItems.length === 0 ? (
            <div className="p-8 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200 space-y-3">
              <div className="mx-auto w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200">
                <Inbox className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800">
                  No Urgent Priority Records Found in Database
                </p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Only real records from your database or user submissions are rendered. No random/mock entries exist.
                </p>
              </div>
              <Link
                href="/admin/priority"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
              >
                <span>Go to Priority Queue Management</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-extrabold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Report ID</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-r-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {urgentPriorityItems.slice(0, 5).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-600">{item.id}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 max-w-xs truncate font-medium">{item.description}</td>
                      <td className="p-3 font-medium">{item.location}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                          <Clock className="w-3.5 h-3.5" /> {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href="/admin/priority"
                          className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-lg border border-indigo-200/60 transition-all inline-block"
                        >
                          Manage Priority
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
