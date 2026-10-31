import type { FormType } from "@formio/react";
import type { SavedForm } from "../types/form";

// Minimal schema so each seeded form can be filled in.
const applicantSchema: FormType = {
  display: "form",
  components: [
    {
      type: "textfield",
      input: true,
      key: "applicantName",
      label: "Applicant name",
      validate: { required: true },
    },
    {
      type: "button",
      input: true,
      action: "submit",
      key: "submit",
      label: "Submit",
    },
  ],
};

export const mockForms: SavedForm[] = [
  {
    id: "1",
    title: "Building Permit",
    createdAt: "2026-10-27T03:15:00Z",
    status: "published",
    schema: applicantSchema,
  },
  {
    id: "2",
    title: "Tree Removal Permit",
    createdAt: "2026-10-28T15:00:00Z",
    status: "draft",
    schema: applicantSchema,
  },
  {
    id: "3",
    title: "Event Permit",
    createdAt: "2026-10-29T08:30:00Z",
    status: "draft",
    schema: applicantSchema,
  },
];
