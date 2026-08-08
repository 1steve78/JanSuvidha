"use client";

import { Sparkles } from "lucide-react";
import clsx from "clsx";

interface ConfidenceBarProps {
  confidence: number;
}

export default function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  const pct = Math.round(confidence * 100);

  const label =
    pct >= 90 ? "Strong Match" : pct >= 75 ? "Good Match" : "Moderate Match";

  const colors = {
    bar: pct >= 90 ? "bg-emerald-500" : pct >= 75 ? "bg-blue-500" : "bg-amber-400",
    badge:
      pct >= 90
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : pct >= 75
        ? "bg-blue-100 text-blue-700 border-blue-200"
        : "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <div className="space-y-2 py-2">
      {/* Label Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-slate-400" />
          AI Eligibility Score
        </div>
        <span
          className={clsx(
            "text-xs font-bold px-2.5 py-0.5 rounded-full border",
            colors.badge
          )}
        >
          {label} — {pct}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-700 ease-out",
            colors.bar
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
