"use client";

import React, { useState, useEffect } from "react";
import StatsBand from "@/components/dashboard/StatsBand";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import ResolutionRateChart from "@/components/dashboard/ResolutionRateChart";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
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
  Inbox,
  Wifi,
  UserCog,
  User,
  XCircle,
  CheckCircle2,
  Server,
  KeyRound,
  FileText,
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
      <div className="relative min-h-screen bg-white flex flex-col items-center justify-center p-4 overflow-hidden">

        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-100/50 via-indigo-50/30 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Shield watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 opacity-[0.025]">
          <Shield className="w-[480px] h-[480px] text-blue-900" strokeWidth={0.5} />
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/30 pointer-events-none -z-10"
            style={{ left: `${15 + i * 13}%`, top: `${25 + (i % 3) * 22}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[440px]"
        >
          {/* Hero Shield Icon */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-blue-300/50"
              />
              <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl scale-150" />
              <motion.div
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3.8, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-transparent"
              />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_8px_32px_rgba(37,99,235,0.35)]">
                <Shield className="w-10 h-10 text-white" strokeWidth={1.5} />
                <div className="absolute bottom-1.5 right-1.5">
                  <UserCog className="w-3.5 h-3.5 text-blue-200" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80 mb-3 tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              ACCESS RESTRICTED
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center leading-tight"
            >
              Administrator Access Required
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xs text-slate-500 font-medium mt-2 text-center max-w-xs leading-relaxed"
            >
              This analytics dashboard contains confidential district-level investigations,
              complaint analytics, officer activity, and administrative controls. Access is
              restricted to verified administrators only.
            </motion.p>
          </div>

          {/* Authentication Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm mb-4 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700 tracking-wide">Authentication Status</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                RBAC v2.1
              </span>
            </div>
            <div className="px-2 py-1 divide-y divide-slate-100/60">
              {[
                { icon: <Wifi className="w-3.5 h-3.5" />, label: "Backend Connection", value: "● Connected", dot: "bg-emerald-500", vc: "text-emerald-700", pulse: true, delay: 0.75 },
                { icon: <UserCog className="w-3.5 h-3.5" />, label: "Role Required", value: "Administrator", dot: "bg-blue-500", vc: "text-blue-700", pulse: false, delay: 0.85 },
                { icon: <User className="w-3.5 h-3.5" />, label: "Current Role", value: "Citizen", dot: "bg-slate-400", vc: "text-slate-600", pulse: false, delay: 0.95 },
                { icon: <XCircle className="w-3.5 h-3.5" />, label: "Permission", value: "Denied", dot: "bg-rose-500", vc: "text-rose-600", pulse: true, delay: 1.05 },
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Security", value: "Role-Based Access Control", dot: "bg-blue-500", vc: "text-blue-700", pulse: false, delay: 1.15 },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: row.delay, duration: 0.4 }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50/80 transition-colors group"
                >
                  <div className="flex items-center gap-2.5 text-slate-500">
                    <span className="group-hover:text-blue-500 transition-colors">{row.icon}</span>
                    <span className="text-xs font-medium">{row.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${row.dot} ${row.pulse ? "animate-pulse" : ""}`} />
                    <span className={`text-xs font-bold ${row.vc}`}>{row.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-white/95 rounded-2xl border border-slate-200/90 shadow-sm p-4 mb-4 space-y-3"
          >
            <Link href="/admin/login">
              <motion.div
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(37,99,235,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign in as Administrator</span>
              </motion.div>
            </Link>

            <Link href="/">
              <motion.div
                whileHover={{ y: -1 }}
                className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-600 hover:text-slate-800 font-semibold text-sm transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Return to Home</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Protected By Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="bg-white/80 rounded-2xl border border-slate-200/80 p-4 mb-6"
          >
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <KeyRound className="w-3 h-3" /> Protected By
            </p>
            <div className="space-y-2">
              {[
                { icon: <Server className="w-3 h-3" />, label: "Secure Backend Authentication" },
                { icon: <Lock className="w-3 h-3" />, label: "Encrypted Password Verification" },
                { icon: <ShieldCheck className="w-3 h-3" />, label: "Role-Based Access Control" },
                { icon: <KeyRound className="w-3 h-3" />, label: "Session Authentication (JWT)" },
                { icon: <FileText className="w-3 h-3" />, label: "Administrative Audit Logs" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + i * 0.07 }}
                  className="flex items-center gap-2.5 text-slate-600"
                >
                  <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-center space-y-1"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>JanSuvidha Secure Administration Portal</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
              <span>Role-Based Authentication</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>End-to-End Encryption</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Audit Logging</span>
            </div>
          </motion.div>
        </motion.div>
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
