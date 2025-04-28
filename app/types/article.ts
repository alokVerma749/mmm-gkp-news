export interface Article {
  _id?: string;
  primary_tag: string;
  secondary_tags: string[];
  title: string;
  description: string;
  image: string | null;
  upvotes: number;
  downvotes: number;
  content: string;
  createdAt?: Date;
}
export interface ArticleFormData {
  _id?: string;
  primary_tag: string;
  secondary_tags: string[];
  title: string;
  description: string;
  image: string | null;
  content: string;
}
