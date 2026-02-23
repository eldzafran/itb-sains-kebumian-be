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
  created_at: string;
  updated_at: string;
};

export type Props = {
  initial?: {
    id?: number;
    title: string;
    slug: string;
    content: string;
    thumbnail?: string;
    categories?: number[];
    status?: "Draft" | "Published";
  } | null;
  onCancel: () => void;
  onSubmit: (values: {
    title: string;
    slug: string;
    content: string;
    status: "Draft" | "Published";
    categories: number[];
    thumbnailFile?: File | null;
  }) => void;
};