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
  const displayId = reportId ? decodeURIComponent(reportId) : "JSV-2026-8942-X9K";

  const [searchInput, setSearchInput] = useState(displayId);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Quick preset sample tracking IDs for instant testing
  const samplePresets = [
    { id: "JSV-2026-8942-X9K", label: "In Progress (Default)" },
    { id: "JSV-2026-1042-A1B", label: "Under Review" },
    { id: "JSV-2026-9900-Z99", label: "Resolved" },
  ];

  // Dynamic timeline generator based on input tracking ID
  const getTimelineSteps = (id: string): { steps: StatusStep[]; currentBadge: string; category: string; location: string } => {
    const isResolved = id.includes("Z99") || id.toLowerCase().includes("resolved");
    const isUnderReview = id.includes("A1B") || id.toLowerCase().includes("review");

    if (isResolved) {
      return {
        category: "Safety Hazard",
        location: "Sector 12, Janakpuri, New Delhi",
        currentBadge: "Resolved",
        steps: [
          {
            id: "submitted",
            title: "Submitted",
            description: "Grievance report received and cryptographically logged into central registry.",
            timestamp: "Aug 6, 2026 • 10:00 AM",
            status: "completed",
          },
          {
            id: "under_review",
            title: "Under Review",
            description: "Validated by system triage and assigned to Nodal Safety Officer.",
            timestamp: "Aug 6, 2026 • 11:30 AM",
            status: "completed",
            officerNote: "Assigned to Safety Officer: M. Verma",
          },
          {
            id: "in_progress",
            title: "In Progress",
            description: "Field hazard containment team deployed.",
            timestamp: "Aug 7, 2026 • 09:00 AM",
            status: "completed",
            officerNote: "Hazard repair completed and safety certification issued.",
          },
          {
            id: "resolved",
            title: "Resolved",
            description: "Issue successfully resolved and citizen feedback verified.",
            timestamp: "Aug 7, 2026 • 04:15 PM",
            status: "completed",
            officerNote: "Audit log closed with high satisfaction rating.",
          },
        ],
      };
    }

    if (isUnderReview) {
      return {
        category: "Corruption / Official Misconduct",
        location: "Zone 3 Municipal Registry Office",
        currentBadge: "Under Review",
        steps: [
          {
            id: "submitted",
            title: "Submitted",
            description: "Grievance report received and cryptographically logged into central registry.",
            timestamp: "Aug 8, 2026 • 08:30 AM",
            status: "completed",
          },
          {
            id: "under_review",
            title: "Under Review",
            description: "Report forwarded to Vigilance Officer for initial assessment.",
            timestamp: "Aug 8, 2026 • 10:15 AM",
            status: "current",
            officerNote: "Preliminary evidence review underway by Internal Audit.",
          },
          {
            id: "in_progress",
            title: "In Progress",
            description: "Formal inquiry committee action and statement recording.",
            timestamp: "Est. Aug 9, 2026",
            status: "pending",
          },
          {
            id: "resolved",
            title: "Resolved",
            description: "Final disposition report published and disciplinary action enforced.",
            timestamp: "Est. Aug 11, 2026",
            status: "pending",
          },
        ],
      };
    }

    // Default "In Progress" timeline
    return {
      category: "Civic Issue",
      location: "Sector 4, Connaught Place, New Delhi",
      currentBadge: "In Progress",
      steps: [
        {
          id: "submitted",
          title: "Submitted",
          description: "Grievance report received and cryptographically logged into central registry.",
          timestamp: "Aug 8, 2026 • 09:15 AM",
          status: "completed",
        },
        {
          id: "under_review",
          title: "Under Review",
          description: "Validated by system triage and assigned to Nodal Grievance Officer.",
          timestamp: "Aug 8, 2026 • 10:30 AM",
          status: "completed",
          officerNote: "Assigned to District Officer: R. Sharma (Public Works Department)",
        },
        {
          id: "in_progress",
          title: "In Progress",
          description: "Field inspection team dispatched to site for physical verification and corrective action.",
          timestamp: "Aug 8, 2026 • 02:45 PM",
          status: "current",
          officerNote: "Inspection report filed. Repair crew scheduled for morning deployment.",
        },
        {
          id: "resolved",
          title: "Resolved",
          description: "Issue resolved, site photographic proof uploaded, and audit closed.",
          timestamp: "Est. Completion: Aug 9, 2026",
          status: "pending",
        },
      ],
    };
  };

  const { steps, currentBadge, category, location } = getTimelineSteps(displayId);

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
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
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
        {/* Report Category Summary Badge Header */}
        <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Category: {category}</p>
              <p className="text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-blue-600" /> {location}
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] border shrink-0 ${
              currentBadge === "Resolved"
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : currentBadge === "Under Review"
                ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                : "bg-amber-100 text-amber-800 border-amber-200"
            }`}
          >
            {currentBadge}
          </span>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 py-2">
          {/* Vertical Connecting Guide Line */}
          <div className="absolute left-[17px] sm:left-[25px] top-4 bottom-4 w-0.5 bg-slate-200 pointer-events-none" />

          {steps.map((step) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";
            const isPending = step.status === "pending";

            return (
              <div key={step.id} className="relative flex items-start gap-4 group">
                {/* Step Node Marker Icon */}
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

                  {isPending && (
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center shadow-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    </div>
                  )}
                </div>

                {/* Step Content Box */}
                <div
                  className={`flex-1 p-4 rounded-2xl border transition-all duration-200 ${
                    isCurrent
                      ? "bg-blue-50/70 border-blue-200 shadow-sm ring-1 ring-blue-300"
                      : isCompleted
                      ? "bg-slate-50/60 border-slate-200/80"
                      : "bg-white border-slate-100 opacity-60"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3
                      className={`text-base font-bold ${
                        isCurrent
                          ? "text-blue-900"
                          : isCompleted
                          ? "text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {step.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  {/* Officer Note snippet if available */}
                  {step.officerNote && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-white/80 border border-slate-200/70 text-[11px] text-slate-700 flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800">Officer Note: </span>
                        <span>{step.officerNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
