import type { ApiArticle, ApiCategory } from "../types/articles";
import { http } from "../lib/http";


type ListResponse<T> = {
  results: T[];
};

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await http<ApiCategory[] | ListResponse<ApiCategory>>(
    "/api/article-categories/"
  );
  return Array.isArray(res) ? res : res.results ?? [];
}

export async function createCategory(data: {
  name: string;
  slug: string;
}) {
  return http<ApiCategory>("/api/article-categories/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategory(
  id: number,
  data: { name: string; slug: string }
) {
  return http<ApiCategory>(`/api/article-categories/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: number) {
  return http(`/api/article-categories/${id}/`, {
    method: "DELETE",
  });
}


export async function fetchArticles(): Promise<ApiArticle[]> {
  const res = await http<ApiArticle[] | ListResponse<ApiArticle>>(
    "/api/articles/"
  );

  return Array.isArray(res) ? res : res.results ?? [];
}

export async function getArticle(id: number): Promise<ApiArticle> {
  return http<ApiArticle>(`/api/articles/${id}/`);
}


export async function createArticle(values: any) {
  const form = new FormData();

  // ⚠️ Sesuaikan naming backend kamu
  form.append("judul", values.title);
  form.append("konten", values.content);

  if (values.categoryId) {
    form.append("category_id", String(values.categoryId));
  }

  values.tagIds?.forEach((id: number) =>
    form.append("tag_ids", String(id))
  );

  if (values.thumbnailFile) {
    form.append("images", values.thumbnailFile);
  }

  return http("/api/articles/", {
    method: "POST",
    body: form,
  });
}

/* ===============================
   UPDATE ARTICLE
================================ */

export async function updateArticle(id: number, values: any) {
  const form = new FormData();

  form.append("judul", values.title);
  form.append("konten", values.content);

  if (values.categoryId) {
    form.append("category_id", String(values.categoryId));
  }

  values.tagIds?.forEach((id: number) =>
    form.append("tag_ids", String(id))
  );

  if (values.thumbnailFile) {
    form.append("images", values.thumbnailFile);
  }

  return http(`/api/articles/${id}/`, {
    method: "PUT",
    body: form,
  });
}

/* ===============================
   DELETE
================================ */

export async function deleteArticle(id: number) {
  return http(`/api/articles/${id}/`, {
    method: "DELETE",
  });
}