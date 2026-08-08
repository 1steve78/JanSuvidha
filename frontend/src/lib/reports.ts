// Helper for reading and managing real database grievance reports.
// Strict Rule: No random/fake data is auto-generated. Only real records are returned.

export interface GrievanceReport {
  id: string;
  category: "Harassment" | "Corruption" | "Civic Issue" | "Safety";
  description: string;
  location: string;
  status: "Pending" | "Under Review" | "In Progress" | "Resolved" | "Escalated";
  priority: "Urgent" | "High" | "Medium" | "Low";
  assignedOfficer?: string;
  createdAt: string;
  photoUrl?: string;
}

const STORAGE_KEY = "jan_suvidha_db_reports";

export function getDatabaseReports(): GrievanceReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GrievanceReport[];
  } catch (err) {
    console.error("Error reading database reports:", err);
    return [];
  }
}

export function saveDatabaseReport(report: GrievanceReport): void {
  if (typeof window === "undefined") return;
  try {
    const reports = getDatabaseReports();
    reports.unshift(report);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error("Error saving database report:", err);
  }
}

export function updateReportStatus(
  id: string,
  newStatus: GrievanceReport["status"],
  officer?: string
): GrievanceReport[] {
  if (typeof window === "undefined") return [];
  try {
    const reports = getDatabaseReports();
    const updated = reports.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          status: newStatus,
          assignedOfficer: officer !== undefined ? officer : r.assignedOfficer,
        };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error updating report status:", err);
    return [];
  }
}
