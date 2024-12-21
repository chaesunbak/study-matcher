const SkeletonGroupDetailHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="size-12 rounded-md bg-gray-300 transition-all" />
        <div className="flex flex-col items-start justify-between gap-2">
          <div className="h-4 w-32 rounded-md bg-gray-300" />
          <div className="flex items-center gap-2 text-sm font-normal">
            <div className="h-4 w-12 rounded-md bg-gray-300" />
            <div className="h-4 w-24 rounded-md bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="h-64 w-full rounded-md bg-gray-300" />
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-6 w-20 rounded-md bg-gray-300" />
        <div className="h-6 w-20 rounded-md bg-gray-300" />
        <div className="h-6 w-20 rounded-md bg-gray-300" />
      </div>
      <div className="h-11 w-full rounded-lg bg-gray-300" />
    </div>
  );
};

export default SkeletonGroupDetailHeader;
