"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <footer className="w-full flex flex-col relative z-20 bg-white overflow-hidden">
      
      {/* Background Illustration */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Image
          src="/images/footer_lineart.jpg"
          alt="Civic welfare background illustration"
          fill
          className="object-cover object-bottom mix-blend-darken opacity-30"
          priority
        />
        {/* Optional gradient to ensure text readability if the image is too harsh */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/95" />
      </div>

      {/* Ultra-Minimalist Footer Body */}
      <div className="w-full relative z-10 px-6 sm:px-12 pt-12 pb-12 sm:pt-16 sm:pb-16 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 sm:mb-16">
          
          {/* Left Side: Headline & Subscribe */}
          <div className="max-w-md w-full">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-8">
              Stay in the loop with<br />our latest updates
            </h2>
            
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border border-slate-300 rounded-full px-5 py-3 max-w-xs hover:border-slate-400 transition-colors bg-white/50 backdrop-blur-sm"
            >
              <input 
                type="email" 
                placeholder="Subscribe" 
                className="bg-transparent outline-none w-full text-sm placeholder-slate-500 text-slate-900" 
                required
              />
              <button type="submit" aria-label="Subscribe" className="shrink-0 hover:scale-110 transition-transform">
                <Mail className="w-4 h-4 text-slate-900" />
              </button>
            </form>
          </div>

          {/* Right Side: Back to top */}
          <button 
            onClick={scrollToTop} 
            className="flex items-center gap-1.5 text-xs font-medium text-slate-900 hover:text-slate-600 transition-colors bg-white/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-slate-200/50"
          >
            Back To Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid of Links & Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-10 text-xs text-slate-900 font-medium">
          
          {/* Column 1: Headquarters */}
          <div>
            <div className="mb-1 text-slate-900">New Delhi</div>
            <div className="text-slate-600 mb-2">T: (+91) 11 2345 6789</div>
            <div className="text-slate-600 leading-relaxed">
              12 Sansad Marg,<br />
              New Delhi 110001, India
            </div>
          </div>

          {/* Column 2: Regional Office */}
          <div>
            <div className="mb-1 text-slate-900">Mumbai</div>
            <div className="text-slate-600 mb-2">T: (+91) 22 9876 5432</div>
            <div className="text-slate-600 leading-relaxed">
              45 Nariman Point,<br />
              Mumbai 400021, India
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-2 text-slate-600">
            <Link href="/match" className="hover:text-slate-900 transition-colors">Find Schemes</Link>
            <Link href="/report" className="hover:text-slate-900 transition-colors">Report Issue</Link>
            <Link href="/track" className="hover:text-slate-900 transition-colors">Track Status</Link>
          </div>

          {/* Column 4: Socials */}
          <div className="flex flex-col gap-2 text-slate-600">
            <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Twitter (X)</a>
            <a href="#" className="hover:text-slate-900 transition-colors">YouTube</a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide">
          <div>All Rights Reserved - Copyright © 2026 JanSuvidha</div>
          <Link href="#privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );

}
