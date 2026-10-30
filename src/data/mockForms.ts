import type { SavedForm } from "../types/form"

export const mockForms: SavedForm[] = [
  {
    id: "1",
    title: "Building Permit",
    path: "/forms/building-permit",
    createdAt: "2026-10-27T03:15:00Z",
    status: "published"
  },
  {
    id: "2",
    title: "Tree Removal Permit",
    path: "/forms/tree-removal-permit",
    createdAt: "2026-10-28T15:00:00Z",
    status: "draft"
  },
  {
    id: "3",
    title: "Event Permit",
    path: "/forms/event-permit",
    createdAt: "2026-10-29T08:30:00Z",
    status: "draft"
  }
];