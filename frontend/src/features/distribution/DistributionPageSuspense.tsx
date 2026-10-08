import { lazy, Suspense } from "react";
import { DistributionPageSkeleton } from "./DistributionPageSkeleton";

const DistributionPage = lazy(() =>
  import("./DistributionPage").then((module) => ({ default: module.DistributionPage })),
);

export function DistributionPageSuspense() {
  return (
    <Suspense fallback={<DistributionPageSkeleton />}>
      <DistributionPage />
    </Suspense>
  );
}
