"use client";

import { Users } from "lucide-react";
import clsx from "clsx";

interface DemographicsStepProps {
  formData: Record<string, string>;
  updateForm: (fields: Partial<Record<string, string>>) => void;
}

const selectClass =
  "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 outline-none transition-all duration-200 text-slate-700 appearance-none cursor-pointer";

const FAMILY_OPTIONS = ["1-2", "3-4", "5-6", "7+"];

export default function DemographicsStep({ formData, updateForm }: DemographicsStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-lg shadow-emerald-200/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Step 3: Demographics &amp; Family Profile</h2>
        </div>
        <p className="text-sm text-emerald-100 leading-relaxed">
          Demographic data helps us identify targeted schemes for women, senior citizens, persons with disabilities, and marginalized communities.
        </p>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Applicant Age */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Applicant Age
          </label>
          <div className="relative">
            <select
              value={formData.age}
              onChange={(e) => updateForm({ age: e.target.value })}
              className={selectClass}
            >
              <option value="18-25">18 – 25 years</option>
              <option value="26-45">26 – 45 years</option>
              <option value="46-59">46 – 59 years</option>
              <option value="60+">60+ years (Senior Citizen)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Gender
          </label>
          <div className="relative">
            <select
              value={formData.gender}
              onChange={(e) => updateForm({ gender: e.target.value })}
              className={selectClass}
            >
              <option value="Female">Female (priority in many schemes)</option>
              <option value="Male">Male</option>
              <option value="Transgender">Transgender / Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Social Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Social Category
          </label>
          <div className="relative">
            <select
              value={formData.socialCategory}
              onChange={(e) => updateForm({ socialCategory: e.target.value })}
              className={selectClass}
            >
              <option value="OBC">OBC (Other Backward Classes)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="General/EWS">General / EWS</option>
              <option value="Minority">Minority Community</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Disability Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Disability Status
          </label>
          <div className="relative">
            <select
              value={formData.disability}
              onChange={(e) => updateForm({ disability: e.target.value })}
              className={selectClass}
            >
              <option value="No">No Disability</option>
              <option value="Yes">Yes – 40%+ Disability (UDID / PwD Certificate)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Family Members Toggle */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Family Members (including yourself)
        </label>
        <div className="grid grid-cols-4 gap-2">
          {FAMILY_OPTIONS.map((opt) => {
            const isActive = formData.familyCount === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => updateForm({ familyCount: opt })}
                className={clsx(
                  "py-3 rounded-xl text-sm font-bold border transition-all duration-200 focus:outline-none",
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400">Select the total number of members in your household.</p>
      </div>
    </div>
  );
}
