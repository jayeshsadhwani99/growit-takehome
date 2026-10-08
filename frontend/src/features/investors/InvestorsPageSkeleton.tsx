import { SkeletonBlock } from "@/components/Skeleton";

export function InvestorsPageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 px-3 py-3 md:px-4" aria-busy="true">
      <span className="sr-only">Loading investors</span>
      <SkeletonBlock className="h-6 w-28" />
      <SkeletonBlock className="h-3 w-72 max-w-full" />
      <SkeletonBlock className="h-40 rounded-lg" />
    </div>
  );
}
