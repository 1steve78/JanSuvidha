"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-transparent pt-8 pb-16 lg:py-20">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold tracking-wide border border-blue-200/60 landing-shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Unified Welfare & Grievance Redressal Platform</span>
            </div>

            {/* Main Headline matching user requirement & image */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Every Citizen Deserves Access to What{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                They’re Owed.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              Discover welfare schemes you qualify for, report public issues, and track every request — all in one place.
            </p>

            {/* Dual Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/match"
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-xl landing-shadow-md landing-shadow-md-hover transition-all flex items-center justify-center gap-2.5 text-base group"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Find My Schemes</span>
              </Link>

              <Link
                href="/report"
                className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-300 landing-shadow-sm landing-shadow-sm-hover hover:border-slate-400 transition-all flex items-center justify-center gap-2.5 text-base"
              >
                <ShieldAlert className="w-5 h-5 text-emerald-600" />
                <span>Grievance Redressal</span>
              </Link>
            </div>

            {/* Key trust bullets */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ML-Powered Matcher</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Anonymous Geotagged Reporting</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image of Rural Community */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden landing-shadow-xl border-4 border-white bg-white group">
                <Image
                  src="/images/hero_family.jpg"
                  alt="Happy rural Indian family using digital tablet for welfare scheme access"
                  width={600}
                  height={450}
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Overlay Badge on Hero image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 landing-shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Empowerment</div>
                    <div className="text-sm font-bold text-slate-900">Empowering 12,000+ rural households nationwide</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
