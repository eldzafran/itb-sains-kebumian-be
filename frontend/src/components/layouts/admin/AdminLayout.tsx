import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminMobileDrawer from "./AdminMobileDrawer";
import { clearTokens } from "../../../lib/auth";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pageTitle = useMemo(() => {
    if (pathname.startsWith("/admin/professors")) return "Dosen";
    if (pathname.startsWith("/admin/articles")) return "Artikel";
    if (pathname.startsWith("/admin/course")) return "Mata Kuliah";
    if (pathname === "/admin" || pathname.startsWith("/admin/dashboard"))
      return "Dashboard";
    return "Admin";
  }, [pathname]);

  useEffect(() => {
    document.title = `${pageTitle} - Admin`;
  }, [pageTitle]);

  const handleLogout = () => {
    clearTokens();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />
      <AdminMobileDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <main
          className={`flex-1 pt-20 md:pt-24 py-6 md:py-8 px-4 sm:px-6 transition-all duration-300 ${
            sidebarOpen ? "md:ml-64" : "md:ml-0"
          }`}
        >
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white border rounded-3xl shadow-soft">
          <Outlet />
        </div>
        </main>
      </div>
    </div>
  );
}