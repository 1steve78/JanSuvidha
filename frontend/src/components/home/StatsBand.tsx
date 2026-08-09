"use client";
import { Users, FileCheck, CheckCircle2, Clock } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerChild } from "@/components/ui/ScrollReveal";

export default function StatsBand() {
  const stats = [
    { label: "Citizens Assisted", value: "12,000+", icon: Users, iconBg: "bg-[#FFB932]/10 text-amber-500" },
    { label: "Schemes Listed", value: "850+", icon: FileCheck, iconBg: "bg-[#65a30d]/10 text-[#65a30d]" },
    { label: "Resolution Rate", value: "95%", icon: CheckCircle2, iconBg: "bg-[#FFB932]/10 text-amber-500" },
    { label: "Avg. Resolution", value: "3 Days", icon: Clock, iconBg: "bg-slate-50 text-slate-500" },
  ];

  return (
    <div className="space-y-5">
      <ScrollReveal preset="fade-down" className="text-left">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Platform Impact</span>
        <h3 className="text-xl font-bold text-slate-900 mt-1">Transparency &amp; Speed</h3>
      </ScrollReveal>

      <StaggerReveal className="grid grid-cols-2 gap-4" delay={0.1}>
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <StaggerChild key={i} preset="stagger-child-scale">
              <div className="p-5 rounded-3xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center shadow-sm hover:scale-[1.02] transition-transform">
                <div className={`w-9 h-9 rounded-full ${st.iconBg} flex items-center justify-center mb-2.5 shadow`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="text-2xl font-black tracking-tight text-slate-900">{st.value}</div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">{st.label}</div>
              </div>
            </StaggerChild>
          );
        })}
      </StaggerReveal>
    </div>
  );
}
