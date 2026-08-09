// Page 1 — Landing / Home
import Hero from "@/components/home/Hero";

import PillarCards from "@/components/home/PillarCards";
import HowItWorks from "@/components/home/HowItWorks";
import CivicJusticeUnifiedSection from "@/components/home/CivicJusticeUnifiedSection";

import Testimonial from "@/components/home/Testimonial";
import FAQAccordion from "@/components/home/FAQAccordion";

export default function HomePage() {
  return (
    <div className="min-h-screen landing-page-grid">
      {/* 1. Hero */}
      <Hero />


      {/* 3. Choose your path (Pillar cards) */}
      <PillarCards />

      {/* 4. How it works (3-step visual) */}
      <HowItWorks />

      {/* 5. Seamless Unified Civic Justice & Transparency Operating System Section */}
      <CivicJusticeUnifiedSection />

      {/* 6. Impact Story / Testimonial */}
      <Testimonial />

      {/* 7. FAQ Accordion */}
      <div id="faq">
        <FAQAccordion />
      </div>
    </div>
  );
}

