"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, Cpu, Loader2 } from "lucide-react";
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
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setResults = useMatchStore((state) => state.setResults);

  const updateForm = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((s) => (s + 1) as 1 | 2 | 3);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as 1 | 2 | 3);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Convert frontend form strings to backend numeric/bool expected values
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
        land_ownership: formData.landHolding !== "None",
        student_status: formData.occupation === "Student",
        family_size: parseInt(formData.familyCount.split("-")[0]) || 4,
      };

      const data = await api.matchSchemes(payload);
      setResults(data.matches);
      router.push("/match/results");
    } catch (error) {
      console.error(error);
      alert("Failed to find schemes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) setCurrentStep(step as 1 | 2 | 3);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-blue-200">
            <Cpu className="w-3.5 h-3.5" />
            AI/ML Scheme Eligibility Matcher
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Find Your Government{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Scheme Eligibility
            </span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Answer 3 quick steps. Our AI cross-references 500+ welfare schemes to give you a ranked eligibility report in seconds.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Gradient Accent Bar */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />

          <div className="p-6 sm:p-10">
            <StepProgressBar
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />

            <div className="mt-2">
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

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
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
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all duration-200"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  )}
                  {isSubmitting ? "Matching..." : "Find Eligible Schemes"}
                  {!isSubmitting && <Sparkles className="w-4 h-4 text-amber-300" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>No data stored on servers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>CERT-IN compliant encryption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official government sources only</span>
          </div>
        </div>
      </div>
    </section>
  );
}
