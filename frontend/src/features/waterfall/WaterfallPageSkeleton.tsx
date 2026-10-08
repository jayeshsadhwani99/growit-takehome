import { SkeletonBlock } from "@/components/Skeleton";

export function WaterfallPageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 px-3 py-3 md:px-4" aria-busy="true">
      <span className="sr-only">Loading waterfall</span>
      <SkeletonBlock className="h-6 w-28" />
      <SkeletonBlock className="h-3 w-80 max-w-full" />
      <SkeletonBlock className="h-16 rounded-lg" />
      <SkeletonBlock className="h-24 rounded-lg" />
      <SkeletonBlock className="h-24 rounded-lg" />
    </div>
  );
}
