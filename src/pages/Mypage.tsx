import { useNavigate } from "react-router-dom";

import { MenuTab } from "components";
import { useAuthStore } from "store";

export const Mypage = () => {
  const navigate = useNavigate();

  const { currentSession, previewProfileUrl } = useAuthStore();

  if (currentSession === null) {
    navigate("/");
    alert("프로필은 로그인 후 이용가능합니다.");
    return;
  }

  const { name, avatar_url: profileImg } = currentSession.user.user_metadata;

  return (
    <div className="flex flex-col items-center m-[60px]">
      <h2 className="text-[32px] font-[700] leading-[130%] m-5">마이페이지</h2>
      <div className="relative flex flex-col items-center justify-center gap-6 m-5">
        {previewProfileUrl === "" ? (
          <img src={profileImg} alt="프로필" className="w-[120px] h-[120px] rounded-full text-center justify-center" />
        ) : (
          <>
            <img
              src={previewProfileUrl}
              alt="미리보기"
              className="w-[120px] h-[120px] rounded-full text-center justify-center"
            />
            <span className="absolute right-[-150px] bottom-0 p-2 text-sm bg-gray-300 rounded-md cursor-default">
              미리보기
            </span>
          </>
        )}
        <p className="text-black dark:text-white text-[24px] leading-[130%]">{`${name as string}님`}</p>
        {/* <p className="text-black dark:text-white text-[16px] leading-[130%]">{currentUser?.created_at !== undefined ? `${"계정 생성일 ".concat(currentUser?.created_at.slice(0, 10))}`: null}</p> */}
        {/* <p className="text-black dark:text-white text-[16px] leading-[130%]">{currentUser?.last_sign_in_at !== undefined? `${"마지막 로그인 ".concat(currentUser?.last_sign_in_at.slice(0, 10))}`: null}</p> */}
      </div>
      <MenuTab />
    </div>
  );
};
