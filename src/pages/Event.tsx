import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export const Event = () => {
  return (
    <div className="flex-column w-[1280px] mx-auto my-20 ">
      <div className="border-b border-black">
        <h1 className="mb-6 text-2xl text-center">EVENT</h1>
      </div>
      <div className="gap-4 border-b flex-column border-gray05">
        <div className="gap-4 ml-6 flex-column my-9">
          <h2 className="text-lg">TITLE</h2>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <img src="" alt="userImg" className="w-6 h-6 rounded-full bg-gray01" />
              <p>user name</p>
            </div>
            <p>YYYY.MM.DD</p>
            <div className="flex gap-[2px]">
              <img src="" alt="postBookmark" />
              <p>좋아요</p>
              <p className="ml-[2px]">like count</p>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-10 py-10 border-b flex-column border-gray05">
        <img src="" alt="contentImg" className="mx-10 bg-gray05 w-[1200px] h-auto" />
        <pre className="w-full break-words whitespace-pre-wrap ">content</pre>
      </div>
      <button className="w-40 h-12 my-20 text-sm border rounded-lg border-gray05">목록</button>
      <div className="mb-20 flex-column border-t-[1px] border-gray06">
        <div className="flex gap-[10px] items-center py-6 border-b-[1px] border-gray06 hover:cursor-pointer text-sm">
          <SlArrowUp className="fill-gray02" />
          <label className="text-gray02">이전글 보기</label>
          <span className="h-[8px] border border-gray08"></span>
          <p>prevPageTitle</p>
        </div>
        <div className="flex gap-[10px] items-center py-6 border-b-[1px] border-gray06 hover:cursor-pointer text-sm">
          <SlArrowDown className="fill-gray02" />
          <label className="text-gray02">다음글 보기</label>
          <span className="h-[8px] border border-gray08"></span>
          <p>nextPageTitle</p>
        </div>
      </div>
    </div>
  );
};
