"use client";

import { useState } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "Is my data safe and private?",
      answer: "Yes, absolutely. We enforce strict data encryption standards and privacy controls. Your personal details are never sold or shared with third-party advertisers.",
    },
    {
      question: "How are schemes recommended?",
      answer: "JanSuvidha uses an advanced Machine Learning engine trained on official rule-derived government datasets. It evaluates your household profile against criteria and provides clear, explainable output on why you qualify.",
    },
    {
      question: "Is this an official government platform?",
      answer: "JanSuvidha is an independent civic technology platform integrated with public welfare API frameworks and official state/central rule definitions to streamline citizen access.",
    },
    {
      question: "How do I track my application or report?",
      answer: "Every application and grievance report receives a unique tracking ID. You can enter your ID in the 'Track Status' page anytime to view real-time updates and resolution timelines.",
    },
    {
      question: "Can I report an issue anonymously?",
      answer: "Yes! Our Grievance Redressal module allows completely anonymous reporting with geotagged location proof and photo uploads to ensure public safety without revealing identity.",
    },
    {
      question: "Is there any fee to use this platform?",
      answer: "No. JanSuvidha is 100% free for all citizens. There are no registration fees or hidden charges for matching schemes or submitting reports.",
    },
  ];

  const [openId, setOpenId] = useState<string | null>(faqs[0].question);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title + Search Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-7 h-7 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Find answers regarding scheme eligibility, privacy, and grievance redressal.
            </p>
          </div>

          {/* Search Bar matching mockup */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* 2-Column Accordion Grid — items-start prevents adjacent cards stretching */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.question;
            return (
              <div
                key={faq.question}
                className="w-full self-start bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-shadow"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.question)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No matching questions found for "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
}
