"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-slate-300" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide text-center">
            Impact Story
          </h2>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-slate-300" />
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-teal-50/80 via-sky-50/70 to-blue-50/80 p-6 sm:p-10 border border-teal-100/80 shadow-md overflow-hidden">
          
          {/* Background decorative wave lines */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 pointer-events-none">
            <svg className="w-full h-full text-blue-600 fill-current" viewBox="0 0 500 500">
              <path d="M0,100 C150,200 350,0 500,100 L500,500 L0,500 Z" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Avatar photo */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl group">
                <Image
                  src="/images/suman_devi.jpg"
                  alt="Suman Devi beneficiary testimonial"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Quote text */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4 text-center md:text-left">
              <Quote className="w-10 h-10 text-blue-400 opacity-60 mx-auto md:mx-0 rotate-180" />
              
              <p className="text-xl sm:text-2xl font-serif italic text-slate-800 leading-relaxed">
                “I found two schemes I didn’t know I was eligible for. The process was simple and harassment-free. Thank you!”
              </p>

              <div className="pt-2">
                <div className="text-lg font-bold text-slate-900">
                  — Suman Devi
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500">
                  Beneficiary from Bihar • Received PM Awas & Pension Aid
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
