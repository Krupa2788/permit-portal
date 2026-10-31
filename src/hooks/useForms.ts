import { useEffect, useState } from "react";
import { getForm, getForms } from "../lib/storage";
import type { SavedForm } from "../types/form";

export function useForms() {
  const [forms, setForms] = useState<SavedForm[] | null>(null);

  useEffect(() => {
    getForms().then(setForms);
  }, []);

  return forms;
}

// null = loading, undefined = not found
export function useForm(formId: string | undefined) {
  // Remember which id the result belongs to, so a stale result reads as loading.
  const [loaded, setLoaded] = useState<{
    id: string;
    form: SavedForm | undefined;
  } | null>(null);

  useEffect(() => {
    if (formId === undefined) return;

    let ignore = false;
    getForm(formId).then((form) => {
      if (!ignore) setLoaded({ id: formId, form });
    });
    return () => {
      ignore = true;
    };
  }, [formId]);

  if (formId === undefined) return undefined;
  if (loaded === null || loaded.id !== formId) return null;
  return loaded.form;
}
