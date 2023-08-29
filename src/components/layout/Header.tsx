import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "api/supabase";
import hambergerMenu from "assets/hamburgerMenu.svg";
import logOutIcon from "assets/logout.svg";
import userIcon from "assets/user.svg";
import { Sidebar } from "components";
import { useAuthStore, useLoggingStore } from "store";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { currentSession } = useAuthStore();
  const { setStayLoggedInStatus } = useLoggingStore();
  const userUid = currentSession?.user.id;

  // 로그아웃
  const logoutHandler = async () => {
    navigate("/");
    try {
      await logout();
      setStayLoggedInStatus(false);
      alert(`임시
      로그아웃 완료`);
    } catch (error) {
      console.error(error);
      // TODO 커스텀alert 로직
    }
  };

  // 마이페이지 이동
  const goToMypage = () => {
    if (userUid == null) return;
    navigate("/mypage");
  };

  const openSideBarHandler = (): void => {
    setIsOpen(true);
  };

  return (
    <>
      <header className="sticky z-[9100] box-border border-b border-b-[#E5E5E5] top-0 left-0 w-full bg-white flex justify-between items-center px-[5rem]">
        <Link to="/" className="py-6 font-title text-[2rem]">
          STILE
        </Link>

        {currentSession === null ? (
          <>
            {/* 로그인 안되어있는 메뉴 */}
            <button onClick={openSideBarHandler}>
              <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]"></span>
              <img src={hambergerMenu} alt="햄버거메뉴 이미지" />
            </button>
          </>
        ) : (
          <>
            {/* 로그인 되어있는 메뉴 */}
            {/* 로그아웃 */}
            <div className="flex items-center justify-center">
              <button className="mr-2" onClick={logoutHandler}>
                <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">로그아웃버튼</span>
                <img src={logOutIcon} alt="로그아웃" />
              </button>

              {/* 마이페이지 */}
              <button className="mr-2" onClick={goToMypage}>
                <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">마이페이지버튼</span>
                <img src={userIcon} alt="마이 페이지" />
              </button>

              {/* 햄버거 */}
              <button onClick={openSideBarHandler} className="">
                <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
                <img src={hambergerMenu} alt="햄버거 메뉴" />
              </button>
            </div>
          </>
        )}
      </header>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
