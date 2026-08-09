import { Metadata } from "next";
import StatusTimeline from "@/components/track/StatusTimeline";

export const metadata: Metadata = {
  title: "Track Grievance Status | JanSuvidha Citizen Portal",
  description:
    "Track live resolution progress for your submitted citizen grievance report.",
};

export default function TrackIndexPage() {
  return (
    <div className="relative min-h-screen bg-white pb-20">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(255,185,50,0.35) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(30,160,30,0.25) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 40%, #ffffff 90%)" }} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <StatusTimeline reportId="" />
      </div>
    </div>
  );
}
