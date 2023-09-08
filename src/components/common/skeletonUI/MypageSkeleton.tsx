import { Fragment } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { RxBookmark, RxPencil2 } from "react-icons/rx";

import viewMore from "assets/svgs/viewMore.svg";
import { MypageTitle } from "components";

const BR_STYLE = "absolute w-[1px] h-[40px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]";
const ICON_SIZE = "w-6 h-6";
export const MypageSkeleton = () => {
  const iconArr = [
    { icon: <RxPencil2 className={ICON_SIZE} />, title: "내가 쓴 글" },
    { icon: <BiCommentDetail className={ICON_SIZE} />, title: "내가 쓴 댓글" },
    { icon: <RxBookmark className={ICON_SIZE} />, title: "북마크" },
    { icon: <AiOutlineHeart className={ICON_SIZE} />, title: "좋아요" },
  ];

  return (
    <div className="flex-column items-center m-[60px] w-[1280px] h-[2000px] mx-auto">
      <MypageTitle />
      <div className="flex gap-6 mt-8">
        <div className="relative flex-column contents-center gap-4 w-[240px] h-[200px] rounded-[12px] border border-gray05">
          <div className="w-[60px] h-[60px] rounded-full text-center justify-center skeleton-effect" />
          <div className="gap-2 flex-column contents-center">
            <p className="w-10 h-[18px] skeleton-effect rounded-lg"></p>
            <button className="border px-2 py-1 border-gray05 rounded-lg text-[12px] font-normal leading-[150%]">
              회원정보수정
            </button>
          </div>
        </div>
        <div className="flex items-start border border-gray05 rounded-[12px]">
          {iconArr.map((el) => (
            <div key={el.title} className="relative flex-column contents-center h-full w-[254px] gap-6">
              <div className="gap-3 flex-column contents-center">
                {el.icon}
                <p className="text-[16px] font-normal leading-[150%]">{el.title}</p>
              </div>
              <div className={BR_STYLE} />
              <div className="w-4 h-8 rounded-lg skeleton-effect" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-column w-[1280px]">
        <div className="flex-column">
          {iconArr.map((el, index) => {
            return (
              <Fragment key={index}>
                <div className="flex items-center justify-between border-b border-black pb-6 mt-[80px]">
                  <p className="text-[18px] font-normal leading-[150%]">{el.title}</p>
                  <button className="flex contents-center gap-[12px] body-4 text-gray02">
                    VIEW MORE
                    <img src={viewMore} className="w-6 h-6" />
                  </button>
                </div>
                <ul className="flex-column h-[130px]">
                  <li key={`${el.title}1`} className="w-full h-[64px] flex justify-between items-center px-6">
                    <div className="w-[200px] h-[14px] skeleton-effect"></div>
                    <div className="w-[56px] h-[14px] skeleton-effect" />
                  </li>
                  <li key={`${el.title}2`} className="w-full h-[64px] flex justify-between items-center px-6">
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
