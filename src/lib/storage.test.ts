import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockForms } from "../data/mockForms";
import type { SavedForm, Submission } from "../types/form";
import {
  getForm,
  getForms,
  getSubmissions,
  saveForm,
  saveSubmission,
} from "./storage";

// Vitest runs in Node (D-008), which has no localStorage: use an in-memory one.
function createMemoryStorage(): Storage {
  const items = new Map<string, string>();
  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (index) => [...items.keys()][index] ?? null,
    removeItem: (key) => void items.delete(key),
    setItem: (key, value) => void items.set(key, String(value)),
  };
}

beforeEach(() => {
  vi.stubGlobal("localStorage", createMemoryStorage());
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

const newForm: SavedForm = {
  id: crypto.randomUUID(),
  title: "Parking Permit",
  createdAt: "2026-10-31T00:00:00Z",
  status: "draft",
  schema: { components: [] },
};

describe("forms", () => {
  it("seeds the mock forms on first run", async () => {
    expect(await getForms()).toEqual(mockForms);
    expect(localStorage.getItem("permit-portal:forms")).not.toBeNull();
  });

  it("does not reseed when the stored list is empty", async () => {
    localStorage.setItem("permit-portal:forms", "[]");
    expect(await getForms()).toEqual([]);
  });

  it("returns an empty list for corrupt data instead of throwing", async () => {
    localStorage.setItem("permit-portal:forms", "{not json");
    expect(await getForms()).toEqual([]);
  });

  it("inserts a new form and updates an existing one by id", async () => {
    await saveForm(newForm);
    await saveForm({ ...newForm, status: "published" });

    const forms = await getForms();
    expect(forms).toHaveLength(mockForms.length + 1);
    expect((await getForm(newForm.id))?.status).toBe("published");
  });
});

describe("submissions", () => {
  it("returns only the submissions for the given form", async () => {
    const submission = (formId: string): Submission => ({
      id: crypto.randomUUID(),
      formId,
      data: { applicantName: "Kri" },
      submittedAt: "2026-10-31T00:00:00Z",
    });
    await saveSubmission(submission("1"));
    await saveSubmission(submission("2"));

    const result = await getSubmissions("1");
    expect(result).toHaveLength(1);
    expect(result[0].formId).toBe("1");
  });
});
