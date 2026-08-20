export function isValidDate(dateString?: string): boolean {
  if (!dateString) return false;
  const date = new Date(`${dateString}T23:59:59`);
  return !Number.isNaN(date.getTime());
}

export function formatClosingDate(dateString?: string): string {
  if (!isValidDate(dateString)) return "";
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
