import type { ApiDosen } from "../temp/types/dosen";

const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") || "";

function buildUrl(path: string) {
  if (!path.startsWith("/")) path = "/" + path;
  return `${BASE}${path}`;
}

export async function apiListDosens(
  params: {
    page?: number;
    q?: string;
    fakultas?: string;
    program_studi?: string;
    order?: "newest" | "name";
  } = {}
): Promise<{ count: number; results: ApiDosen[] }> {

  const url = new URL(buildUrl("/api/dosen/list/"));

  if (params.page) url.searchParams.set("page", String(params.page));
  if (params.q) url.searchParams.set("q", params.q);
  if (params.fakultas) url.searchParams.set("fakultas", params.fakultas);
  if (params.program_studi) url.searchParams.set("program_studi", params.program_studi);
  if (params.order) url.searchParams.set("order", params.order);

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data?.detail || "Gagal fetch dosen");
  return {
    count: typeof data?.count === "number" ? data.count : 0,
    results: Array.isArray(data?.results) ? data.results : [],
  };
}

export async function apiListFakultas(): Promise<string[]> {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/dosen/fakultas-list/`
  );

  if (!res.ok) throw new Error("Gagal fetch fakultas");

  return res.json();
}

export async function apiGetDosen(id: string | number): Promise<ApiDosen> {
  const res = await fetch(buildUrl(`/api/dosen/${id}/`), { headers: { Accept: "application/json" } });
  const data = (await res.json().catch(() => ({}))) as any;

  if (!res.ok) throw new Error(data?.detail || "Dosen tidak ditemukan");
  return data as ApiDosen;
}

export async function apiRelatedDosens(id: string | number): Promise<ApiDosen[]> {
  const res = await fetch(buildUrl(`/api/dosen/${id}/related/`), { headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data = (await res.json().catch(() => [])) as any;
  return Array.isArray(data) ? data : [];
}