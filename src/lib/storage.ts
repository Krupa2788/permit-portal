import { mockForms } from "../data/mockForms";
import type { SavedForm, Submission } from "../types/form";

const FORMS_KEY = "permit-portal:forms";
const SUBMISSIONS_KEY = "permit-portal:submissions";

// Missing or corrupt data returns the fallback instead of throwing.
function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    console.warn(`storage: could not read "${key}", using fallback`);
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Seed only when the key has never been written, never over existing data.
function readForms(): SavedForm[] {
  if (localStorage.getItem(FORMS_KEY) === null) {
    writeJson(FORMS_KEY, mockForms);
  }
  return readJson<SavedForm[]>(FORMS_KEY, []);
}

export async function getForms(): Promise<SavedForm[]> {
  return readForms();
}

export async function getForm(id: string): Promise<SavedForm | undefined> {
  return readForms().find((form) => form.id === id);
}

// Insert or update by id.
export async function saveForm(form: SavedForm): Promise<void> {
  const forms = readForms();
  const index = forms.findIndex((f) => f.id === form.id);
  if (index === -1) {
    forms.push(form);
  } else {
    forms[index] = form;
  }
  writeJson(FORMS_KEY, forms);
}

export async function getSubmissions(formId: string): Promise<Submission[]> {
  return readJson<Submission[]>(SUBMISSIONS_KEY, []).filter(
    (submission) => submission.formId === formId,
  );
}

export async function saveSubmission(submission: Submission): Promise<void> {
  const submissions = readJson<Submission[]>(SUBMISSIONS_KEY, []);
  writeJson(SUBMISSIONS_KEY, [...submissions, submission]);
}
