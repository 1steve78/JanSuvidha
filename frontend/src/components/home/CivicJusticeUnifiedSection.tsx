"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Radio,
  Cpu,
  Lock,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Siren,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  Zap,
  Landmark,
  Wheat,
  HeartPulse,
  Home,
  Flame,
  GraduationCap,
  HardHat,
  Play,
  Pause,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

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
  statTarget: string;
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
    statTarget: "stat-citizens",
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
    statTarget: "stat-citizens",
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
    statTarget: "stat-resolution",
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
    statTarget: "stat-resolution",
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
    statTarget: "stat-avg-time",
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
    statTarget: "stat-avg-time",
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
    statTarget: "stat-schemes",
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
    statTarget: "stat-schemes",
    revealBadges: ["850+ Schemes", "Explainable AI", "Instant Match"],
  },
];

// ─── Ticker Items Data ───
const LIVE_TICKER_ITEMS = [
  "Complaint #8942 Verified in Ward 04",
  "Vigilance Officer Dispatched to Central Sector",
  "Illegal Speed-Fee Report Intercepted",
  "Zero-Knowledge Identity Shield Activated",
  "Citizen Matched with PM-KISAN Scheme",
  "Ayushman Bharat e-KYC Cashless Approved",
  "Police Unit On Site • Case SLA 04 Mins",
  "Public Pipeline Repair Work Order Auto-Issued",
];

// ─── Welfare Schemes Data ───
const WELFARE_SCHEMES = [
  { name: "PM-KISAN", desc: "Farmer Support ₹6,000/yr", icon: Wheat, badge: "Agriculture", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { name: "Ayushman Bharat", desc: "Health Shield ₹5 Lakh", icon: HeartPulse, badge: "Healthcare", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { name: "PM Awas Yojana", desc: "Pucca Housing Subsidy", icon: Home, badge: "Housing", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "PM Ujjwala", desc: "Free LPG Connection", icon: Flame, badge: "Energy", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "Jan Dhan", desc: "Zero Balance Banking", icon: Landmark, badge: "Finance", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "National Scholarship", desc: "Higher Education Grant", icon: GraduationCap, badge: "Education", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { name: "MGNREGA", desc: "100-Day Work Guarantee", icon: HardHat, badge: "Rural Work", color: "bg-teal-50 text-teal-700 border-teal-200" },
];

export default function CivicJusticeUnifiedSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [isCorruptionHovered, setIsCorruptionHovered] = useState(false);

  // Compact Corruption Story State
  const [currentScene, setCurrentScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [aiScanProgress, setAiScanProgress] = useState(0);

  // Auto-advance embedded corruption story
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentScene((prev) => (prev >= 8 ? 1 : prev + 1));
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // AI scanning progress for Scene 4
  useEffect(() => {
    if (currentScene === 4) {
      setAiScanProgress(0);
      const interval = setInterval(() => {
        setAiScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 20;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [currentScene]);

  // Trigger confetti on final scene (Scene 8)
  useEffect(() => {
    if (currentScene === 8) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#2563eb", "#10b981", "#7c3aed"],
      });
    }
  }, [currentScene]);

  return (
    <section 
      id="unified-civic-intelligence" 
      className="relative py-20 overflow-hidden bg-slate-50 text-slate-900"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── 2. TOP AREA: HEADER & FEATURE CARDS ─── */}
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

        {/* 8 Clean Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {FEATURE_CARDS.map((card) => {
            const IconComponent = card.icon;
            const isHovered = hoveredCard === card.id;
            const isTargetedByStat = hoveredStat === card.statTarget;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -4 }}
                className={`relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                  isTargetedByStat ? "border-[#65a30d] shadow-[0_0_15px_rgba(101,163,13,0.15)] scale-102" : "hover:border-slate-300"
                }`}
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

        {/* ─── 3. CENTER CONNECTION: ANIMATED CIVIC INTELLIGENCE PIPELINE ─── */}
        <div className="relative my-10 py-6 flex flex-col items-center">
          
          {/* Animated SVG Connector Trunk Line */}
          <div className="absolute top-0 bottom-0 w-1 pointer-events-none flex justify-center">
            <svg className="w-8 h-full" viewBox="0 0 32 400">
              <line 
                x1="16" y1="0" x2="16" y2="400" 
                stroke={hoveredCard || isCorruptionHovered || hoveredStat ? "#2563eb" : "#cbd5e1"} 
                strokeWidth="3" 
                strokeDasharray="6 6"
              />
              {/* Traveling Light Pulses */}
              <circle cx="16" cy="50" r="4" fill="#2563eb" className="animate-ping" />
              <circle cx="16" cy="200" r="4" fill="#10b981" className="animate-ping" style={{ animationDelay: "1s" }} />
              <circle cx="16" cy="350" r="4" fill="#6366f1" className="animate-ping" style={{ animationDelay: "2s" }} />
            </svg>
          </div>

          {/* Workflow Stage Pills */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-mono font-bold text-slate-700 bg-white/95 p-3.5 rounded-2xl border border-slate-200/90 backdrop-blur-md shadow-md">
            <span className="flex items-center gap-1.5 text-blue-600">
              <Lock className="w-3.5 h-3.5" />
              Feature Report
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-1.5 text-purple-600">
              <Cpu className="w-3.5 h-3.5" />
              AI Processing
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-1.5 text-cyan-600">
              <FileCheck2 className="w-3.5 h-3.5" />
              Evidence Verified
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-1.5 text-amber-600">
              <Siren className="w-3.5 h-3.5" />
              Authority Dispatch
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Platform Impact
            </span>
          </div>

          {/* ─── 4. EMBEDDED CINEMATIC CORRUPTION STORY (LIGHT GLASS CONTAINER) ─── */}
          <div 
            onMouseEnter={() => setIsCorruptionHovered(true)}
            onMouseLeave={() => setIsCorruptionHovered(false)}
            className="relative z-10 w-full max-w-2xl bg-white/95 rounded-3xl border border-slate-200/90 p-6 shadow-xl overflow-hidden transition-all duration-300"
          >
            {/* Holographic Ring Overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[10px] text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              <Sparkles className="w-3 h-3 animate-pulse text-blue-600" />
              <span>CORRUPTION → JUSTICE WORKFLOW</span>
            </div>

            {/* Embedded Controls Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold block">
                  SCENE {currentScene} OF 8
                </span>
                <h3 className="text-base sm:text-lg font-bold font-space text-slate-900">
                  {currentScene === 1 && "Citizen Enters Public Office"}
                  {currentScene === 2 && "Unofficial Bribe Demanded"}
                  {currentScene === 3 && "Citizen Launches Anonymous App"}
                  {currentScene === 4 && "AI Holographic Scan & Redaction"}
                  {currentScene === 5 && "Multi-Agency Neural Dispatch"}
                  {currentScene === 6 && "GPS Vector Tracking & Dispatch"}
                  {currentScene === 7 && "Corrupt Official Detained"}
                  {currentScene === 8 && "Case Closed & Public Trust Confirmed"}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1 border transition-all ${
                    isPlaying ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-600 text-white border-blue-700"
                  }`}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
                </button>
                <button
                  onClick={() => setCurrentScene(currentScene === 8 ? 1 : currentScene + 1)}
                  className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all text-xs"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Compact Scene Viewport */}
            <div className="relative h-60 bg-slate-900 text-white rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center text-center overflow-hidden">
              
              {/* Scene 1: Office */}
              {currentScene === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center">
                    <Landmark className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-xs text-slate-300 max-w-sm">
                    Citizen approaches administration desk for land registration.
                  </p>
                </motion.div>
              )}

              {/* Scene 2: Corruption */}
              {currentScene === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 relative">
                  <div className="absolute inset-0 bg-rose-950/30 rounded-2xl animate-pulse pointer-events-none" />
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold rounded-full animate-bounce">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>⚠ CORRUPTION DETECTED</span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-sm">
                    Official demands unofficial cash speed-fee. Citizen hesitates and refuses.
                  </p>
                </motion.div>
              )}

              {/* Scene 3: Anonymous Reporting */}
              {currentScene === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-mono text-cyan-300">
                    <span className="bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">GPS Locked</span>
                    <span className="bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">Photo Hashed</span>
                    <span className="bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">Identity Hidden</span>
                  </div>
                </motion.div>
              )}

              {/* Scene 4: AI Scan */}
              {currentScene === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="8 8" className="animate-spin" />
                      <text x="50" y="55" textAnchor="middle" fill="#00f0ff" fontSize="14" fontFamily="monospace" fontWeight="bold">
                        {aiScanProgress}%
                      </text>
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-purple-300 font-bold">
                    Anonymous Identity Secured • Face Redacted
                  </span>
                </motion.div>
              )}

              {/* Scene 5: Routing */}
              {currentScene === 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center">
                    <Radio className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-300 max-w-sm">
                    Report dispatches in parallel to Police, District Magistrate &amp; Anti-Corruption Bureau.
                  </p>
                </motion.div>
              )}

              {/* Scene 6: Dispatch */}
              {currentScene === 6 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center">
                    <Siren className="w-8 h-8 text-blue-400 animate-bounce" />
                  </div>
                  <span className="text-xs font-mono text-blue-300 font-bold bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                    Vigilance Unit En Route • ETA 04 Mins
                  </span>
                </motion.div>
              )}

              {/* Scene 7: Arrest */}
              {currentScene === 7 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ACTION TAKEN • OFFICIAL DETAINED</span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-sm">
                    Corrupt official respectfully detained following formal protocol.
                  </p>
                </motion.div>
              )}

              {/* Scene 8: Resolution */}
              {currentScene === 8 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs font-bold text-emerald-400">
                    ✓ Case Closed • Trust Confirmed
                  </p>
                </motion.div>
              )}
            </div>

            {/* Scene Timeline Steps */}
            <div className="grid grid-cols-8 gap-1.5 mt-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                <button
                  key={step}
                  onClick={() => {
                    setCurrentScene(step);
                    setIsPlaying(false);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    step === currentScene
                      ? "bg-blue-600 shadow-[0_0_8px_#2563eb]"
                      : step < currentScene
                      ? "bg-emerald-500"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── 5. LIVE DASHBOARD TICKER STRIP ─── */}
        <div className="my-10 bg-white/95 border border-slate-200/90 rounded-2xl py-3 px-4 backdrop-blur-md shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold shrink-0 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              LIVE TELEMETRY STREAM
            </span>
            <div className="flex-1 overflow-hidden relative">
              <div className="flex items-center gap-8 whitespace-nowrap animate-ticker-scroll hover:[animation-play-state:paused]">
                {[...LIVE_TICKER_ITEMS, ...LIVE_TICKER_ITEMS].map((item, idx) => (
                  <span key={idx} className="text-slate-700 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{item}</span>
                    <span className="text-slate-300">|</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── 6. BOTTOM AREA: PLATFORM IMPACT ("TRANSPARENCY & SPEED") ─── */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              MEASURABLE RESULTS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-space text-slate-900 tracking-tight">
              Transparency &amp; Speed
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto font-sans font-normal">
              Every feature transforms into verified public impact. Here is what civic operating intelligence delivers across India.
            </p>
          </div>

          {/* 4 Connected Impact Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              {
                id: "stat-citizens",
                value: "12,000+",
                label: "Citizens Assisted",
                icon: Users,
                bg: "bg-blue-50/80 border-blue-200 text-blue-900",
                iconBg: "bg-blue-600 text-white",
                highlightTarget: "anonymous-reporting",
              },
              {
                id: "stat-schemes",
                value: "850+",
                label: "Government Schemes",
                icon: Zap,
                bg: "bg-purple-50/80 border-purple-200 text-purple-900",
                iconBg: "bg-purple-600 text-white",
                highlightTarget: "scheme-matching",
              },
              {
                id: "stat-resolution",
                value: "95%",
                label: "Resolution Rate",
                icon: ShieldCheck,
                bg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
                iconBg: "bg-emerald-600 text-white",
                highlightTarget: "ai-verification",
              },
              {
                id: "stat-avg-time",
                value: "3 Days",
                label: "Avg. Resolution Time",
                icon: Clock,
                bg: "bg-amber-50/80 border-amber-200 text-amber-900",
                iconBg: "bg-amber-500 text-white",
                highlightTarget: "authority-routing",
              },
            ].map((stat) => {
              const IconComp = stat.icon;
              const isHovered = hoveredStat === stat.id;
              const isFeatureHovered = hoveredCard === stat.highlightTarget;

              return (
                <motion.div
                  key={stat.id}
                  onMouseEnter={() => setHoveredStat(stat.id)}
                  onMouseLeave={() => setHoveredStat(null)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`p-6 rounded-3xl border text-center shadow-xs transition-all duration-300 cursor-pointer ${stat.bg} ${
                    isHovered || isFeatureHovered ? "border-blue-500 shadow-md scale-102" : "border-slate-200/90"
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-2xl ${stat.iconBg} flex items-center justify-center mb-3 shadow-xs`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold opacity-80 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Integrated Trust Dashboard Scheme Grid */}
          <div className="bg-white/95 border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-mono font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AUTHENTICATED WELFARE DIRECTORY</span>
                </div>
                <h4 className="text-xl font-bold font-space text-slate-900">
                  Trust Dashboard &amp; Official Schemes
                </h4>
              </div>
              <Link
                href="/match"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all self-start sm:self-auto"
              >
                <span>Find All 850+ Schemes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WELFARE_SCHEMES.map((scheme, idx) => {
                const SchemeIcon = scheme.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border ${scheme.color} hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-white shadow-2xs group-hover:rotate-6 transition-transform">
                        <SchemeIcon className="w-4 h-4 text-slate-800" />
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border bg-white/80">
                        {scheme.badge}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {scheme.name}
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                        {scheme.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
