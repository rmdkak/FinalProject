export const Post = () => {
  return (
    <div className="w-[1280px] mx-auto mt-[40px]">
      <div className="flex flex-col items-center">
        <p className="font-bold text-[30px]">커뮤니티</p>
        <p className="text-[#888888]">서브 텍스트입니다. 서브 텍스트입니다.</p>
        <div className="w-full border-b-2 border-[#1A1A1A]"></div>
      </div>
      <form className="flex flex-col items-center justify-center">
        <div className="flex w-full border-b-2 border-[#E5E5E5] h-[72px] justify-center items-center">
          <label htmlFor="title" className="w-[40px] text-[18px] font-[400]">
            제목
          </label>
          <input id="title" className="w-full text-[24px] px-[24px] py-[12px] focus:outline-none" />
        </div>

        <div className="w-[1280px]  h-[49px] mt-[24px] bg-[#a7a7a7] border-[2px] border-[#000]"></div>
        <textarea
          placeholder="textarea"
          className="w-[1280px] h-[449px] border-[2px] border-[#000] focus:outline-none"
        />

        <div className="flex w-full border-b-2 border-[#E5E5E5] h-[72px] justify-center items-center">
          <label htmlFor="img" className="w-[128px] text-[18px] font-[400]">
            파일첨부
          </label>
          <input id="img" type="file" className="w-full text-[24px] px-[24px] py-[12px] focus:outline-none" />
        </div>
        <div className="flex self-end gap-[24px] mt-[40px]">
          <button className="bg-[#888888] w-[112px] h-[48px] px-[24px]">이전으로</button>
          <button className="bg-[#5D5D5D] w-[112px] h-[48px] px-[24px]">글쓰기</button>
        </div>
      </form>
    </div>
  );
};
