"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Database,
  LogOut,
  ExternalLink
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleExitAdmin = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jan_suvidha_admin_auth");
      localStorage.removeItem("jan_suvidha_admin_user");
      window.location.href = "/dashboard";
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Urgent Priority Queue",
      href: "/admin/priority",
      icon: AlertTriangle,
      badge: "Priority",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      label: "All Grievance Reports",
      href: "/admin",
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-200 flex-shrink-0 border-r border-slate-800 flex flex-col justify-between p-4 sm:p-5">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight leading-tight block">
                JanSuvidha
              </span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400 block">
                Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md font-bold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive ? "bg-white/20 text-white border-white/30" : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Database Status Widget */}
        <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              Database State
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Waiting DB Link
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Real DB integration mode active. No mock/random data generated.
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-between w-full px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span>Public Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={handleExitAdmin}
          className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold px-3.5 py-2.5 rounded-xl border border-rose-500/30 transition-all text-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Portal</span>
        </button>
      </div>
    </aside>
  );
}
