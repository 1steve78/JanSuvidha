"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAdminReports } from "@/hooks/useAdminReports";
import { GrievanceReport } from "@/lib/reports";
import StatusDropdown from "./StatusDropdown";
import {
  AlertTriangle,
  Search,
  Filter,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Database,
  Calendar,
  Clock,
  PlusCircle,
  Inbox
} from "lucide-react";

interface ReportsTableProps {
  priorityOnly?: boolean;
}

export default function ReportsTable({ priorityOnly = false }: ReportsTableProps) {
  const [reports, setReports] = useState<GrievanceReport[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assignModalReport, setAssignModalReport] = useState<GrievanceReport | null>(null);
  const [officerNameInput, setOfficerNameInput] = useState("");
  const [showAddDemoModal, setShowAddDemoModal] = useState(false);
  const [newCategory, setNewCategory] = useState<GrievanceReport["category"]>("Civic Issue");
  const [newDesc, setNewDesc] = useState("");
  const [newLoc, setNewLoc] = useState("");
  const [newPriority, setNewPriority] = useState<GrievanceReport["priority"]>("Urgent");

  const { reports: fetchedReports, loading, refetch: loadReports } = useAdminReports();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (fetchedReports) {
      // Cast the hook's returned AdminReport[] to GrievanceReport[] since they align
      setReports(fetchedReports as any as GrievanceReport[]);
    }
  }, [fetchedReports]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("jan_suvidha_admin_auth_token");
    if (token) {
      try {
        if (newStatus === "Escalated") {
          await api.updateReportStatus(id, { escalated: true }, token);
        } else {
          await api.updateReportStatus(id, { status: newStatus.toLowerCase().replace(" ", "_") }, token);
        }
        loadReports();
      } catch (err) {
        console.error("Failed to update status", err);
      }
    }
  };

  const handleAssignOfficer = async () => {
    if (!assignModalReport || !officerNameInput.trim()) return;
    const token = localStorage.getItem("jan_suvidha_admin_auth_token");
    if (token) {
      try {
        await api.updateReportStatus(
          assignModalReport.id,
          {
            status: (assignModalReport.status as string) === "pending" || assignModalReport.status === "Pending" ? "in_progress" : assignModalReport.status,
            officer_note: `Assigned to: ${officerNameInput.trim()}`
          },
          token
        );
        loadReports();
      } catch (err) {
        console.error("Failed to assign officer", err);
      }
    }
    setAssignModalReport(null);
    setOfficerNameInput("");
  };

  const handleCreateTestRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim() || !newLoc.trim()) return;

    try {
      await api.submitReport({
        category: newCategory.toLowerCase().replace(" ", "_"),
        description: newDesc.trim(),
        location: newLoc.trim(),
        lat: 28.6139 + (Math.random() - 0.5) * 0.1,
        lng: 77.2090 + (Math.random() - 0.5) * 0.1
      });
      loadReports();
    } catch (err) {
      console.error("Failed to submit test report", err);
    }
    setShowAddDemoModal(false);
    setNewDesc("");
    setNewLoc("");
  };

  if (!mounted) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs font-semibold flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
        <span>Loading Admin Grievances...</span>
      </div>
    );
  }

  // Filter pipeline
  let filtered = reports.filter((r) => {
    if (priorityOnly && !((r as any).escalated || r.priority === "Urgent" || r.priority === "High")) return false;
    
    // Normalize string formats from API
    const rCat = (r.category || "").replace("_", " ");
    const rStatus = (r.status || "").replace("_", " ");
    
    if (categoryFilter !== "all" && rCat.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (statusFilter !== "all" && rStatus.toLowerCase() !== statusFilter.toLowerCase()) return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = (r.id || "").toLowerCase().includes(q);
      const matchDesc = (r.description || "").toLowerCase().includes(q);
      const matchLoc = (r.location || "").toLowerCase().includes(q);
      
      // We don't have assignedOfficer explicitly in the model unless in notes
      if (!matchId && !matchDesc && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              {priorityOnly ? (
                <>
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  <span>Urgent Action Queue (Admin Priority)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  <span>All Database Grievance Reports</span>
                </>
              )}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filtered.length} {filtered.length === 1 ? "Record" : "Records"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddDemoModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Grievance Record</span>
          </button>
          <button
            onClick={loadReports}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 transition-all text-xs"
            title="Refresh Database Records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Report ID, description, location, officer..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Civic Issue">Civic Issue</option>
              <option value="Safety">Safety</option>
              <option value="Corruption">Corruption</option>
              <option value="Harassment">Harassment</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table / Empty State */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-2xs space-y-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Inbox className="w-7 h-7" />
          </div>

          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900">
              {priorityOnly ? "No Priority Records Found in Database" : "No Grievance Records Found in Database"}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No random mock data is added automatically. Real records will populate here as soon as citizens submit grievances or when your database is connected.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowAddDemoModal(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Grievance Record</span>
            </button>

            <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-semibold px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              <span>Database Sync Active</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-extrabold border-b border-slate-200/80">
                <tr>
                  <th className="p-3.5">Report ID</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Assigned Officer</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-indigo-600">{r.id}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
                        {r.category.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs truncate font-medium text-slate-900" title={r.description}>
                      {r.description}
                    </td>
                    <td className="p-3.5 max-w-xs truncate font-medium text-slate-600">{r.location}</td>
                    <td className="p-3.5">
                      {r.assignedOfficer ? (
                        <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                          <UserPlus className="w-3 h-3 text-indigo-600" />
                          {r.assignedOfficer}
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setAssignModalReport(r);
                            setOfficerNameInput("");
                          }}
                          className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Assign Officer</span>
                        </button>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                          (r as any).escalated || r.priority === "Urgent"
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {(r as any).escalated || r.priority === "Urgent" ? "Urgent" : r.priority || "Normal"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <StatusDropdown
                        currentStatus={r.status as any}
                        onStatusChange={(newStatus) => handleStatusChange(r.id, newStatus)}
                      />
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setAssignModalReport(r);
                          setOfficerNameInput(r.assignedOfficer || "");
                        }}
                        className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all"
                      >
                        {r.assignedOfficer ? "Reassign" : "Assign"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Assign Officer */}
      {assignModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" />
                <span>Assign Officer to {assignModalReport.id}</span>
              </h3>
              <button
                onClick={() => setAssignModalReport(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <p className="font-semibold text-slate-800">{assignModalReport.category}</p>
                <p className="text-slate-600 truncate">{assignModalReport.description}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Officer Name or Department ID
                </label>
                <input
                  type="text"
                  value={officerNameInput}
                  onChange={(e) => setOfficerNameInput(e.target.value)}
                  placeholder="e.g. Officer R. Sharma (Zone 4)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setAssignModalReport(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignOfficer}
                disabled={!officerNameInput.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all disabled:opacity-50"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Grievance Record */}
      {showAddDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" />
                <span>Add Database Grievance Record</span>
              </h3>
              <button
                onClick={() => setShowAddDemoModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTestRecord} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Civic Issue">Civic Issue</option>
                  <option value="Safety">Safety</option>
                  <option value="Corruption">Corruption</option>
                  <option value="Harassment">Harassment</option>
                </select>
              </div>



              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Enter details of grievance..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  placeholder="e.g. Sector 4, Main Road"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddDemoModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
