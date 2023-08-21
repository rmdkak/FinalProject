import { useNavigate } from "react-router-dom";

import { deleteUser } from "api/supabase";
import { useAuthStore } from "store";

export const MyInfo = () => {
  const navigate = useNavigate();

  const { currentSession } = useAuthStore();
  const currentUser = currentSession === null ? null : currentSession.user;

  // 회원 탈퇴
  const deleteUserHandler = async () => {
    // try {
    if (currentUser === null) return;
    await deleteUser(currentUser.id);
    navigate("/");
    // } catch (error) {
    //   console.error(error);
    //   // TODO 커스텀alert 로직
    // }
  };

  const inputStyle =
    "w-full px-[24px] py-[12px] border-[1px] border-[#E5E5E5] placeholder:text-[#888] disabled:bg-white";

  return (
    <>
      <form className="flex flex-col w-full gap-[16px]">
        {/* 파일 Input UI 구성예정 */}
        <input type="file" />
        <input id="email" disabled={true} defaultValue={currentUser?.email} className={inputStyle} />
        <input id="phone" defaultValue={currentUser?.user_metadata.phone} className={inputStyle} />
        <input id="password" type="password" placeholder="비밀번호" className={inputStyle} />
        <input id="passwordConfirm" type="password" placeholder="비밀번호 확인" className={inputStyle} />
        <button className="w-full h-[48px] text-white bg-[#888] mt-[24px]">수정하기</button>
      </form>
      <button className="w-full h-[48px] text-white bg-[#888] mt-[12px]" type="button" onClick={deleteUserHandler}>
        임시_회원탈퇴_버튼
      </button>
    </>
  );
};
