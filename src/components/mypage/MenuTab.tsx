import { useState } from "react";

import { MyBookmarks, MyComments, MyInfo, MyPosts } from "components/mypage";
import { type Tables } from "types/supabase";

// 임시 데이터 length 작동 확인용
const getMyPosts: Array<Tables<"POSTS">> = [
  {
    bookmark: 0,
    title: "Hi",
    content: "hi",
    created_at: "작성 날짜",
    id: "uuid",
    tileId: "uuid",
    wallpaperId: "uuid",
    nickname: "김진수",
  },
];

// 임시 데이터 length 작동 확인용
const getMyComments: Array<Tables<"COMMENTS">> = [
  { content: "string", created_at: "string", id: "string", postId: "string", writtenId: "string" },
  { content: "string", created_at: "string", id: "string", postId: "string", writtenId: "string" },
];

// 임시 데이터 length 작동 확인용
const getMyBookmarks: Array<Tables<"ITEM-BOOKMARK">> = [
  { id: "string", tileId: "string", userId: "string", wallpaperId: "string" },
  { id: "string", tileId: "string", userId: "string", wallpaperId: "string" },
  { id: "string", tileId: "string", userId: "string", wallpaperId: "string" },
  { id: "string", tileId: "string", userId: "string", wallpaperId: "string" },
  { id: "string", tileId: "string", userId: "string", wallpaperId: "string" },
];

export const MenuTab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArray = [
    { name: "내가 쓴 글", icon: { svg: "", alt: "내가 쓴 글" }, component: <MyPosts />, data: getMyPosts },
    { name: "내가 쓴 댓글", icon: { svg: "", alt: "내가 쓴 댓글" }, component: <MyComments />, data: getMyComments },
    { name: "북마크", icon: { svg: "", alt: "북마크" }, component: <MyBookmarks />, data: getMyBookmarks },
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
        key={index}
        className={index === currentTab ? `${liCommonStyle} ${liSelectStyle}` : liCommonStyle}
        onClick={() => {
          selectMenuHandler(index);
        }}
      >
        {/* 아이콘 24px 정사각형 */}
        <img src={el.icon.svg} alt={el.icon.alt} />
        <p className="text-[18px] font-[400] leading-[130%]">{el.name}</p>
        {el.name === "내 정보" ? <></> : <p className="text-[20px] font-[500] leading-[130%]">{el.data?.length}</p>}
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
