const SkeletonGroupSummary = () => {
  return (
    <div className="flex items-center gap-4 transition-all">
      <div>
        <div className="size-20 rounded-xl bg-gray-200 transition-all md:size-24 md:rounded-2xl" />
      </div>
      <div className="flex h-full flex-col items-start justify-between gap-2">
        <div className="h-6 w-48 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-80 rounded bg-gray-200" />
        <div className="flex items-center gap-2 text-sm font-thin text-gray-500">
          <div className="h-4 w-10 rounded bg-gray-200" />
          <div className="h-4 w-10 rounded bg-gray-200" />
          <div className="h-4 w-10 rounded bg-gray-200" />
          <div className="h-4 w-10 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonGroupSummary;
