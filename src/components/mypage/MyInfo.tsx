import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "api/supabase";
import { useAuthStore } from "store";

import { InputBox } from "./MyInfoForm/InputBox";

export interface PatchIsOpen {
  email: boolean;
  password: boolean;
  phone: boolean;
  nickname: boolean;
  profileImage: boolean;
}

const INPUT_STYLE =
  "w-full px-[24px] py-[12px] border-[1px] border-[#E5E5E5] placeholder:text-[#888] disabled:bg-[#d7d7d7]";

export const MyInfo = () => {
  const navigate = useNavigate();

  const { currentSession } = useAuthStore();
  const currentUser = currentSession === null ? null : currentSession.user;

  const initialState = {
    email: false,
    password: false,
    phone: false,
    nickname: false,
    profileImage: false,
  };

  const [patchIsOpen, setPatchIsOpen] = useState<PatchIsOpen>(initialState);

  const changeHandler = (target: keyof PatchIsOpen) => {
    setPatchIsOpen({ ...patchIsOpen, [target]: !patchIsOpen[target] });
  };

  // 회원 탈퇴
  const deleteUserHandler = async () => {
    try {
      if (currentUser === null) return;
      await deleteUser(currentUser.id);
      navigate("/");
    } catch (error) {
      console.error(error);
      // TODO 커스텀alert 로직
    }
  };

  return (
    <>
      <form className="flex flex-col gap-[16px]">
        {/* 파일 Input UI 구성예정 */}
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-4">
            <input type="file" disabled={!patchIsOpen.profileImage} className={INPUT_STYLE} />
            <input
              id={"nickname"}
              placeholder={"닉네임"}
              disabled={!patchIsOpen.nickname}
              defaultValue={currentUser?.user_metadata.nickname}
              className={INPUT_STYLE}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setPatchIsOpen({
                ...patchIsOpen,
                nickname: !patchIsOpen.nickname,
                profileImage: !patchIsOpen.profileImage,
              });
            }}
            className="w-[80px] text-white bg-[#888] disabled:bg-[#bbb]"
          >
            변경
          </button>
        </div>
        <InputBox
          content="email"
          patchIsOpen={patchIsOpen}
          changeHandler={changeHandler}
          defaultValue={currentUser?.email}
        />
        <InputBox
          content="phone"
          patchIsOpen={patchIsOpen}
          changeHandler={changeHandler}
          defaultValue={currentUser?.user_metadata.phone}
        />
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-4">
            <input id={"password"} placeholder={"비밀번호"} disabled={!patchIsOpen.password} className={INPUT_STYLE} />
            <input
              id={"passwordConfirm"}
              placeholder={"비밀번호 확인"}
              disabled={!patchIsOpen.password}
              className={INPUT_STYLE}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setPatchIsOpen({ ...patchIsOpen, password: !patchIsOpen.password });
            }}
            className="w-[80px] text-white bg-[#888] disabled:bg-[#bbb]"
          >
            변경
          </button>
        </div>

        <button className="w-full h-[48px] text-white bg-[#888] mt-[24px]">수정하기</button>
      </form>

      <button className="w-full h-[48px] text-white bg-[#888] mt-[300px]" type="button" onClick={deleteUserHandler}>
        임시_회원탈퇴_버튼
      </button>
    </>
  );
};
