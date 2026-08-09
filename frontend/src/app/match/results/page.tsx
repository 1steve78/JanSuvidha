"use client";

import { useState, useEffect } from "react";
import ResultsSummary from "@/components/results/ResultsSummary";
import SchemeCard from "@/components/results/SchemeCard";
import { useMatchStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Sparkles, ShieldCheck, FileCheck2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MatchResultsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const results = useMatchStore((state) => state.results);
  const router = useRouter();

  useEffect(() => {
    if (results.length === 0) {
      router.push("/match");
    }
  }, [results, router]);

  const filteredSchemes = results.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <div className="relative min-h-screen landing-page-grid py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative ambient backdrop glow matching Landing Page */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Results Banner Header */}
        <ResultsSummary
          totalEligible={filteredSchemes.length}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Ranked Scheme Cards Stream */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Ranked Scheme Recommendations ({filteredSchemes.length})</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Sorted by highest AI confidence score
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredSchemes.map((scheme, i) => (
              <SchemeCard key={scheme.id || i} scheme={scheme} />
            ))}
          </div>

          {filteredSchemes.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No matching schemes found in "{activeCategory}" category
              </h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                Try switching category filters to "All Schemes" or edit your economic profile inputs.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all landing-shadow-sm"
              >
                Show All Eligible Schemes
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <Link href="/match" className="font-bold text-indigo-600 hover:underline flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Recalculate Profile Inputs</span>
          </Link>
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified against 2026 Government Guidelines</span>
          </div>
        </div>
      </div>
    </div>
  );
}
