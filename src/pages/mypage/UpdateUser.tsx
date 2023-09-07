import { type ChangeEvent, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import {
  changeMetaAvatar,
  changeMetaName,
  changePassword,
  deleteImage,
  deleteUser,
  fetchUserCheckData,
  logout,
  patchUser,
  STORAGE_URL,
  uploadImage,
} from "api/supabase";
import defaultImg from "assets/defaultImg.jpg";
import photoCamera from "assets/svgs/photoCamera.svg";
import xmark from "assets/svgs/xmark.svg";
import {
  type PasswordVisible,
  PasswordVisibleButton,
  InvalidText,
  MypageTitle,
  passwordValid,
  nameValid,
  useDialog,
} from "components";
import { useAuthQuery } from "hooks";

interface UpdateInput {
  name: string;
  password: string;
  passwordConfirm: string;
}

const LABEL_STYLE = "self-center w-[136px] px-[24px] text-[14px] font-normal leading-[130%]";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { Alert, Confirm } = useDialog();

  const [showPassword, setShowPassword] = useState<PasswordVisible>({ password: false, passwordConfirm: false });
  const [checkedDuplicate, setCheckedDuplicate] = useState(false);
  const [isOpenToggle, setIsOpenToggle] = useState({ name: false, password: false });

  const { currentUserResponse, patchUserMutation } = useAuthQuery();
  const { data: currentUser } = currentUserResponse;

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<UpdateInput>({ mode: "all" });

  // 프로필 이미지 변경
  const changeProfileImgHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const uid = uuid();
    if (event.target.files === null) return;
    const imgFile = event.target.files[0];
    if (imgFile === undefined) return;

    const profileImg = `${STORAGE_URL}/profileImg/${uid}`;
    await deleteImage(prevProfileImageId);
    patchUserMutation.mutate({ inputValue: { avatar_url: profileImg }, userId });
    await changeMetaAvatar(profileImg);
    await uploadImage({ file: imgFile, userId: uid });
  };

  // 프로필 이미지가 디폴트가 아니면 디폴트로 바꾸어줌
  const resetImgFile = async () => {
    if (currentProfileImg !== "") {
      await deleteImage(prevProfileImageId);
      await changeMetaAvatar("");
      patchUserMutation.mutate({ inputValue: { avatar_url: "" }, userId });
    }
  };

  // 중복체크
  const duplicateCheck = async () => {
    const getUserData = await fetchUserCheckData();

    const matchUser = getUserData.filter((user) => user.name === getValues("name"));

    if (matchUser === null || matchUser.length === 0) setCheckedDuplicate(true);
    else setError("name", { message: "이미 존재하는 닉네임입니다." });
  };

  const toggleOpenHandler = (target: "name" | "password") => {
    if (target === "name") {
      setIsOpenToggle({ password: false, name: !isOpenToggle.name });
    } else {
      setIsOpenToggle({ name: false, password: !isOpenToggle.password });
    }
  };

  // 비밀번호 수정
  const changePasswordHandler: SubmitHandler<UpdateInput> = async (data) => {
    const { password } = data;

    try {
      await changePassword(password);
      await Alert("비밀번호가 정상적으로 변경되었습니다.");
    } catch (error) {
      switch (error) {
        case "New password should be different from the old password.":
          await Alert("이전 비밀번호와 동일합니다.");
          break;
        case "Auth session missing!":
          await Alert("이메일 유효시간이 만료되었습니다.");
          break;
        default:
          await Alert("Error");
          console.error("newError : ", error);
          break;
      }
    }
    toggleOpenHandler("password");
  };

  // 닉네임 수정
  const changeNameHandler: SubmitHandler<UpdateInput> = async (data) => {
    if (data.name !== currentName) {
      if (!checkedDuplicate) {
        setError("name", { message: "중복체크를 눌러주세요." });
        return;
      }

      await changeMetaName(data.name);
      patchUserMutation.mutate({ inputValue: { name: data.name }, userId });
    }
    toggleOpenHandler("name");
  };

  const deleteAuth = async () => {
    if (
      await Confirm(
        <>
          <p>회원탈퇴를 하시겠습니까?</p>
          <p>탈퇴 후에는 되돌릴 수 없습니다.</p>
        </>,
      )
    ) {
      await deleteUser(userId);
      await patchUser({ inputValue: { name: "탈퇴한 유저입니다." }, userId });
      await logout();
      navigate("/");
      if (prevProfileImageId !== "defaultImg") {
        await deleteImage(prevProfileImageId);
      }
    }
  };

  if (currentUser === undefined) {
    navigate("/");
    return <p>에러페이지</p>;
  }
  const { id: userId, avatar_url: currentProfileImg, name: currentName } = currentUser;
  const prevProfileImageId =
    currentProfileImg === "" ? "" : currentProfileImg.replace(`${STORAGE_URL}/profileImg/`, "");

  return (
    <div className="flex-column m-[60px] w-[1280px] mx-auto">
      <MypageTitle />
      <div className="flex w-full mt-10">
        {/* 프로필 이미지 */}
        <div className="flex-column items-center w-[328px] gap-[36px]">
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
          <p className="text-[24px] font-normal leading-[145%]">{`${currentUser.name} 님`}</p>
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
                    toggleOpenHandler("name");
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
                      defaultValue={currentUser?.name}
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
                        toggleOpenHandler("name");
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
                    toggleOpenHandler("password");
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
                        {...register("password", { ...passwordValid(getValues("passwordConfirm")) })}
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
                        toggleOpenHandler("password");
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
                취소
              </button>
              <div className="right-[-33px] translate-x-full absolute flex items-center gap-3">
                <p className="text-[14px] font-normal leading-[130%] text-gray02">더 이상 이용하지 않으시나요?</p>
                <button
                  onClick={deleteAuth}
                  type="button"
                  className="w-[120px] h-12 border border-gray05 text-gray02 rounded-lg"
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
