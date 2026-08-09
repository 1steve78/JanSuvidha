"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Copy,
  Check,
  ArrowLeft,
  RefreshCw,
  Building2,
  Search,
  Sparkles,
  Lock,
  FileCheck2
} from "lucide-react";
import { api } from "@/lib/api";

interface StatusTimelineProps {
  reportId: string;
}

export default function StatusTimeline({ reportId }: StatusTimelineProps) {
  const router = useRouter();
  const displayId = reportId ? decodeURIComponent(reportId) : "";

  const [searchInput, setSearchInput] = useState(displayId);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReport = async (id: string) => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    setIsRefreshing(true);
    try {
      const data = await api.trackReport(id);
      setReportData(data);
      setError("");
    } catch (err) {
      setError("Report not found or invalid ID.");
      setReportData(null);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReport(displayId);
  }, [displayId]);

  const samplePresets = [
    { id: "e9b25cc4-7e8c-4a30-9b81-abc123def456", label: "Sample ID (UUID format)" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/track/${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleRefresh = () => {
    fetchReport(displayId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Top Page Header matching Landing Page & Grievance Redressal Hero style */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold tracking-wide border border-blue-200/60 landing-shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Live Grievance Redressal Tracker</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
          Track Resolution Status With{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
            Real-Time Telemetry.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          Enter your Tracking Reference ID to inspect official nodal officer assignments, status transition logs, and resolution timestamps.
        </p>
      </div>

      {/* Trust Highlights Bar matching Landing Page & Grievance Redressal Trust Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50/80 text-blue-900 border border-blue-100 font-bold">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Instant Live Status Audit</span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-indigo-50/80 text-indigo-900 border border-indigo-100 font-bold">
          <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Cryptographic Hash Integrity</span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-50/80 text-emerald-900 border border-emerald-100 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Verified Government SLA Targets</span>
        </div>
      </div>

      {/* Search Input Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 landing-shadow-xl overflow-hidden">
        {/* Gradient Top Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="p-6 sm:p-8 space-y-4">
          <label htmlFor="track-id-input" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Enter Tracking Reference ID
          </label>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="track-id-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. e9b25cc4-7e8c-4a30-9b81-abc123def456"
                className="w-full pl-11 pr-4 py-3.5 text-sm font-mono font-bold rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-extrabold rounded-2xl transition-all landing-shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <span>Audit Status</span>
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Sample Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" /> Sample ID:
            </span>
            {samplePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSearchInput(preset.id);
                  router.push(`/track/${encodeURIComponent(preset.id)}`);
                }}
                className={`text-[11px] font-mono px-3 py-1 rounded-lg border transition-all ${
                  displayId === preset.id
                    ? "bg-blue-50 border-blue-300 text-blue-700 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {preset.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Timeline Results Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 landing-shadow-xl overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 p-6 text-white relative">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Verified Report Telemetry</span>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              title="Refresh live status"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-3">
            Grievance Resolution Progress
          </h2>

          {/* Copyable Reference ID Bar */}
          <div className="flex items-center justify-between gap-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-3.5 text-xs sm:text-sm font-mono font-bold text-white selection:bg-white selection:text-blue-900">
            <span className="truncate">{displayId || "No ID Specified"}</span>
            {displayId && (
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-bold rounded-xl transition-all shadow-xs shrink-0 ${
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-blue-900 hover:bg-blue-50"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-blue-600" /> Copy ID
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Timeline Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Fetching live report status...</p>
            </div>
          ) : error || !reportData ? (
            <div className="py-12 flex flex-col items-center text-center space-y-3">
              <div className="p-4 rounded-full bg-rose-50 text-rose-500 border border-rose-200">
                <FileCheck2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Report Found</h3>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                We couldn't find a report matching ID "{displayId}". Please double-check your tracking code or submit a new grievance.
              </p>
            </div>
          ) : (
            <>
              {/* Category Summary Header Badge */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 capitalize">Category: {reportData.category.replace("_", " ")}</p>
                    <p className="text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> {reportData.location || "Location not specified"}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full font-extrabold text-xs border shrink-0 capitalize self-start sm:self-auto ${
                    reportData.status === "resolved"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : reportData.status === "under_review" || reportData.status === "in_progress"
                      ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }`}
                >
                  {reportData.status.replace("_", " ")}
                </span>
              </div>

              {/* Vertical Resolution Timeline */}
              <div className="relative pl-6 sm:pl-8 space-y-8 py-2">
                <div className="absolute left-[17px] sm:left-[25px] top-4 bottom-4 w-0.5 bg-slate-200 pointer-events-none" />

                {reportData.status_logs?.map((log: any, index: number) => {
                  const isCurrent = index === reportData.status_logs.length - 1;
                  const isCompleted = !isCurrent;

                  return (
                    <div key={log.id} className="relative flex items-start gap-4 group">
                      <div className="absolute -left-[24px] sm:-left-[32px] top-0.5 z-10 flex items-center justify-center">
                        {isCompleted && (
                          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white">
                            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                        {isCurrent && (
                          <div className="relative flex items-center justify-center">
                            <span className="absolute w-9 h-9 rounded-full bg-blue-500/30 animate-ping" />
                            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-bold text-xs ring-4 ring-blue-100">
                              <Clock className="w-4 h-4 stroke-[2.5]" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`flex-1 p-4.5 rounded-2xl border transition-all duration-200 ${
                          isCurrent
                            ? "bg-blue-50/70 border-blue-200 shadow-xs ring-1 ring-blue-300"
                            : "bg-slate-50/60 border-slate-200/80"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h3 className={`text-base font-extrabold capitalize ${isCurrent ? "text-blue-900" : "text-slate-900"}`}>
                            {log.status.replace("_", " ")}
                          </h3>
                          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> {new Date(log.changed_at).toLocaleString()}
                          </span>
                        </div>
                        {log.officer_note && (
                          <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                            {log.officer_note}
                          </p>
                        )}
                        {isCurrent && reportData.escalated && (
                          <p className="text-xs font-bold text-rose-600 mt-2">
                            ⚠️ Priority Escalated to Municipal Zonal Nodal Officer.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Footer Action Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href="/report"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Submit New Grievance
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all landing-shadow-sm"
            >
              View Public Transparency Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
