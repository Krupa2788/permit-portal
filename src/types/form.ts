import type { FormType } from "@formio/react";

export type SavedForm = {
  id: string;
  title: string;
  createdAt: string;
  status: "draft" | "published";
  schema: FormType;
};

export type Submission = {
  id: string;
  formId: string;
  data: Record<string, unknown>; // unknown = "check before you use it"
  submittedAt: string;
};

export type StatusFilterValue = "all" | SavedForm["status"];
