import { Fragment } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { RxBookmark, RxPencil2 } from "react-icons/rx";

import viewMore from "assets/svgs/viewMore.svg";
import { Title } from "components";
import { MYPAGE_LAYOUT_STYLE } from "pages";

const BR_STYLE = "absolute w-[1px] h-[40px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]";
const ICON_SIZE = "w-6 h-6";

export const MypageSkeleton = () => {
  const iconArr = [
    { icon: <RxPencil2 className={ICON_SIZE} />, title: "내가 쓴 글" },
    { icon: <BiCommentDetail className={ICON_SIZE} />, title: "내가 쓴 댓글" },
    { icon: <RxBookmark className={ICON_SIZE} />, title: "북마크" },
    { icon: <AiOutlineHeart className={ICON_SIZE} />, title: "좋아요" },
    { icon: <HiOutlineChatBubbleLeftRight className={ICON_SIZE} />, title: "문의&신고" },
  ];

  return (
    <div className={MYPAGE_LAYOUT_STYLE}>
      <Title title="마이페이지" isBorder={true} />
      <div className="flex w-full gap-[2.5%] mt-8 contents-center sm:flex-col sm:gap-6">
        <div className="relative flex-column contents-center gap-4 w-[17.5%] sm:w-[88%] h-[200px] px-6 bg-gray08 rounded-xl border border-gray05">
          <div className="w-[60px] h-[60px] rounded-full text-center justify-center skeleton-effect" />
          <div className="gap-2 flex-column contents-center">
            <p className="w-10 h-[18px] skeleton-effect rounded-lg" />
            <button className="px-2 py-1 border rounded-lg border-gray05 body-4">회원정보수정</button>
          </div>
        </div>
        <div className="flex w-[80%] sm:w-[88%] h-[200px] items-start py-3 border border-gray05 rounded-xl sm:h-full">
          {iconArr.map((el) => (
            <div key={el.title} className="relative w-[206px] h-full gap-6 flex-column contents-center">
              <div className="gap-3 flex-column contents-center">
                {el.icon}
                <p className="body-2 sm:body-4">{el.title}</p>
              </div>
              <div className={BR_STYLE} />
              <div className="w-4 h-8 rounded-lg skeleton-effect" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex-column">
        <div className="flex-column">
          {iconArr.map((el, index) => {
            return (
              <Fragment key={index}>
                <div className="flex items-center justify-between pb-6 mt-20 border-b border-black">
                  <p className="body-1">{el.title}</p>
                  <button className="flex gap-3 contents-center body-4 text-gray02">
                    VIEW MORE
                    <img src={viewMore} className="w-6 h-6" />
                  </button>
                </div>
                <ul className="flex-column h-60">
                  <li key={`${el.title}1`} className="flex items-center justify-between w-full h-16 px-6">
                    <div className="w-[200px] h-[14px] skeleton-effect"></div>
                    <div className="w-[56px] h-[14px] skeleton-effect" />
                  </li>
                  <li key={`${el.title}2`} className="flex items-center justify-between w-full h-16 px-6">
                    <div className="w-[200px] h-[14px] skeleton-effect"></div>
                    <div className="w-[56px] h-[14px] skeleton-effect" />
                  </li>
                </ul>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
