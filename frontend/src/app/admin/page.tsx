import ReportsTable from "@/components/admin/ReportsTable";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Grievance Reports | JanSuvidha Admin",
  description: "View and manage all municipal grievance reports in real-time.",
};

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBFF] text-slate-900">
      <AdminNavbar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 min-w-0 max-w-[1600px] mx-auto w-full">
        <ReportsTable priorityOnly={false} />
      </div>
    </div>
  );
}
