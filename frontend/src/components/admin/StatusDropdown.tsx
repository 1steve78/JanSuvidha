"use client";

import React, { useState } from "react";
import { ChevronDown, Check, Clock, AlertTriangle, ShieldCheck, AlertCircle } from "lucide-react";
import { GrievanceReport } from "@/lib/reports";

interface StatusDropdownProps {
  currentStatus: GrievanceReport["status"];
  onStatusChange: (newStatus: GrievanceReport["status"]) => void;
}

export default function StatusDropdown({ currentStatus, onStatusChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const statuses: { label: GrievanceReport["status"]; color: string; icon: any }[] = [
    { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100", icon: Clock },
    { label: "Under Review", color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100", icon: ShieldCheck },
    { label: "In Progress", color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100", icon: Clock },
    { label: "Resolved", color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100", icon: Check },
    { label: "Escalated", color: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100", icon: AlertTriangle },
  ];

  const activeStatus = statuses.find((s) => s.label === currentStatus) || statuses[0];
  const ActiveIcon = activeStatus.icon;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all shadow-2xs ${activeStatus.color}`}
      >
        <ActiveIcon className="w-3.5 h-3.5" />
        <span>{currentStatus}</span>
        <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
            <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Update Status
            </div>
            {statuses.map((s) => {
              const Icon = s.icon;
              const isSelected = s.label === currentStatus;
              return (
                <button
                  key={s.label}
                  onClick={() => {
                    onStatusChange(s.label);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 transition-colors ${
                    isSelected ? "text-indigo-600 font-bold bg-indigo-50/50" : "text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{s.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
