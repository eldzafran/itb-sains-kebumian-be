const BASE = (import.meta.env.VITE_API_BASE_URL as string || "").replace(/\/+$/, "");

export type ApiCategory = { id: number; name: string; slug: string };
export type ApiFile = { id: number; file_name: string; file_url: string };

export type ApiArticle = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  created_by: string;
  published_at: string;
  created_at: string;
  categories: number[]; // Backend sends IDs [3], not objects
  files: ApiFile[];
};

// Response wrapper based on your JSON
interface ApiResponse {
  status: string;
  data: {
    count: number;
    results: ApiArticle[];
  };
}

const getUrl = (path: string, params: Record<string, any> = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) query.append(key, val.toString());
  });
  query.append("public", "true"); 
  return `${BASE}${path}?${query.toString()}`;
};

export async function apiListArticles(params: any) {
  const res = await fetch(getUrl("/api/articles/", params));
  if (!res.ok) throw new Error("Gagal load artikel");
  
  const json: ApiResponse = await res.json();
  // Accessing json.data.results as per your provided success response
  return {
    results: json.data?.results || [],
    count: json.data?.count || 0
  };
}

export async function apiListCategories(): Promise<ApiCategory[]> {
  try {
    const res = await fetch(`${BASE}/api/article-categories/`); 
    if (!res.ok) return []; // Silently handle 401
    const json = await res.json();
    // Assuming categories follow the same "data" wrapper pattern
    return Array.isArray(json.data?.results) ? json.data.results : (json.data || []);
  } catch {
    return [];
  }
}

export async function getPublishedArticleById(id: string | number): Promise<ApiArticle | null> {
  const res = await fetch(getUrl(`/api/articles/${id}/`));
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function apiRelatedArticles(id: string | number): Promise<ApiArticle[]> {
  try {

    const res = await fetch(`${BASE}/api/articles/${id}/related/?public=true`);
    
    if (!res.ok) return [];
    
    const json = await res.json();
    return json.data?.results || json.data || [];
  } catch (error) {
    console.error("Related articles fetch failed:", error);
    return [];
  }
}