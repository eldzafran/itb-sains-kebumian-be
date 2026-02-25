import { http } from "../lib/http";

// ===================== PROFESSOR =====================

export type ApiProfessor = {
  id: number;
  slug: string;
  name: string;
  nip: string;
  position: string;
  photo?: string;
  email?: string;
  webpage?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  categories: number[];
  courses: {
    id: number;
    course_name: string;
    course_code: string;
  }[];
};

export async function fetchProfessors(): Promise<{ dosens: ApiProfessor[] }> {
  return http<{ dosens: ApiProfessor[] }>("/api/lecturers/");
}

export async function getAdminProfessor(id: number): Promise<ApiProfessor> {
  return http<ApiProfessor>(`/api/lecturers/${id}/`);
}

// ===================== CREATE =====================

export async function createAdminProfessor(data: {
  name: string;
  nip: string;
  position: string;

  categories?: number[];
  course_ids?: number[];

  email?: string;
  webpage?: string;
  is_active?: boolean;

  photo?: File[];
}): Promise<any> {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("nip", data.nip);
  formData.append("position", data.position);
  formData.append("is_active", String(data.is_active ?? true));

  // categories
  if (Array.isArray(data.categories)) {
    data.categories.forEach((id) => {
      formData.append("categories", String(Number(id)));
    });
  }

  // course_ids (WAJIB → jangan kirim kosong string)
  if (Array.isArray(data.course_ids) && data.course_ids.length > 0) {
    data.course_ids.forEach((id) => {
      formData.append("course_ids", String(Number(id)));
    });
  }

  if (data.email) formData.append("email", data.email);
  if (data.webpage) formData.append("webpage", data.webpage);

  if (Array.isArray(data.photo)) {
    data.photo.forEach((file) => {
      formData.append("photo", file);
    });
  }

  return http<any>("/api/lecturers/", {
    method: "POST",
    body: formData,
  });
}

// ===================== UPDATE (FULL PUT) =====================

export async function updateAdminProfessor(
  id: number,
  data: {
    name: string;
    nip: string;
    position: string;

    categories?: number[];
    course_ids?: number[];

    email?: string;
    webpage?: string;
    is_active?: boolean;

    photo?: File[];
  }
): Promise<any> {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("nip", data.nip);
  formData.append("position", data.position);
  formData.append("is_active", String(data.is_active ?? true));

  // categories
  if (Array.isArray(data.categories)) {
    data.categories.forEach((id) => {
      formData.append("categories", String(Number(id)));
    });
  }

  // course_ids (WAJIB supaya tidak error required)
  if (Array.isArray(data.course_ids) && data.course_ids.length > 0) {
    data.course_ids.forEach((id) => {
      formData.append("course_ids", String(Number(id)));
    });
  }

  if (data.email) formData.append("email", data.email);
  if (data.webpage) formData.append("webpage", data.webpage);

  if (Array.isArray(data.photo)) {
    data.photo.forEach((file) => {
      formData.append("photo", file);
    });
  }

  return http<any>(`/api/lecturers/${id}/`, {
    method: "PUT",
    body: formData,
  });
}

// ===================== DELETE =====================

export async function deleteAdminProfessor(id: number) {
  return http(`/api/lecturers/${id}/`, {
    method: "DELETE",
  });
}

// ===================== CATEGORY =====================

export type ApiLecturerCategory = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export async function fetchLecturerCategories() {
  const res = await http<any>("/api/lecturer-categories/");
  return res?.data?.results ?? [];
}

export async function createLecturerCategory(data: { name: string }) {
  return http<ApiLecturerCategory>("/api/lecturer-categories/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export async function updateLecturerCategory(
  id: number,
  data: { name: string }
) {
  return http<ApiLecturerCategory>(`/api/lecturer-categories/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export async function deleteLecturerCategory(id: number) {
  return http(`/api/lecturer-categories/${id}/`, {
    method: "DELETE",
  });
}