"use client";

import React, { useEffect, useRef, useCallback } from "react";

const DATA_PATHS = [
  "M 80 120 Q 200 60, 400 90 T 600 85",
  "M 140 130 Q 280 40, 450 80 T 600 85",
  "M 200 125 Q 350 70, 500 88 T 600 85",
  "M 260 135 Q 400 50, 550 82 T 600 85",
  "M 320 128 Q 460 65, 580 86 T 600 85",
];

const WINDOW_GROUPS = [
  { x: 30, y: 95, cols: 2, rows: 3, delay: 0 },
  { x: 70, y: 80, cols: 3, rows: 4, delay: 1.2 },
  { x: 120, y: 90, cols: 2, rows: 3, delay: 2.4 },
  { x: 160, y: 75, cols: 3, rows: 5, delay: 0.8 },
  { x: 210, y: 85, cols: 2, rows: 4, delay: 1.8 },
  { x: 250, y: 70, cols: 3, rows: 5, delay: 3.0 },
  { x: 300, y: 88, cols: 2, rows: 3, delay: 2.0 },
  { x: 340, y: 78, cols: 2, rows: 4, delay: 1.5 },
];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  cx: (i * 47 + 13) % 1180 + 10,
  cy: (i * 31 + 7) % 160 + 10,
  r: 0.8 + (i % 3) * 0.4,
  delay: (i * 0.7) % 8,
  duration: 6 + (i % 5) * 2,
}));

interface FooterSceneProps {
  visible: boolean;
  pulseActive: boolean;
}

export default function FooterScene({ visible, pulseActive }: FooterSceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const shieldGlowRef = useRef<SVGCircleElement>(null);
  const lastAbsorbRef = useRef<number[]>(DATA_PATHS.map(() => 0));

  const animateDots = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const now = performance.now();

    DATA_PATHS.forEach((d, i) => {
      const path = svg.querySelector(`#data-path-${i}`) as SVGPathElement | null;
      const dot = dotsRef.current[i];
      const line = svg.querySelector(`#conn-line-${i}`) as SVGPathElement | null;
      if (!path || !dot) return;

      const len = path.getTotalLength();
      const cycle = 4000 + i * 800;
      const t = ((now + i * 900) % cycle) / cycle;

      if (t < 0.92) {
        const pt = path.getPointAtLength(t * len);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.setAttribute("opacity", t < 0.05 ? String(t / 0.05) : t > 0.85 ? String((0.92 - t) / 0.07) : "1");

        if (line) {
          line.style.strokeDashoffset = String(len * (1 - t));
          line.style.opacity = String(0.15 + t * 0.55);
        }

        if (t > 0.88 && now - lastAbsorbRef.current[i] > cycle * 0.8) {
          lastAbsorbRef.current[i] = now;
          shieldGlowRef.current?.classList.add("shield-absorb");
          requestAnimationFrame(() => {
            setTimeout(() => shieldGlowRef.current?.classList.remove("shield-absorb"), 400);
          });
        }
      } else {
        dot.setAttribute("opacity", "0");
        if (line) {
          line.style.opacity = "0";
          line.style.strokeDashoffset = String(len);
        }
      }
    });

    rafRef.current = requestAnimationFrame(animateDots);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const svg = svgRef.current;
    if (svg) {
      DATA_PATHS.forEach((_, i) => {
        const path = svg.querySelector(`#data-path-${i}`) as SVGPathElement | null;
        const line = svg.querySelector(`#conn-line-${i}`) as SVGPathElement | null;
        if (path && line) {
          const len = path.getTotalLength();
          line.style.strokeDasharray = String(len);
          line.style.strokeDashoffset = String(len);
        }
      });
    }

    rafRef.current = requestAnimationFrame(animateDots);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, animateDots]);

  return (
    <div
      className={`footer-scene-wrapper ${visible ? "footer-scene-visible" : ""} ${pulseActive ? "footer-pulse-active" : ""}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMid slice"
        className="footer-scene-svg"
      >
        <defs>
          <linearGradient id="scene-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050A30" />
            <stop offset="40%" stopColor="#0a1040" />
            <stop offset="70%" stopColor="#120830" />
            <stop offset="100%" stopColor="#1a0a40" />
          </linearGradient>

          <radialGradient id="shield-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4f8ff7" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#3b5bdb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050A30" stopOpacity="0" />
          </radialGradient>

          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="shield-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="path-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4f8ff7" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="gold-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="1200" height="200" fill="url(#scene-bg)" className="scene-bg-rect" />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            className="scene-particle"
            style={{
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

        {/* City skyline */}
        <g className="city-skyline">
          <rect x="0" y="140" width="420" height="60" fill="#030818" />
          <rect x="20" y="110" width="35" height="90" fill="#0a0f2e" className="city-building" />
          <rect x="60" y="85" width="42" height="115" fill="#080c28" className="city-building" style={{ animationDelay: "0.2s" }} />
          <rect x="110" y="95" width="38" height="105" fill="#0a0f2e" className="city-building" style={{ animationDelay: "0.4s" }} />
          <rect x="155" y="70" width="48" height="130" fill="#070b24" className="city-building" style={{ animationDelay: "0.6s" }} />
          <rect x="210" y="88" width="40" height="112" fill="#0a0f2e" className="city-building" style={{ animationDelay: "0.3s" }} />
          <rect x="258" y="65" width="52" height="135" fill="#060a20" className="city-building" style={{ animationDelay: "0.5s" }} />
          <rect x="318" y="92" width="36" height="108" fill="#0a0f2e" className="city-building" style={{ animationDelay: "0.7s" }} />
          <rect x="362" y="78" width="44" height="122" fill="#080c28" className="city-building" style={{ animationDelay: "0.1s" }} />

          {WINDOW_GROUPS.map((wg, gi) =>
            Array.from({ length: wg.cols * wg.rows }).map((_, wi) => {
              const col = wi % wg.cols;
              const row = Math.floor(wi / wg.cols);
              return (
                <rect
                  key={`${gi}-${wi}`}
                  x={wg.x + col * 10}
                  y={wg.y + row * 12}
                  width="5"
                  height="7"
                  rx="0.5"
                  className="city-window"
                  style={{ animationDelay: `${wg.delay + wi * 0.3}s` }}
                />
              );
            })
          )}
        </g>

        {/* Connection lines & data paths */}
        <g className="data-flow-group">
          {DATA_PATHS.map((d, i) => (
            <g key={i}>
              <path
                id={`conn-line-${i}`}
                d={d}
                fill="none"
                stroke="url(#path-glow)"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="conn-line"
                style={{ strokeDashoffset: 999 }}
              />
              <path id={`data-path-${i}`} d={d} fill="none" stroke="none" />
              <circle
                ref={(el) => { dotsRef.current[i] = el; }}
                r="2.5"
                fill="#818cf8"
                filter="url(#soft-glow)"
                opacity="0"
                className="data-dot"
              />
            </g>
          ))}
        </g>

        {/* Central shield */}
        <g className="shield-group">
          <g className="shield-inner">
            <circle ref={shieldGlowRef} r="55" fill="url(#shield-glow-grad)" className="shield-aura" />
            <circle r="42" fill="none" stroke="#4f8ff7" strokeWidth="0.5" opacity="0.3" className="shield-wave" />
            <circle r="42" fill="none" stroke="#4f8ff7" strokeWidth="0.5" opacity="0.3" className="shield-wave shield-wave-2" />

            <g className="shield-body-wrap">
              <path
                d="M0,-38 C-22,-38 -32,-18 -32,2 C-32,22 -16,38 0,46 C16,38 32,22 32,2 C32,-18 22,-38 0,-38 Z"
                fill="#0c1445"
                stroke="#4f8ff7"
                strokeWidth="1.5"
                filter="url(#shield-blur)"
                className="shield-body"
              />

              <g className="shield-lock" transform="translate(0, 4)">
                <rect x="-8" y="-2" width="16" height="12" rx="2" fill="none" stroke="#7eb8ff" strokeWidth="1.5" />
                <path d="M-5,-2 V-8 C-5,-13 5,-13 5,-8 V-2" fill="none" stroke="#7eb8ff" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="0" cy="4" r="1.5" fill="#7eb8ff" />
              </g>
            </g>

            <circle r="20" fill="none" stroke="#4f8ff7" strokeWidth="1" className="energy-ring" />
          </g>
        </g>

        {/* Fingerprint → Lock confidentiality animation */}
        <g className="confidentiality-icon" transform="translate(660, 55)">
          <g className="fp-icon">
            <ellipse cx="0" cy="0" rx="8" ry="10" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0.7" />
            <path d="M-5,2 Q0,-4 5,2 M-4,6 Q0,0 4,6 M-3,10 Q0,5 3,10" fill="none" stroke="#6366f1" strokeWidth="0.7" opacity="0.5" />
          </g>
          <g className="fp-lock-icon" transform="translate(0, 2)">
            <rect x="-5" y="0" width="10" height="8" rx="1.5" fill="none" stroke="#818cf8" strokeWidth="1" />
            <path d="M-3,0 V-4 C-3,-7 3,-7 3,-4 V0" fill="none" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" />
          </g>
        </g>

        {/* Justice scales */}
        <g className="justice-scales">
          <g transform="translate(980, 90)">
            <line x1="0" y1="-30" x2="0" y2="20" stroke="#64748b" strokeWidth="1.5" />
            <line x1="-30" y1="-20" x2="30" y2="-20" stroke="#64748b" strokeWidth="1.5" />
            <line x1="-30" y1="-20" x2="-30" y2="-5" stroke="#64748b" strokeWidth="1" />
            <line x1="30" y1="-20" x2="30" y2="-5" stroke="#64748b" strokeWidth="1" />

            <path d="M-38,-5 C-38,2 -22,2 -22,-5 C-22,-12 -38,-12 -38,-5 Z" fill="none" stroke="#94a3b8" strokeWidth="1" className="scale-pan scale-pan-left" />
            <path d="M22,-5 C22,2 38,2 38,-5 C38,-12 22,-12 22,-5 Z" fill="none" stroke="#94a3b8" strokeWidth="1" className="scale-pan scale-pan-right" />

            <circle cx="0" cy="-20" r="3" fill="#fbbf24" className="scale-pivot" opacity="0.6" />
            <ellipse cx="0" cy="22" rx="18" ry="3" fill="#1e293b" opacity="0.5" />
          </g>
        </g>

        {/* Full-width energy pulse ring */}
        <circle cx="600" cy="95" r="10" fill="none" stroke="#4f8ff7" strokeWidth="0.8" className="full-energy-ring" opacity="0" />
      </svg>
    </div>
  );
}
