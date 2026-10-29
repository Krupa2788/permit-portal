import type { SavedForm } from "../types/form"
import { formatDate } from "../utils/formatDate"

type FormCardProps = {
  form: SavedForm;
};

function FormCard({ form }: FormCardProps) {
  return (
    <article className="form-card">
      <h3>{form.title}</h3>
      <dl>
        <dt>Status</dt>
        <dd>{form.status === "published" ? "Published" : "Draft"}</dd>
        <dt>Created</dt>
        <dd>
          <time dateTime={form.createdAt}>{formatDate(form.createdAt)}</time>
        </dd>
      </dl>
    </article>
  );
}

export default FormCard;
