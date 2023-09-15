export const DetailSkeleton = () => {
  return (
    <div className="w-full max-w-[1280px] min-w-[360px] mx-auto mt-6 lg:px-6 md:px-6 sm:px-6">
      <div className="items-center border-b border-black flex-column sm:hidden">
        <p className="font-medium text-[32px] mb-5">커뮤니티</p>
      </div>
      <div className="items-center px-3 py-10 border-b sm:flex-column sm:items-start sm:gap-8 contents-between border-gray06">
        <div className="w-[70%] sm:w-full">
          <div className="h-[120px] skeleton-effect rounded" />
        </div>

        <div className="flex gap-3">
          <div>
            <div className="w-16 h-16 border rounded-full sm:w-12 sm:h-12 border-gray05 skeleton-effect" />
            <p className="sm:text-[12px] text-[14px] text-center">좌측벽지</p>
          </div>
          <div>
            <div className="w-16 h-16 border rounded-full sm:w-12 sm:h-12 border-gray05 skeleton-effect" />
            <p className="sm:text-[12px] text-[14px] text-center">우측벽지</p>
          </div>
          <div>
            <div className="w-16 h-16 border rounded-full sm:w-12 sm:h-12 border-gray05 skeleton-effect" />
            <p className="sm:text-[12px] text-[14px] text-center">바닥재</p>
          </div>
        </div>
      </div>
      <div className="flex-column gap-5 my-[60px] w-[640px] border-b border-gray06 mt-[30px] mb-[40px]">
        <div className="w-[500px] h-[640px] sm:w-[320px] sm:h-[320px] skeleton-effect rounded-[8px]" />
      </div>
    </div>
  );
};
