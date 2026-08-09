"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 pt-4 pb-2 px-4 sm:px-6 lg:px-8 bg-transparent pointer-events-none group">
      <div className="w-full max-w-screen-2xl mx-auto bg-white hover:bg-white/95 backdrop-blur-md rounded-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05),0_10px_20px_-2px_rgba(0,0,0,0.02)] h-[72px] flex items-center justify-between px-6 lg:px-8 border border-white/40 hover:border-white/80 pointer-events-auto transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group/logo outline-none focus:outline-none select-none">
          <span className="text-2xl font-extrabold text-[#65a30d] tracking-tighter leading-none group-hover/logo:opacity-90 transition-opacity">
            JanSuvidha
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <Link href="/match" className="hover:text-slate-900 transition-colors">
            Schemes
          </Link>
          <Link href="/report" className="hover:text-slate-900 transition-colors">
            Grievances
          </Link>
          <Link href="/track" className="hover:text-slate-900 transition-colors">
            Track Status
          </Link>
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
            Dashboard
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-slate-700 hover:text-slate-900 font-medium text-[15px] px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            Public Map
          </Link>
          <Link
            href="/admin/login"
            className="bg-[#0f172a] hover:bg-black text-white font-medium text-[15px] px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
          >
            Admin Portal
          </Link>
        </div>

      </div>
    </header>
  );
}
