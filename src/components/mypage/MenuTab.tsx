import { useState, Fragment } from "react";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { FaGripLinesVertical } from "react-icons/fa";
import { RxBookmark, RxPencil2 } from "react-icons/rx";

import { MyBookmarks, MyComments, MyInfo, MyPosts } from "components/mypage";
import { useMypage } from "hooks";
import { type Tables } from "types/supabase";

const LI_COMMON_STYLE = "flex flex-col items-center gap-[16px] w-[146px] cursor-pointer";
const LI_SELECT_STYLE = "text-gray-400";

export const MenuTab = () => {
  const [currentTab, clickTab] = useState(0);

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  const { userPostsResponse, userCommentsResponse, userBookmarksResponse } = useMypage();

  const menuArray = [
    {
      name: "내가 쓴 글",
      icon: <RxPencil2 className="text-[25px]" />,
      component: <MyPosts userMyPostsData={userPostsResponse.data as Array<Tables<"POSTS", "Row">>} />,
      data: userPostsResponse.data,
    },
    {
      name: "내가 쓴 댓글",
      icon: <AiOutlineComment className="text-[25px]" />,
      component: <MyComments userMyCommentsData={userCommentsResponse.data as Array<Tables<"COMMENTS", "Row">>} />,
      data: userCommentsResponse.data,
    },
    {
      name: "북마크",
      icon: <RxBookmark className="text-[25px]" />,
      component: (
        <MyBookmarks userMyBookmarkData={userBookmarksResponse.data as Array<Tables<"ITEM-BOOKMARK", "Row">>} />
      ),
      data: userBookmarksResponse.data,
    },
    {
      name: "내 정보",
      icon: <AiOutlineUser className="text-[25px]" />,
      component: <MyInfo />,
    },
  ];

  const menuTab = menuArray.map((el, index) => (
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
    <div className="flex flex-col items-center m-5 w-[647px]">
      <ul className="flex px-6 m-5">{menuTab}</ul>
      <div className="w-full m-5">{menuArray[currentTab].component}</div>
    </div>
  );
};
