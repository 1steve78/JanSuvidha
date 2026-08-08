"use client";

import { useState } from "react";
import ResultsSummary from "@/components/results/ResultsSummary";
import SchemeCard from "@/components/results/SchemeCard";
import { MOCK_SCHEMES } from "@/lib/mockSchemes";

export default function MatchResultsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSchemes = MOCK_SCHEMES.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <ResultsSummary
          totalEligible={filteredSchemes.length}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">
              Ranked Scheme Recommendations ({filteredSchemes.length})
            </h2>
            <span className="text-xs text-slate-500">
              Sorted by highest confidence match score
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
          {filteredSchemes.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <p className="text-slate-400 font-bold text-lg">
                No schemes found under this category.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Show All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
