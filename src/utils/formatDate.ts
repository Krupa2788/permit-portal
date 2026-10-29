// Created once at module level, not per render.
const brisbaneDate = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Brisbane",
  dateStyle: "long",
});

export function formatDate(iso: string): string {
  return brisbaneDate.format(new Date(iso));
}
