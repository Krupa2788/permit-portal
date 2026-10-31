import { Link, useParams } from "react-router";
import { mockForms } from "../data/mockForms";

export function FillFormPage() {
  const { formId } = useParams();
  const form = mockForms.find((f) => f.id === formId);

  if (!form) {
    return (
      <>
        <h1>Form not found</h1>
        <p>
          <Link to="/">Back to all forms</Link>
        </p>
      </>
    );
  }

  return <h1>{form.title}</h1>;
}
