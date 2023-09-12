import { type ChangeEvent, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import uuid from "react-uuid";

import {
  changeMetaAvatar,
  changeMetaName,
  changePassword,
  deleteImage,
  deleteUser,
  fetchUserCheckData,
  logout,
  uploadImage,
} from "api/supabase/auth";
import { STORAGE_URL } from "api/supabase/supabaseClient";
import defaultImg from "assets/defaultImg.jpg";
import photoCamera from "assets/svgs/photoCamera.svg";
import xmark from "assets/svgs/xmark.svg";
import { PasswordVisibleButton, InvalidText, Title, passwordValid, nameValid, useDialog } from "components";
import { useAuthQuery } from "hooks/useAuthQuery";
import { useAuthStore } from "store";

import type { PasswordVisible } from "components";

interface UpdateInput {
  name: string;
  password: string;
  passwordConfirm: string;
}

const LABEL_STYLE = "self-center w-[136px] px-[24px] text-[14px] font-normal leading-[130%]";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { Confirm } = useDialog();

  const [showPassword, setShowPassword] = useState<PasswordVisible>({ password: false, passwordConfirm: false });
  const [checkedDuplicate, setCheckedDuplicate] = useState(false);
  const [isOpenToggle, setIsOpenToggle] = useState({ name: false, password: false });

  const { currentUserResponse, patchUserMutation } = useAuthQuery();
  const { data: currentUser } = currentUserResponse;
  const { currentUserId } = useAuthStore();

  if (currentUser === undefined || currentUserId === undefined) {
    navigate("/");
    return <></>;
  }

  const { name: currentName, avatar_url: currentProfileImg } = currentUser;
  const userId = currentUserId;

  const prevProfileImageId =
    currentProfileImg === "" ? "" : currentProfileImg.replace(`${STORAGE_URL}/profileImg/`, "");

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    resetField,
    formState: { errors },
  } = useForm<UpdateInput>();

  // 프로필 이미지 변경
  const changeProfileImgHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const uid = uuid();
    if (event.target.files === null) return;
    const imgFile = event.target.files[0];
    if (imgFile === undefined) return;

    const profileImg = `${STORAGE_URL}/profileImg/${uid}`;
    await deleteImage(prevProfileImageId);
    patchUserMutation.mutate({ inputValue: { name: currentName, avatar_url: profileImg }, userId });
    await changeMetaAvatar(profileImg);
    void uploadImage({ file: imgFile, userId: uid });
  };

  // 프로필 이미지가 디폴트가 아니면 디폴트로 바꾸어줌
  const resetImgFile = async () => {
    if (currentProfileImg !== "") {
      await deleteImage(prevProfileImageId);
      await changeMetaAvatar("");
      patchUserMutation.mutate({ inputValue: { name: currentName, avatar_url: "" }, userId });
    }
  };

  // 중복체크
  const duplicateCheck = async () => {
    const getUserData = await fetchUserCheckData();

    const matchUser = getUserData.filter((user) => user.name === getValues("name"));

    if (matchUser === null || matchUser.length === 0) setCheckedDuplicate(true);
    else setError("name", { message: "이미 존재하는 닉네임입니다." });
  };

  const toggleChangeHandler = (target: "name" | "password") => {
    if (target === "name") {
      setIsOpenToggle({ password: false, name: !isOpenToggle.name });
      resetField("name");
    } else {
      setIsOpenToggle({ name: false, password: !isOpenToggle.password });
      resetField("password");
      resetField("passwordConfirm");
    }
  };

  const changePasswordHandler: SubmitHandler<UpdateInput> = async (data) => {
    try {
      await changePassword(data.password);
      toast("비밀번호가 정상적으로 변경되었습니다.", { theme: "warning", zIndex: 9999 });
    } catch (error) {}

    resetField("password");
    resetField("passwordConfirm");
    toggleChangeHandler("password");
  };

  const changeNameHandler: SubmitHandler<UpdateInput> = async (data) => {
    const inputValue = { name: data.name };
    if (data.name !== currentName) {
      if (!checkedDuplicate) {
        setError("name", { message: "중복체크를 눌러주세요." });
        return;
      }

      await changeMetaName(data.name);
      patchUserMutation.mutate({ inputValue, userId });
    } else {
      toast("이전 닉네임과 동일합니다.", { theme: "failure", zIndex: 9999 });
    }
    toggleChangeHandler("name");
  };

  const deleteAuth = async () => {
    const inputValue = { name: "탈퇴한 유저입니다.", avatar_url: "" };
    if (
      await Confirm(
        <>
          <p className="w-[400px] pb-6 border-b border-black title-4 font-medium">회원탈퇴</p>
          <p className="mt-4 text-black body-2">그동안 Stile을 이용해주셔서 감사합니다.</p>
          <p className="mt-3 body-3 text-gray02">게시글 및 댓글은 탈퇴시 자동삭제 되지 않고 남아있습니다.</p>
          <p className="body-3 text-gray02">삭제를 원하시는 게시글이 있다면 탈퇴전에 삭제하시기 바랍니다.</p>
        </>,
      )
    ) {
      await deleteUser(userId);
      patchUserMutation.mutate({ inputValue, userId });
      await logout();
      navigate("/");
      toast("정상적으로 탈퇴되었습니다.", { theme: "plain", zIndex: 9999 });
      if (prevProfileImageId !== "defaultImg") {
        void deleteImage(prevProfileImageId);
      }
    }
  };

  if (currentUser === undefined) {
    navigate("/");
    return <p>에러페이지</p>;
  }

  return (
    <div className="flex-column m-[60px] w-[1280px] mx-auto">
      <Title title="회원정보수정" isBorder={true} />
      <div className="flex w-full mt-10">
        {/* 프로필 이미지 */}
        <div className="flex-column items-center w-[328px] gap-9">
          <div className="relative w-[120px]">
            {currentProfileImg === "" ? (
              <img src={defaultImg} alt="프로필 이미지" className="w-32 h-32 rounded-full" />
            ) : (
              <img src={currentProfileImg} alt="프로필 이미지" className="w-32 h-32 rounded-full" />
            )}
            <div className="absolute bottom-0 flex items-center justify-center w-20 h-8 gap-2 -translate-x-1/2 bg-white border rounded-lg left-1/2 translate-y-1/4">
              <label htmlFor="profileImgButton">
                <img src={photoCamera} className="w-4 h-4 cursor-pointer" />
              </label>
              <input
                id="profileImgButton"
                type="file"
                accept="image/png, image/jpeg, image/gif"
                onChange={changeProfileImgHandler}
                className="hidden"
              />
              <div className="h-2 border bg-gray06" />
              <img src={xmark} onClick={resetImgFile} className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
          <p className="title-4">{`${currentName} 님`}</p>
        </div>
        <div className="flex contents-center w-[624px]">
          <div className="w-full gap-6 flex-column">
            {/* 닉네임 form */}
            <div className="gap-2 border-b pb-7 flex-column border-b-gray06">
              <div className="flex gap-6">
                <label htmlFor="nickname" className={LABEL_STYLE}>
                  닉네임
                </label>
                <button
                  id="nickname"
                  type="button"
                  onClick={() => {
                    toggleChangeHandler("name");
                  }}
                  className="w-32 h-12 rounded-lg point-button body-3"
                >
                  변경
                </button>
              </div>

              {/* 토글 이름 변경 폼 */}
              {isOpenToggle.name && (
                <form onSubmit={handleSubmit(changeNameHandler)} className="flex-column">
                  <div className="flex gap-6 mt-10">
                    <input
                      id={"name"}
                      placeholder={"닉네임"}
                      defaultValue={currentName}
                      className="auth-input w-[300px]"
                      {...register("name", {
                        ...nameValid,
                        onChange: () => {
                          setCheckedDuplicate(false);
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={duplicateCheck}
                      className="w-32 h-12 rounded-lg gray-outline-button body-3"
                    >
                      중복체크
                    </button>
                  </div>
                  {checkedDuplicate ? (
                    <p className={"h-10 w-full flex contents-center text-xs text-green-500 font-normal"}>
                      사용 가능한 닉네임입니다.
                    </p>
                  ) : (
                    <InvalidText className="justify-center" errorsMessage={errors.name?.message} size={40} />
                  )}
                  <div className="flex gap-3">
                    <button className="w-32 h-12 rounded-lg point-button body-3">수정</button>
                    <button
                      type="button"
                      className="w-32 h-12 rounded-lg gray-outline-button body-3"
                      onClick={() => {
                        toggleChangeHandler("name");
                      }}
                    >
                      취소
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* 패스워드 */}
            <div className="gap-2 border-b flex-column border-b-gray06 pb-7">
              <div className="flex gap-6">
                <label htmlFor="password" className={LABEL_STYLE}>
                  비밀번호
                </label>
                <button
                  id="password"
                  type="button"
                  onClick={() => {
                    toggleChangeHandler("password");
                  }}
                  className="w-32 h-12 rounded-lg point-button body-3"
                >
                  변경
                </button>
              </div>
              {isOpenToggle.password && (
                <form onSubmit={handleSubmit(changePasswordHandler)}>
                  <div className="flex-column gap-2 w-[300px]">
                    <div className="relative">
                      <input
                        placeholder="새 비밀번호"
                        type={showPassword.password ? "text" : "password"}
                        className="auth-input"
                        {...register("password", {
                          ...passwordValid(),
                          validate: (_, formValue) =>
                            formValue.password === formValue.passwordConfirm || "비밀번호가 일치하지 않습니다.",
                        })}
                      />
                      <PasswordVisibleButton
                        passwordType={"password"}
                        isVisibleState={showPassword}
                        setIsVisibleState={setShowPassword}
                      />
                    </div>
                    <div className="relative">
                      <input
                        placeholder={"새 비밀번호 확인"}
                        type={showPassword.passwordConfirm ?? false ? "text" : "password"}
                        className="auth-input"
                        {...register("passwordConfirm")}
                      />
                      <PasswordVisibleButton
                        passwordType={"passwordConfirm"}
                        isVisibleState={showPassword}
                        setIsVisibleState={setShowPassword}
                      />
                    </div>
                  </div>
                  <InvalidText className={"justify-center"} errorsMessage={errors.password?.message} size={40} />
                  <div className="flex gap-3">
                    <button className="w-32 h-12 rounded-lg point-button body-3">수정</button>
                    <button
                      type="button"
                      className="w-32 h-12 rounded-lg gray-outline-button body-3"
                      onClick={() => {
                        toggleChangeHandler("password");
                      }}
                    >
                      취소
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="relative flex items-center justify-center gap-4">
              <button
                type="button"
                className="flex contents-center w-[192px] h-12 rounded-lg bg-white gray-outline-button body-3"
                onClick={() => {
                  navigate(-1);
                }}
              >
                이전
              </button>
              <div className="-right-[33px] translate-x-full absolute flex items-center gap-3">
                <p className="body-3 text-gray02">더 이상 이용하지 않으시나요?</p>
                <button
                  onClick={deleteAuth}
                  type="button"
                  className="w-[120px] h-12 border body-3 border-gray05 text-gray02 rounded-lg"
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
