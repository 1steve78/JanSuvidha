"use client";

import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import CivicJusticeUnifiedSection from "@/components/home/CivicJusticeUnifiedSection";
import StatsBand from "@/components/home/StatsBand";
import TrustStrip from "@/components/home/TrustStrip";
import Testimonial from "@/components/home/Testimonial";
import FAQAccordion from "@/components/home/FAQAccordion";
import MapWrapper from "@/components/dashboard/MapWrapper";
import Footer from "@/components/layout/Footer";
import FullPageScroller from "@/components/ui/FullPageScroller";
import { ScrollReveal, StaggerReveal, StaggerChild } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <FullPageScroller>
      {/* ── 0. HERO ── */}
      <div className="w-full h-full bg-white flex flex-col justify-center">
        <Hero />
      </div>

      {/* ── 1. CIVIC JUSTICE ── */}
      <div className="w-full min-h-full bg-slate-50">
        <CivicJusticeUnifiedSection />
      </div>

      {/* ── 2. PILLAR CARDS ── */}
      <div className="w-full min-h-full bg-white flex flex-col justify-center py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScrollReveal preset="fade-down" className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide text-center">
              Choose Your Path
            </h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300" />
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" delay={0.1}>
            <PillarCard
              id="match"
              title="Find Schemes"
              description="Discover government welfare schemes tailored to your household profile with AI-powered matching."
              href="/match"
              cardStyle="hover:border-blue-300"
              iconBg="bg-blue-50 text-blue-600 border border-blue-100"
              hoverColor="group-hover:text-blue-600"
              badgeColor="bg-blue-50 text-blue-700 border-blue-100"
              emoji="🔍"
            />
            <PillarCard
              id="report"
              title="Report Issue"
              description="Submit geo-tagged anonymous civic grievances directly to local authorities — no identity revealed."
              href="/report"
              cardStyle="hover:border-[#65a30d]/40"
              iconBg="bg-[#65a30d]/10 text-[#65a30d] border border-[#65a30d]/20"
              hoverColor="group-hover:text-emerald-600"
              badgeColor="bg-emerald-50 text-emerald-700 border-emerald-100"
              emoji="📢"
            />
            <PillarCard
              id="track"
              title="Track Status"
              description="Monitor your application or complaint status in real-time using your anonymous tracking ID."
              href="/track"
              cardStyle="hover:border-amber-300"
              iconBg="bg-amber-50 text-amber-600 border border-amber-100"
              hoverColor="group-hover:text-amber-600"
              badgeColor="bg-amber-50 text-amber-700 border-amber-100"
              emoji="📋"
            />
          </StaggerReveal>
        </div>
      </div>

      {/* ── 3. HOW IT WORKS ── */}
      <div className="w-full min-h-full bg-slate-50 flex flex-col justify-center py-12">
        <HowItWorks />
      </div>

      {/* ── 4. STATS + TRUST ── */}
      <div className="w-full min-h-full bg-white flex flex-col justify-center py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal preset="fade-left" delay={0} className="lg:col-span-5">
              <StatsBand />
            </ScrollReveal>
            <ScrollReveal preset="fade-right" delay={0.15} className="lg:col-span-7">
              <TrustStrip />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ── 5. MAP ── */}
      <div className="w-full min-h-full bg-slate-50 flex flex-col justify-center py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h3 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#65a30d]/10 flex items-center justify-center text-[#65a30d]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </span>
            Live Regional Visualizations
          </h3>
          <div className="h-[calc(100dvh-96px-160px)] min-h-[340px]">
            <MapWrapper />
          </div>
        </div>
      </div>

      {/* ── 6. TESTIMONIALS ── */}
      <div className="w-full min-h-full bg-white flex flex-col justify-center py-12">
        <Testimonial />
      </div>

      {/* ── 7. FAQ ── */}
      <div className="w-full min-h-full bg-slate-50 flex flex-col justify-center py-12">
        <FAQAccordion />
      </div>

      {/* ── 8. FOOTER ── */}
      <div className="w-full min-h-full bg-white flex flex-col justify-end">
        <Footer />
      </div>

    </FullPageScroller>
  );
}

// ─── Inline PillarCard ─────
function PillarCard({
  id, title, description, href, cardStyle, iconBg, hoverColor, badgeColor, emoji,
}: {
  id: string; title: string; description: string; href: string;
  cardStyle: string; iconBg: string; hoverColor: string; badgeColor: string; emoji: string;
}) {
  return (
    <StaggerChild preset="stagger-child-scale">
      <Link
        href={href}
        className={`group p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full ${cardStyle}`}
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              {emoji}
            </div>
            <div className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400">
              <ArrowRight className={`w-4 h-4 ${hoverColor} group-hover:translate-x-1 transition-transform duration-300`} />
            </div>
          </div>
          <h3 className={`text-xl font-bold text-slate-900 ${hoverColor} transition-colors duration-300`}>{title}</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">{description}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
          <span className={`px-2.5 py-1 rounded-full border ${badgeColor}`}>Action Portal</span>
          <span className="text-slate-400 group-hover:text-slate-600 flex items-center gap-1 transition-colors">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </StaggerChild>
  );
}
