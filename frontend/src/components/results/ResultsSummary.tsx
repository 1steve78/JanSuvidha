"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, SlidersHorizontal } from "lucide-react";
import clsx from "clsx";

interface ResultsSummaryProps {
  totalEligible: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Schemes" },
  { id: "health", label: "Health" },
  { id: "housing", label: "Housing" },
  { id: "education", label: "Education" },
  { id: "civic", label: "Civic" },
  { id: "safety", label: "Safety" },
];

export default function ResultsSummary({
  totalEligible,
  activeCategory,
  onSelectCategory,
}: ResultsSummaryProps) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-10 text-white overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/match"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Profile
          </Link>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Profile Verified · AI Analysis Complete
          </div>
        </div>

        {/* Label */}
        <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          Matched Results Summary
        </div>

        {/* Big Headline */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight">
            You&apos;re eligible for{" "}
            <span className="text-amber-300 underline decoration-wavy decoration-amber-400/60 underline-offset-4">
              {totalEligible}
            </span>{" "}
            government schemes.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Based on your income, occupation, state, and demographic profile — sorted by highest AI confidence score.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter:
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-xs font-semibold border border-transparent transition-all duration-200",
                  isActive
                    ? "bg-white text-slate-900 scale-105 shadow-md"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
