import { Metadata } from "next";
import ReportForm from "@/components/report/ReportForm";

export const metadata: Metadata = {
  title: "Report an Issue | JanSuvidha Citizen Grievance Portal",
  description:
    "Report harassment, corruption, civic issues, and safety hazards anonymously. Track resolution status in real-time.",
};

export default function ReportPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-white min-h-screen pt-8 pb-20">
      {/* Decorative backdrop glows matching Landing Page Hero */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReportForm />
      </div>
    </div>
  );
}
