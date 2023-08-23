import { type FormEvent, type ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { changeMetaData, changePassword, deleteUser, patchUser, uploadImage } from "api/supabase";
import { useAuthStore } from "store";

export interface PatchIsOpen {
  email: boolean;
  password: boolean;
  phone: boolean;
  name: boolean;
  profileImg: boolean;
}

interface PatchState {
  name: string;
  phone: string;
}

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;

const INPUT_STYLE =
  "w-full px-[24px] py-[12px] border-[1px] border-[#E5E5E5] placeholder:text-[#888] disabled:bg-[#d7d7d7]";

const BUTTON_STYLE = "w-[70px] text-white bg-[#888] disabled:bg-[#bbb]";

export const MyInfo = () => {
  const navigate = useNavigate();

  const { currentSession, setPreviewProfileUrl } = useAuthStore();
  const currentUser = currentSession === null ? null : currentSession.user;
  const provider = currentUser?.app_metadata.provider;

  const initialState = {
    metaData: false,
    email: false,
    password: false,
  };

  const [patchIsOpen, setPatchIsOpen] = useState(initialState);
  const [metaDataState, setMetaDataState] = useState<PatchState>({ name: "", phone: "" });
  const [passwordState, setPasswordState] = useState({ password: "", passwordConfirm: "" });
  const [imgFile, setImgFile] = useState<File>();

  // 미리보기 URL 만듬
  useEffect(() => {
    if (imgFile !== undefined) {
      setPreviewProfileUrl(URL.createObjectURL(imgFile));
    }
  }, [imgFile]);

  // 프로필 이미지 변경
  const onChangeAddFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setImgFile(event.target.files[0]);
  };

  // 비밀번호 변경
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordState({ ...passwordState, [name]: value });
  };
  const patchPasswordHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, passwordConfirm } = passwordState;
    if (password === passwordConfirm) {
      try {
        await changePassword(password);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 메타데이터 변경
  const onChangeMetaData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMetaDataState({ ...metaDataState, [name]: value });
  };
  // 유저 정보 수정되고 렌더링 안됨
  const patchMetaDataHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentUser === null) return;
    const { phone, name } = metaDataState;
    const PROFILE_IMG_URL = `${STORAGE_URL}/profileImg/${currentUser.id}`;
    if (imgFile !== undefined) {
      try {
        // 스토리지 업데이트
        await uploadImage(imgFile, currentUser.id);
        // 데이터 테이블 업데이트
      } catch (error) {
        console.error(error);
      }
    }

    try {
      // auth 메타데이터 업데이트
      await changeMetaData({ phone, avatar_url: PROFILE_IMG_URL, name });
      await patchUser({ name, phone, avatar_url: PROFILE_IMG_URL }, currentUser.id);
    } catch (error) {
      console.error(error);
    }
  };

  // 회원 탈퇴
  const deleteUserHandler = async () => {
    try {
      if (currentUser === null) return;
      await deleteUser(currentUser.id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        {/* 파일 Input UI 구성예정 */}
        {/* 메타데이터 */}
        <form
          onSubmit={async (event) => {
            await patchMetaDataHandler(event);
          }}
          className="flex gap-4"
        >
          <div className="flex flex-col w-full gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={onChangeAddFile}
              disabled={!patchIsOpen.metaData}
              className={INPUT_STYLE}
            />
            <input
              id={"name"}
              placeholder={"닉네임"}
              disabled={!patchIsOpen.metaData}
              defaultValue={currentUser?.user_metadata.name}
              className={INPUT_STYLE}
              name="name"
              value={metaDataState.name}
              onChange={onChangeMetaData}
            />
            <input
              id={"phone"}
              placeholder={"휴대전화"}
              disabled={!patchIsOpen.metaData}
              defaultValue={currentUser?.user_metadata.phone}
              className={INPUT_STYLE}
              name="phone"
              value={metaDataState.phone}
              onChange={onChangeMetaData}
            />
          </div>
          {patchIsOpen.metaData ? (
            <div className="relative flex w-[70px]">
              <button className={BUTTON_STYLE}>수정</button>
              <button
                onClick={() => {
                  setPatchIsOpen({
                    ...patchIsOpen,
                    metaData: !patchIsOpen.metaData,
                  });
                  setPreviewProfileUrl("");
                }}
                className="absolute w-[70px] text-white bg-red-500 disabled:bg-[#bbb]"
              >
                x
              </button>
            </div>
          ) : (
            <div className="flex w-[70px]">
              <button
                type="button"
                onClick={() => {
                  setPatchIsOpen({
                    ...patchIsOpen,
                    metaData: !patchIsOpen.metaData,
                  });
                }}
                className={BUTTON_STYLE}
              >
                변경
              </button>
            </div>
          )}
        </form>

        {/* 이메일 */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="flex gap-4"
        >
          <input
            id={"email"}
            placeholder={"이메일"}
            disabled={!patchIsOpen.email}
            defaultValue={currentUser?.email}
            className={INPUT_STYLE}
          />
          {patchIsOpen.email ? (
            <div className="relative flex w-[70px]">
              <button className={BUTTON_STYLE}>수정</button>
              <button
                onClick={() => {
                  setPatchIsOpen({
                    ...patchIsOpen,
                    email: !patchIsOpen.email,
                  });
                }}
                className="absolute w-[70px] text-white bg-red-500 disabled:bg-[#bbb]"
              >
                x
              </button>
            </div>
          ) : (
            <div className="flex w-[70px]">
              <button
                type="button"
                onClick={() => {
                  setPatchIsOpen({ ...patchIsOpen, email: !patchIsOpen.email });
                }}
                disabled={provider === "kakao" || provider === "google" || provider === "github"}
                className={BUTTON_STYLE}
              >
                변경
              </button>
            </div>
          )}
        </form>

        {/* 비밀번호 */}
        <form
          onSubmit={async (event) => {
            await patchPasswordHandler(event);
          }}
          className="flex gap-4"
        >
          <div className="flex flex-col w-full gap-4">
            <input
              id={"password"}
              placeholder={"비밀번호"}
              type="password"
              disabled={!patchIsOpen.password}
              className={INPUT_STYLE}
              name="password"
              value={passwordState.password}
              onChange={onChangePassword}
            />
            <input
              id={"passwordConfirm"}
              placeholder={"비밀번호 확인"}
              type="password"
              disabled={!patchIsOpen.password}
              className={INPUT_STYLE}
              name="passwordConfirm"
              value={passwordState.passwordConfirm}
              onChange={onChangePassword}
            />
          </div>
          {patchIsOpen.password ? (
            <div className="flex w-[70px]">
              <button className={BUTTON_STYLE}>수정</button>
              <button
                onClick={() => {
                  setPatchIsOpen({
                    ...patchIsOpen,
                    password: !patchIsOpen.password,
                  });
                }}
                className="absolute w-[70px] text-white bg-red-500 disabled:bg-[#bbb]"
              >
                x
              </button>
            </div>
          ) : (
            <div className="flex w-[70px]">
              <button
                type="button"
                onClick={() => {
                  setPatchIsOpen({ ...patchIsOpen, password: !patchIsOpen.password });
                }}
                disabled={provider === "kakao" || provider === "google" || provider === "github"}
                className={BUTTON_STYLE}
              >
                변경
              </button>
            </div>
          )}
        </form>

        <button className="w-full h-[48px] text-white bg-[#888] mt-[24px]">수정하기</button>
      </div>

      <button className="w-full h-[48px] text-white bg-[#888] mt-[300px]" type="button" onClick={deleteUserHandler}>
        임시_회원탈퇴_버튼
      </button>
    </>
  );
};
