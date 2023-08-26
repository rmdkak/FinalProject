import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUser, deleteUserData } from "api/supabase";
import { useAuth } from "hooks";
import { useAuthStore, useLoggingStore } from "store";
import { type Tables } from "types/supabase";

import { MetaDataForm, PasswordForm } from "./myInfoForm";

export const INPUT_STYLE =
  "w-full px-[24px] py-[12px] border-[1px] border-[#E5E5E5] placeholder:text-[#888] disabled:bg-[#d7d7d7]";

export const BUTTON_STYLE = "w-[70px] text-white bg-[#888] disabled:bg-[#bbb]";

export interface PatchIsOpen {
  metaData: boolean;
  email: boolean;
  password: boolean;
}

export interface ICommonProps {
  initialState: PatchIsOpen;
  patchIsOpen: PatchIsOpen;
  setPatchIsOpen: React.Dispatch<React.SetStateAction<PatchIsOpen>>;
  provider?: string;
  currentUser?: Tables<"USERS", "Row">;
}

const initialState = { metaData: false, email: false, password: false };

export const MyInfo = () => {
  const [patchIsOpen, setPatchIsOpen] = useState<PatchIsOpen>(initialState);

  const { currentSession } = useAuthStore();
  const { setStayLoggedInStatus } = useLoggingStore();
  const provider = currentSession?.user.app_metadata.provider;

  const { currentUserResponse } = useAuth();
  const { data: currentUser } = currentUserResponse;

  // 회원 탈퇴
  const navigate = useNavigate();
  const deleteUserHandler = async () => {
    try {
      if (currentUser === undefined) return;
      await deleteUser(currentUser.id);
      await deleteUserData(currentUser.id);
      setStayLoggedInStatus(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[16px] mt-10">
        <MetaDataForm
          initialState={initialState}
          patchIsOpen={patchIsOpen}
          setPatchIsOpen={setPatchIsOpen}
          currentUser={currentUser}
        />
        {/* <EmailForm
          initialState={initialState}
          patchIsOpen={patchIsOpen}
          setPatchIsOpen={setPatchIsOpen}
          currentUser={currentUser}
        /> */}
        <PasswordForm
          initialState={initialState}
          patchIsOpen={patchIsOpen}
          setPatchIsOpen={setPatchIsOpen}
          provider={provider}
        />
      </div>

      <button type="button" onClick={deleteUserHandler} className="w-full h-[48px] text-white bg-red-500 mt-[300px]">
        회원탈퇴_버튼
      </button>
    </>
  );
};
