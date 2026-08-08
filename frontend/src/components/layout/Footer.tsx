"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Scale,
  ArrowRight,
  Phone,
  FileWarning,
  ChevronRight,
} from "lucide-react";
import FooterScene from "./footer/FooterScene";

const REPORT_CATEGORIES = [
  { label: "Crime", href: "/report?category=crime" },
  { label: "Corruption", href: "/report?category=corruption" },
  { label: "Harassment", href: "/report?category=harassment" },
  { label: "Cyber Crime", href: "/report?category=cyber" },
  { label: "Domestic Violence", href: "/report?category=domestic" },
  { label: "Public Safety", href: "/report?category=safety" },
  { label: "Fraud", href: "/report?category=fraud" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Report Now", href: "/report" },
  { label: "Track Complaint", href: "/track" },
  { label: "Emergency Contacts", href: "#emergency" },
  { label: "FAQs", href: "#faq" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

const TRUST_CARDS = [
  { icon: Shield, label: "Anonymous Reporting", emoji: "🛡" },
  { icon: Lock, label: "End-to-End Privacy", emoji: "🔒" },
  { icon: Scale, label: "Trusted Process", emoji: "⚖" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 2000);
    }, 7000);

    const initial = setTimeout(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 2000);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, [visible]);

  return (
    <footer ref={footerRef} className={`premium-footer ${visible ? "premium-footer-visible" : ""}`}>
      <FooterScene visible={visible} pulseActive={pulseActive} />

      <div className="premium-footer-content">
        <div className="premium-footer-grid">
          {/* Column 1 — Brand */}
          <div className="footer-col footer-col-brand">
            <Link href="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Shield className="w-5 h-5" />
              </div>
              <span className="footer-logo-text">SecureReport</span>
            </Link>
            <p className="footer-mission">
              Empowering citizens to report crimes, corruption, harassment, cyber abuse, and
              misconduct safely and anonymously.
            </p>
          </div>

          {/* Column 2 — Report Categories */}
          <div className="footer-col">
            <h3 className="footer-col-title">Report Categories</h3>
            <ul className="footer-link-list">
              {REPORT_CATEGORIES.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="footer-category-link">
                    <span>{item.label}</span>
                    <ArrowRight className="footer-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-link-list">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="footer-quick-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Emergency */}
          <div className="footer-col footer-col-emergency" id="emergency">
            <h3 className="footer-emergency-title">Need Immediate Help?</h3>
            <div className="footer-emergency-buttons">
              <a href="tel:112" className="footer-btn footer-btn-emergency">
                <Phone className="w-4 h-4" />
                <span>Emergency: 112</span>
              </a>
              <Link href="/report" className="footer-btn footer-btn-report">
                <FileWarning className="w-4 h-4" />
                <span>Report Anonymously</span>
                <ChevronRight className="w-4 h-4 footer-btn-chevron" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="footer-trust-row">
          {TRUST_CARDS.map((card) => (
            <div key={card.label} className="footer-trust-card">
              <span className="footer-trust-emoji" aria-hidden="true">{card.emoji}</span>
              <span className="footer-trust-label">{card.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom-strip">
          <div className="footer-heartbeat-line">
            <div className="footer-heartbeat-pulse" />
          </div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2026 Anonymous Grievance Reporting Platform
            </p>
            <p className="footer-tagline">
              Your Voice Matters • Your Identity Stays Protected
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
