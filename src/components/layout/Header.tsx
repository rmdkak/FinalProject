import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ADMIN_ID, logout } from "api/supabase";
import hambergerMenu from "assets/headersvg/cate.svg";
import logIn from "assets/headersvg/Login.svg";
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
  const isAdmin = userUid === ADMIN_ID;

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

  // 로그인페이지 이동
  const goToLogin = useCallback(() => {
    navigate("/login");
  }, []);

  const openSideBarHandler = useCallback((): void => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <header className="flex justify-center sticky z-[9100] box-border border-b border-b-gray06 top-0 left-0 w-full bg-white">
        <div className="w-[1280px] contents-between items-center">
          <Link to="/" className="py-6 font-title text-[2rem]">
            STILE
          </Link>

          {currentSession === null ? (
            <>
              {/* 로그인 안되어있는 메뉴 */}
              <div className="flex gap-2 contents-center">
                <button onClick={goToLogin}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">로그인</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={logIn} alt="로그인 메뉴 이미지" />
                </button>
                <button onClick={openSideBarHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={hambergerMenu} alt="햄버거 메뉴" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* 로그인 되어있는 메뉴 */}
              {/* 로그아웃 */}
              <div className="flex gap-2 contents-center">
                {isAdmin && (
                  <button
                    onClick={() => {
                      navigate("/adminpage");
                    }}
                  >
                    관리자 페이지로 이동
                  </button>
                )}
                <button onClick={logoutHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">로그아웃버튼</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={logOutIcon} alt="로그아웃" />
                </button>

                {/* 마이페이지 */}
                <button onClick={goToMypage}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">마이페이지버튼</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={userIcon} alt="마이 페이지" />
                </button>

                {/* 햄버거 */}
                <button onClick={openSideBarHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
                  <img width={IMG_WIDTH_HEIGHT} height={IMG_WIDTH_HEIGHT} src={hambergerMenu} alt="햄버거 메뉴" />
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
