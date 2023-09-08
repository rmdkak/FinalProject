import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "api/supabase";
import close from "assets/svgs/close.svg";
import { useDialog } from "components/common";
import { useAuthStore } from "store";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpen, setIsOpen }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { currentSession, setStayLoggedInStatus } = useAuthStore();
  const { Alert } = useDialog();

  // 로그아웃
  const logoutHandler = async () => {
    closeSideBarHandler();
    navigate("/");
    try {
      await logout();
      setStayLoggedInStatus(false);
      await Alert("로그아웃 되었습니다.");
    } catch (error) {
      await Alert("로그아웃 실패");
      console.error(error);
    }
  };

  const closeSideBarHandler = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <dialog className=" fixed z-[9110] top-0 box-border py-8 px-10 right-0 mr-0  h-full w-80" open={isOpen}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-title text-[1.25em]">STILE</h2>
          <button onClick={closeSideBarHandler} className="flex contents-center">
            <img src={close} alt="닫기버튼" className="w-full h-full" />
          </button>
        </div>

        {/* 로그인 토글 */}
        <div className="pb-3 mb-8 border-b border-black">
          <ul className="flex gap-4 text-black body-3">
            {currentSession === null ? (
              <>
                <li>
                  <Link onClick={closeSideBarHandler} to="/login">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideBarHandler} to="/signup">
                    회원가입
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={closeSideBarHandler} to={"/mypage"}>
                    마이페이지
                  </Link>
                </li>
                <li>
                  <Link onClick={logoutHandler} to={"/"}>
                    로그아웃
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <ul className="gap-4 text-black flex-column body-1">
            <li className="duration-500 text-gray03 hover:text-black">
              <Link onClick={closeSideBarHandler} to="/interior-preview">
                인테리어 조합
              </Link>
            </li>
            <li className="duration-500 text-gray03 hover:text-black">
              <Link onClick={closeSideBarHandler} to="/community">
                커뮤니티
              </Link>
            </li>
            <li className="duration-500 text-gray03 hover:text-black">
              <Link onClick={closeSideBarHandler} to="/">
                1:1문의하기
              </Link>
            </li>
          </ul>
        </div>
      </dialog>
      {isOpen && (
        <div
          onClick={closeSideBarHandler}
          className="fixed z-[9105] top-0 bottom-0 left-0 right-0 w-full h-full bg-[#00000080] backdrop-blur-sm"
        ></div>
      )}
    </>
  );
};
