import { Link, useParams } from "react-router";
import { useForm } from "../hooks/useForms";

export function FillFormPage() {
  const { formId } = useParams();
  const form = useForm(formId);

  if (form === undefined) {
    return (
      <>
        <h1>Form not found</h1>
        <p>
          <Link to="/">Back to all forms</Link>
        </p>
      </>
    );
  }

  if (form === null) {
    return (
      <>
        <h1>Loading…</h1>
      </>
    );
  }

  return <h1>{form.title}</h1>;
}
