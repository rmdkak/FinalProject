import { useNavigate } from "react-router-dom";

import { MenuTab } from "components";
import { useAuth } from "hooks";
import { useAuthStore } from "store";

export const Mypage = () => {
  const navigate = useNavigate();

  const { previewProfileUrl } = useAuthStore();
  const { currentUserResponse } = useAuth();
  const { data: currentUser } = currentUserResponse;

  if (currentUser === undefined) {
    navigate("/");
    return <p>에러페이지</p>;
  }

  const { name, avatar_url: profileImg } = currentUser;
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
        <p className="text-black dark:text-white text-[24px] leading-[130%]">{`${name}님`}</p>
      </div>
      <MenuTab />
    </div>
  );
};
