const fs = require('fs');

function extractAdminView(code) {
    const startMarker = '{!isAdmin ? (';
    const midMarker = ') : (';
    const adminMarker = '/* ─────────── ADMIN DASHBOARD METRICS VIEW ─────────── */';

    const startIndex = code.indexOf(startMarker);
    const midIndex = code.indexOf(midMarker, startIndex);
    const adminIndex = code.indexOf(adminMarker, midIndex);
    
    const beforeTernary = code.substring(0, startIndex);
    
    let afterTernary = code.substring(adminIndex);
    const lastBracketIndex = afterTernary.lastIndexOf(')}');
    let bContent = afterTernary.substring(0, lastBracketIndex) + afterTernary.substring(lastBracketIndex + 2);
    
    return beforeTernary + bContent;
}

// 1. Admin Dashboard
let adminCode = fs.readFileSync('src/app/admin/dashboard/page.tsx', 'utf8');
adminCode = extractAdminView(adminCode);
adminCode = adminCode.replace(
    /useEffect\(\(\) => \{\s*setMounted\(true\);\s*const token = localStorage.getItem\("jan_suvidha_admin_auth_token"\);\s*if \(token\) \{\s*setIsAdmin\(true\);\s*fetchReports\(\);\s*\}\s*\}, \[\]\);/g,
    `useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("jan_suvidha_admin_auth_token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAdmin(true);
      fetchReports();
    }
  }, [router]);`
);
fs.writeFileSync('src/app/admin/dashboard/page.tsx', adminCode);

// 2. Public Dashboard
let publicCode = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');
publicCode = publicCode.replace(/import AdminSidebar from "@\/components\/admin\/AdminSidebar";\n/g, '');
publicCode = publicCode.replace(/\{\/\* Left Sidebar navigation \*\/\}\s*<AdminSidebar \/>\s*/g, '');

publicCode = extractAdminView(publicCode);

publicCode = publicCode.replace(/\{isAdmin \? "Admin Analytics & Telemetry" : "Secure Administration Portal"\}/g, '"Public Analytics & Telemetry"');
publicCode = publicCode.replace(/\{isAdmin && \([\s\S]*?\}\)/g, ''); // Lock portal button

publicCode = publicCode.replace(/<span className="inline-flex items-center gap-1\.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200\/80">[\s\S]*?<\/span>/g, '');
publicCode = publicCode.replace(/Admin Analytics Dashboard/g, 'Public Analytics Dashboard');

publicCode = publicCode.replace(
    /const fetchReports = async \(\) => \{[\s\S]*?\}\n  \};/g,
    `const fetchReports = async () => {
    try {
      const reports = await api.getAdminReports("dummy");
      if (Array.isArray(reports)) {
        setDbReports(reports);
      }
    } catch (e) {
      console.warn("Failed to load reports:", e);
    }
  };`
);

publicCode = publicCode.replace(
    /useEffect\(\(\) => \{\s*setMounted\(true\);\s*const token = localStorage.getItem\("jan_suvidha_admin_auth_token"\);\s*if \(token\) \{\s*setIsAdmin\(true\);\s*fetchReports\(\);\s*\}\s*\}, \[\]\);/g,
    `useEffect(() => {
    setMounted(true);
    fetchReports();
  }, []);`
);

fs.writeFileSync('src/app/dashboard/page.tsx', publicCode);
console.log("Refactoring complete.");
