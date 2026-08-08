"use client";

import { Users, FileCheck, CheckCircle2, Clock } from "lucide-react";

export default function StatsBand() {
  const stats = [
    {
      label: "Citizens Assisted",
      value: "12,000+",
      icon: Users,
      bg: "bg-blue-100/80 border-blue-200 text-blue-900",
      iconBg: "bg-blue-600 text-white",
    },
    {
      label: "Schemes Listed",
      value: "850+",
      icon: FileCheck,
      bg: "bg-emerald-100/80 border-emerald-200 text-emerald-900",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      label: "Resolution Rate",
      value: "95%",
      icon: CheckCircle2,
      bg: "bg-amber-100/80 border-amber-200 text-amber-900",
      iconBg: "bg-amber-500 text-white",
    },
    {
      label: "Avg. Resolution Time",
      value: "3 Days",
      icon: Clock,
      bg: "bg-purple-100/80 border-purple-200 text-purple-900",
      iconBg: "bg-purple-600 text-white",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-left">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Platform Impact
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-1">
          Transparency & Speed
        </h3>
      </div>

      {/* 2x2 Bubble Grid matching the mockup circles */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className={`p-5 sm:p-6 rounded-3xl border flex flex-col items-center justify-center text-center shadow-sm hover:scale-[1.02] transition-transform ${st.bg}`}
            >
              <div className={`w-10 h-10 rounded-full ${st.iconBg} flex items-center justify-center mb-3 shadow`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">
                {st.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold opacity-80 mt-1">
                {st.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
