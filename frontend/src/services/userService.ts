const BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE}/api/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include", // 🔥 WAJIB
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.detail || "Login gagal");
  }

  return data;
}