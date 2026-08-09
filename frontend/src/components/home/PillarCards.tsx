"use client";

import Link from "next/link";
import { Search, Megaphone, ClipboardCheck, ArrowRight } from "lucide-react";

export default function PillarCards() {
  const pillars = [
    {
      id: "match",
      title: "Find Schemes",
      description: "Discover government schemes tailored to your profile.",
      href: "/match",
      cardStyle: "hover:border-blue-400 hover:shadow-blue-500/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-500/20",
      hoverTitleColor: "group-hover:text-blue-600",
      hoverArrowColor: "group-hover:text-blue-600",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
      icon: Search,
    },
    {
      id: "report",
      title: "Report Issue",
      description: "Submit geotagged civic grievances directly to local authorities.",
      href: "/report",
      cardStyle: "hover:border-emerald-400 hover:shadow-emerald-500/10",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/20",
      hoverTitleColor: "group-hover:text-emerald-600",
      hoverArrowColor: "group-hover:text-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: Megaphone,
    },
    {
      id: "track",
      title: "Track Status",
      description: "Monitor your application or complaint status in real-time.",
      href: "/track",
      cardStyle: "hover:border-amber-400 hover:shadow-amber-500/10",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md shadow-amber-500/20",
      hoverTitleColor: "group-hover:text-amber-600",
      hoverArrowColor: "group-hover:text-amber-600",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-slate-300" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide text-center">
            Choose Your Path
          </h2>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-slate-300" />
        </div>

        {/* 3 Primary Action Cards Grid (grid-cols-1 md:grid-cols-3 gap-6) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.id}
                href={pillar.href}
                className={`group p-6 rounded-2xl bg-white/90 backdrop-blur border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${pillar.cardStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <ArrowRight className={`w-4 h-4 ${pillar.hoverArrowColor} group-hover:translate-x-1 transition-transform duration-300`} />
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold text-slate-900 ${pillar.hoverTitleColor} transition-colors duration-300`}>
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 font-normal mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className={`px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}>
                    Action Portal
                  </span>
                  <span className="text-slate-400 group-hover:text-slate-600 transition-colors flex items-center gap-1 font-medium">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
