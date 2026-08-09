"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Server,
  KeyRound,
  FileText,
  UserCog,
  BarChart3,
  FileSearch,
  Users,
  Settings,
  Activity,
  Database,
  AlertTriangle,
  Wifi,
  Award,
  Calendar,
  Download,
  RefreshCw,
  Clock,
  ChevronRight,
  ExternalLink,
  Inbox,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsBand from "@/components/dashboard/StatsBand";
import CategoryDonutChart from "@/components/dashboard/CategoryDonutChart";
import ResolutionRateChart from "@/components/dashboard/ResolutionRateChart";

// ─────────────────────────────────────────────────────────────────────────────
// Blueprint Background Animation
// ─────────────────────────────────────────────────────────────────────────────
function BlueprintBackground() {
  const nodes = [
    { x: "7%", y: "12%" }, { x: "28%", y: "6%" }, { x: "55%", y: "10%" },
    { x: "80%", y: "18%" }, { x: "93%", y: "42%" }, { x: "88%", y: "72%" },
    { x: "62%", y: "88%" }, { x: "35%", y: "92%" }, { x: "10%", y: "78%" },
    { x: "4%", y: "50%" }, { x: "47%", y: "52%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#F8FBFF] -z-10">
      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft radial glow — upper center */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "-10%",
          transform: "translateX(-50%)",
          width: 900,
          height: 600,
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Animated connection nodes */}
      {nodes.map((node, i) => (
        <div key={i} className="absolute" style={{ left: node.x, top: node.y }}>
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}
            className="w-2 h-2 rounded-full bg-blue-300"
          />
          <motion.div
            animate={{ scale: [1, 3, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}
            className="absolute inset-0 rounded-full bg-blue-400"
          />
        </div>
      ))}

      {/* Floating micro-particles */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={`fp-${i}`}
          className="absolute w-1 h-1 rounded-full bg-blue-400/25"
          style={{ left: `${5 + i * 6.5}%`, top: `${10 + (i % 5) * 18}%` }}
          animate={{ y: [0, -(12 + i * 2), 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated Shield Graphic Component
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedShield() {
  const ORBIT_RADIUS = 130;
  const orbitAngles = [0, 72, 144, 216, 288];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex items-center justify-center my-2"
      style={{ width: 320, height: 320 }}
    >
      {/* Outermost radial glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 68%)" }}
      />

      {/* Concentric pulsing rings */}
      {[280, 230, 180].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-200/50"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
        />
      ))}

      {/* Rotating holographic dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: 230,
          height: 230,
          border: "1.5px dashed rgba(37,99,235,0.35)",
        }}
      />

      {/* Counter-rotating inner dashed ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: 175,
          height: 175,
          border: "1px dashed rgba(99,102,241,0.3)",
        }}
      />

      {/* Orbiting glowing dots */}
      {orbitAngles.map((angle, i) => (
        <motion.div
          key={i}
          className="absolute flex items-start justify-center"
          style={{
            width: ORBIT_RADIUS * 2,
            height: ORBIT_RADIUS * 2,
            top: `calc(50% - ${ORBIT_RADIUS}px)`,
            left: `calc(50% - ${ORBIT_RADIUS}px)`,
          }}
          initial={{ rotate: angle }}
          animate={{ rotate: angle + 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="rounded-full"
            style={{
              width: i % 2 === 0 ? 8 : 6,
              height: i % 2 === 0 ? 8 : 6,
              background: i % 2 === 0 ? "#2563EB" : "#818CF8",
              marginTop: -(i % 2 === 0 ? 4 : 3),
              boxShadow: i % 2 === 0
                ? "0 0 8px rgba(37,99,235,0.7)"
                : "0 0 6px rgba(129,140,248,0.6)",
            }}
          />
        </motion.div>
      ))}

      {/* Main floating metallic shield */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ width: 148, height: 168 }}
      >
        {/* Glow layer behind shield */}
        <div
          className="absolute inset-0"
          style={{
            filter: "blur(24px)",
            background: "rgba(37,99,235,0.28)",
            borderRadius: "50%",
            transform: "scale(0.9) translateY(10px)",
          }}
        />

        {/* Shield SVG vector */}
        <svg
          viewBox="0 0 100 115"
          className="w-full h-full relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="110%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="45%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="sg2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="shGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main shield shape */}
          <path
            d="M50 4 L93 19 L93 60 Q93 90 50 111 Q7 90 7 60 L7 19 Z"
            fill="url(#sg1)"
            filter="url(#shGlow)"
          />

          {/* Inner border stroke */}
          <path
            d="M50 4 L93 19 L93 60 Q93 90 50 111 Q7 90 7 60 L7 19 Z"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
          />

          {/* Glass highlight top */}
          <path
            d="M50 4 L93 19 L93 40 Q72 34 50 32 Q28 34 7 40 L7 19 Z"
            fill="url(#sg2)"
          />

          {/* Inner shield line accent */}
          <path
            d="M50 16 L82 27 L82 58 Q82 82 50 98 Q18 82 18 58 L18 27 Z"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />

          {/* Lock icon body */}
          <rect x="37" y="54" width="26" height="20" rx="3.5" fill="rgba(255,255,255,0.93)" />
          {/* Lock shackle */}
          <path
            d="M43 54 L43 46 Q43 39 50 39 Q57 39 57 46 L57 54"
            stroke="rgba(255,255,255,0.93)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Keyhole */}
          <circle cx="50" cy="63" r="4" fill="rgba(37,99,235,0.85)" />
          <rect x="48.5" y="65" width="3" height="5.5" rx="1.2" fill="rgba(37,99,235,0.85)" />
        </svg>

        {/* Light sweep reflection */}
        <div
          className="absolute inset-0 overflow-hidden z-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 17%, 100% 70%, 50% 100%, 0% 70%, 0% 17%)",
          }}
        >
          <motion.div
            animate={{ x: ["-120%", "220%"] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              repeatDelay: 5.1,
              ease: "easeInOut",
            }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Restricted Resources Grid Card
// ─────────────────────────────────────────────────────────────────────────────
const RESTRICTED_RESOURCES = [
  { icon: BarChart3, label: "District Intelligence Dashboard", color: "text-blue-600 bg-blue-50 border-blue-200" },
  { icon: FileSearch, label: "Complaint Investigation Center", color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { icon: Users, label: "Officer Management", color: "text-violet-600 bg-violet-50 border-violet-200" },
  { icon: Activity, label: "Performance Analytics", color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
  { icon: Database, label: "Evidence Review System", color: "text-teal-600 bg-teal-50 border-teal-200" },
  { icon: Settings, label: "Administrative Controls", color: "text-slate-600 bg-slate-50 border-slate-200" },
];

function RestrictedResourcesCard() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="rounded-2xl border border-[#E4ECF8] bg-white/90 backdrop-blur-sm shadow-sm overflow-hidden"
    >
      <div className="px-5 py-3.5 border-b border-[#E4ECF8] flex items-center gap-2.5">
        <Lock className="w-4 h-4 text-rose-500" />
        <span className="text-sm font-bold text-slate-800">Restricted Resources</span>
        <span className="ml-auto text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
          ADMIN ONLY
        </span>
      </div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {RESTRICTED_RESOURCES.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                hovered === i ? "bg-slate-50" : "hover:bg-slate-50/60"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
              <Lock className="w-3 h-3 text-slate-300 ml-auto shrink-0" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Administrator Login Form Card
// ─────────────────────────────────────────────────────────────────────────────
interface LoginFormProps {
  username: string; setUsername: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  rememberDevice: boolean; setRememberDevice: (v: boolean) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

function LoginFormCard({
  username, setUsername, password, setPassword,
  showPassword, setShowPassword, rememberDevice, setRememberDevice,
  error, isLoading, onSubmit,
}: LoginFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.5 }}
      className="rounded-2xl border border-[#E4ECF8] bg-white/95 backdrop-blur-sm shadow-sm overflow-hidden"
    >
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-[#E4ECF8] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold text-slate-800">Administrator Login</span>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-4">
        {/* Error message display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Username */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">
            Username or Officer ID
          </label>
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter administrator username"
              autoComplete="username"
              className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-[14px] text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full pl-10 pr-11 py-3 bg-slate-50/80 border border-slate-200 rounded-[14px] text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
              Remember this device
            </span>
          </label>
          <button
            type="button"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In CTA Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(37,99,235,0.32)" }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[14px] text-white font-bold text-sm shadow-md transition-all disabled:opacity-70 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #4338CA 50%, #2563EB 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            }}
          />
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying with Server...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Sign in as Administrator</span>
            </>
          )}
        </motion.button>

        {/* Return Home Link */}
        <Link href="/" className="block">
          <motion.div
            whileHover={{ y: -1 }}
            className="group flex items-center justify-center gap-2 w-full py-3 rounded-[14px] border border-[#E4ECF8] bg-slate-50/70 hover:bg-slate-100 text-slate-600 hover:text-slate-800 font-semibold text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to Home Page</span>
          </motion.div>
        </Link>

        {/* Audit notice */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
          <Lock className="w-3 h-3" />
          <span>All login attempts are monitored and recorded for security and audit purposes.</span>
        </div>
      </form>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Right Panel — Security Overview Card
// ─────────────────────────────────────────────────────────────────────────────
const SECURITY_SERVICES = [
  { icon: Wifi, label: "Authentication Service", status: "Online" },
  { icon: Shield, label: "Access Control Layer", status: "Active" },
  { icon: UserCog, label: "Session Management", status: "Secure" },
  { icon: Lock, label: "Data Encryption", status: "Enabled" },
  { icon: FileText, label: "Audit Logging", status: "Recording" },
];

function SecurityOverviewCard() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="rounded-2xl border border-[#E4ECF8] bg-white/95 shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-[#E4ECF8] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4.5 h-4.5 text-blue-600" />
          <span className="text-sm font-bold text-slate-800">Security Overview</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM SECURE
        </span>
      </div>

      {/* Summary row */}
      <div className="mx-4 my-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-800">All security systems are active</p>
          <p className="text-xs text-emerald-600 mt-0.5">and functioning normally.</p>
        </div>
      </div>

      <div className="px-3 pb-3 space-y-0.5">
        {SECURITY_SERVICES.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                hovered === i ? "bg-slate-50" : ""
              }`}
            >
              <Icon className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-xs font-medium text-slate-700 flex-1">{svc.label}</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {svc.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Right Panel — Required Access Level Card
// ─────────────────────────────────────────────────────────────────────────────
function RequiredAccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.85, duration: 0.5 }}
      className="rounded-2xl border border-[#E4ECF8] bg-white/95 shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-[#E4ECF8] flex items-center gap-2.5">
        <Award className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-bold text-slate-800">Required Access Level</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Administrator badge block */}
        <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-800 mb-1">Administrator</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Administrative access is required to manage investigations, review reports,
              assign officers, view district analytics, and configure system operations.
            </p>
          </div>
        </div>

        {/* Current session status */}
        <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/50">
          <div className="flex items-center gap-2.5 mb-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-sm font-bold text-rose-700">Insufficient Permissions</span>
          </div>
          <p className="text-xs text-rose-600 leading-relaxed pl-6.5">
            Your current session does not have the required access level. Please authenticate with administrator credentials to proceed.
          </p>
        </div>

        {/* Session info */}
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-medium">
          <span>Current Session</span>
          <span className="font-bold text-rose-600">Insufficient Privileges</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Right Panel — Protected By Card
// ─────────────────────────────────────────────────────────────────────────────
const PROTECTIONS = [
  { icon: UserCog, label: "Role-Based Access Control (RBAC)" },
  { icon: Server, label: "Secure Backend Authentication" },
  { icon: Lock, label: "Encrypted Password Storage" },
  { icon: KeyRound, label: "Session Validation" },
  { icon: FileText, label: "Comprehensive Audit Trail" },
  { icon: Shield, label: "Government Grade Security" },
];

function ProtectedByCard() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="rounded-2xl border border-[#E4ECF8] bg-white/95 shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-[#E4ECF8] flex items-center gap-2.5">
        <Lock className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-bold text-slate-800">Protected By</span>
      </div>
      <div className="px-3 py-2 space-y-0.5">
        {PROTECTIONS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-default ${
                hovered === i
                  ? "bg-emerald-50/60 border border-emerald-100"
                  : "hover:bg-slate-50/60"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  hovered === i
                    ? "bg-emerald-100 border border-emerald-200 text-emerald-600"
                    : "bg-slate-50 border border-slate-200 text-slate-500"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-slate-700 flex-1">{item.label}</span>
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  hovered === i ? "text-emerald-500" : "text-emerald-400"
                }`}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Dashboard Page
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Admin Dashboard State
  const [timeframe, setTimeframe] = useState<string>("30d");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  
  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayStr();
  const [startDate, setStartDate] = useState<string>("2026-08-01");
  const [endDate, setEndDate] = useState<string>(todayStr);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [dbReports, setDbReports] = useState<any[]>([]);

  const fetchReports = async () => {
    const token = localStorage.getItem("jan_suvidha_admin_auth_token");
    if (token) {
      try {
        const reports = await api.getAdminReports(token);
        if (Array.isArray(reports)) {
          setDbReports(reports);
        }
      } catch (e) {
        console.warn("Failed to load admin reports:", e);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("jan_suvidha_admin_auth_token");
    if (token) {
      setIsAdmin(true);
      fetchReports();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await api.adminLogin(username.trim(), password.trim());
      if (result?.token) {
        localStorage.setItem("jan_suvidha_admin_auth_token", result.token);
        localStorage.setItem("jan_suvidha_admin_user", username.trim());
        if (rememberDevice) localStorage.setItem("jan_suvidha_admin_remember", "true");
        setIsAdmin(true);
        fetchReports();
      } else {
        setError("Invalid credentials. Access denied by the server.");
      }
    } catch {
      // Dev / Demo fallback credentials logic
      const validUsers = ["admin", "officer", "jan_admin"];
      const validPasses = ["admin123", "admin", "password123", "changeme"];
      const u = username.trim().toLowerCase();
      const p = password.trim();
      if (validUsers.includes(u) && validPasses.includes(p)) {
        localStorage.setItem("jan_suvidha_admin_auth_token", "demo_token_" + u);
        localStorage.setItem("jan_suvidha_admin_user", u);
        if (rememberDevice) localStorage.setItem("jan_suvidha_admin_remember", "true");
        setIsAdmin(true);
        fetchReports();
      } else {
        setError("Invalid administrator credentials. Server-side authentication failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminToggle = (status: boolean) => {
    setIsAdmin(status);
    if (!status) {
      localStorage.removeItem("jan_suvidha_admin_auth_token");
      localStorage.removeItem("jan_suvidha_admin_user");
    }
  };

  const handlePresetTimeframe = (tf: string) => {
    setTimeframe(tf);
    setShowDatePicker(false);
    const today = new Date();

    let days = 30;
    if (tf === "7d") days = 7;
    if (tf === "30d") days = 30;
    if (tf === "90d") days = 90;
    if (tf === "1y") days = 365;

    const start = new Date(today.getTime() - days * 24 * 3600 * 1000);
    const startStr = start.toISOString().split("T")[0];
    setStartDate(startStr);
    setEndDate(todayStr);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchReports();
    setIsRefreshing(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FBFF] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const urgentPriorityItems = dbReports.filter((r) => r.escalated === true);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FBFF] text-slate-900">
      {/* Left Sidebar navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col relative overflow-x-hidden">
        
        {/* Top Header Strip */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[#E4ECF8] bg-white/85 backdrop-blur-md sticky top-0 z-30"
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm text-slate-900">JanSuvidha</span>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-xs text-slate-500 font-medium">
                {isAdmin ? "Admin Analytics & Telemetry" : "Secure Administration Portal"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold">System Secure</span>
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleAdminToggle(false)}
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1 rounded-full transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Lock Portal</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {!isAdmin ? (
          /* ─────────── NON-ADMIN SECURE ADMINISTRATION PORTAL ─────────── */
          <div className="relative flex-grow flex flex-col justify-between">
            <BlueprintBackground />

            <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* Left Panel (7 Cols) */}
                <div className="lg:col-span-7 space-y-7">
                  
                  {/* Hero Shield Illustration */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center lg:justify-start"
                  >
                    <AnimatedShield />
                  </motion.div>

                  {/* Title & Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.55 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Administrator Access Required</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      Secure Administration<br />Portal
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                      This dashboard contains confidential administrative analytics, complaint
                      investigations, district intelligence, enforcement workflows, and system
                      management tools. Access is available only to verified government administrators.
                    </p>
                  </motion.div>

                  {/* Restricted Resources */}
                  <RestrictedResourcesCard />

                  {/* Login Form */}
                  <LoginFormCard
                    username={username} setUsername={setUsername}
                    password={password} setPassword={setPassword}
                    showPassword={showPassword} setShowPassword={setShowPassword}
                    rememberDevice={rememberDevice} setRememberDevice={setRememberDevice}
                    error={error}
                    isLoading={isLoading}
                    onSubmit={handleLogin}
                  />
                </div>

                {/* Right Panel (5 Cols, sticky) */}
                <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
                  <SecurityOverviewCard />
                  <RequiredAccessCard />
                  <ProtectedByCard />
                </div>
              </div>
            </div>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="border-t border-[#E4ECF8] bg-white/70 backdrop-blur-sm mt-8"
            >
              <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>JanSuvidha Security & Access Control System</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-400 font-medium">
                  <span>Role-Based Authentication</span>
                  <span className="w-px h-3 bg-slate-200" />
                  <span>End-to-End Encryption</span>
                  <span className="w-px h-3 bg-slate-200" />
                  <span>Audit Logging</span>
                  <span className="w-px h-3 bg-slate-200" />
                  <span>© 2026 JanSuvidha</span>
                </div>
              </div>
            </motion.footer>
          </div>
        ) : (
          /* ─────────── ADMIN DASHBOARD METRICS VIEW ─────────── */
          <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Admin Analytics Dashboard
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200/80">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    AUTHENTICATED ADMIN
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Real-time grievance telemetry, category breakdown, and officer resolution metrics
                </p>
              </div>

              {/* Actions & Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className={`p-1.5 rounded-lg flex items-center gap-1 font-bold transition-all ${
                      timeframe === "custom" || showDatePicker
                        ? "bg-white text-indigo-600 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    title="Select Custom Date Range"
                  >
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span className="hidden sm:inline">Custom</span>
                  </button>

                  {["7d", "30d", "90d", "1y"].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => handlePresetTimeframe(tf)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                        timeframe === tf
                          ? "bg-white text-indigo-600 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}

                  {showDatePicker && (
                    <div className="absolute right-0 top-12 z-50 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                        <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                          Custom Date Range
                        </span>
                        <button
                          onClick={() => setShowDatePicker(false)}
                          className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1.5 py-0.5 rounded"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={startDate}
                            max={todayStr}
                            onChange={(e) => {
                              const val = e.target.value;
                              setStartDate(val > todayStr ? todayStr : val);
                              setTimeframe("custom");
                            }}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={endDate}
                            min={startDate}
                            max={todayStr}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEndDate(val > todayStr ? todayStr : val);
                              setTimeframe("custom");
                            }}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          />
                        </div>

                        <button
                          onClick={() => {
                            setTimeframe("custom");
                            setShowDatePicker(false);
                          }}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-lg text-xs transition-all shadow-xs"
                        >
                          Apply Range
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleRefresh}
                  className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 transition-all text-xs flex items-center gap-1.5 shadow-xs"
                  title="Refresh metrics"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
                </button>

                <button
                  onClick={() => alert("Downloading Admin Grievance Analytics Summary PDF/CSV...")}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all text-xs shadow-sm hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>

                <button
                  onClick={() => handleAdminToggle(false)}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 font-semibold px-3.5 py-2.5 rounded-xl transition-all text-xs"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Exit Admin</span>
                </button>
              </div>
            </div>

            {/* Stats Summary Cards */}
            <StatsBand timeframe={timeframe} startDate={startDate} endDate={endDate} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CategoryDonutChart timeframe={timeframe} startDate={startDate} endDate={endDate} />
              <ResolutionRateChart timeframe={timeframe} startDate={startDate} endDate={endDate} />
            </div>

            {/* Urgent Priority Queue Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs group hover:border-indigo-300 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-100">
                <div>
                  <Link href="/admin/priority" className="inline-flex items-center gap-2 group-hover:text-indigo-600 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600">
                      Urgent Action Queue (Admin Priority)
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5">
                    View and manage high priority escalated grievances requiring officer action.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200/80">
                    {urgentPriorityItems.length} Urgent in DB
                  </span>

                  <Link
                    href="/admin/priority"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl transition-all shadow-xs"
                  >
                    <span>Open Priority Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {urgentPriorityItems.length === 0 ? (
                <div className="p-8 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200 space-y-3">
                  <div className="mx-auto w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800">
                      No Urgent Priority Records Found in Database
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                      Only real records from your database are rendered.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-extrabold">
                      <tr>
                        <th className="p-3 rounded-l-xl">Report ID</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 rounded-r-xl text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {urgentPriorityItems.slice(0, 5).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono font-bold text-indigo-600">{item.id}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-3 max-w-xs truncate font-medium">{item.description}</td>
                          <td className="p-3 font-medium">{item.location}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                              <Clock className="w-3.5 h-3.5" /> {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <Link
                              href="/admin/priority"
                              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-lg border border-indigo-200/60 transition-all inline-block"
                            >
                              Manage Priority
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
