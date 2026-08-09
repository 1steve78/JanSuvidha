"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export interface AdminReport {
  id: string;
  category: string;
  description: string;
  location?: string;
  status: string;
  escalated?: boolean;
  priority?: string;
  lat?: number;
  lng?: number;
  created_at: string;
  status_logs?: { officer_note?: string }[];
  assignedOfficer?: string;
}

/**
 * Shared hook for fetching admin reports.
 * Reads the auth token from localStorage (key: jan_suvidha_admin_auth_token).
 * Redirects to /admin/login if no token is present.
 * Throws "UNAUTHORIZED" error shape on 401 — callers can branch on err.message.
 */
export function useAdminReports() {
  const [reports, setReports] = useState<AdminReport[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadReports = async () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("jan_suvidha_admin_auth_token")
        : null;

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      const data = await api.getAdminReports(token);

      // Enrich each record with assignedOfficer extracted from status_logs
      const enriched: AdminReport[] = (data as AdminReport[]).map((r) => {
        const assignLog = r.status_logs
          ?.slice()
          .reverse()
          .find((l) => l.officer_note?.startsWith("Assigned to:"));
        return {
          ...r,
          assignedOfficer: assignLog
            ? assignLog.officer_note!.replace("Assigned to: ", "")
            : r.assignedOfficer,
        };
      });

      setReports(enriched);
    } catch (err: any) {
      if (err.message === "UNAUTHORIZED") {
        localStorage.removeItem("jan_suvidha_admin_auth_token");
        localStorage.removeItem("jan_suvidha_admin_auth");
        router.push("/admin/login");
      } else {
        setError(err.message ?? "Failed to load reports");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { reports, loading, error, refetch: loadReports };
}
