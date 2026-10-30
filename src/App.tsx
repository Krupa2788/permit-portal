import { useState } from "react";
import "./App.css";
import { FormList } from "./components/FormList";
import { StatusFilter } from "./components/StatusFilter";
import { mockForms } from "./data/mockForms";
import type { StatusFilterValue } from "./types/form";

export function App() {
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");

  // Derived from state on every render, not stored separately.
  const visibleForms =
    statusFilter === "all"
      ? mockForms
      : mockForms.filter((form) => form.status === statusFilter);

  return (
    <main>
      <h1>Permit Portal</h1>
      <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      {/* Always rendered so screen readers announce when its text changes. */}
      <p role="status">
        Showing {visibleForms.length} of {mockForms.length} forms
      </p>
      <FormList
        forms={visibleForms}
        emptyMessage={
          statusFilter === "all" ? undefined : `No ${statusFilter} forms.`
        }
      />
    </main>
  );
}
