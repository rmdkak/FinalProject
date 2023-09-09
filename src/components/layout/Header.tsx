import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "api/supabase";
import hambergerMenu from "assets/headersvg/cate.svg";
import logOutIcon from "assets/headersvg/LogoutOutline.svg";
import userIcon from "assets/headersvg/user.svg";
import { Sidebar, useDialog } from "components";
import { useAuthStore } from "store";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { Alert } = useDialog();

  const { currentSession, setStayLoggedInStatus } = useAuthStore();

  const userUid = currentSession?.user.id;
  const isAdmin = currentSession?.user.user_metadata.name === "stile";

  // 로그아웃
  const logoutHandler = async () => {
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

  // 마이페이지 이동
  const goToMypage = () => {
    if (userUid == null) return;
    navigate("/mypage");
  };

  // 로그인페이지 이동
  const goToLogin = () => {
    navigate("/login");
  };

  const openSideBarHandler = (): void => {
    setIsOpen(true);
  };

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
                  <img src={logOutIcon} alt="로그인" />
                </button>
                <button onClick={openSideBarHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
                  <img src={hambergerMenu} alt="메뉴" />
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
                  <img src={logOutIcon} alt="로그아웃" className="rotate-180" />
                </button>

                {/* 마이페이지 */}
                <button onClick={goToMypage}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">마이페이지버튼</span>
                  <img src={userIcon} alt="마이 페이지" />
                </button>

                {/* 햄버거 */}
                <button onClick={openSideBarHandler}>
                  <span className="absolute top-[-9999px] left-[-9999px] poindent-[-9999px]">햄버거</span>
                  <img src={hambergerMenu} alt="메뉴" />
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
