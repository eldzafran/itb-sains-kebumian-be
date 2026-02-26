import { http } from "../lib/http";
import type { Course, MetaDataType } from "../types/course";
type GetCoursesParams = {
  page?: number;
  search?: string;
};

export async function getCourses(params?: GetCoursesParams): Promise<any> {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.search) qs.set("search", params.search);

  const url = qs.toString() ? `/api/courses/?${qs.toString()}` : `/api/courses/`;
  const response = await http<any>(url);
  return response;
}

// 2. Ambil Detail Mata Kuliah by ID
export async function getCourseById(id: number): Promise<Course> {
  return http<Course>(`/api/courses/${id}/`);
}

// 3. Create Mata Kuliah Baru
export async function createCourse(formData: any): Promise<Course> {
  return http<Course>("/api/courses/", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

// 4. Update Mata Kuliah (Full Update)
export async function updateCourse(id: number, formData: any): Promise<Course> {
  return http<Course>(`/api/courses/${id}/`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });
}

// 5. Delete Mata Kuliah
export async function deleteCourse(id: number): Promise<void> {
  return http(`/api/courses/${id}/`, {
    method: "DELETE",
  });
}

export async function getCourseMetadata(): Promise<MetaDataType> {
    return http<MetaDataType>("/api/courses/metadata/");
}