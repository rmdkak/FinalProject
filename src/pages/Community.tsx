import { AutoPlay, Pagination } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Toolbar } from "components/sidebar";
import { useMovePage, usePostsData } from "hooks";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/pagination.css";

const plugins = [
  new AutoPlay({ animationDuration: 3000, direction: "NEXT", stopOnHover: true }),
  new Pagination({ type: "bullet" }),
];

export const Community = () => {
  const { setCurrentPathname } = useMovePage();
  setCurrentPathname();
  const { CommunityPostsForm, ShowBestPostElements, showPageComponent, SearchBar } = usePostsData();

  return (
    <>
      <div className="w-full max-w-[1280px] min-w-[360px] gap-10 mx-auto mt-20 pl-6 flex-column">
        <div className="text-center border-b border-gray-400 drop-shadow-xl">
          <p className="text-[32px] pb-6 font-medium">커뮤니티</p>
        </div>
        <div className="gap-4 flex-column">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[20px] font-medium">BEST CONTENTS</p>
            <p className="text-gray01">현재 가장 인기있는 글을 먼저 만나보세요!</p>
          </div>
          {/* 슬라이더 영역 */}
          <Flicking align={"prev"} circular={true} panelsPerView={3} moveType={"strict"} plugins={plugins}>
            {ShowBestPostElements({ dataLength: 5 })}
            <ViewportSlot>
              <div className="flicking-pagination"></div>
            </ViewportSlot>
          </Flicking>
        </div>
      </div>
      <div className="w-full max-w-[1280px] min-w-[312px] px-6 mx-auto flex-column mb-10">
        {/* 게시물 영역 */}
        <CommunityPostsForm />
        {/* 유틸리티 영역 */}
        <div className="flex justify-end py-[30px] w-full">
          <SearchBar />
        </div>
        <div className="flex justify-center">{showPageComponent}</div>
        <Toolbar />
      </div>
    </>
  );
};
