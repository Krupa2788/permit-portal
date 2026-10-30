import type { SavedForm } from "../types/form";
import { formatDate } from "../utils/formatDate";

type FormCardProps = {
  form: SavedForm;
};

const statusLabels: Record<SavedForm["status"], string> = {
  draft: "Draft",
  published: "Published",
};

export function FormCard({ form }: FormCardProps) {
  return (
    <article className="form-card">
      <h3>{form.title}</h3>
      <dl>
        <dt>Status</dt>
        <dd>{statusLabels[form.status]}</dd>
        <dt>Created</dt>
        <dd>
          <time dateTime={form.createdAt}>{formatDate(form.createdAt)}</time>
        </dd>
      </dl>
    </article>
  );
}
