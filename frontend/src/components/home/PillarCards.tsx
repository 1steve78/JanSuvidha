"use client";

import Link from "next/link";
import { Search, Megaphone, ClipboardCheck, ArrowRight } from "lucide-react";

export default function PillarCards() {
  const pillars = [
    {
      id: "match",
      title: "Find Schemes",
      subtitle: "Discover and apply for schemes instantly",
      href: "/match",
      bgColor: "bg-blue-50/80 border-blue-200/80 hover:border-blue-400 hover:shadow-lg",
      iconBg: "bg-blue-600 text-white",
      hoverTextColor: "group-hover:text-blue-600",
      icon: Search,
    },
    {
      id: "report",
      title: "Report Issue",
      subtitle: "Report a public issue to your local authority",
      href: "/report",
      bgColor: "bg-emerald-50/80 border-emerald-200/80 hover:border-emerald-400 hover:shadow-lg",
      iconBg: "bg-emerald-600 text-white",
      hoverTextColor: "group-hover:text-emerald-600",
      icon: Megaphone,
    },
    {
      id: "track",
      title: "Track Status",
      subtitle: "Monitor the status of your application",
      href: "/track",
      bgColor: "bg-amber-50/80 border-amber-200/80 hover:border-amber-400 hover:shadow-lg",
      iconBg: "bg-amber-500 text-white",
      hoverTextColor: "group-hover:text-amber-600",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with decorative lines matching mockup */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-slate-300" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide text-center">
            Choose Your Path
          </h2>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-slate-300" />
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.id}
                href={pillar.href}
                className={`group p-6 rounded-2xl border transition-all duration-300 flex items-center gap-5 ${pillar.bgColor}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold text-slate-900 ${pillar.hoverTextColor} transition-colors`}>
                      {pillar.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-snug">
                    {pillar.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
