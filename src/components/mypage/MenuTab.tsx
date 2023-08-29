import { useState, Fragment } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaGripLinesVertical } from "react-icons/fa";
import { RxBookmark, RxPencil2 } from "react-icons/rx";

import { MyInfo } from "components";

import { FirstTab } from "./FirstTab";
import { SecondTab } from "./SecondTab";

export const LI_COMMON_STYLE = "flex flex-col items-center gap-[16px] w-[146px] cursor-pointer";
export const LI_SELECT_STYLE = "text-gray-400";

export const MenuTab = () => {
  const [currentTab, clickTab] = useState(0);

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  const menuArray = [
    { name: "내가 쓴 글", icon: <RxPencil2 className="text-[25px]" />, component: <FirstTab /> },
    { name: "북마크", icon: <RxBookmark className="text-[25px]" />, component: <SecondTab /> },
    { name: "내 정보", icon: <AiOutlineUser className="text-[25px]" />, component: <MyInfo /> },
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
      </li>
    </Fragment>
  ));

  return (
    <div className="flex flex-col items-center m-5 w-[647px]">
      <ul className="flex px-6">{menuTab}</ul>
      <div className="w-full">{menuArray[currentTab].component}</div>
    </div>
  );
};
