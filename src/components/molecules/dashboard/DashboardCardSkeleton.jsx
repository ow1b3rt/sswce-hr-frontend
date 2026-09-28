const DashboardCardSkeleton = ({ rows = 3 }) => {
  return (
    <div className="flex h-full max-w-120 flex-col gap-4 rounded-lg border bg-white px-4 py-3 shadow-md">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-16 w-16 animate-pulse rounded-xl bg-gray-200" />

          <div className="flex items-center gap-2">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-8 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="flex max-h-48 flex-col gap-4 overflow-hidden rounded-lg">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border p-2">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCardSkeleton;
