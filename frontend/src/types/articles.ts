export type ApiCategory = {
  id: number;
  name: string;
  slug: string;
};

export type ApiArticle = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  status: "Draft" | "Published";
  categories: ApiCategory[];
  files?: { file_name?: string; file_url?: string }[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type Props = {
  initial?: ApiArticle | any; 
  onCancel: () => void;
  onSubmit: (values: any) => void;
};