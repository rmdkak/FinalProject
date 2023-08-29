import { type ChangeEvent, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { changeMetaData, storageUrl, updateImage } from "api/supabase";
import photoCamera from "assets/photoCamera.svg";
import xmark from "assets/xmark.svg";
import { type PasswordVisible, PasswordVisibleButton, InvalidText } from "components";
import { useAuth } from "hooks";
import { useAuthStore } from "store";

interface UpdateInput {
  name: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  email: string;
}

const LABEL_STYLE = "self-center w-[136px] px-[24px] text-[14px] font-normal leading-[130%]";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { currentUserResponse } = useAuth();
  const { data: currentUser } = currentUserResponse;

  if (currentUser === undefined) {
    navigate("/");
    return <p>에러페이지</p>;
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdateInput>({ mode: "all" });

  const [imgFile, setImgFile] = useState<File>();
  const [showPassword, setShowPassword] = useState<PasswordVisible>({ password: false, passwordConfirm: false });
  const { setPreviewProfileUrl } = useAuthStore();
  const { patchUserMutation } = useAuth();
  const onChangeAddFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setImgFile(event.target.files[0]);
  };

  const onSubmit: SubmitHandler<UpdateInput> = async (data) => {
    if (currentUser === undefined) return;
    const { id: userId } = currentUser;
    const profileImg = `${storageUrl}/profileImg/${userId}`;
    if (imgFile !== undefined) {
      try {
        await updateImage({ file: imgFile, userId });
      } catch (error) {
        console.error(error);
      }
    }

    const { phone, name } = data;
    await changeMetaData({ phone, avatar_url: profileImg, name });
    patchUserMutation.mutate({ inputValue: { name, phone, avatar_url: profileImg }, userId });
    setPreviewProfileUrl("");
  };

  const { avatar_url: profileImg } = currentUser;
  return (
    <div className="flex-column m-[60px] w-[1280px] mx-auto">
      {/* title */}
      <div className="w-full border-b border-b-black text-center pb-[24px]">
        <h3 className="text-[32px] font-normal leading-[130%]">마이페이지</h3>
      </div>
      {/* 프로필 이미지 */}
      <div className="flex w-full mt-[40px]">
        <div className="flex-column items-center w-[328px] gap-[36px]">
          <div className="relative w-[120px]">
            <img src={profileImg} className="w-[120px] h-[120px] rounded-full" />
            <div className="absolute flex justify-center items-center gap-[8px] bottom-0 left-1/2 translate-x-[-50%] translate-y-[25%] rounded-[8px] border bg-white w-[80px] h-[32px]">
              <label>
                <img src={photoCamera} className="w-[16px] h-[16px]" />
              </label>
              <input type="file" accept="image/*" onChange={onChangeAddFile} style={{ display: "none" }} />
              <div className="h-[8px] bg-gray06 border" />
              <img src={xmark} className="w-[16px] h-[16px]" />
            </div>
          </div>
          <p className="text-[24px] font-normal leading-[145%]">홍길동님</p>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex contents-center w-[624px]">
          <div className="flex-column w-full gap-[24px]">
            {/* FIXME */}
            <div className="border-b flex-column border-b-gray06">
              <div className="flex gap-[24px] pb-[24px]">
                <label className={LABEL_STYLE}>프로필 사진</label>
                <div className="h-[48px]" />
              </div>
            </div>

            {/* 닉네임 */}
            <div className="border-b flex-column border-b-gray06">
              <div className="flex gap-[24px]">
                <label className={LABEL_STYLE}>닉네임</label>
                <input
                  id={"name"}
                  placeholder={"닉네임"}
                  defaultValue={currentUser?.name}
                  className="auth-input"
                  {...register("name", {
                    required: "닉네임은 필수 입력 사항입니다.",
                    minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
                    maxLength: { value: 10, message: "닉네임이 너무 깁니다." },
                  })}
                />
                <button className="w-[120px] border border-black rounded-[8px] h-[48px] ">중복체크</button>
              </div>
              <InvalidText className={"justify-center"} errorsMessage={errors.name?.message} />
            </div>

            {/* 패스워드 */}
            <div className="border-b flex-column border-b-gray06">
              <div className="flex gap-[24px]">
                <label className={LABEL_STYLE}>비밀번호</label>
                <div className="flex-column gap-[8px]">
                  {/* FIXME */}
                  {/* <div className="relative">
                    <input
                      placeholder={"현재 비밀번호"}
                      type={showPassword.passwordConfirm ?? false ? "text" : "password"}
                      className="auth-input"
                      {...register("passwordConfirm")}
                    />
                    <PasswordVisibleButton
                      passwordType={"passwordConfirm"}
                      isVisibleState={showPassword}
                      setIsVisibleState={setShowPassword}
                    />
                  </div> */}

                  <div className="relative">
                    <input
                      placeholder="새 비밀번호"
                      type={showPassword.password ? "text" : "password"}
                      className="auth-input"
                      {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          message: "영문 대문자, 영문 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.",
                        },
                        minLength: { value: 6, message: "비밀번호가 너무 짧습니다." },
                        validate: {
                          matchesPreviousPassword: (value) => {
                            const prevPassword = getValues("passwordConfirm");
                            return prevPassword === value || "비밀번호가 일치하지 않습니다.";
                          },
                        },
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
              </div>
              <InvalidText errorsMessage={errors.password?.message} />
            </div>

            {/* 휴대전화 */}
            {/* TODO 셀렉트 인풋 넣기 */}
            <div className="border-b flex-column border-b-gray06">
              <div className="flex gap-[24px]">
                <label className={LABEL_STYLE}>휴대전화</label>
                <input
                  id={"name"}
                  placeholder={"휴대전화"}
                  defaultValue={currentUser?.name}
                  className="auth-input"
                  {...register("name", {
                    required: "닉네임은 필수 입력 사항입니다.",
                    minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
                    maxLength: { value: 10, message: "닉네임이 너무 깁니다." },
                  })}
                />
              </div>
              <InvalidText className={"justify-center"} errorsMessage={errors.phone?.message} />
            </div>

            <div className="relative flex gap-[16px] justify-center items-center">
              <button className="flex contents-center w-[192px] h-[48px] rounded-[8px] bg-point text-[14px] font-normal leading-[130%]">
                회원정보 수정
              </button>
              <button
                className="flex contents-center w-[192px] h-[48px] rounded-[8px] bg-white border border-gray05 text-[14px] font-normal leading-[130%]"
                onClick={() => {
                  navigate(-1);
                }}
              >
                취소
              </button>
              <div className="right-[-33px] translate-x-full absolute flex items-center gap-[12px]">
                <p className="text-[14px] font-normal leading-[130%] text-gray02">더 이상 이용하지 않으시나요?</p>
                <button className="w-[120px] h-[48px] border border-gray05 text-gray02 rounded-[8px]">회원탈퇴</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
