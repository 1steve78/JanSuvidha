"use client";

import { Wallet } from "lucide-react";

interface IncomeStepProps {
  formData: Record<string, string>;
  updateForm: (fields: Partial<Record<string, string>>) => void;
}

const selectClass =
  "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition-all duration-200 text-slate-700 appearance-none cursor-pointer";

export default function IncomeStep({ formData, updateForm }: IncomeStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-200/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Step 1: Household Income &amp; Assets</h2>
        </div>
        <p className="text-sm text-blue-100 leading-relaxed">
          Help us understand your economic profile. This data is used to calculate eligibility thresholds across 500+ central and state welfare schemes.
        </p>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Annual Household Income */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Annual Household Income
          </label>
          <div className="relative">
            <select
              value={formData.income}
              onChange={(e) => updateForm({ income: e.target.value })}
              className={selectClass}
            >
              <option value="Below 1L">Below ₹1,00,000</option>
              <option value="1L-2.5L">₹1,00,000 – ₹2,50,000</option>
              <option value="2.5L-5L">₹2,50,000 – ₹5,00,000</option>
              <option value="Above 5L">Above ₹5,00,000</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Ration Card Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Ration Card Type
          </label>
          <div className="relative">
            <select
              value={formData.rationCard}
              onChange={(e) => updateForm({ rationCard: e.target.value })}
              className={selectClass}
            >
              <option value="AAY">AAY (Antyodaya Anna Yojana)</option>
              <option value="PHH">PHH (Priority Household)</option>
              <option value="APL">APL (Above Poverty Line)</option>
              <option value="None">None / Not Applicable</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Land Holding */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Land Holding
          </label>
          <div className="relative">
            <select
              value={formData.landHolding}
              onChange={(e) => updateForm({ landHolding: e.target.value })}
              className={selectClass}
            >
              <option value="Landless">Landless</option>
              <option value="< 1 Hectare">Less than 1 Hectare</option>
              <option value="1-2 Hectares">1 – 2 Hectares</option>
              <option value="> 2 Hectares">More than 2 Hectares</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Residential Area */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Residential Area
          </label>
          <div className="relative">
            <select
              value={formData.areaType}
              onChange={(e) => updateForm({ areaType: e.target.value })}
              className={selectClass}
            >
              <option value="Rural">Rural</option>
              <option value="Semi-Urban">Semi-Urban</option>
              <option value="Urban">Urban</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
