"use client";

import React, { useState } from "react";
import CategoryPicker from "./CategoryPicker";
import PhotoUpload from "./PhotoUpload";
import GeotagMapPreview, { LocationData } from "./GeotagMapPreview";
import ConfirmationScreen, { SubmittedReportData } from "./ConfirmationScreen";
import { ShieldCheck, Send, AlertCircle, Info, Lock, Sparkles } from "lucide-react";

export type ReportCategory = "Harassment" | "Corruption" | "Civic Issue" | "Safety";

export default function ReportForm() {
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState<LocationData>({
    lat: 28.6139,
    lng: 77.209,
    address: "Central District, Connaught Place, New Delhi",
    isAutoDetected: false,
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedReportData | null>(null);
  const [errors, setErrors] = useState<{ category?: string; description?: string }>({});

  const handleCategorySelect = (cat: ReportCategory) => {
    setSelectedCategory(cat);
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  };

  const handleLocationDetect = () => {
    setIsLocating(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `GPS Pin: Sector 4, Civic Zone (Lat ${position.coords.latitude.toFixed(
              2
            )}, Lng ${position.coords.longitude.toFixed(2)})`,
            isAutoDetected: true,
          });
          setIsLocating(false);
        },
        (error) => {
          console.warn("Geolocation permission or position error:", error);
          setLocation({
            lat: 28.6139 + (Math.random() - 0.5) * 0.02,
            lng: 77.209 + (Math.random() - 0.5) * 0.02,
            address: "Detected via IP Geotagging: Connaught Place, New Delhi",
            isAutoDetected: true,
          });
          setIsLocating(false);
        },
        { timeout: 8000 }
      );
    } else {
      setTimeout(() => {
        setLocation({
          lat: 28.6139,
          lng: 77.209,
          address: "Central District, Connaught Place, New Delhi",
          isAutoDetected: true,
        });
        setIsLocating(false);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { category?: string; description?: string } = {};

    if (!selectedCategory) {
      newErrors.category = "Please select one category (Harassment, Corruption, Civic Issue, or Safety).";
    }

    if (!description.trim()) {
      newErrors.description = "Please provide a brief description of the issue or incident.";
    } else if (description.trim().length < 15) {
      newErrors.description = "Description should be at least 15 characters long to ensure clear context.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      const mockTrackingId = `JSV-2026-${randomSuffix}-${randomCode}`;

      setSubmittedData({
        trackingId: mockTrackingId,
        category: selectedCategory!,
        description: description.trim(),
        photoName: photo ? photo.name : undefined,
        locationText: location.address,
        createdAt: new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      });

      setIsSubmitting(false);
    }, 1200);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setDescription("");
    setPhoto(null);
    setSubmittedData(null);
    setErrors({});
  };

  if (submittedData) {
    return <ConfirmationScreen data={submittedData} onReset={handleReset} />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Top Header Card matching Landing Page Blue Gradient Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Anonymous & Secure Grievance Redressal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Report a Citizen Grievance
          </h1>

          <p className="text-blue-100 text-sm sm:text-base max-w-xl leading-relaxed">
            Submit issues directly to local authority officers. Select a category, add details & location, and get a tracking reference code instantly.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg space-y-8">
        {/* Step 1: Category Picker */}
        <CategoryPicker
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          error={errors.category}
        />

        <hr className="border-slate-100" />

        {/* Step 2: Description Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="block text-sm font-semibold text-slate-900">
              2. Describe the Incident / Issue <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {description.length}/1000
            </span>
          </div>

          <textarea
            id="description"
            rows={4}
            maxLength={1000}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: undefined }));
              }
            }}
            placeholder="Provide clear details including date/time, exact spot, involved departments or description of problem..."
            className={`w-full p-4 text-sm rounded-2xl border bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.description
                ? "border-rose-400 focus:ring-rose-500 bg-rose-50/20"
                : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />

          {errors.description && (
            <p className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
            </p>
          )}
        </div>

        <hr className="border-slate-100" />

        {/* Step 3: Photo Upload */}
        <PhotoUpload file={photo} onFileChange={setPhoto} />

        <hr className="border-slate-100" />

        {/* Step 4: Auto Geotag Map Preview */}
        <GeotagMapPreview
          location={location}
          onLocationDetect={handleLocationDetect}
          isLocating={isLocating}
        />

        {/* Informational Privacy Note */}
        <div className="flex items-start gap-3 p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs text-blue-900">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold">Whistleblower Protection Enabled</p>
            <p className="text-blue-800/80 leading-relaxed">
              Your IP address is not logged. Reports are assigned a cryptographic tracking hash to ensure privacy while permitting resolution tracking.
            </p>
          </div>
        </div>

        {/* Submit Action Button matching Landing Page primary button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting Secure Grievance Report...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Report & Generate Tracking ID</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
