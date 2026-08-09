"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

type ImpactStory = {
  id: string;
  name: string;
  quote: string;
  subtitle: string;
  image?: string;
  initials: string;
  avatarGradient: string;
};

const IMPACT_STORIES: ImpactStory[] = [
  {
    id: "suman-devi",
    name: "Suman Devi",
    quote:
      "I found two schemes I didn't know I was eligible for. The process was simple and harassment-free. Thank you!",
    subtitle: "Beneficiary from Bihar • Received PM Awas & Pension Aid",
    image: "/images/suman_devi.jpg",
    initials: "SD",
    avatarGradient: "from-teal-400 to-blue-500",
  },
  {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    quote:
      "My daughter's Ayushman Bharat card was approved within a week. I never had to visit multiple offices or pay a middleman.",
    subtitle: "Farmer from Rajasthan • Health coverage for family of four",
    initials: "RK",
    avatarGradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "lakshmi-nair",
    name: "Lakshmi Nair",
    quote:
      "I reported a broken streetlight near our school. The grievance was tracked end-to-end, and it was fixed in three days.",
    subtitle: "Teacher from Kerala • Civic grievance resolved",
    initials: "LN",
    avatarGradient: "from-violet-400 to-indigo-600",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    quote:
      "The scheme matcher showed scholarships I qualified for. My son is now enrolled with full tuition support — something we couldn't afford before.",
    subtitle: "Parent from Uttar Pradesh • Education scholarship secured",
    initials: "PS",
    avatarGradient: "from-amber-400 to-orange-500",
  },
  {
    id: "mohammed-farhan",
    name: "Mohammed Farhan",
    quote:
      "As a small tea-shop owner, I didn't know about the PM SVANidhi loan. The platform guided me step by step, and I received the credit in my account.",
    subtitle: "Entrepreneur from Assam • PM SVANidhi beneficiary",
    initials: "MF",
    avatarGradient: "from-sky-400 to-blue-600",
  },
];

const AUTO_SWIPE_MS = 5500;

function StoryAvatar({ story }: { story: ImpactStory }) {
  return (
    <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl group">
      {story.image ? (
        <Image
          src={story.image}
          alt={`${story.name} beneficiary testimonial`}
          width={200}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${story.avatarGradient} text-white text-3xl sm:text-4xl font-bold tracking-wide group-hover:scale-105 transition-transform duration-500`}
          aria-hidden="true"
        >
          {story.initials}
        </div>
      )}
    </div>
  );
}

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    const total = IMPACT_STORIES.length;
    setActiveIndex(((index % total) + total) % total);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMPACT_STORIES.length);
    }, AUTO_SWIPE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-slate-300" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-wide text-center">
            Impact Stories
          </h2>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-slate-300" />
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="relative rounded-3xl bg-gradient-to-r from-teal-50/80 via-sky-50/70 to-blue-50/80 border border-teal-100/80 shadow-md overflow-hidden">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 pointer-events-none">
              <svg
                className="w-full h-full text-blue-600 fill-current"
                viewBox="0 0 500 500"
                aria-hidden="true"
              >
                <path d="M0,100 C150,200 350,0 500,100 L500,500 L0,500 Z" />
              </svg>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                aria-live="polite"
              >
                {IMPACT_STORIES.map((story) => (
                  <article
                    key={story.id}
                    className="min-w-full p-6 sm:p-10"
                    aria-hidden={story.id !== IMPACT_STORIES[activeIndex].id}
                  >
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
                        <StoryAvatar story={story} />
                      </div>

                      <div className="md:col-span-8 lg:col-span-9 space-y-4 text-center md:text-left">
                        <Quote className="w-10 h-10 text-blue-400 opacity-60 mx-auto md:mx-0 rotate-180" />

                        <p className="text-xl sm:text-2xl font-serif italic text-slate-800 leading-relaxed">
                          &ldquo;{story.quote}&rdquo;
                        </p>

                        <div className="pt-2">
                          <div className="text-lg font-bold text-slate-900">
                            — {story.name}
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-slate-500">
                            {story.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2.5">
            {IMPACT_STORIES.map((story, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={story.id}
                  type="button"
                  aria-label={`Show impact story ${index + 1}: ${story.name}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-blue-600"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
