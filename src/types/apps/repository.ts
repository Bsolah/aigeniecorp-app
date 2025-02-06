

export type FolderType = {
  parent: string | null;
  name: string;
  createdBy: any;
  child: FolderType[];
  articles: ArticleType[];
  id: string;
};

export interface ArticleType {
  id: number | string;
  title: string;
  content: string;
  tags: string[];
  categories: string[];
  parent: FolderType[];
}
