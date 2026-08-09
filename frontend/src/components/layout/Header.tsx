"use client";

import Link from "next/link";
import { ShieldAlert, Search, LayoutDashboard, Clock, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0 ring-0 select-none">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform border-0">
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5zm0 4.2a2.3 2.3 0 110 4.6 2.3 2.3 0 010-4.6zm0 13.6c-2.43 0-4.66-.72-6.5-1.96.04-2.15 4.33-3.34 6.5-3.34s6.46 1.19 6.5 3.34c-1.84 1.24-4.07 1.96-6.5 1.96z"/>
            </svg>
          </div>
          <div className="flex flex-col border-0">
            <span className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              JanSuvidha
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide mt-1">
              Aapka Haq, Aapki Saral
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link 
            href="/match" 
            className="hover:text-blue-600 flex items-center gap-1.5 transition-colors py-1"
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>Find Schemes</span>
          </Link>

          {/* Grievance Redressal in place of Report with explicit icon */}
          <Link 
            href="/report" 
            className="hover:text-emerald-600 flex items-center gap-1.5 transition-colors py-1 font-semibold text-slate-800"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <span>Grievance Redressal</span>
          </Link>

          <Link 
            href="/track" 
            className="hover:text-blue-600 flex items-center gap-1.5 transition-colors py-1"
          >
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Track Status</span>
          </Link>

          <Link 
            href="/dashboard" 
            className="hover:text-blue-600 flex items-center gap-1.5 transition-colors py-1"
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-500" />
            <span>Dashboard</span>
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full px-5 py-2 text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>Login / Sign Up</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
