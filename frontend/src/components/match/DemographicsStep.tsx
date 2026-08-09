"use client";

import { Users, Heart, Shield, Sparkles } from "lucide-react";

interface DemographicsStepProps {
  formData: Record<string, string>;
  updateForm: (fields: Partial<Record<string, string>>) => void;
}

const selectClass =
  "w-full px-4 py-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all duration-200 text-slate-800 appearance-none cursor-pointer";

export default function DemographicsStep({ formData, updateForm }: DemographicsStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-[#65a30d] to-emerald-700 p-6 text-white landing-shadow-md">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Step 3: Demographics &amp; Family Profile</h2>
            <p className="text-xs text-emerald-100 font-medium">Targeted benefit allocation &amp; affirmative action matching</p>
          </div>
        </div>
        <p className="text-xs text-emerald-100 leading-relaxed mt-2 pl-0.5">
          Demographic attributes unlock targeted social security programs, maternity aid, senior pensions, and affirmative action quotas.
        </p>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Age Group */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Age Bracket
          </label>
          <div className="relative">
            <select
              value={formData.age}
              onChange={(e) => updateForm({ age: e.target.value })}
              className={selectClass}
            >
              <option value="18-25">18 – 25 Years (Youth &amp; Student Schemes)</option>
              <option value="26-45">26 – 45 Years (Livelihood &amp; Housing)</option>
              <option value="46-60">46 – 60 Years (Pre-Retirement &amp; Health)</option>
              <option value="60+">60+ Years (Senior Citizens Pension)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Used for age-bracketed pension & scholarship rules</p>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Gender</span>
            <Heart className="w-3.5 h-3.5 text-pink-500" />
          </label>
          <div className="relative">
            <select
              value={formData.gender}
              onChange={(e) => updateForm({ gender: e.target.value })}
              className={selectClass}
            >
              <option value="Female">Female (Maternity, SHG &amp; Women Schemes)</option>
              <option value="Male">Male</option>
              <option value="Transgender">Transgender (Special Welfare Boards)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Unlocks 120+ specialized women empowerment schemes</p>
        </div>

        {/* Social Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>Social Category</span>
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
          </label>
          <div className="relative">
            <select
              value={formData.socialCategory}
              onChange={(e) => updateForm({ socialCategory: e.target.value })}
              className={selectClass}
            >
              <option value="General">General Category</option>
              <option value="OBC">OBC (Other Backward Classes)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Used for affirmative action quotas & stipend grants</p>
        </div>

        {/* Persons with Disability (PwD) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Disability Status (PwD)
          </label>
          <div className="relative">
            <select
              value={formData.disability}
              onChange={(e) => updateForm({ disability: e.target.value })}
              className={selectClass}
            >
              <option value="No">No Disability</option>
              <option value="Yes">Yes (Disability 40% or Higher - UDID Holder)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Unlocks assistive device grants & PwD pensions</p>
        </div>
      </div>
    </div>
  );
}
