"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type ImpactStory = {
  id: string; name: string; quote: string; subtitle: string;
  image?: string; initials: string; avatarGradient: string;
};

const IMPACT_STORIES: ImpactStory[] = [
  {
    id: "suman-devi", name: "Suman Devi",
    quote: "I found two schemes I didn't know I was eligible for. The process was simple and harassment-free.",
    subtitle: "Beneficiary from Bihar • PM Awas & Pension Aid",
    image: "/images/suman_devi.jpg", initials: "SD", avatarGradient: "from-teal-400 to-blue-500",
  },
  {
    id: "rajesh-kumar", name: "Rajesh Kumar",
    quote: "My daughter's Ayushman Bharat card was approved in a week. No middlemen, no extra offices.",
    subtitle: "Farmer from Rajasthan • Health coverage for family of four",
    initials: "RK", avatarGradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "lakshmi-nair", name: "Lakshmi Nair",
    quote: "I reported a broken streetlight near our school. It was tracked and fixed in three days.",
    subtitle: "Teacher from Kerala • Civic grievance resolved",
    initials: "LN", avatarGradient: "from-violet-400 to-indigo-600",
  },
  {
    id: "priya-sharma", name: "Priya Sharma",
    quote: "The scheme matcher found scholarships I qualified for. My son is now enrolled with full tuition support.",
    subtitle: "Parent from UP • Education scholarship secured",
    initials: "PS", avatarGradient: "from-amber-400 to-orange-500",
  },
  {
    id: "mohammed-farhan", name: "Mohammed Farhan",
    quote: "As a tea-shop owner, I didn't know about PM SVANidhi. The platform guided me and credit was in my account.",
    subtitle: "Entrepreneur from Assam • PM SVANidhi beneficiary",
    initials: "MF", avatarGradient: "from-sky-400 to-blue-600",
  },
];

const AUTO_SWIPE_MS = 5500;

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    const total = IMPACT_STORIES.length;
    setActiveIndex(((index % total) + total) % total);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = window.setInterval(() => setActiveIndex((p) => (p + 1) % IMPACT_STORIES.length), AUTO_SWIPE_MS);
    return () => window.clearInterval(t);
  }, [isPaused]);

  const story = IMPACT_STORIES[activeIndex];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section label */}
      <ScrollReveal preset="fade-up" className="flex items-center justify-center gap-4 mb-7">
        <div className="h-px w-14 bg-gradient-to-r from-transparent to-slate-300" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide">Impact Stories</h2>
        <div className="h-px w-14 bg-gradient-to-l from-transparent to-slate-300" />
      </ScrollReveal>

      {/* Carousel */}
      <ScrollReveal preset="scale-up" delay={0.1}>
        <div
          className="relative rounded-3xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {IMPACT_STORIES.map((s) => (
                <article key={s.id} className="min-w-full p-7 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Avatar */}
                    <div className="md:col-span-3 flex justify-center md:justify-start">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        {s.image ? (
                          <Image src={s.image} alt={s.name} width={120} height={120} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${s.avatarGradient} text-white text-2xl font-bold`}>
                            {s.initials}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="md:col-span-9 space-y-3 text-center md:text-left">
                      <Quote className="w-8 h-8 text-slate-300 mx-auto md:mx-0 rotate-180" />
                      <p className="text-lg sm:text-xl font-serif italic text-slate-800 leading-relaxed">
                        &ldquo;{s.quote}&rdquo;
                      </p>
                      <div>
                        <div className="text-base font-bold text-slate-900">— {s.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{s.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Arrow nav */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center hover:bg-white transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center hover:bg-white transition-all"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {IMPACT_STORIES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-7 bg-[#65a30d]" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
