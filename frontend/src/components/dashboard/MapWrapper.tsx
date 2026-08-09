"use client";

import dynamic from "next/dynamic";
import React from "react";

const PublicMap = dynamic(() => import("./PublicMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-100 flex items-center justify-center rounded-xl border border-slate-200 animate-pulse">
      <p className="text-slate-400 font-medium">Loading Interactive Map...</p>
    </div>
  )
});

export default function MapWrapper() {
  return <PublicMap />;
}
