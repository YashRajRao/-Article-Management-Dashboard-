import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <Skeleton className="h-10 w-[250px]" />
      </div>
      <div className="space-y-4">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="flex flex-wrap gap-4 py-3">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[40px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-8 w-[60px] ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}