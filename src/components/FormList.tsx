import type { SavedForm } from "../types/form";
import { FormCard } from "./FormCard";
import { useId } from "react";

type FormListProps = {
  forms: SavedForm[];
  emptyMessage?: string;
};

export function FormList({
  forms,
  emptyMessage = "No forms yet.",
}: FormListProps) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Your forms</h2>
      {forms.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul className="form-list" role="list">
          {forms.map((form) => (
            <li key={form.id}>
              <FormCard form={form} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
