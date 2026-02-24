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
  form.append("title", values.title);
  form.append("slug", values.slug);
  form.append("content", values.content);
  form.append("status", values.status ?? "Draft");

  const validFiles = values.files?.filter((f: any) => f.file_name && f.file_url) || [];
  form.append("files_json", JSON.stringify(validFiles));

  values.categories?.forEach((id: number) => form.append("categories", String(id)));

  if (values.thumbnailFile) {
    form.append("thumbnail", values.thumbnailFile);
  }

  return http("/api/articles/", {
    method: "POST",
    body: form,
  });
}


export async function updateArticle(id: number, values: any) {
  const form = new FormData();
  form.append("title", values.title);
  form.append("slug", values.slug);
  form.append("content", values.content);
  form.append("status", values.status ?? "Draft");

  const validFiles = values.files?.filter((f: any) => f.file_name && f.file_url) || [];
  form.append("files_json", JSON.stringify(validFiles));

  values.categories?.forEach((id: number) => form.append("categories", String(id)));

  if (values.thumbnailFile) {
    form.append("thumbnail", values.thumbnailFile);
  }

  return http(`/api/articles/${id}/`, {
    method: "PATCH", 
    body: form,
  });
}

export async function deleteArticle(id: number) {
  return http(`/api/articles/${id}/`, {
    method: "DELETE",
  });
}