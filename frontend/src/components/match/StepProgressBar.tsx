"use client";

import { Wallet, Briefcase, Users, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

interface StepProgressBarProps {
  currentStep: 1 | 2 | 3;
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { number: 1, label: "Income & Assets", desc: "Economic Profile", Icon: Wallet },
  { number: 2, label: "Occupation & State", desc: "Region & Work", Icon: Briefcase },
  { number: 3, label: "Demographics", desc: "Family & Social", Icon: Users },
];

export default function StepProgressBar({ currentStep, onStepClick }: StepProgressBarProps) {
  const progressPercent = ((currentStep - 1) / 2) * 100;

  return (
    <div className="w-full mb-8">
      {/* Animated Gradient Track */}
      <div className="relative mb-6">
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-3 gap-3">
        {STEPS.map(({ number, label, desc, Icon }) => {
          const isCompleted = number < currentStep;
          const isCurrent = number === currentStep;
          const isFuture = number > currentStep;

          return (
            <button
              key={number}
              type="button"
              onClick={() => onStepClick?.(number)}
              disabled={isFuture}
              className={clsx(
                "flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-300 focus:outline-none",
                isCompleted && "bg-emerald-50/80 border-emerald-200/80 cursor-pointer hover:bg-emerald-100/80",
                isCurrent && "bg-blue-50/90 border-blue-300 shadow-md shadow-blue-100 cursor-default",
                isFuture && "bg-slate-50/60 border-slate-100 cursor-not-allowed opacity-50"
              )}
            >
              <div
                className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                  isCompleted && "bg-emerald-500 text-white shadow-xs",
                  isCurrent && "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105",
                  isFuture && "bg-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0 text-center sm:text-left">
                <div
                  className={clsx(
                    "text-[10px] font-extrabold uppercase tracking-widest",
                    isCompleted && "text-emerald-700",
                    isCurrent && "text-blue-700",
                    isFuture && "text-slate-400"
                  )}
                >
                  Step 0{number}
                </div>
                <div
                  className={clsx(
                    "text-xs font-bold truncate leading-snug",
                    isCompleted && "text-emerald-900",
                    isCurrent && "text-blue-900",
                    isFuture && "text-slate-500"
                  )}
                >
                  {label}
                </div>
                <div className="hidden md:block text-[11px] text-slate-400 truncate">
                  {desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
