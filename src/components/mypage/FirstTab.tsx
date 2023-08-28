import { useState, Fragment } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { FaGripLinesVertical } from "react-icons/fa";
import { RxPencil2 } from "react-icons/rx";

import { useMypage } from "hooks";
import { type Tables } from "types/supabase";

import { LI_COMMON_STYLE, LI_SELECT_STYLE } from "./MenuTab";
import { MyComments } from "./MyComments";
import { MyPosts } from "./MyPosts";

export const FirstTab = () => {
  const [currentTab, clickTab] = useState(0);

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  const { userPostsResponse, userCommentsResponse } = useMypage();

  const firstTabArray = [
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
  ];

  const firstMenuTab = firstTabArray.map((el, index) => (
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
      <ul className="flex px-6">{firstMenuTab}</ul>
      <div className="w-full">{firstTabArray[currentTab].component}</div>
    </div>
  );
};
