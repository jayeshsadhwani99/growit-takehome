import { SkeletonBlock } from "@/components/Skeleton";

export function DistributionPageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 px-3 py-3 md:px-4" aria-busy="true">
      <span className="sr-only">Loading distribution</span>
      <SkeletonBlock className="h-6 w-40" />
      <SkeletonBlock className="h-3 w-72 max-w-full" />
      <SkeletonBlock className="h-36 rounded-lg" />
    </div>
  );
}
