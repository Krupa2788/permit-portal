import type { SavedForm } from "../types/form";
import FormCard from "./FormCard";

type FormListProps = {
  forms: SavedForm[];
};

function FormList({ forms }: FormListProps) {
  return (
    <section aria-labelledby="forms-heading">
      <h2 id="forms-heading">Your forms</h2>
      {forms.length === 0 ? (
        <p>No forms yet.</p>
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

export default FormList;
