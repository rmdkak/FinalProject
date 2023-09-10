import { Link } from "react-router-dom";

import { ADMIN_ID } from "api/supabase";
import { type MypageInfo } from "pages";

interface Props {
  mypageInfoArray: MypageInfo[];
  adminCheck: string;
}

const BR_STYLE = "absolute w-[1px] h-[40px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]";

export const MyActiveCountBox = ({ mypageInfoArray, adminCheck }: Props) => {
  return (
    <div className="flex items-start border border-gray05 rounded-[12px]">
      {mypageInfoArray.map((mypageInfo) => {
        if (mypageInfo.title === "문의&신고" && adminCheck === ADMIN_ID) {
          return (
            <Link
              to={"/adminpage"}
              key={mypageInfo.title}
              className="relative flex-column contents-center h-full w-[206px] gap-[24px]"
            >
              <div className="gap-3 flex-column contents-center">
                <mypageInfo.icon className="w-6 h-6" />
                <p className="text-[16px] font-normal leading-[150%]">관리자 페이지</p>
              </div>
              <div className={BR_STYLE}></div>
              <p className="text-[24px] font-medium leading-[145%]">이동</p>
            </Link>
          );
        }

        return (
          <Link
            to={mypageInfo.link}
            key={mypageInfo.title}
            className="relative flex-column contents-center h-full w-[206px] gap-[24px]"
          >
            <div className="gap-3 flex-column contents-center">
              <mypageInfo.icon className="w-6 h-6" />
              <p className="text-[16px] font-normal leading-[150%]">{mypageInfo.title}</p>
            </div>
            <div className={BR_STYLE}></div>
            <p className="text-[24px] font-medium leading-[145%]">
              {mypageInfo.data === undefined ? 0 : mypageInfo.data.length}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
