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

  return (
    <>
      <form className="flex flex-col">
        <label htmlFor="email">내 이메일</label>
        <input
          id="email"
          disabled={true}
          defaultValue={currentUser?.email}
          className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
        />
        <label htmlFor="phone">휴대전화</label>
        <input
          id="phone"
          defaultValue={currentUser?.user_metadata.phone}
          className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
        />
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          id="passwordConfirm"
          className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button className="px-4 py-2 font-semibold text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          수정하기
        </button>
      </form>
      <button
        className="px-4 py-2 font-semibold text-white bg-red-400 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={deleteUserHandler}
      >
        임시_회원탈퇴_버튼
      </button>
    </>
  );
};
