export const DetailSkeleton = () => {
  return (
    <div className="w-[1280px] mx-auto mt-[30px]">
      <div className="items-center flex-column">
        <p className="font-medium text-[32px]">커뮤니티</p>
        <div className="w-full border-b border-black mt-[40px]"></div>
      </div>
      <div className="contents-between border-b border-gray06 my-[10px] py-[25px] items-center">
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
      <div className="flex-column gap-5 my-[60px] w-[640px] border-b border-gray06 mt-[30px] mb-[40px]">
        <div className="h-[640px] skeleton-effect rounded-[8px]" />
        <div className="h-[22px] skeleton-effect rounded" />
      </div>
    </div>
  );
};
