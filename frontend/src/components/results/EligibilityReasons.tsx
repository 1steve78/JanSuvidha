"use client";

import { Info, CheckCircle2 } from "lucide-react";

interface EligibilityReasonsProps {
  reasons: string[];
}

export default function EligibilityReasons({ reasons }: EligibilityReasonsProps) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-blue-500 shrink-0" />
        <h4 className="text-sm font-bold text-slate-700">Why You&apos;re Eligible (ML Explanation)</h4>
      </div>
      <ul className="space-y-2">
        {reasons.map((reason, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">{reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
