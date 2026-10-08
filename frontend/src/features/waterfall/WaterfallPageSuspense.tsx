import { lazy, Suspense } from "react";
import { WaterfallPageSkeleton } from "./WaterfallPageSkeleton";

const WaterfallPage = lazy(() =>
  import("./WaterfallPage").then((module) => ({ default: module.WaterfallPage })),
);

export function WaterfallPageSuspense() {
  return (
    <Suspense fallback={<WaterfallPageSkeleton />}>
      <WaterfallPage />
    </Suspense>
  );
}
