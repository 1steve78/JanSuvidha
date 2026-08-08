"use client";

import { useState } from "react";
import { FileText, ChevronDown, CheckSquare, Square } from "lucide-react";
import clsx from "clsx";

interface DocumentChecklistProps {
  documents: string[];
}

export default function DocumentChecklist({ documents }: DocumentChecklistProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      {/* Header / Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors duration-200 text-left"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">
            Document Checklist ({documents.length} required)
          </span>
          {checkedCount > 0 && (
            <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              {checkedCount}/{documents.length} ready
            </span>
          )}
        </div>
        <ChevronDown
          className={clsx(
            "w-4 h-4 text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Expandable List */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="divide-y divide-slate-100 bg-slate-50">
          {documents.map((doc) => {
            const checked = !!checkedDocs[doc];
            return (
              <li key={doc}>
                <button
                  type="button"
                  onClick={() => toggleDoc(doc)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100 transition-colors duration-150 text-left"
                >
                  {checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span
                    className={clsx(
                      "text-xs leading-relaxed transition-all duration-200",
                      checked ? "line-through text-slate-400" : "text-slate-600"
                    )}
                  >
                    {doc}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
