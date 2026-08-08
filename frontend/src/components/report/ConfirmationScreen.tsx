"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ShieldCheck, Clock, MapPin, FileText, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

export interface SubmittedReportData {
  trackingId: string;
  category: string;
  description: string;
  photoName?: string;
  locationText: string;
  createdAt: string;
}

interface ConfirmationScreenProps {
  data: SubmittedReportData;
  onReset: () => void;
}

export default function ConfirmationScreen({ data, onReset }: ConfirmationScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-2">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border-4 border-emerald-50 shadow-sm">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Grievance Report Submitted
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your issue has been securely encrypted and logged. You can monitor the live resolution status anytime using your unique tracking ID below.
        </p>
      </div>

      {/* Copyable Tracking ID Hero Card matching Landing Page Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 border border-blue-500 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-100">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> Anonymous Tracking Reference ID
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30">
              Active Log
            </span>
          </div>

          {/* Copyable Code Block Box */}
          <div className="flex items-center justify-between gap-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 font-mono text-lg sm:text-xl font-bold text-white tracking-widest selection:bg-white selection:text-blue-900 shadow-inner">
            <span className="truncate">{data.trackingId}</span>

            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-sans font-semibold rounded-xl transition-all duration-200 shadow-sm ${
                copied
                  ? "bg-emerald-500 text-white scale-105"
                  : "bg-white text-blue-900 hover:bg-blue-50"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-blue-600" /> Copy Code
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-blue-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Save or copy this tracking ID to check real-time resolution updates anytime.
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
          Submitted Report Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Category</span>
            <span className="font-bold text-slate-900 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
              {data.category}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Timestamp</span>
            <span className="font-semibold text-slate-800 inline-flex items-center gap-1.5 py-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {data.createdAt}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-slate-500 block mb-1">Geotagged Location</span>
            <span className="font-semibold text-slate-800 inline-flex items-center gap-1.5 py-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" /> {data.locationText}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-slate-500 block mb-1">Description</span>
            <p className="p-3.5 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed border border-slate-200/80">
              {data.description}
            </p>
          </div>

          {data.photoName && (
            <div className="sm:col-span-2">
              <span className="text-slate-500 block mb-1">Attached Evidence</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                <FileText className="w-3.5 h-3.5" /> {data.photoName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons matching Landing Page */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href={`/track?id=${encodeURIComponent(data.trackingId)}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Track Resolution Status <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all shadow-xs"
        >
          <RotateCcw className="w-4 h-4" /> Report Another Issue
        </button>
      </div>
    </div>
  );
}
