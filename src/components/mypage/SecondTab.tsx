import { useState, Fragment } from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import { RxBookmark } from "react-icons/rx";

import { useMypage } from "hooks";
import { type Tables } from "types/supabase";

import { LI_COMMON_STYLE, LI_SELECT_STYLE } from "./MenuTab";
import { MyBookmarks } from "./MyBookmarks";

export const SecondTab = () => {
  const [currentTab, clickTab] = useState(0);

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  const { userBookmarksResponse } = useMypage();

  const secondTabArray = [
    {
      name: "인테리어 북마크",
      icon: <RxBookmark className="text-[25px]" />,
      component: (
        <MyBookmarks userMyBookmarkData={userBookmarksResponse.data as Array<Tables<"ITEM-BOOKMARK", "Row">>} />
      ),
      data: userBookmarksResponse.data,
    },
    {
      name: "게시글 북마크",
      icon: <RxBookmark className="text-[25px]" />,
      component: (
        <MyBookmarks userMyBookmarkData={userBookmarksResponse.data as Array<Tables<"ITEM-BOOKMARK", "Row">>} />
      ),
      data: userBookmarksResponse.data,
    },
  ];

  const secondMenuTab = secondTabArray.map((el, index) => (
    <Fragment key={el.name}>
      {index !== 0 && <FaGripLinesVertical className="w-[24px] self-center text-center" />}
      <li
        key={el.name}
        className={index === currentTab ? `${LI_COMMON_STYLE} ${LI_SELECT_STYLE}` : LI_COMMON_STYLE}
        onClick={() => {
          selectMenuHandler(index);
        }}
      >
        {el.icon}
        <p className="text-[18px] font-[400] leading-[130%]">{el.name}</p>
        {el.name === "내 정보" ? (
          <p className="text-[20px] font-[500] leading-[130%]">수정</p>
        ) : (
          <p className="text-[20px] font-[500] leading-[130%]">{el.data?.length}</p>
        )}
      </li>
    </Fragment>
  ));

  return (
    <div className="flex flex-col items-center mt-8 w-[647px]">
      <ul className="flex px-6">{secondMenuTab}</ul>
      <div className="w-full">{secondTabArray[currentTab].component}</div>
    </div>
  );
};
