"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  LogOut
} from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();

  const handleAdminToggle = (state: boolean) => {
    if (typeof window !== "undefined") {
      if (state) {
        localStorage.setItem("jan_suvidha_admin_auth", "true");
        window.location.reload();
      } else {
        localStorage.removeItem("jan_suvidha_admin_auth");
        window.location.href = "/dashboard";
      }
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Urgent Priority Queue",
      href: "/admin/priority",
      icon: AlertTriangle,
      badge: "Priority",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
    },
    {
      label: "All Grievance Reports",
      href: "/admin/reports",
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <>
      {/* Fixed admin sub-nav — pinned just below the global header (top-24 = 96px) */}
      <div className="bg-white border-b border-[#E4ECF8] w-full fixed top-24 left-0 right-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-2">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? "bg-slate-100 text-slate-900 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-slate-900" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`ml-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isActive ? "bg-white text-slate-900 border-slate-200" : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => handleAdminToggle(false)}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-colors ml-4"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Invisible spacer — same height as the fixed nav above, pushes page content down */}
      <div className="h-[53px] shrink-0" aria-hidden="true" />
    </>
  );
}
