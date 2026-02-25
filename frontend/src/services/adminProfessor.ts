import { http } from "../lib/http";

// ===================== PROFESSOR =====================

function getToken() {
  return localStorage.getItem("token") || "";
}

export async function fetchProfessors() {
  return http<any>("/api/lecturers/", {
    headers: { "Authorization": `Bearer ${getToken()}` },
  });
}

export async function getAdminProfessor(id: number) {
  return http<any>(`/api/lecturers/${id}/`, {
    headers: { "Authorization": `Bearer ${getToken()}` },
  });
}

// ===================== CREATE =====================
export async function createAdminProfessor(data: any): Promise<any> {
  const formData = new FormData();

  formData.append("name", data.nama_dosen);
  formData.append("nip", data.nip);
  formData.append("position", data.jabatan_fungsional);
  formData.append("is_active", "true");

  const fields = [
    "email","webpage","sinta_id","researcher_id",
    "scopus_author_id","orcid_id","research_interest",
    "education_history","publications","research_projects",
    "community_service","awards"
  ];
  fields.forEach(f => { if (data[f]) formData.append(f, String(data[f])); });

  if (data.fotoFile) formData.append("photo", data.fotoFile);

  // === FIX: append categories & courses as multiple fields ===
  if (Array.isArray(data.kategori_ids)) {
    data.kategori_ids.forEach((id: number) => {
      formData.append("categories", id.toString());
    });
  }

  if (Array.isArray(data.course_ids)) {
    data.course_ids.forEach((id: number) => {
      formData.append("course_ids", id.toString());
    });
  }

  return http<any>("/api/lecturers/", {
    method: "POST",
    body: formData,
    headers: { "Authorization": `Bearer ${getToken()}` },
  });
}

// ===================== UPDATE =====================
export async function updateAdminProfessor(id: number, data: any): Promise<any> {
  const formData = new FormData();

  formData.append("name", data.nama_dosen);
  formData.append("nip", data.nip);
  formData.append("position", data.jabatan_fungsional);
  formData.append("is_active", String(data.is_active ?? true));

  const fields = [
    "email","webpage","sinta_id","researcher_id",
    "scopus_author_id","orcid_id","research_interest",
    "education_history","publications","research_projects",
    "community_service","awards"
  ];
  fields.forEach(f => { if (data[f]) formData.append(f, String(data[f])); });

  if (data.fotoFile) formData.append("photo", data.fotoFile);

  // === FIX: append categories & courses as multiple fields ===
  if (Array.isArray(data.kategori_ids)) {
    data.kategori_ids.forEach((id: number) => {
      formData.append("categories", id.toString());
    });
  }

  if (Array.isArray(data.course_ids)) {
    data.course_ids.forEach((id: number) => {
      formData.append("course_ids", id.toString());
    });
  }

  return http<any>(`/api/lecturers/${id}/`, {
    method: "PATCH",
    body: formData,
    headers: { "Authorization": `Bearer ${getToken()}` },
  });
}

// ===================== DELETE =====================
export async function deleteAdminProfessor(id: number) {
  return http(`/api/lecturers/${id}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${getToken()}` },
  });
}

// ===================== CATEGORY =====================
export type ApiProfessor = {
  id: number;
  name: string;
  nip: string;
  position: string;
  photo?: string;
  email?: string;
  webpage?: string;
  is_active: boolean;
};

export type ApiLecturerCategory = { id: number; name: string };

export async function fetchLecturerCategories() {
  const res = await http<any>("/api/lecturer-categories/", {
    headers: { "Authorization": `Bearer ${getToken()}` },
  });
  return res?.data?.results ?? res?.results ?? [];
}

export async function createLecturerCategory(data: { name: string }) {
  return http("/api/lecturer-categories/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
  });
}

export async function updateLecturerCategory(id: number, data: { name: string }) {
  return http(`/api/lecturer-categories/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
  });
}

export async function deleteLecturerCategory(id: number) {
  return http(`/api/lecturer-categories/${id}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${getToken()}` },
  });
} 