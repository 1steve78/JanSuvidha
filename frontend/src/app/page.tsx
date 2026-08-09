// Page 1 — Landing / Home
import Hero from "@/components/home/Hero";
import MissionStatement from "@/components/home/MissionStatement";
import PillarCards from "@/components/home/PillarCards";
import HowItWorks from "@/components/home/HowItWorks";
import StatsBand from "@/components/home/StatsBand";
import TrustStrip from "@/components/home/TrustStrip";
import Testimonial from "@/components/home/Testimonial";
import FAQAccordion from "@/components/home/FAQAccordion";

export default function HomePage() {
  return (
    <div className="min-h-screen landing-page-grid">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Mission Statement & Modules */}
      <MissionStatement />

      {/* 3. Choose your path (Pillar cards) */}
      <PillarCards />

      {/* 4. How it works (3-step visual) */}
      <HowItWorks />

      {/* 5. Transparency Stats Band & Trust Dashboard */}
      <section className="py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Pastel Floating Bubble Stats */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <StatsBand />
            </div>

            {/* Right Side: Trust Dashboard (Scheme badges) */}
            <div className="lg:col-span-7">
              <TrustStrip />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Impact Story / Testimonial */}
      <Testimonial />

      {/* 7. FAQ Accordion */}
      <div id="faq">
        <FAQAccordion />
      </div>
    </div>
  );
}
