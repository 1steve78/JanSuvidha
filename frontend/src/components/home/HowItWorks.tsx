"use client";

import { FileText, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Details",
      description: "Fill household profile or snap geotagged photo",
      icon: FileText,
      badge: "Step 1",
      softIconBg: "bg-blue-50 text-blue-600 border-blue-100",
      numberColor: "text-blue-600",
      hoverBorder: "hover:border-blue-300 hover:shadow-blue-500/10",
    },
    {
      number: "02",
      title: "Get Matched",
      description: "AI/Rule engine calculates eligible schemes & reasoning",
      icon: Cpu,
      badge: "Step 2",
      softIconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      numberColor: "text-indigo-600",
      hoverBorder: "hover:border-indigo-300 hover:shadow-indigo-500/10",
    },
    {
      number: "03",
      title: "Apply & Track",
      description: "1-click submission with direct tracking ID",
      icon: CheckCircle2,
      badge: "Step 3",
      softIconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      numberColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-300 hover:shadow-emerald-500/10",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          {/* Subtitle Pill */}
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/80 shadow-sm">
            <span>SIMPLE 3-STEP PROCESS</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Seamless Access to Civic Benefits
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            How JanSuvidha unifies citizen empowerment and grievance resolution in three simple steps.
          </p>
        </div>

        {/* 3-Step Connected Cards Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Horizontal Dashed Connector Line (Visible on Desktop) */}
          <div 
            className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] border-t-2 border-dashed border-slate-300 pointer-events-none z-0" 
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative bg-white/95 backdrop-blur p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group z-10 ${step.hoverBorder}`}
              >
                <div>
                  {/* Top Bar: Soft Icon Container + Large Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-2xl border ${step.softIconBg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Large Step Number in bold vibrant accent blue/indigo */}
                    <span className={`text-4xl sm:text-5xl font-black ${step.numberColor} tracking-tighter opacity-90 group-hover:opacity-100 transition-opacity`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 font-normal mt-2.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="uppercase tracking-wider font-mono text-[11px] text-slate-500">
                    {step.badge}
                  </span>
                  {idx < steps.length - 1 ? (
                    <span className="hidden md:flex items-center gap-1 text-slate-400 font-normal">
                      Next step
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-medium">Ready to start</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
