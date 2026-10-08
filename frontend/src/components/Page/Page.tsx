import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";

interface PageProps {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

/** Every screen: full width of the main column, same header, same inset. */
export function Page({ title, description, actions, children }: PageProps) {
  return (
    <main className="flex w-full min-w-0 flex-col gap-3 px-3 py-3 md:px-4">
      <PageHeader title={title} description={description} actions={actions} />
      {children}
    </main>
  );
}
