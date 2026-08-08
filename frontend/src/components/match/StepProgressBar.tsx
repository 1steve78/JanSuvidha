"use client";

import { Wallet, Briefcase, Users, CheckCircle } from "lucide-react";
import clsx from "clsx";

interface StepProgressBarProps {
  currentStep: 1 | 2 | 3;
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { number: 1, label: "Income & Assets", Icon: Wallet },
  { number: 2, label: "Occupation & State", Icon: Briefcase },
  { number: 3, label: "Demographics", Icon: Users },
];

export default function StepProgressBar({ currentStep, onStepClick }: StepProgressBarProps) {
  const progressPercent = ((currentStep - 1) / 2) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Track */}
      <div className="relative mb-6">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Badges */}
      <div className="grid grid-cols-3 gap-2">
        {STEPS.map(({ number, label, Icon }) => {
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
                "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 focus:outline-none",
                isCompleted && "bg-emerald-50 border-emerald-200 cursor-pointer hover:bg-emerald-100",
                isCurrent && "bg-blue-50 border-blue-300 shadow-md shadow-blue-100 cursor-default",
                isFuture && "bg-slate-50 border-slate-100 cursor-not-allowed opacity-60"
              )}
            >
              <div
                className={clsx(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                  isCompleted && "bg-emerald-500 text-white",
                  isCurrent && "bg-blue-600 text-white shadow-lg shadow-blue-200",
                  isFuture && "bg-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="text-center">
                <p
                  className={clsx(
                    "text-[10px] font-semibold uppercase tracking-widest",
                    isCompleted && "text-emerald-600",
                    isCurrent && "text-blue-700",
                    isFuture && "text-slate-400"
                  )}
                >
                  Step {number}
                </p>
                <p
                  className={clsx(
                    "text-xs font-medium leading-tight",
                    isCompleted && "text-emerald-700",
                    isCurrent && "text-blue-800",
                    isFuture && "text-slate-400"
                  )}
                >
                  {label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
