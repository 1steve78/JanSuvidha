"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  ShieldAlert,
  FileText,
  Lock,
  Smartphone,
  Landmark,
  CreditCard,
  HeartPulse,
  Sprout,
  Users,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Building2,
  Share2
} from "lucide-react";

export default function Footer() {
  // Scheme directory categories (No heavy boxes - clean text layout)
  const schemeCategories = [
    {
      title: "Central Schemes",
      links: [
        { label: "Apply Now", href: "/match" },
        { label: "Check Eligibility", href: "/match" },
        { label: "Central Guidelines & FAQs", href: "#faq" },
      ],
    },
    {
      title: "State Welfare",
      links: [
        { label: "State Portals", href: "/match" },
        { label: "Eligibility Checker", href: "/match" },
        { label: "State Nodal Officers", href: "/report" },
      ],
    },
    {
      title: "District & Local",
      links: [
        { label: "District Grievances", href: "/report" },
        { label: "Track Local Status", href: "/track" },
        { label: "Municipal Directory", href: "/dashboard" },
      ],
    },
    {
      title: "Women & Child",
      links: [
        { label: "Maternity Benefits", href: "/match" },
        { label: "Girl Child Education", href: "/match" },
        { label: "Self Help Groups", href: "/match" },
      ],
    },
    {
      title: "Farmers & Agriculture",
      links: [
        { label: "Crop Insurance & Subsidies", href: "/match" },
        { label: "PM-Kisan Direct Credit", href: "/match" },
        { label: "Soil & Water Grants", href: "/match" },
      ],
    },
    {
      title: "Youth & Students",
      links: [
        { label: "National Scholarships", href: "/match" },
        { label: "Skill India Training", href: "/match" },
        { label: "Apprenticeship Portal", href: "/match" },
      ],
    },
    {
      title: "Seniors & Pensioners",
      links: [
        { label: "Old Age Pension Scheme", href: "/match" },
        { label: "Life Certificate (Jeevan Pramaan)", href: "/match" },
        { label: "Senior Healthcare Benefits", href: "/match" },
      ],
    },
    {
      title: "PwD & Special Needs",
      links: [
        { label: "UDID Card Registration", href: "/match" },
        { label: "Disability Pensions", href: "/match" },
        { label: "Assistive Device Grants", href: "/match" },
      ],
    },
    {
      title: "Minorities & Welfare",
      links: [
        { label: "Pre & Post Matric Aid", href: "/match" },
        { label: "Entrepreneurship Loans", href: "/match" },
        { label: "Community Grants", href: "/match" },
      ],
    },
    {
      title: "BPL & Low Income",
      links: [
        { label: "Ration Card Renewal", href: "/match" },
        { label: "PMAY Affordable Housing", href: "/match" },
        { label: "Free Medical Coverage", href: "/match" },
      ],
    },
    {
      title: "Health & Medical",
      links: [
        { label: "Ayushman Card Download", href: "/match" },
        { label: "Free Clinic Finder", href: "/match" },
        { label: "Immunization Telemetry", href: "/match" },
      ],
    },
    {
      title: "Civic & Grievance",
      links: [
        { label: "Report Potholes & Roads", href: "/report" },
        { label: "Sanitation & Waste Alert", href: "/report" },
        { label: "Corruption Whistleblower", href: "/report" },
      ],
    },
  ];

  // Official Government Portals with real links and distinct icons
  const govPortals = [
    {
      name: "India.gov.in",
      desc: "National Portal of India",
      url: "https://india.gov.in",
      icon: Globe,
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      name: "MyGov.in",
      desc: "Citizen Engagement Platform",
      url: "https://mygov.in",
      icon: Users,
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      name: "DigiLocker",
      desc: "Official Document Repository",
      url: "https://digilocker.gov.in",
      icon: Lock,
      iconBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    },
    {
      name: "UIDAI Aadhaar",
      desc: "Unique Identification Portal",
      url: "https://uidai.gov.in",
      icon: CreditCard,
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      name: "CPGRAMS",
      desc: "Central Public Grievance Redressal",
      url: "https://pgportal.gov.in",
      icon: ShieldCheck,
      iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    },
    {
      name: "DBT Bharat",
      desc: "Direct Benefit Transfer Portal",
      url: "https://dbtbharat.gov.in",
      icon: Landmark,
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
    {
      name: "UMANG Portal",
      desc: "Unified Mobile Governance App",
      url: "https://umang.gov.in",
      icon: Smartphone,
      iconBg: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    },
    {
      name: "National Cyber Crime",
      desc: "Official Cyber Incident Helpline",
      url: "https://cybercrime.gov.in",
      icon: ShieldAlert,
      iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
    {
      name: "PM-Kisan Portal",
      desc: "Farmer Financial Transfer System",
      url: "https://pmkisan.gov.in",
      icon: Sprout,
      iconBg: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    {
      name: "NHA Ayushman",
      desc: "National Health Authority",
      url: "https://nha.gov.in",
      icon: HeartPulse,
      iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
  ];

  return (
    <footer className="w-full mt-auto bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header Row matching screenshot typography */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              <Building2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                Extended Platform Sections
              </h2>
              <p className="text-[11px] text-slate-400">
                Comprehensive directory of citizen welfare schemes, grievances & government services
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span>|</span>
            <a href="#faq" className="hover:text-white transition-colors">Help Center</a>
          </div>
        </div>

        {/* SECTION 1: Scheme Categories (No heavy boxes - clean typography grid layout) */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Scheme Categories & Services</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              12 Primary Welfare Streams
            </span>
          </div>

          {/* Clean grid without heavy rounded card boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8 pb-10 border-b border-slate-800">
            {schemeCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xs font-extrabold text-white tracking-wide border-b border-slate-800/80 pb-1.5 flex items-center justify-between">
                  <span>{cat.title}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
                  {cat.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="hover:text-blue-400 transition-colors flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Official Government Portals & Website Links (With Icons & No Boxes) */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Official Government Portals & Portals Directory</span>
              </h3>
              <p className="text-xs text-slate-400">
                Direct external access to Indian Central & State Government administrative portals
              </p>
            </div>
            <span className="hidden sm:inline-flex text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Verified Gov Domains (.gov.in / .nic.in)
            </span>
          </div>

          {/* Clean icon list layout (No heavy card boxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-10 border-b border-slate-800">
            {govPortals.map((portal, pIdx) => {
              const IconComponent = portal.icon;
              return (
                <a
                  key={pIdx}
                  href={portal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900 transition-all border border-transparent hover:border-slate-800"
                >
                  <div className={`p-2 rounded-xl border ${portal.iconBg} group-hover:scale-105 transition-transform shrink-0`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                        {portal.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {portal.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Brand Summary & Newsletter Sub-Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          <div className="md:col-span-6 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                JanSuvidha Portal
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              JanSuvidha is an open citizen platform connecting individuals with government welfare entitlement schemes and enabling direct civic grievance redressal with local municipal authorities.
            </p>
          </div>

          <div className="md:col-span-6 space-y-3 flex flex-col justify-center">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Subscribe for Scheme Notifications
            </h4>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter email for welfare alerts"
                className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 text-xs rounded-xl transition-all shrink-0 flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 JanSuvidha Portal. All rights reserved. Built for transparent civic access.
          </div>

          <div className="flex items-center gap-5 font-medium">
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Accessibility</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
