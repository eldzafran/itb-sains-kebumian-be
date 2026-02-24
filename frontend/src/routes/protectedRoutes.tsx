import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`${BASE}/api/auth/me/`, {
          credentials: "include",
        });

        if (alive) {
          setAllowed(res.ok); // 🔥 cukup cek 200
        }
      } catch {
        if (alive) setAllowed(false);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="p-6 text-black">Loading...</div>;
  if (!allowed) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}