// Created once at module level, not per render.
const brisbaneDate = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Brisbane",
  dateStyle: "long",
});

export function parseDate(iso: string): Date | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    console.warn(`Invalid date: ${iso}`);
    return null;
  }
  return date;
}

export function formatDate(date: Date): string {
  return brisbaneDate.format(date);
}
