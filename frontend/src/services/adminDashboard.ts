import { http } from "../lib/http";

export type ApiDashboardOverview = {
  total_articles: number;
  total_published_articles: number;
  total_courses: number;
  total_lecturers: number;
  total_active_lecturers: number;
  latest_articles: {
    id: number;
    title: string;
    slug: string;
    status: string;
    created_at: string;
  }[];
  latest_courses: {
    id: number;
    course_name: string;
    course_code: string;
    created_at: string;
  }[];
  latest_lecturers: {
    id: number;
    name: string;
    nip: string;
    slug: string;
    created_at: string;
  }[];
};

export async function fetchDashboardOverview(): Promise<ApiDashboardOverview> {
  return http<ApiDashboardOverview>("/api/dashboard/overview/");
}