"use client";

import { Wallet, Info, CheckCircle2 } from "lucide-react";

interface IncomeStepProps {
  formData: Record<string, string>;
  updateForm: (fields: Partial<Record<string, string>>) => void;
}

const selectClass =
  "w-full px-4 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-200 text-slate-800 appearance-none cursor-pointer";

export default function IncomeStep({ formData, updateForm }: IncomeStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white landing-shadow-md">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/30">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Step 1: Household Income &amp; Assets</h2>
            <p className="text-xs text-blue-100 font-medium">Economic threshold calibration for welfare grants</p>
          </div>
        </div>
        <p className="text-xs text-blue-100 leading-relaxed mt-2 pl-0.5">
          Help us evaluate your economic profile. Our matcher calculates income limits across 500+ Central and State welfare programs (such as PM-Kisan, PMAY, & Ration subsidies).
        </p>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Annual Household Income */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Annual Household Income</span>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </label>
          <div className="relative">
            <select
              value={formData.income}
              onChange={(e) => updateForm({ income: e.target.value })}
              className={selectClass}
            >
              <option value="Below 1L">Below ₹1,00,000 / Year (BPL Target)</option>
              <option value="1L-2.5L">₹1,00,000 – ₹2,50,000 / Year</option>
              <option value="2.5L-5L">₹2,50,000 – ₹5,00,000 / Year</option>
              <option value="5L-8L">₹5,00,000 – ₹8,00,000 / Year (EWS Cutoff)</option>
              <option value="Above 8L">Above ₹8,00,000 / Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Includes combined earnings of all family members</p>
        </div>

        {/* Ration Card Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Ration Card Category</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </label>
          <div className="relative">
            <select
              value={formData.rationCard}
              onChange={(e) => updateForm({ rationCard: e.target.value })}
              className={selectClass}
            >
              <option value="AAY">AAY (Antyodaya Anna Yojana - Poorest Households)</option>
              <option value="PHH">PHH (Priority Household Card)</option>
              <option value="APL">APL (Above Poverty Line Card)</option>
              <option value="None">None / Not Applicable</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Used for food subsidy & health card matching</p>
        </div>

        {/* Land Holding */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Agricultural Land Holding</span>
          </label>
          <div className="relative">
            <select
              value={formData.landHolding}
              onChange={(e) => updateForm({ landHolding: e.target.value })}
              className={selectClass}
            >
              <option value="Landless">Landless / Non-Farmer</option>
              <option value="< 1 Hectare">Marginal Farmer (&lt; 1 Hectare)</option>
              <option value="1-2 Hectares">Small Farmer (1 – 2 Hectares)</option>
              <option value="> 2 Hectares">Large Farmer (&gt; 2 Hectares)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Used for PM-Kisan & Krishi Kranti grants</p>
        </div>

        {/* Residential Area Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Residential Environment</span>
          </label>
          <div className="relative">
            <select
              value={formData.areaType}
              onChange={(e) => updateForm({ areaType: e.target.value })}
              className={selectClass}
            >
              <option value="Rural">Rural (Gram Panchayat)</option>
              <option value="Semi-Urban">Semi-Urban / Peri-Urban</option>
              <option value="Urban">Urban (Nagar Nigam / Municipal Corporation)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Applies urban/rural scheme rules</p>
        </div>
      </div>
    </div>
  );
}
