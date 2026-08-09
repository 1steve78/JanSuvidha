"use client";

import React, { useState, useEffect } from "react";
import {
  Radio,
  Signal,
  Siren,
  BadgeCheck,
  FileLock2,
  BarChart3,
  Shield,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function PlatformFeatures() {
  // Simulating real-time telemetry updates for live hero card
  const [livePulseIndex, setLivePulseIndex] = useState(0);

  const telemetryEvents = [
    { id: 1, text: "Grievance #8942 marked RESOLVED in Ward 4", time: "Just now", badge: "Live SLA" },
    { id: 2, text: "Scheme Match score calculated (98% Match)", time: "2s ago", badge: "AI Match" },
    { id: 3, text: "Encrypted Document Vault verified by User", time: "5s ago", badge: "Encrypted" },
    { id: 4, text: "District Fund Telemetry updated for Q3", time: "12s ago", badge: "Audit Sync" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulseIndex((prev) => (prev + 1) % telemetryEvents.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [telemetryEvents.length]);

  return (
    <section id="features" className="relative py-20 overflow-hidden bg-slate-50/50">
      {/* Background Technical Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          {/* Centered Badge Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>PLATFORM FEATURES</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Engineered for Civic Justice &amp; Citizen Empowerment
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Secure, accountable, and intelligence-driven tools built for district-wide transparency.
          </p>
        </div>

        {/* 2. Bento Grid Showcase Layout (grid-cols-1 md:grid-cols-3 gap-6) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Primary Hero Card (Spans 2 columns on desktop) */}
          <div className="col-span-1 md:col-span-2 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30 p-6 sm:p-8 sm:py-9 relative overflow-hidden shadow-[0_0_35px_rgba(37,99,235,0.18)] hover:border-blue-400/50 transition-all duration-500 flex flex-col justify-between group">
            {/* Ambient Background Glow inside hero card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Corner Circuit Graphic Overlay */}
            <div className="absolute top-4 right-4 opacity-20 pointer-events-none hidden sm:block">
              <Signal className="w-24 h-24 text-blue-400 stroke-[1]" />
            </div>

            {/* Hero Top Bar */}
            <div className="relative flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                </span>
                <span>LIVE MONITOR</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-blue-300/70">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>DISTRICT TELEMETRY ACTIVE</span>
              </div>
            </div>

            {/* Hero Main Content */}
            <div className="relative my-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-blue-400 shadow-inner group-hover:scale-105 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                  <Radio className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Real-Time Status Grid
                  </h3>
                  <span className="text-xs font-mono text-blue-300/80 uppercase tracking-widest">
                    District Telemetry Hub
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Transparent telemetry tracking live updates on scheme applications, grievance resolution, and civic reports across your district.
              </p>
            </div>

            {/* Live Interactive Telemetry Preview Widget inside Hero */}
            <div className="relative my-2 p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20 backdrop-blur-md shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-2 font-mono text-blue-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Telemetry Feed
                </span>
                <span className="text-[11px] font-mono text-slate-400">Ward 1 - 12 Active</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {telemetryEvents[livePulseIndex].badge}
                  </span>
                  <p className="text-slate-200 font-medium truncate">
                    {telemetryEvents[livePulseIndex].text}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-mono text-slate-400">
                  {telemetryEvents[livePulseIndex].time}
                </span>
              </div>
            </div>

            {/* Hero Footer Pills */}
            <div className="relative pt-4 flex flex-wrap items-center gap-2 sm:gap-3 border-t border-white/10">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-950/70 px-3.5 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-sm group-hover:border-blue-400/40 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>• Live status pulses</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-950/70 px-3.5 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-sm group-hover:border-blue-400/40 transition-colors">
                <span>• District-wide visibility</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-950/70 px-3.5 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-sm group-hover:border-blue-400/40 transition-colors">
                <span>• Real-time analytics</span>
              </div>
            </div>
          </div>

          {/* Secondary Feature Card 1: Grievance Redressal */}
          <div className="col-span-1 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 relative overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-full">
                  FIELD OPERATIONS
                </span>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 group-hover:scale-110 group-hover:bg-rose-100 group-hover:text-rose-700 transition-all duration-300">
                  <Siren className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Grievance Redressal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                Anonymous, geotagged civic and safety reporting with transparent resolution SLA tracking and real-time authority dispatch.
              </p>
            </div>

            {/* Highlights Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Geotagged evidence &amp; media attachments</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Public resolution SLA countdown</span>
              </div>
            </div>
          </div>

          {/* Secondary Feature Card 2: Scheme Matching Engine */}
          <div className="col-span-1 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 relative overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full">
                  INTELLIGENCE UNIT
                </span>
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-300">
                  <BadgeCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Scheme Matching Engine
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                Rule-derived AI scanning official welfare datasets to calculate instant, explainable eligibility scores tailored to your profile.
              </p>
            </div>

            {/* Highlights Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Explainable AI scoring breakdown</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Official government rule datasets</span>
              </div>
            </div>
          </div>

          {/* Secondary Feature Card 3: Document Vault */}
          <div className="col-span-1 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 relative overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                  SECURE VAULT
                </span>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-all duration-300">
                  <FileLock2 className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Document Vault
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                End-to-end encrypted storage for identity certificates, income proofs, and legal records with zero third-party data sharing.
              </p>
            </div>

            {/* Highlights Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Bank-grade encryption standard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Granular consent &amp; zero 3rd party access</span>
              </div>
            </div>
          </div>

          {/* Secondary Feature Card 4: District Dashboard */}
          <div className="col-span-1 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 relative overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-full">
                  TRANSPARENCY DESK
                </span>
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-all duration-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                District Dashboard
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                Comprehensive district-level telemetry surfacing resolution velocity, fund distribution metrics, and municipal performance.
              </p>
            </div>

            {/* Highlights Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Resolution velocity tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Public fund telemetry &amp; audit trail</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
