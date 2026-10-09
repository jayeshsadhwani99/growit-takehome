import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-border pb-2.5 flex-wrap">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold leading-tight">{title}</h1>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
