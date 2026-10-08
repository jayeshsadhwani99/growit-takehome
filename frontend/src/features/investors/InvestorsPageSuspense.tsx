import { lazy, Suspense } from "react";
import { InvestorsPageSkeleton } from "./InvestorsPageSkeleton";

const InvestorsPage = lazy(() =>
  import("./InvestorsPage").then((module) => ({ default: module.InvestorsPage })),
);

export function InvestorsPageSuspense() {
  return (
    <Suspense fallback={<InvestorsPageSkeleton />}>
      <InvestorsPage />
    </Suspense>
  );
}
