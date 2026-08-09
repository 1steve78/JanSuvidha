const API_BASE = "http://127.0.0.1:8000";

export const api = {
  async matchSchemes(profile: any) {
    try {
      const res = await fetch(`${API_BASE}/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to fetch matches");
      const data = await res.json();
      
      if (data.matches) {
        data.matches = data.matches.map((m: any, index: number) => {
          let cat = "civic";
          const nameLower = (m.scheme_name || "").toLowerCase();
          if (nameLower.includes("health") || nameLower.includes("ayushman") || nameLower.includes("poshan")) cat = "health";
          else if (nameLower.includes("awas") || nameLower.includes("housing")) cat = "housing";
          else if (nameLower.includes("scholarship") || nameLower.includes("padhao")) cat = "education";
          else if (nameLower.includes("pension") || nameLower.includes("bima")) cat = "safety";
          
          return {
            id: `scheme-${index}`,
            name: m.scheme_name,
            category: cat,
            confidence: m.confidence,
            reasons: m.reasons || [],
            requiredDocuments: m.document_checklist || [],
            applyUrl: m.apply_url || "#"
          };
        });
      }
      
      return data;
    } catch (err) {
      console.warn("API matchSchemes fallback mode:", err);
      return { matches: [] };
    }
  },

  // Reports
  async submitReport(data: any) {
    const res = await fetch(`${API_BASE}/reports/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit report");
    return res.json();
  },
  async trackReport(id: string) {
    const res = await fetch(`${API_BASE}/reports/track/${id}`);
    if (!res.ok) throw new Error("Report not found");
    return res.json();
  },
  async getPublicStats() {
    try {
      const res = await fetch(`${API_BASE}/reports/public`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return await res.json();
    } catch (err) {
      console.warn("API getPublicStats offline mode:", err);
      return null;
    }
  },

  // Admin
  async adminLogin(username: string, password: string) {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Invalid Username or Password");
    return res.json();
  },
  async getAdminReports(token: string) {
    try {
      const res = await fetch(`${API_BASE}/reports/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401 && typeof window !== "undefined") {
          localStorage.removeItem("jan_suvidha_admin_auth_token");
          localStorage.removeItem("jan_suvidha_admin_auth");
        }
        return [];
      }
      return await res.json();
    } catch (err) {
      console.warn("Backend unavailable or unauthorized token:", err);
      return [];
    }
  },
  async updateReportStatus(id: string, updateData: any, token: string) {
    const res = await fetch(`${API_BASE}/reports/${id}/status`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },
};
