import { useEffect, useState } from "react";
import { Search, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { apiListArticles, apiListCategories } from "../../services/userArticles";
import type { ApiArticle, ApiCategory } from "../../services/userArticles";

export default function Artikel() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    apiListCategories().then(setCategories);
  }, []);

  useEffect(() => {
    apiListArticles({ search: q, categories: selectedCategory }).then(data => {
      setArticles(data.results);
      setTotal(data.count);
    });
  }, [q, selectedCategory]);

  return (
    <section className="w-full bg-[#F8F9FB] font-poppins min-h-screen pb-20">
      <div className="max-w-[1238px] mx-auto pt-16 pb-12 px-4">
        <h1 className="text-3xl font-bold text-slate-800">Artikel & Berita</h1>
        <p className="text-slate-500 mt-2">Menampilkan {total} artikel terbaru</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <aside className="space-y-6">
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
             <div className="relative mb-4">
                <input 
                  value={q} 
                  onChange={e => setQ(e.target.value)} 
                  placeholder="Cari artikel..." 
                  className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500" 
                />
                <Search size={16} className="absolute right-4 top-2.5 text-slate-400" />
             </div>
             <button 
               onClick={() => {setQ(""); setSelectedCategory("");}} 
               className="w-full flex items-center justify-center gap-2 text-xs py-2 bg-slate-100 rounded-full hover:bg-slate-200"
             >
               <RotateCw size={14}/> Reset Filter
             </button>
          </div>

          {categories.length > 0 && (
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h5 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Filter Kategori</h5>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedCategory === String(cat.id)} 
                      onChange={() => setSelectedCategory(selectedCategory === String(cat.id) ? "" : String(cat.id))} 
                    />
                    <span className="text-sm text-slate-600 group-hover:text-blue-600">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {articles.map(item => (
              <Link key={item.id} to={`/informasi/artikel/${item.id}`} className="group">
                <div className="bg-white rounded-[30px] shadow-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-2xl hover:-translate-y-1">
                  <div className="relative">
                    <img src={item.thumbnail} className="w-full h-[240px] object-cover" alt={item.title} />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                      ID: {item.categories[0]}
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-slate-500 text-sm mt-3 line-clamp-2">{item.content}</p>
                    </div>
                    <div className="mt-6 pt-6 border-t flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-400">Oleh {item.created_by}</span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}