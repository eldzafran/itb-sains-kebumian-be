import { useEffect, useState } from "react";
import { fetchDashboardOverview, type ApiDashboardOverview } from "../../services/adminDashboard";
import { BookOpen, Users, FileText, Award } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<ApiDashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const overview = await fetchDashboardOverview();
      setData(overview);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} title="Total Mata Kuliah" value={data?.total_courses ?? 0} color="bg-blue-500" />
        <StatCard icon={Users} title="Total Dosen" value={data?.total_lecturers ?? 0} color="bg-green-500" />
        <StatCard icon={FileText} title="Total Artikel" value={data?.total_articles ?? 0} color="bg-purple-500" />
        <StatCard icon={Award} title="Dosen Aktif" value={data?.total_active_lecturers ?? 0} color="bg-orange-500" />
      </div>

      {/* Latest Courses & Articles */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Courses */}
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-semibold text-lg mb-4">Mata Kuliah Terbaru</h2>
          <div className="space-y-3">
            {(data?.latest_courses ?? []).map(c =>  (
              <div key={c.id} className="rounded-xl bg-slate-50 p-4 flex justify-between">
                <div>
                  <div className="font-medium">{c.course_name}</div>
                  <div className="text-sm text-slate-500">Kode: {c.course_code}</div>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <div>Sem. -</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-semibold text-lg mb-4">Artikel Terbaru</h2>
          <div className="space-y-3">
            {(data?.latest_articles ?? []).map(a => (
              <div key={a.id} className="rounded-xl bg-slate-50 p-4 flex gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-1" />
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{a.title}</div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-600">
                      {a.status}
                    </span>
                    <span>{new Date(a.created_at).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function StatCard({ icon: Icon, title, value, color }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, title: string, value: number, color: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}