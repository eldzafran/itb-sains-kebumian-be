import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Paperclip, ArrowUpRight } from "lucide-react";
import { getPublishedArticleById } from "../../services/userArticles";
import type { ApiArticle } from "../../services/userArticles";

export default function DetailArtikel() {
  const { id } = useParams();
  const [data, setData] = useState<ApiArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPublishedArticleById(id).then(res => {
        setData(res);
        setLoading(false);
        window.scrollTo(0,0);
      });
    }
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!data) return <div className="p-20 text-center">Artikel tidak ditemukan.</div>;

  return (
    <article className="bg-[#F5F6F8] min-h-screen pb-24 font-poppins">
      <section className="max-w-[1320px] mx-auto pt-[60px] px-4">
        <div className="flex items-center gap-2 text-sm mb-10 text-slate-500">
          <Link to="/informasi/artikel" className="flex items-center gap-1 hover:text-slate-900 transition-colors"><ArrowLeft size={16}/> Informasi</Link>
          <span>—</span>
          <span className="text-slate-900">{data.title}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase text-[#0C1637] mb-6 leading-tight">{data.title}</h1>
        <div className="flex flex-col gap-2 mb-10">
          <p className="text-xl font-semibold">By {data.created_by}</p>
          <p className="text-slate-500">Diterbitkan: {new Date(data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        <img src={data.thumbnail} className="w-full h-[300px] md:h-[600px] object-cover rounded-[30px] mb-16 shadow-lg" alt={data.title} />

        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-[#0C1637]">The Vision:</h2>
          <div className="text-lg md:text-xl text-slate-600 leading-relaxed whitespace-pre-line">
            {data.content}
          </div>
        </div>

        {data.files && data.files.length > 0 && (
          <div className="mt-20 max-w-4xl">
            <h3 className="text-2xl font-bold mb-6">Dokumen Terkait</h3>
            <div className="space-y-3">
              {data.files.map(file => (
                <div key={file.id} className="flex justify-between items-center bg-white border p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 font-medium"><Paperclip size={20} className="text-blue-500"/> {file.file_name}</div>
                  <a href={file.file_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 font-bold hover:underline">Open <ArrowUpRight size={18}/></a>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}