import { useState } from "react";

import { MyBookmarks, MyComments, MyInfo, MyPosts } from "components/mypage";

export const MenuTab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArray = [
    { name: "내가 쓴 글", icon: { svg: "", alt: "내가 쓴 글" }, component: <MyPosts />, data: [] },
    { name: "내가 쓴 댓글", icon: { svg: "", alt: "내가 쓴 댓글" }, component: <MyComments />, data: [] },
    { name: "북마크", icon: { svg: "", alt: "북마크" }, component: <MyBookmarks />, data: [] },
    { name: "내 정보", icon: { svg: "", alt: "내 정보" }, component: <MyInfo /> },
  ];

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  const liCommonStyle = "flex flex-col items-center gap-[16px] w-[146px]";
  const liSelectStyle = "text-gray-400";
  const menuTab = menuArray.map((el, index) => (
    <>
      {/* 이미지 파일 변경 예정 */}
      {index !== 0 && <p className="w-[21px] self-center text-center">|</p>}
      <li
        key={el.name}
        className={index === currentTab ? `${liCommonStyle} ${liSelectStyle}` : liCommonStyle}
        onClick={() => {
          selectMenuHandler(index);
        }}
      >
        {/* 아이콘 24px 정사각형 */}
        <img src={el.icon.svg} alt={el.icon.alt} />
        <p className="text-[18px] font-[400] leading-[130%]">{el.name}</p>
        {el.name === "내 정보" ? (
          <p className="text-[20px] font-[500] leading-[130%]">수정</p>
        ) : (
          <p className="text-[20px] font-[500] leading-[130%]">{el.data?.length}</p>
        )}
      </li>
    </>
  ));

  return (
    <div className="flex flex-col items-center m-5 w-[647px]">
      <ul className="flex px-6 m-5">{menuTab}</ul>
      <div className="w-full m-5">{menuArray[currentTab].component}</div>
    </div>
  );
};
