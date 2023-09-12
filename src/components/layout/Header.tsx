import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "api/supabase/auth";
import hambergerMenu from "assets/headersvg/cate.svg";
import logOutIcon from "assets/headersvg/Logout.svg";
import userIcon from "assets/headersvg/user.svg";
import { Sidebar, useDialog } from "components";
import { useAuthStore } from "store";

const IMG_WIDTH_HEIGHT = 32;
const HeaderMemoization = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { Alert } = useDialog();

  const { currentSession, setStayLoggedInStatus } = useAuthStore();

  const userUid = currentSession?.user.id;

  const logoutHandler = useCallback(async () => {
    navigate("/");
    try {
      await logout();
      setStayLoggedInStatus(false);
      await Alert("로그아웃 되었습니다.");
    } catch (error) {
      await Alert("로그아웃 실패");
      console.error(error);
    }
  }, []);

  const goToMypage = useCallback(() => {
    if (userUid == null) return;
    navigate("/mypage");
  }, []);

  const goToLogin = useCallback(() => {
    navigate("/login");
  }, []);

  const openSideBarHandler = useCallback((): void => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <header className="flex justify-center sticky z-[9100] box-border border-b border-b-gray06 top-0 left-0 w-full bg-white px-6">
        <div className="w-[1280px] contents-between items-center">
          <Link
            to="/"
            className="py-4 font-title text-[2rem] 
            sm:py-2"
          >
            STILE
          </Link>

          {currentSession === null ? (
            <>
              <div className="flex gap-2 contents-center">
                <button className="sm:w-[24px]" onClick={goToLogin}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">로그인</span>

                  <img src={logOutIcon} alt="로그인" />
                </button>
                <button className="sm:w-[24px]" onClick={openSideBarHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={hambergerMenu} alt="메뉴" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 contents-center">
                <button className="sm:w-[24px]" onClick={logoutHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">로그아웃버튼</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={logOutIcon} alt="로그아웃" />
                </button>
                <button className="sm:w-[24px]" onClick={goToMypage}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">마이페이지버튼</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={userIcon} alt="마이 페이지" />
                </button>
                <button className="sm:w-[24px]" onClick={openSideBarHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={hambergerMenu} alt="메뉴" />
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export const Header = React.memo(HeaderMemoization);
