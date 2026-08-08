import ReportsTable from "@/components/admin/ReportsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Grievance Reports | JanSuvidha Admin",
  description: "View and manage all municipal grievance reports in real-time.",
};

export default function AdminPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <ReportsTable priorityOnly={false} />
    </div>
  );
}
