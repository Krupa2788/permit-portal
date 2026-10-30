import { useId } from "react";
import type { StatusFilterValue } from "../types/form";

type StatusFilterProps = {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void; // callback prop type
};

const statusOptions: Record<StatusFilterValue, string> = {
  all: "All",
  draft: "Draft",
  published: "Published",
};

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const labelId = useId();
  return (
    <div className="status-filter" role="group" aria-labelledby={labelId}>
      <span id={labelId} className="status-filter-label">
        Filter by status
      </span>
      {(Object.keys(statusOptions) as StatusFilterValue[]).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {statusOptions[option]}
        </button>
      ))}
    </div>
  );
}
