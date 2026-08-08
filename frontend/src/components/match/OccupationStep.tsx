"use client";

import { Briefcase } from "lucide-react";

interface OccupationStepProps {
  formData: Record<string, string>;
  updateForm: (fields: Partial<Record<string, string>>) => void;
}

const selectClass =
  "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 outline-none transition-all duration-200 text-slate-700 appearance-none cursor-pointer";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Gujarat",
  "Haryana",
  "Jharkhand",
  "Karnataka",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
];

export default function OccupationStep({ formData, updateForm }: OccupationStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg shadow-indigo-200/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Step 2: Occupation &amp; Jurisdiction</h2>
        </div>
        <p className="text-sm text-indigo-100 leading-relaxed">
          Your employment type and geographical location help us identify both central schemes and state-specific welfare programs you qualify for.
        </p>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Primary Occupation */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Primary Occupation
          </label>
          <div className="relative">
            <select
              value={formData.occupation}
              onChange={(e) => updateForm({ occupation: e.target.value })}
              className={selectClass}
            >
              <option value="Farmer">Farmer / Agricultural Worker</option>
              <option value="Artisan">Artisan / Craftsperson</option>
              <option value="Daily Wage Worker">Daily Wage Worker</option>
              <option value="Student">Student</option>
              <option value="Street Vendor">Street Vendor</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Unemployed">Unemployed / Job Seeker</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Employment Sector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Employment Sector
          </label>
          <div className="relative">
            <select
              value={formData.sector}
              onChange={(e) => updateForm({ sector: e.target.value })}
              className={selectClass}
            >
              <option value="Unorganized">Unorganized Sector</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Contractual">Contractual / Temporary</option>
              <option value="Formal">Formal / Organised Sector</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* State of Residence */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            State of Residence
          </label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => updateForm({ state: e.target.value })}
              className={selectClass}
            >
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* District/Block */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            District / Block
          </label>
          <input
            type="text"
            placeholder="e.g. Patna, Gaya..."
            value={formData.district}
            onChange={(e) => updateForm({ district: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 outline-none transition-all duration-200 text-slate-700 placeholder-slate-300"
          />
        </div>
      </div>
    </div>
  );
}
