import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import close from "assets/close.svg";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: Props): JSX.Element => {
  const closeSideBarHandler = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <dialog className=" fixed top-0 box-border py-8 px-20 right-0 mr-0 z-10 h-full w-[25rem]" open={isOpen}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-title text-[1.25em]">STILE</h2>
          <button onClick={closeSideBarHandler} className="flex items-center justify-center">
            <img src={close} alt="닫기버튼" className="w-full h-full" />
          </button>
        </div>

        {/* 로그인 토글 */}
        {/* 로그인 되어있을시 => 부터 만드세요 :D  */}
        <div className="pb-3 border-b border-[#000] mb-8">
          <ul className="flex text-[0.75rem] font-[#1a1a1a] ">
            <li className="mr-4 cursor-pointer text-[#1a1a1a]">
              <Link onClick={closeSideBarHandler} to="/login">
                로그인
              </Link>
            </li>
            <li className="cursor-pointer text-[#1a1a1a]">
              <Link onClick={closeSideBarHandler} to="/signup">
                회원가입
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li className="mb-4 cursor-pointer text-[#1a1a1a]">
              <Link onClick={closeSideBarHandler} to="/service">
                인테리어 조합
              </Link>
            </li>
            <li className="mb-4 cursor-pointer text-[#1a1a1a] ">
              <Link onClick={closeSideBarHandler} to="/community">
                커뮤니티
              </Link>
            </li>
            <li className="mb-4 cursor-pointer text-[#1a1a1a] ">
              <Link onClick={closeSideBarHandler} to="/mypage">
                마이페이지
              </Link>
            </li>
            <li className="cursor-pointer ">
              <Link onClick={closeSideBarHandler} to="??">
                브랜드 소개
              </Link>
            </li>
          </ul>
        </div>
      </dialog>
      {isOpen && <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-[#00000040] z-[1]"></div>}
    </>
  );
};

export default React.memo(Sidebar);
