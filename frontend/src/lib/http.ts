const BASE = (import.meta.env.VITE_API_BASE_URL).replace(/\/+$/, "");

function buildUrl(path: string) {
  if (!path.startsWith("/")) path = "/" + path;
  return `${BASE}${path}`;
}

export async function http<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.headers as any),
  };

  const isFormData = init.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(buildUrl(path), {
    ...init,
    headers,
    credentials: "include", // 🔥 WAJIB UNTUK COOKIE
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.detail || `Request gagal (${res.status})`);
  }

  const finalData = data?.data !== undefined ? data.data : data;

  return finalData as T;
}