"use client";

import React from "react";
import { ShieldAlert, Scale, Building2, ShieldCheck, Check } from "lucide-react";

export interface CategoryOption {
  id: string;
  name: "Harassment" | "Corruption" | "Civic Issue" | "Safety";
  description: string;
  icon: React.ElementType;
  accentColor: string;
  borderClass: string;
  bgGradient: string;
  iconBg: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: "harassment",
    name: "Harassment",
    description: "Workplace, public space, online abuse, or personal safety threats.",
    icon: ShieldAlert,
    accentColor: "#ef4444",
    borderClass: "border-rose-200 hover:border-rose-300",
    bgGradient: "from-rose-50 to-rose-100/30",
    iconBg: "bg-rose-600 text-white",
  },
  {
    id: "corruption",
    name: "Corruption",
    description: "Bribery, extortion, official misconduct, or public fund misuse.",
    icon: Scale,
    accentColor: "#f59e0b",
    borderClass: "border-amber-200 hover:border-amber-300",
    bgGradient: "from-amber-50 to-amber-100/30",
    iconBg: "bg-amber-500 text-white",
  },
  {
    id: "civic",
    name: "Civic Issue",
    description: "Potholes, broken streetlights, garbage dumping, or water leaks.",
    icon: Building2,
    accentColor: "#6366f1",
    borderClass: "border-indigo-200 hover:border-indigo-300",
    bgGradient: "from-indigo-50 to-indigo-100/30",
    iconBg: "bg-indigo-600 text-white",
  },
  {
    id: "safety",
    name: "Safety",
    description: "Hazardous areas, structural risks, traffic danger, or emergency risks.",
    icon: ShieldCheck,
    accentColor: "#10b981",
    borderClass: "border-emerald-200 hover:border-emerald-300",
    bgGradient: "from-emerald-50 to-emerald-100/30",
    iconBg: "bg-emerald-600 text-white",
  },
];

interface CategoryPickerProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: "Harassment" | "Corruption" | "Civic Issue" | "Safety") => void;
  error?: string;
}

export default function CategoryPicker({
  selectedCategory,
  onSelectCategory,
  error,
}: CategoryPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-900">
          1. Select Category <span className="text-rose-500">*</span>
        </label>
        <span className="text-xs text-slate-500 font-medium">
          Choose the option that best fits your report
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const Icon = cat.icon;

          return (
            <label
              key={cat.id}
              className={`relative flex flex-col justify-between p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer group overflow-hidden select-none ${
                isSelected
                  ? "ring-2 ring-blue-600 border-blue-600 bg-blue-50/60 shadow-md scale-[1.01]"
                  : `bg-white ${cat.borderClass} hover:bg-slate-50/80 shadow-xs`
              }`}
            >
              {/* Native Radio Input (Visually Hidden) */}
              <input
                type="radio"
                name="report-category"
                value={cat.name}
                checked={isSelected}
                onChange={() => onSelectCategory(cat.name)}
                className="sr-only"
              />

              {/* Card background tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} transition-opacity duration-200 ${
                  isSelected ? "opacity-100" : "opacity-30 group-hover:opacity-70"
                }`}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center justify-center p-3 rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-105 ${cat.iconBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 shrink-0 ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm scale-110"
                        : "border-slate-300 bg-white text-transparent group-hover:border-blue-400"
                    }`}
                  >
                    <Check
                      className={`w-3.5 h-3.5 stroke-[3] text-white transition-opacity duration-200 ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Active selection accent line at bottom */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />
              )}
            </label>
          );
        })}
      </div>

      {error && (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
