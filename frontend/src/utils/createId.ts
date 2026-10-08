/**
 * `crypto.randomUUID` only exists in a secure context. Opening the dev server
 * by its LAN address is plain HTTP, so fall back rather than crash the form.
 */
export function createId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
