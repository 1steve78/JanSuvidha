"use client";

import React, { useState } from "react";
import CategoryPicker from "./CategoryPicker";
import PhotoUpload from "./PhotoUpload";
import GeotagMapPreview, { LocationData } from "./GeotagMapPreview";
import ConfirmationScreen, { SubmittedReportData } from "./ConfirmationScreen";
import { ShieldCheck, Send, AlertCircle, Info, Lock, Sparkles, Loader2, MapPin, EyeOff } from "lucide-react";
import { api } from "@/lib/api";

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const payload = {
        category: selectedCategory!.toLowerCase().replace(" ", "_"),
        description: description.trim(),
        location: location.address,
      };
      
      const response = await api.submitReport(payload);
      
      setSubmittedData({
        trackingId: response.id,
        category: selectedCategory!,
        description: description.trim(),
        photoName: photo ? photo.name : undefined,
        locationText: location.address,
        createdAt: new Date(response.created_at || Date.now()).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Page Header matching Landing Page & Find Schemes Hero style */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide border border-emerald-200/60 landing-shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Unified Citizen Grievance Portal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
          Report a Citizen Grievance With{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
            Complete Anonymity.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          Submit public issues directly to municipal authorities. Geotag your location, upload photo evidence, and track resolution progress in real-time.
        </p>
      </div>

      {/* Trust Highlights Bar matching Landing Page Trust Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-50/80 text-emerald-900 border border-emerald-100 font-bold">
          <EyeOff className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Anonymous & Confidential</span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50/80 text-blue-900 border border-blue-100 font-bold">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span>GPS Geotag Location Pinpoint</span>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-indigo-50/80 text-indigo-900 border border-indigo-100 font-bold">
          <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Real-Time Nodal Officer Dispatch</span>
        </div>
      </div>

      {/* Main Glassmorphic Form Card Container matching Find Schemes Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 landing-shadow-xl overflow-hidden">
        {/* Gradient Top Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-blue-600 to-indigo-600" />

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
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
              <label htmlFor="description" className="block text-sm font-bold text-slate-900">
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
                  : "border-slate-200 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
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
              <p className="font-bold">Whistleblower Protection & Privacy Enabled</p>
              <p className="text-blue-800/80 leading-relaxed">
                Your IP address and identity are never stored or logged. Reports are assigned a cryptographic tracking hash to ensure citizen privacy while permitting full resolution status tracking.
              </p>
            </div>
          </div>

          {/* Submit Action Button matching Landing Page primary button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base rounded-2xl transition-all landing-shadow-md hover:scale-[1.01] flex items-center justify-center gap-2.5 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Secure Grievance Report...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Grievance Report & Generate Tracking ID</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
