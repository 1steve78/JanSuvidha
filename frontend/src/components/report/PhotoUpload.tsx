"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";

interface PhotoUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function PhotoUpload({ file, onFileChange }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update image preview whenever file changes
  React.useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      onFileChange(selectedFile);
    } else if (selectedFile) {
      alert("Please upload a valid image file (JPEG, PNG, WEBP).");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-900">
          Upload Photographic Evidence <span className="text-xs font-normal text-slate-500">(Optional)</span>
        </label>
        <span className="text-xs text-slate-500 font-medium">Max file size: 10MB</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        aria-label="Upload photographic evidence"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-100/70 scale-[0.99]"
              : "border-blue-200 bg-blue-50/50 hover:border-blue-400 hover:bg-blue-50/80"
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 border border-blue-100">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Click to upload or drag & drop photo
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, WEBP formats supported • EXIF data stripped for anonymity
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative border border-emerald-200 bg-emerald-50/50 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-3 overflow-hidden">
            {previewUrl ? (
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-300 flex-shrink-0 bg-white shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Uploaded evidence preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached
              </div>
              <p className="text-sm font-semibold text-slate-900 truncate">
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove photo"
              className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-100/60 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
