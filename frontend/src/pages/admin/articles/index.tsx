import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  fetchArticles,
  fetchCategories,
} from "../../../services/adminArticle";

import ArticleCard from "../../../components/articles/ArticleCard";
import CategoryModal from "../../../components/articles/CategoryModal";

import type { ApiArticle, ApiCategory } from "../../../types/articles";

export default function AdminArticlesPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiArticle[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);


  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const articles = await fetchArticles();
      // Pastikan data yang masuk ke state adalah data mentah dari API
      setItems(articles ?? []);

      const catRes = await fetchCategories();
      setCategories(catRes ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load articles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);


  // --- PERBAIKAN 2: LOGIKA FILTER ---
  const filteredItems = items.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());

    // Filter kategori mengecek ID di dalam array categories milik article
    const matchCategory =
      categoryFilter === null ||
      a.categories?.some((c) => c.id === categoryFilter);

    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Articles</h1>
          <p className="text-black/60">Manage your articles</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2 rounded-xl border bg-white text-blue-700 hover:bg-blue-50"
          >
            Manage Categories
          </button>

          <Link
            to="/admin/articles/create"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            + Create
          </Link>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />

        <select
          value={categoryFilter ?? ""}
          onChange={(e) =>
            setCategoryFilter(e.target.value ? Number(e.target.value) : null)
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {err && <div className="text-red-500 mb-4">{err}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border bg-white p-6">
          Belum ada artikel.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((a) => (
            <ArticleCard
              key={a.id}
              article={a} 
              onDelete={(id) =>
                setItems((prev) => prev.filter((x) => String(x.id) !== id))
              }
            />
          ))}
        </div>
      )}

      {showCategoryModal && (
        <CategoryModal
          onCancel={() => setShowCategoryModal(false)} onSubmit={function (values: any): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </div>
  );
}