

export type FolderType = {
  parent: string | null;
  name: string;
  createdBy: any;
  child: FolderType[];
  articles: ArticleType[];
  id: string;
  _id: string;
  url?: string;
};

export interface ArticleType {
  id: number | string;
  name: string;
  content: string;
  tags: string[];
  categories: string[];
  parent: FolderType[];
}
