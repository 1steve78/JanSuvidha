"use client";

import { FileText, Cpu, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Details",
      description: "Fill your household profile for scheme matching, or snap a geotagged photo of a civic issue.",
      icon: FileText,
      color: "from-blue-500 to-indigo-600",
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Our rule-based ML algorithm instantly calculates eligible schemes with clear eligibility reasoning.",
      icon: Cpu,
      color: "from-indigo-600 to-purple-600",
    },
    {
      number: "03",
      title: "Apply & Track",
      description: "Submit applications with 1-click or track your geotagged report until official resolution.",
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            How JanSuvidha Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Seamlessly access government benefits or resolve civic grievances in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 hover:shadow-md transition-shadow group flex flex-col items-start"
              >
                {/* Number Badge */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow connector between steps on medium screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
