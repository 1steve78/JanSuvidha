"use client";

import { Sparkles, Cpu, MapPin, Eye, FileCheck } from "lucide-react";

export default function MissionStatement() {
  return (
    <section className="py-16 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why This Platform Exists</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            Bridging the gap between citizens and government rights through intelligent automation and community accountability.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Millions of eligible citizens miss out on vital government welfare schemes due to complex rules, while local civic issues go unresolved. JanSuvidha unifies both under one transparent platform.
          </p>
        </div>

        {/* Two Linked Modules Explanation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Module 1: Scheme Matcher */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 border border-blue-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md">
              <Cpu className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/80 px-2.5 py-1 rounded-md">
              Module 1
            </span>

            <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2">
              Scheme Matcher (AI/ML Powered)
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Recommends government welfare schemes a citizen is eligible for using an advanced ML model trained on rule-derived government data, featuring explainable output so you know exactly why you qualify.
            </p>

            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Rule-derived AI eligibility scoring</span>
              </li>
              <li className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>Transparent & explainable eligibility breakdown</span>
              </li>
            </ul>
          </div>

          {/* Module 2: Grievance Redressal */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-6 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
              Module 2
            </span>

            <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2">
              Grievance Redressal
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Anonymous, geotagged civic and safety issue reporting with public, real-time trackable resolution status — holding local authorities accountable.
            </p>

            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Geotagged location proof & anonymous posting</span>
              </li>
              <li className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>Public resolution tracking timeline</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
