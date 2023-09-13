import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import backImg from "assets/headersvg/back_page.svg";
import hambergerMenu from "assets/headersvg/cate.svg";
import logOutIcon from "assets/headersvg/Logout.svg";
import userIcon from "assets/headersvg/user.svg";
import { Sidebar } from "components";
import { useAuth } from "hooks/useAuth";
import { useInteriorPreview } from "hooks/useInteriorPreview";
import { useAuthStore } from "store";

const IMG_WIDTH_HEIGHT = 32;
const REG_ENGLISH = /[a-zA-Z]/;
let headerTitle: string;
let isBack: boolean = false;

const HeaderMemoization = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  const navigate = useNavigate();

  const { currentUserId } = useAuthStore();
  const { windowWidth } = useInteriorPreview();
  const { logoutWithMessage } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") window.addEventListener("scroll", scrollObserver);
    return () => {
      window.removeEventListener("scroll", scrollObserver);
    };
  }, [pathname]);

  const scrollObserver = () => {
    setScrollY(window.scrollY);
  };

  switch (pathname) {
    case "/":
      headerTitle = "STILE";
      isBack = false;
      break;

    case "/interior-preview":
      headerTitle = "STILE";
      isBack = true;
      break;

    case "/login":
      headerTitle = "로그인";
      isBack = true;
      break;

    case "/find-auth/email":
    case "/find-auth/password":
      headerTitle = "회원정보 찾기";
      isBack = true;
      break;

    case "/signup":
      headerTitle = "회원가입";
      isBack = true;
      break;

    case "/mypage":
    case "/mypage/like":
    case "/mypage/comment":
    case "/mypage/post":
      headerTitle = "마이페이지";
      isBack = true;
      break;

    case "/mypage/inquiry":
      headerTitle = "문의하기";
      isBack = true;
      break;
    case "/mypage/bookmark":
      headerTitle = "북마크";
      isBack = true;
      break;

    case "/mypage/update":
      headerTitle = "회원정보수정";
      isBack = true;
      break;

    case "/community":
    case "/post":
      headerTitle = "커뮤니티";
      isBack = true;
      break;

    case "/eventlist":
      headerTitle = "이벤트";
      isBack = true;
      break;

    default:
      if (pathname.slice(0, 7) === "/detail") {
        isBack = true;
        headerTitle = "커뮤니티";
        break;
      }
      if (pathname.slice(0, 6) === "/event") {
        isBack = true;
        headerTitle = "이벤트";
        break;
      }
      isBack = true;
      headerTitle = "STILE";

      break;
  }

  const goToMypage = useCallback(() => {
    if (currentUserId === undefined) return;
    navigate("/mypage");
  }, [currentUserId]);

  const goToLogin = useCallback(() => {
    navigate("/login");
  }, []);

  const openSideBarHandler = useCallback(() => {
    setIsOpen(true);
  }, []);

  const goToBackPage = useCallback(() => {
    navigate(-1);
  }, []);

  const headerTitleRegCheck = REG_ENGLISH.test(headerTitle) ? "font-title" : "font-kr";

  return (
    <>
      <header
        className={`flex justify-center sticky z-[9100] box-border top-0 left-0 w-full sm:h-16 px-6 ${
          scrollY <= 100 && (windowWidth as number) <= 768 && pathname === "/"
            ? "bg-transparent "
            : "bg-white border-b border-b-gray06"
        } transition-colors duration-500 ease-in-out`}
      >
        <div className="w-[1280px] contents-between items-center">
          <Link to="/" className="flex items-center text-[32px] font-title gap-4 py-4 font-medium">
            {(windowWidth as number) >= 767 ? (
              "STILE"
            ) : (
              <>
                {isBack && (
                  <button onClick={goToBackPage} className="flex contents-center">
                    <img width={32} height={32} src={backImg} alt="뒤로가기 이미지" />
                  </button>
                )}
                <span className={`flex contents-center text-[18px] ${headerTitleRegCheck}`}>{headerTitle}</span>
              </>
            )}
          </Link>

          {currentUserId === undefined ? (
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
                <button className="sm:w-[24px]" onClick={logoutWithMessage}>
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
