import { useState } from "react";
import { FormList } from "../components/FormList";
import { StatusFilter } from "../components/StatusFilter";
import type { StatusFilterValue } from "../types/form";
import { useForms } from "../hooks/useForms";

export function FormsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");

  const forms = useForms();

  if (forms === null) {
    return (
      <>
        <h1>Permit Portal</h1>
        <p>Loading forms…</p>
      </>
    );
  }
  // Derived from state on every render, not stored separately.
  const visibleForms =
    statusFilter === "all"
      ? forms
      : forms.filter((form) => form.status === statusFilter);

  return (
    <>
      <h1>Permit Portal</h1>

      <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      {/* Always rendered so screen readers announce when its text changes. */}
      <p role="status">
        Showing {visibleForms.length} of {forms.length} forms
      </p>
      <FormList
        forms={visibleForms}
        emptyMessage={
          statusFilter === "all" ? undefined : `No ${statusFilter} forms.`
        }
      />
    </>
  );
}
