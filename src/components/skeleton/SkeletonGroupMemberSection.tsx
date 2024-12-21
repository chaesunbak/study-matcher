const SkeletonGroupMemberSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="h-6 w-24 rounded-md bg-gray-300" />
        <div className="h-6 w-16 rounded-md bg-gray-300" />
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-12 rounded-full bg-gray-300 transition-all" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-10 rounded-md bg-gray-300" />
              <div className="h-4 w-32 rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonGroupMemberSection;
