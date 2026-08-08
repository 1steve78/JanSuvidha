import ReportsTable from "@/components/admin/ReportsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urgent Action Queue | JanSuvidha Admin",
  description: "Manage high priority civic grievances and officer assignments.",
};

export default function AdminPriorityPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <ReportsTable priorityOnly={true} />
    </div>
  );
}
