import { Metadata } from "next";
import ReportForm from "@/components/report/ReportForm";

export const metadata: Metadata = {
  title: "Report an Issue | JanSuvidha Citizen Grievance Portal",
  description:
    "Report harassment, corruption, civic issues, and safety hazards anonymously. Track resolution status in real-time.",
};

export default function ReportPage() {
  return (
    <div className="relative min-h-screen bg-white pb-20">
      {/* Gradient background matching site hero style */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(255,185,50,0.15) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(30,160,30,0.12) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <ReportForm />
      </div>
    </div>
  );
}
