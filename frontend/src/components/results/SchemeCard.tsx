"use client";

import { useState } from "react";
import {
  ExternalLink,
  HeartPulse,
  Home,
  GraduationCap,
  ShieldAlert,
  X,
  CheckCircle,
} from "lucide-react";
import { Scheme } from "@/types/scheme";
import ConfidenceBar from "./ConfidenceBar";
import EligibilityReasons from "./EligibilityReasons";
import DocumentChecklist from "./DocumentChecklist";

type CategoryConfig = {
  accentBar: string;
  badge: string;
  icon: React.ElementType;
  cardBg: string;
  btn: string;
  border: string;
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  health: {
    accentBar: "bg-pink-500",
    badge: "bg-pink-100 text-pink-700 border-pink-200",
    icon: HeartPulse,
    cardBg: "from-pink-50/40",
    btn: "bg-pink-600 hover:bg-pink-700",
    border: "border-pink-100",
  },
  housing: {
    accentBar: "bg-amber-500",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Home,
    cardBg: "from-amber-50/40",
    btn: "bg-amber-600 hover:bg-amber-700",
    border: "border-amber-100",
  },
  education: {
    accentBar: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: GraduationCap,
    cardBg: "from-blue-50/40",
    btn: "bg-[#65a30d] hover:bg-[#4d7c0f]",
    border: "border-blue-100",
  },
  civic: {
    accentBar: "bg-emerald-500",
    badge: "bg-indigo-100 text-indigo-800 border-emerald-200",
    icon: ShieldAlert,
    cardBg: "from-indigo-50/40",
    btn: "bg-[#65a30d] hover:bg-[#4d7c0f]",
    border: "border-indigo-100",
  },
  safety: {
    accentBar: "bg-emerald-500",
    badge: "bg-purple-100 text-purple-800 border-emerald-200",
    icon: ShieldAlert,
    cardBg: "from-purple-50/40",
    btn: "bg-[#65a30d] hover:bg-[#4d7c0f]",
    border: "border-purple-100",
  },
};

interface SchemeCardProps {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: SchemeCardProps) {
  const [showModal, setShowModal] = useState(false);
  const cfg = CATEGORY_CONFIG[scheme.category] ?? CATEGORY_CONFIG.civic;
  const CategoryIcon = cfg.icon;

  return (
    <>
      {/* Card */}
      <div
        className={`relative bg-gradient-to-br ${cfg.cardBg} via-white to-white rounded-2xl border ${cfg.border} p-6 shadow-md hover:shadow-lg group overflow-hidden transition-shadow duration-300`}
      >
        {/* Left Accent Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${cfg.accentBar} rounded-l-2xl`} />

        <div className="pl-3 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}
                >
                  <CategoryIcon className="w-3.5 h-3.5" />
                  {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-slate-700 transition-colors">
                {scheme.name}
              </h3>
            </div>
          </div>

          {/* Confidence Bar */}
          <ConfidenceBar confidence={scheme.confidence} />

          {/* Eligibility Reasons */}
          <EligibilityReasons reasons={scheme.reasons} />

          {/* Document Checklist */}
          <DocumentChecklist documents={scheme.requiredDocuments} />

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-slate-400">
              Govt. scheme · Updated 2024–25
            </p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 ${cfg.btn}`}
            >
              Apply Now
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/60"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${cfg.badge}`}>
                <CategoryIcon className="w-3.5 h-3.5" />
                {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)} Scheme
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                {scheme.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                You are being redirected to the official government portal. Please have your documents ready before applying.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  This is an official GOI / State Government website
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  JanSuvidha does not store your application data
                </li>
              </ul>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 ${cfg.btn}`}
                >
                  Proceed to Official Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
