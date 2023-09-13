import { Link } from "react-router-dom";

import { ADMIN_ID } from "api/supabase/supabaseClient";
import { type MypageInfo } from "pages";

interface Props {
  mypageInfoArray: MypageInfo[];
  adminCheck: string;
}

const BR_STYLE = "absolute w-px h-10 bg-gray06 -left-px top-1/2 -translate-y-1/2";

export const MyActiveCountBox = ({ mypageInfoArray, adminCheck }: Props) => {
  return (
    <div className="flex w-[80%] sm:w-[88%] h-[200px] items-start py-3 border border-gray05 rounded-xl sm:h-full">
      {mypageInfoArray.map((mypageInfo) => {
        if (mypageInfo.title === "문의&신고" && adminCheck === ADMIN_ID) {
          return (
            <Link
              to={"/adminpage"}
              key={mypageInfo.title}
              className="relative w-[206px] h-full gap-6 flex-column contents-center"
            >
              <div className="gap-3 flex-column contents-center">
                <mypageInfo.icon className="w-6 h-6" />
                <p className="text-center break-keep body-2 sm:body-4 sm:w-8 sm:h-8">관리자 페이지</p>
              </div>
              <div className={BR_STYLE}></div>
              <p className="title-4 sm:body-2">이동</p>
            </Link>
          );
        }

        return (
          <Link
            to={mypageInfo.link}
            key={mypageInfo.title}
            className="relative w-[206px] h-full gap-6 flex-column contents-center"
          >
            <div className="gap-3 flex-column contents-center">
              <mypageInfo.icon className="w-6 h-6" />
              <p className="text-center break-keep body-2 sm:body-4 sm:w-8 sm:h-8">{mypageInfo.title}</p>
            </div>
            <div className={BR_STYLE}></div>
            <p className="title-4 sm:body-2">{mypageInfo.data === undefined ? 0 : mypageInfo.data.length}</p>
          </Link>
        );
      })}
    </div>
  );
};
