"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Wheat, HeartPulse, Home, Flame, Landmark, GraduationCap, HardHat } from "lucide-react";

export default function TrustStrip() {
  const schemes = [
    {
      name: "PM-KISAN",
      desc: "Farmers Income Support",
      icon: Wheat,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      name: "Ayushman Bharat",
      desc: "PM-JAY Health Shield",
      icon: HeartPulse,
      color: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      name: "PM Awas Yojana",
      desc: "Affordable Housing",
      icon: Home,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      name: "PM Ujjwala Yojana",
      desc: "Clean LPG Cooking Fuel",
      icon: Flame,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      name: "Jan Dhan Yojana",
      desc: "Direct Benefit Banking",
      icon: Landmark,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      name: "National Scholarship",
      desc: "Higher Education Aid",
      icon: GraduationCap,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      name: "MGNREGA",
      desc: "Rural Work Guarantee",
      icon: HardHat,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-900">
              Trust Dashboard
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Real Government Welfare
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Direct matching against official central and state government database rules:
        </p>

        {/* Scheme Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <div
                key={scheme.name}
                className={`p-3 rounded-2xl border ${scheme.color} flex flex-col items-center text-center group hover:shadow-sm transition-all`}
              >
                <div className="p-2 rounded-xl bg-white shadow-sm mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {scheme.name}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {scheme.desc}
                </div>
              </div>
            );
          })}

          <Link
            href="/match"
            className="p-3 rounded-2xl border border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-100/60 text-blue-700 flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="text-[10px] text-blue-600/80">850+ Schemes</div>
          </Link>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 text-center">
        <Link
          href="/match"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>View All Schemes & Criteria</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
