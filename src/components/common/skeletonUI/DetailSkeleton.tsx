export const DetailSkeleton = () => {
  const detailContents = (
    <>
      <div className="contents-between border-b border-gray06 my-[10px] py-[20px] items-center">
        <div className="w-[1000px] my-[10px]">
          <div className="h-[22px] skeleton-effect rounded" />
          <div className="h-[22px] skeleton-effect my-[10px] rounded" />
        </div>

        <div className="flex gap-4">
          <div>
            <div className="w-16 h-16 border rounded-full bg-gray06 border-gray05 skeleton-effect" />
            <p className="text-[14px] text-center">좌측벽지</p>
          </div>
          <div>
            <div className="w-16 h-16 border rounded-full bg-gray06 border-gray05 skeleton-effect" />
            <p className="text-[14px] text-center">우측벽지</p>
          </div>
          <div>
            <div className="w-16 h-16 border rounded-full bg-gray06 border-gray05 skeleton-effect" />
            <p className="text-[14px] text-center">바닥재</p>
          </div>
        </div>
      </div>
      <div className="flex-column gap-5 my-[60px] w-[640px] border-b border-gray06">
        <div className="h-[640px] skeleton-effect rounded-[8px]" />
        <div className="h-[22px] skeleton-effect rounded" />
      </div>
    </>
  );

  return { detailContents };
};
