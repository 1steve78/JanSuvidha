"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Cpu,
  Loader2,
  CheckCircle2,
  Lock,
  Globe
} from "lucide-react";
import StepProgressBar from "./StepProgressBar";
import IncomeStep from "./IncomeStep";
import OccupationStep from "./OccupationStep";
import DemographicsStep from "./DemographicsStep";
import { api } from "@/lib/api";
import { useMatchStore } from "@/lib/store";

type FormData = {
  income: string;
  rationCard: string;
  landHolding: string;
  areaType: string;
  occupation: string;
  sector: string;
  state: string;
  district: string;
  age: string;
  gender: string;
  socialCategory: string;
  disability: string;
  familyCount: string;
};

const DEFAULT_FORM: FormData = {
  income: "1L-2.5L",
  rationCard: "AAY",
  landHolding: "< 1 Hectare",
  areaType: "Rural",
  occupation: "Farmer",
  sector: "Unorganized",
  state: "Bihar",
  district: "Patna",
  age: "26-45",
  gender: "Female",
  socialCategory: "OBC",
  disability: "No",
  familyCount: "3-4",
};

export default function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setResults = useMatchStore((state) => state.setResults);

  const updateForm = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setSlideDirection("forward");
      setCurrentStep((s) => (s + 1) as 1 | 2 | 3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setSlideDirection("backward");
      setCurrentStep((s) => (s - 1) as 1 | 2 | 3);
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setSlideDirection("backward");
      setCurrentStep(step as 1 | 2 | 3);
    } else if (step > currentStep) {
      setSlideDirection("forward");
      setCurrentStep(step as 1 | 2 | 3);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const incomeMap: Record<string, number> = {
        "< 1L": 50000,
        "1L-2.5L": 150000,
        "2.5L-5L": 350000,
        "5L-8L": 650000,
        "> 8L": 1000000,
      };
      const ageMap: Record<string, number> = {
        "18-25": 22,
        "26-45": 35,
        "46-60": 53,
        "60+": 65,
      };
      
      const payload = {
        income: incomeMap[formData.income] || 150000,
        age: ageMap[formData.age] || 35,
        occupation: formData.occupation.toLowerCase(),
        gender: formData.gender.toLowerCase(),
        category: formData.socialCategory,
        state: formData.state,
        land_ownership: formData.landHolding !== "None" && formData.landHolding !== "Landless",
        student_status: formData.occupation === "Student",
        family_size: parseInt(formData.familyCount.split("-")[0]) || 4,
      };

      const data = await api.matchSchemes(payload);
      setResults(data.matches);
      router.push("/match/results");
    } catch (error) {
      console.error(error);
      alert("Failed to calculate scheme eligibility. Please check backend connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen landing-page-grid py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative ambient backdrop glow matching Landing Page */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header matching Hero & Landing Page style */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide border border-emerald-200/60 landing-shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#65a30d]" />
            <span>AI-Powered Scheme Eligibility Matcher</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Discover Government Schemes You’re{" "}
            <span className="bg-gradient-to-r from-[#65a30d] to-emerald-700 bg-clip-text text-transparent">
              Qualified For.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Answer 3 quick steps. Our AI cross-references 500+ Central and State welfare programs to generate a ranked eligibility report in seconds.
          </p>
        </div>

        {/* 3-Step Visual Process Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${currentStep === 1 ? "bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold shadow-2xs" : "bg-slate-50 text-slate-700"}`}>
            <span className="w-6 h-6 rounded-full bg-[#65a30d] text-white flex items-center justify-center text-xs">1</span>
            <span>Enter Income & Assets</span>
          </div>
          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${currentStep === 2 ? "bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold shadow-2xs" : "bg-slate-50 text-slate-700"}`}>
            <span className="w-6 h-6 rounded-full bg-[#65a30d] text-white flex items-center justify-center text-xs">2</span>
            <span>State & Occupation</span>
          </div>
          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${currentStep === 3 ? "bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold shadow-2xs" : "bg-slate-50 text-slate-700"}`}>
            <span className="w-6 h-6 rounded-full bg-[#65a30d] text-white flex items-center justify-center text-xs">3</span>
            <span>Demographics & Match</span>
          </div>
        </div>

        {/* Main Glassmorphic Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 landing-shadow-xl overflow-hidden">
          {/* Gradient Top Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-amber-500 via-[#65a30d] to-emerald-700" />

          <div className="p-6 sm:p-10">
            <StepProgressBar
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />

            {/* Sliding Animated Step Container */}
            <div className="relative overflow-hidden mt-6 min-h-[380px]">
              <div
                key={currentStep}
                className={slideDirection === "forward" ? "step-slide-right" : "step-slide-left"}
              >
                {currentStep === 1 && (
                  <IncomeStep formData={formData} updateForm={updateForm} />
                )}
                {currentStep === 2 && (
                  <OccupationStep formData={formData} updateForm={updateForm} />
                )}
                {currentStep === 3 && (
                  <DemographicsStep formData={formData} updateForm={updateForm} />
                )}
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold bg-[#65a30d] hover:bg-[#4d7c0f] active:bg-emerald-800 text-white landing-shadow-md hover:scale-[1.02] transition-all duration-200"
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-extrabold bg-gradient-to-r from-amber-500 via-[#65a30d] to-emerald-700 hover:from-amber-600 hover:to-emerald-800 text-white landing-shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  )}
                  <span>{isSubmitting ? "Calculating Matches..." : "Find Eligible Schemes"}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges Footer matching Landing Page */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-600 pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Free & Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No Aadhaar or Personal Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Official Government Scheme Databases</span>
          </div>
        </div>

      </div>
    </section>
  );
}
