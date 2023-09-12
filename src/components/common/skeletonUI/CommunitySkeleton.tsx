export const CommunitySkeleton = () => {
  const flickingArr = Array.from({ length: 3 });
  const postListArr = Array.from({ length: 8 });

  const flickingSkeleton = (
    <>
      {flickingArr.map((_, idx) => (
        <div key={idx} className="w-[400px] lg:!w-[260px] md:!w-[260px] sm:!w-[260px] flex-column mr-7">
          <div className="sm:w-[260px] sm:h-[260px] md:w-[260px] md:h-[260px] w-[400px] rounded-lg h-[400px] object-cover skeleton-effect" />
          <div className="gap-2 mt-3 flex-column">
            <div className="flex justify-between h-12">
              <div className="w-1/2 rounded-lg skeleton-effect"></div>
              <div className="flex justify-end">
                <div className="relative w-[48px] h-[48px] left-[24px] sm:w-8 sm:h-8 md:w-8 md:h-8 rounded-full border skeleton-effect" />
                <div className="relative w-[48px] h-[48px] left-[12px] sm:w-8 sm:h-8 md:w-8 md:h-8 rounded-full border skeleton-effect" />
                <div className="relative w-[48px] h-[48px] sm:w-8 sm:h-8 md:w-8 md:h-8 rounded-full border skeleton-effect" />
              </div>
            </div>
            <div className="rounded-lg h-[46px] skeleton-effect"></div>
          </div>
        </div>
      ))}
    </>
  );

  const postListSkeleton = (
    <>
      {postListArr.map((_, idx) => (
        <div key={idx} className="flex justify-between gap-4 py-8 ml-3 border-b border-gray-200">
          <div className="max-w-[550px] min-w-0 w-full flex-column justify-between">
            <div className="gap-4 flex-column">
              <div className="skeleton-effect h-[20px] rounded" />
              <div className="skeleton-effect h-[70px] rounded" />
            </div>
            <div className="skeleton-effect h-[20px] rounded" />
          </div>
          <div className="flex items-center justify-end gap-4">
            <div className="h-[124px] w-[124px] rounded-lg object-cover skeleton-effect" />
            <div>
              <div className="w-12 h-12 rounded-full relative top-[10px] skeleton-effect" />
              <div className="relative w-12 h-12 rounded-full skeleton-effect" />
              <div className="w-12 h-12 rounded-full relative bottom-[10px] skeleton-effect" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
  return { flickingSkeleton, postListSkeleton };
};
