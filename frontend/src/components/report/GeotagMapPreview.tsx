"use client";

import React from "react";
import { MapPin, Navigation, Compass, RefreshCw, ShieldCheck } from "lucide-react";

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  isAutoDetected: boolean;
}

interface GeotagMapPreviewProps {
  location: LocationData | null;
  onLocationDetect: () => void;
  isLocating: boolean;
  error?: string;
}

export default function GeotagMapPreview({
  location,
  onLocationDetect,
  isLocating,
  error,
}: GeotagMapPreviewProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-900">
          Location & Auto-Geotag
        </label>
        <button
          type="button"
          onClick={onLocationDetect}
          disabled={isLocating}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50"
        >
          {isLocating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" /> Locating...
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5 text-blue-600" /> Re-detect GPS Location
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pb-1">
          <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold">!</span>
          {error}
        </p>
      )}

      {/* Bright Geotag Card Container */}
      <div className={`relative rounded-2xl border bg-white overflow-hidden shadow-sm transition-all ${error ? "border-rose-400 ring-2 ring-rose-100" : "border-slate-200"}`}>
        {/* Placeholder Map Preview Canvas matching Landing Page Colors */}
        <div className="relative h-44 w-full bg-gradient-to-br from-blue-100/90 via-indigo-50 to-blue-50 overflow-hidden flex items-center justify-center">
          {/* SVG Map Grid Background Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-60" width="100%" height="100%">
            <defs>
              <pattern id="light-map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#93c5fd" strokeWidth="0.6" />
                <circle cx="15" cy="15" r="1.2" fill="#3b82f6" opacity="0.3" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#light-map-grid)" />

            {/* Stylized road & river lines */}
            <path
              d="M -50 80 Q 150 120 450 60 T 900 140"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              opacity="0.6"
            />
            <path
              d="M 120 -20 Q 180 100 220 200"
              fill="none"
              stroke="#818cf8"
              strokeWidth="3.5"
              opacity="0.5"
            />
            <path
              d="M 320 -20 Q 300 120 380 200"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              opacity="0.7"
            />
          </svg>

          {/* Compass rose icon overlay top right */}
          <div className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-md rounded-lg border border-slate-200 text-slate-500 shadow-xs">
            <Compass className="w-4 h-4 text-blue-600" />
          </div>

          {!location ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm z-20">
              <div className="p-3 bg-white rounded-full shadow-md text-blue-600 mb-3 border border-slate-100">
                <Navigation className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">Location Required</p>
              <p className="text-xs text-slate-600 mt-1 max-w-[250px] text-center">
                Click the button above to allow GPS access and pinpoint the incident location.
              </p>
            </div>
          ) : (
            <>
              {/* Location Status Pill top left */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs z-30">
                <span
                  className={`w-2 h-2 rounded-full ${
                    location.isAutoDetected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                {location.isAutoDetected ? "GPS Location Verified" : "Default Geotag Assigned"}
              </div>

              {/* Animated Center Pin Marker */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Pulsing radar ring */}
                <div className="absolute -inset-4 rounded-full bg-blue-500/25 animate-ping" />
                <div className="absolute -inset-8 rounded-full bg-indigo-500/15 animate-pulse" />

                <div className="relative p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full shadow-lg border-2 border-white">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Location Info Footer Bar */}
        <div className="p-3.5 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700 flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              {location ? (
                <>
                  <p className="font-bold text-slate-900 truncate">
                    {location.address}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500">
                    Lat: {location.lat.toFixed(4)}° N, Lng: {location.lng.toFixed(4)}° E
                  </p>
                </>
              ) : (
                <p className="font-bold text-slate-500 truncate mt-1">
                  Location pending detection...
                </p>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 text-right">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Anonymous Tag
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
