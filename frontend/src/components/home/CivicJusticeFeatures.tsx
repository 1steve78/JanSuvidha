"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  Radio,
  Cpu,
  Lock,
  FileCheck2,
  MapPin,
  Siren,
  Zap,
} from "lucide-react";

// ─── Feature Cards Data ───
interface FeatureCard {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  accentColor: string;
  iconBg: string;
  badgeText: string;
  revealBadges: string[];
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "anonymous-reporting",
    title: "Anonymous Reporting",
    category: "Zero-Knowledge Protection",
    description: "Submit civic complaints and bribery reports without revealing identity, IP, or personal metadata.",
    icon: Lock,
    accentColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200/80 text-blue-600",
    badgeText: "CITIZEN PRIVACY",
    revealBadges: ["Encrypted", "Zero-Knowledge", "Real-Time"],
  },
  {
    id: "evidence-encryption",
    title: "Evidence Encryption",
    category: "Tamper-Proof Hashing",
    description: "Geo-tagged photos, video, and audio evidence cryptographically hashed on-device before transmission.",
    icon: FileCheck2,
    accentColor: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-200/80 text-purple-600",
    badgeText: "SECURE VAULT",
    revealBadges: ["SHA-256 Hashed", "Metadata Scrubbed", "Verified"],
  },
  {
    id: "ai-verification",
    title: "AI Verification Engine",
    category: "Neural Classification",
    description: "Machine learning algorithms scan incoming media to auto-redact faces and classify grievance urgency.",
    icon: Cpu,
    accentColor: "text-cyan-600",
    iconBg: "bg-cyan-50 border-cyan-200/80 text-cyan-600",
    badgeText: "INTELLIGENCE UNIT",
    revealBadges: ["AI Protected", "Face Redacted", "Instant Scan"],
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection",
    category: "Anomaly Interception",
    description: "Continuous telemetry monitoring intercepts unofficial speed-fees and welfare diversion attempts.",
    icon: ShieldAlert,
    accentColor: "text-rose-600",
    iconBg: "bg-rose-50 border-rose-200/80 text-rose-600",
    badgeText: "VIGILANCE GRID",
    revealBadges: ["Anomaly Alert", "Speed-Fee Blocked", "Auto-Escalated"],
  },
  {
    id: "authority-routing",
    title: "Authority Dispatch",
    category: "Multi-Agency Routing",
    description: "Parallel encrypted dispatch to Police Station, District Magistrate, and Anti-Corruption Bureau.",
    icon: Siren,
    accentColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200/80 text-amber-600",
    badgeText: "FIELD DISPATCH",
    revealBadges: ["Multi-Agency", "SLA Tracked", "GPS Dispatch"],
  },
  {
    id: "district-dashboard",
    title: "District Telemetry",
    category: "Public SLA Transparency",
    description: "Real-time municipal performance metrics tracking resolution velocity and officer accountability.",
    icon: Radio,
    accentColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200/80 text-emerald-600",
    badgeText: "TRANSPARENCY DESK",
    revealBadges: ["District Level", "Audited", "Live Stream"],
  },
  {
    id: "geo-verification",
    title: "Geo Verification",
    category: "Spatial Coordinates",
    description: "Automatic satellite GPS validation locks precise location bounds for immediate field response.",
    icon: MapPin,
    accentColor: "text-teal-600",
    iconBg: "bg-teal-50 border-teal-200/80 text-teal-600",
    badgeText: "SPATIAL LOCK",
    revealBadges: ["GPS Locked", "Ward Verified", "Satellite Synced"],
  },
  {
    id: "scheme-matching",
    title: "AI Scheme Matching",
    category: "Welfare Eligibility",
    description: "Rule-derived AI scans 850+ state and central welfare schemes to match eligible citizens automatically.",
    icon: Zap,
    accentColor: "text-indigo-600",
    iconBg: "bg-indigo-50 border-indigo-200/80 text-indigo-600",
    badgeText: "WELFARE ENGINE",
    revealBadges: ["850+ Schemes", "Explainable AI", "Instant Match"],
  },
];

export default function CivicJusticeFeatures() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section 
      id="unified-civic-features" 
      className="relative py-20 overflow-hidden bg-slate-50 text-slate-900"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#65a30d]/30 bg-[#65a30d]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#65a30d] shadow-sm">
            <Shield className="w-3.5 h-3.5 text-[#65a30d] animate-pulse" />
            <span>● CIVIC INTELLIGENCE OPERATING SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-space tracking-tight text-slate-900 leading-tight">
            Engineered for Civic Justice &amp; Citizen Empowerment
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Secure, accountable, and intelligence-driven tools built for district-wide transparency and instant resolution.
          </p>
        </div>

        {/* ─── FEATURE CARDS GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURE_CARDS.map((card) => {
            const IconComponent = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {card.badgeText}
                    </span>
                    <div className={`p-3 rounded-2xl border ${card.iconBg} group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-2xs`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`text-lg font-bold font-space text-slate-900 transition-colors ${isHovered ? card.accentColor : ""}`}>
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-sans font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Hover Reveal Indicators */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {card.revealBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded transition-all ${
                        isHovered
                          ? "bg-slate-100 text-slate-800 border border-slate-200"
                          : "bg-slate-50 text-slate-500 border border-slate-100"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
