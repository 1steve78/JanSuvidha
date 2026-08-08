"use client";

import React, { useState } from "react";
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
  FileText,
  Sparkles,
} from "lucide-react";

import { useEffect } from "react";
import { api } from "@/lib/api";

interface StatusStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "current" | "pending";
  officerNote?: string;
}

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

  // Quick preset sample tracking IDs for instant testing
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
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Search Input Section — Take Input From User */}
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-md space-y-3">
        <label htmlFor="track-id-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Enter Your Tracking Reference ID
        </label>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="track-id-input"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. JSV-2026-8942-X9K"
              className="w-full pl-10 pr-4 py-3 text-sm font-mono font-semibold rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-2xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
          >
            <span>Track</span>
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" /> Sample IDs:
          </span>
          {samplePresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setSearchInput(preset.id);
                router.push(`/track/${encodeURIComponent(preset.id)}`);
              }}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
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

      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Live Redressal Tracker</span>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Grievance Resolution Progress
          </h1>

          {/* Copyable Reference ID Bar */}
          <div className="flex items-center justify-between gap-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-3 text-xs sm:text-sm font-mono font-bold text-white selection:bg-white selection:text-blue-900">
            <span className="truncate">{displayId}</span>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold rounded-xl transition-all shadow-xs shrink-0 ${
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
          </div>
        </div>
      </div>

      {/* Main Single Centered Card */}
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-slate-500 font-medium">Fetching report status...</p>
          </div>
        ) : error || !reportData ? (
          <div className="py-10 flex flex-col items-center text-center space-y-3">
            <div className="p-4 rounded-full bg-rose-50 text-rose-500 mb-2">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Report Found</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              We couldn't find a report with that tracking ID. Please check the ID and try again.
            </p>
          </div>
        ) : (
          <>
            {/* Report Category Summary Badge Header */}
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 capitalize">Category: {reportData.category.replace("_", " ")}</p>
                  <p className="text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-blue-600" /> {reportData.location || "Location not provided"}
                  </p>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full font-bold text-[11px] border shrink-0 capitalize ${
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

            {/* Vertical Timeline */}
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
                      className={`flex-1 p-4 rounded-2xl border transition-all duration-200 ${
                        isCurrent
                          ? "bg-blue-50/70 border-blue-200 shadow-sm ring-1 ring-blue-300"
                          : "bg-slate-50/60 border-slate-200/80"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h3 className={`text-base font-bold capitalize ${isCurrent ? "text-blue-900" : "text-slate-900"}`}>
                          {log.status.replace("_", " ")}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(log.changed_at).toLocaleString()}
                        </span>
                      </div>
                      {isCurrent && reportData.escalated && (
                        <p className="text-xs font-semibold text-rose-600 mt-2">
                          ⚠️ This report has been flagged for priority escalation due to age.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer Navigation Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/report"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> File New Report
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
