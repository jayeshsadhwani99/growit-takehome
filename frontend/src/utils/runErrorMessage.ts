/** The stub throws "not implemented"; show that as a sentence under the form. */
export function runErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message === "not implemented") {
    return "The distribution engine is not implemented yet.";
  }
  if (error instanceof Error && error.message.trim() !== "") return error.message;
  return "Could not run this distribution.";
}
