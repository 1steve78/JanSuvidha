"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white flex flex-col items-center w-full h-full">
      {/* Indian tricolour gradient splash — top corners */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(255,185,50,0.35) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(30,160,30,0.25) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 40%, #ffffff 90%)" }} />
      </div>

      {/* Text content */}
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative w-full flex flex-col items-center pt-8 lg:pt-12 pb-6"
        style={{ zIndex: 1 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.08] mb-5">
          Claim your rights,<br />build your future
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed mb-9">
          Take control of your civic life by discovering welfare schemes you qualify for and ensuring your grievances are heard securely.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/match"
            className="w-full sm:w-auto bg-white text-slate-700 font-medium px-8 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all text-base shadow-sm"
          >
            Browse Schemes
          </Link>
          <Link
            href="/report"
            className="w-full sm:w-auto bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-medium px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all text-base"
          >
            Report Grievance
          </Link>
        </div>
      </div>

      {/* Illustration — fills remaining height */}
      <div className="w-full relative flex-1 overflow-hidden flex justify-center" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white to-transparent z-10" />
        <Image
          src="/images/welfare_illustration.jpg"
          alt="Public welfare community illustration"
          width={1200}
          height={420}
          className="w-full max-w-5xl h-full object-contain object-bottom mix-blend-darken"
          priority
        />
      </div>
    </section>
  );
}
