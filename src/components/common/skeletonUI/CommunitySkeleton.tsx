export const CommunitySkeleton = () => {
  const flickingArr = Array.from({ length: 3 });
  const postListArr = Array.from({ length: 8 });

  const flickingSkeleton = (
    <>
      {flickingArr.map((_, idx) => (
        <div key={idx} className="w-[400px] flex-column mr-10 cursor-pointer">
          <div>
            <div className="rounded-[8px] w-full h-[400px] object-cover skeleton-effect" />
          </div>
          <div className="w-full gap-2 mt-3 flex-column">
            <div className="flex h-12">
              <div className="w-1/2 truncate rounded-lg skeleton-effect"></div>
              <div className="inline-flex w-1/2">
                <div className="relative w-[48px] h-[48px] left-[76px] rounded-full border skeleton-effect" />
                <div className="relative w-[48px] h-[48px] left-[66px] rounded-full border skeleton-effect" />
                <div className="relative w-[48px] h-[48px] left-[56px] rounded-full border skeleton-effect" />
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
          <div className="flex-column w-[1028px] gap-8 justify-center">
            <div className="gap-5 flex-column">
              <div className="skeleton-effect h-[20px] rounded" />
              <div className="skeleton-effect h-[52px] rounded" />
              <div className="skeleton-effect h-[15px] rounded" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <div className="h-[124px] w-[124px] rounded-[8px] object-cover skeleton-effect" />
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
