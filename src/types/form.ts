export type SavedForm = {
  id: string;
  title: string;
  path: string;
  createdAt: string;
  status: "draft" | "published";
};

export type StatusFilterValue = "all" | SavedForm["status"];
