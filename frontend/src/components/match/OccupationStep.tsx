"use client";

import { Briefcase, MapPin, Building, Info } from "lucide-react";

interface OccupationStepProps {
  formData: Record<string, string>;
  updateForm: (fields: Partial<Record<string, string>>) => void;
}

const selectClass =
  "w-full px-4 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-200 text-slate-800 appearance-none cursor-pointer";

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function OccupationStep({ formData, updateForm }: OccupationStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 p-6 text-white landing-shadow-md">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/30">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Step 2: Occupation &amp; State Domicile</h2>
            <p className="text-xs text-indigo-100 font-medium">State-specific entitlement &amp; sectoral benefit cross-check</p>
          </div>
        </div>
        <p className="text-xs text-indigo-100 leading-relaxed mt-2 pl-0.5">
          Occupation and state residency dictate over 60% of state-sponsored welfare grants. Select your primary work stream and domicile location.
        </p>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Primary Occupation */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Primary Occupation</span>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </label>
          <div className="relative">
            <select
              value={formData.occupation}
              onChange={(e) => updateForm({ occupation: e.target.value })}
              className={selectClass}
            >
              <option value="Farmer">Farmer / Agricultural Worker</option>
              <option value="Laborer">Daily Wage Worker / Laborer</option>
              <option value="Artisan">Handloom Artisan / Weaver / Craftsperson</option>
              <option value="Student">Student / Scholar</option>
              <option value="Self-Employed">Self-Employed / Small Business (MSME)</option>
              <option value="Unemployed">Unemployed / Job Seeker</option>
              <option value="Salaried Private">Salaried Private Employee</option>
              <option value="Homemaker">Homemaker / Caregiver</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Used for sector-specific welfare & scholarship matching</p>
        </div>

        {/* Sector Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Employment Sector</span>
            <Building className="w-3.5 h-3.5 text-slate-400" />
          </label>
          <div className="relative">
            <select
              value={formData.sector}
              onChange={(e) => updateForm({ sector: e.target.value })}
              className={selectClass}
            >
              <option value="Unorganized">Unorganized Sector (e-Shram Eligible)</option>
              <option value="Organized">Organized / Private Enterprise</option>
              <option value="Government">Government / Public Sector</option>
              <option value="N/A">Not Applicable</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Determines eligibility for e-Shram & Labour Welfare Boards</p>
        </div>

        {/* Domicile State */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Domicile State</span>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
          </label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => updateForm({ state: e.target.value })}
              className={selectClass}
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Cross-references state-level welfare portals & funds</p>
        </div>

        {/* District */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            District Name
          </label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => updateForm({ district: e.target.value })}
            placeholder="e.g. Patna, Lucknow, Pune"
            className="w-full px-4 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all duration-200 text-slate-800"
          />
          <p className="text-[11px] text-slate-400 font-medium">Optional: Used for district nodal officer mapping</p>
        </div>
      </div>
    </div>
  );
}
