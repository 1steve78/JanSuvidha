export type ReportStatus = "submitted" | "under_review" | "in_progress" | "resolved";

export interface Report {
  id: string;
  category: "Harassment" | "Corruption" | "Civic Issue" | "Safety";
  description: string;
  photoUrl?: string;
  location?: { lat: number; lng: number };
  status: ReportStatus;
  createdAt: string;
}
