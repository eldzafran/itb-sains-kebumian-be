import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRelatedArticles } from "../../services/userArticles";
import type { ApiArticle } from "../../services/userArticles";

export default function RelatedArtikel() {
  const { id } = useParams<{ id: string }>();
  const [related, setRelated] = useState<ApiArticle[]>([]);

  useEffect(() => {
    let alive = true;
    if (id) {
      apiRelatedArticles(id).then((data) => {
        if (alive) setRelated(data);
      });
    }
    return () => { alive = false; };
  }, [id]);

  // Don't render the section if there are no related articles
  if (related.length === 0) return null;

  return (
    <section className="w-full bg-[#F3F4F6] py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-10">Koleksi Terkait</h2>
        
        <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          {related.map((item) => (
            <Link 
              key={item.id} 
              to={`/informasi/artikel/${item.id}`} 
              className="min-w-[320px] max-w-[320px] bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-[200px] overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  alt={item.title} 
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-2 tracking-wider">
                    Kategori ID: {item.categories[0] || "Umum"}
                  </p>
                  <h4 className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 mt-4 text-right">
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}