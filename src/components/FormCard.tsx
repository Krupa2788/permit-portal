import type { SavedForm } from "../types/form";
import { formatDate, parseDate } from "../utils/formatDate";

type FormCardProps = {
  form: SavedForm;
};

const statusLabels: Record<SavedForm["status"], string> = {
  draft: "Draft",
  published: "Published",
};

export function FormCard({ form }: FormCardProps) {
  const createdAt = parseDate(form.createdAt);

  return (
    <article className="form-card">
      <h3>{form.title}</h3>
      <dl>
        <dt>Status</dt>
        <dd>{statusLabels[form.status]}</dd>
        <dt>Created</dt>
        <dd>
          {createdAt ? (
            <time dateTime={form.createdAt}>{formatDate(createdAt)}</time>
          ) : (
            "Unknown date"
          )}
        </dd>
      </dl>
    </article>
  );
}
