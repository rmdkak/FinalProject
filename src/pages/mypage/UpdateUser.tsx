import { type ChangeEvent, useState, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { changeMetaAvatar, changeMetaName, changeMetaPhone, fetchUserCheckData, storageUrl, updateImage } from "api/supabase";
import photoCamera from "assets/photoCamera.svg";
import xmark from "assets/xmark.svg";
import { type PasswordVisible, PasswordVisibleButton, InvalidText, phoneOptions, Select } from "components";
import { useAuth } from "hooks";
import { useAuthStore } from "store";

import { MypageTitle } from "./CommonComponent";

interface UpdateInput {
  name: string;
  password: string;
  passwordConfirm: string;
  phoneMiddleNum: string;
  phoneLastNum: string;
  email: string;
}

const LABEL_STYLE = "self-center w-[136px] px-[24px] text-[14px] font-normal leading-[130%]";

const defaultProfileImgUrl = "https://aiqrtjdvdlzhtyadyqnh.supabase.co/storage/v1/object/public/Images/profileImg/defaultImg"

export const UpdateUser = () => {
  const navigate = useNavigate();

  const [selectPhoneFistNum, setSelectPhoneFistNum] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState<PasswordVisible>({ password: false, passwordConfirm: false });

  const { currentUserResponse } = useAuth();
  const { data: currentUser, isLoading } = currentUserResponse;

  if (currentUser === undefined) {
    navigate("/");
    return <p>에러페이지</p>;
  }

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<UpdateInput>({ mode: "all" });



  const [imgFile, setImgFile] = useState<File>();
  const { previewProfileUrl, setPreviewProfileUrl } = useAuthStore();
  const onChangeAddFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setImgFile(event.target.files[0]);
    setPreviewProfileUrl(URL.createObjectURL(event.target.files[0]));
  };

  const [deleteProfileImgUrl, setDeleteProfileImgUrl] = useState(false)
  const resetImgFile = () => {
    if (imgFile !== undefined) {
      setImgFile(undefined);
      setPreviewProfileUrl("");
      return
    }
    if (imgFile === undefined || currentProfileImg !== defaultProfileImgUrl) {
      setPreviewProfileUrl(defaultProfileImgUrl)
      setDeleteProfileImgUrl(true)
    }
  }

  // 중복체크
  const [checkedDuplicate, setCheckedDuplicate] = useState(false)
  const duplicateCheck = async () => {
    const getUserData = await fetchUserCheckData()

    const matchUser = getUserData.filter((user) => user.name === getValues("name"));

    if (matchUser === null || matchUser.length === 0) setCheckedDuplicate(true)
    else setError("name", { message: "이미 존재하는 닉네임입니다." })
  };

  const { patchUserMutation } = useAuth();
  const { id: userId, avatar_url: currentProfileImg, name: currentName } = currentUser;
  // 회원 정보 수정
  const onSubmit: SubmitHandler<UpdateInput> = async (data) => {
    const { name, phoneMiddleNum, phoneLastNum } = data;

    if (currentUser === undefined) return;

    // 이미지 변경
    if (imgFile !== undefined) {
      const profileImg = `${storageUrl}/profileImg/${userId}`;
      await updateImage({ file: imgFile, userId }).catch((error) => { console.error(error) });
      await changeMetaAvatar(profileImg)
      patchUserMutation.mutate({ inputValue: { avatar_url: profileImg }, userId });
    }
    if (deleteProfileImgUrl || imgFile === undefined) {
      await changeMetaAvatar(defaultProfileImgUrl)
      patchUserMutation.mutate({ inputValue: { avatar_url: defaultProfileImgUrl }, userId });
    }

    // 휴대전화 변경
    if (phoneMiddleNum.length > 0 || phoneLastNum.length > 0) {
      if (selectPhoneFistNum === undefined) {
        setError("phoneMiddleNum", { message: "휴대전화 앞자리를 선택해주세요." });
        return;
      }

      const phonePattern = /^01([0-9])-?([0-9]{3,4})-?([0-9]{4})$/
      const phone = `${selectPhoneFistNum}${phoneMiddleNum}${phoneLastNum}`;

      if (!phonePattern.test(phone)) {
        setError("phoneMiddleNum", { message: "휴대전화 형식이 올바르지 않습니다." });
        return;
      }

      await changeMetaPhone(phone)
      patchUserMutation.mutate({ inputValue: { phone }, userId });
    }

    // 닉네임 변경
    if (name !== currentName) {
      if (!checkedDuplicate) {
        setError("name", { message: "중복체크를 눌러주세요." });
        return;
      }

      await changeMetaName(name)
      patchUserMutation.mutate({ inputValue: { name, }, userId });
    }
  };

  useEffect(() => {
    return () => {
      setPreviewProfileUrl("");
    }
  }, [])

  return (
    <div className="flex-column m-[60px] w-[1280px] mx-auto">
      <MypageTitle />
      <div className="flex w-full mt-[40px]">
        {/* 프로필 이미지 */}
        <div className="flex-column items-center w-[328px] gap-[36px]">
          <div className="relative w-[120px]">
            {previewProfileUrl === "" ? (
              isLoading ? <p>로딩중</p> : <img src={currentProfileImg} alt="프로필 이미지" className="w-[120px] h-[120px] rounded-full" />
            ) : (
              <img src={previewProfileUrl} alt="프로필 이미지" className="w-[120px] h-[120px] rounded-full" />
            )}
            {/* <img src={currentProfileImg} className="w-[120px] h-[120px] rounded-full" /> */}
            <div className="absolute flex justify-center items-center gap-[8px] bottom-0 left-1/2 translate-x-[-50%] translate-y-[25%] rounded-[8px] border bg-white w-[80px] h-[32px]">
              <label htmlFor="profileImgButton">
                <img src={photoCamera} className="w-[16px] h-[16px] cursor-pointer" />
              </label>
              <input id="profileImgButton" type="file" accept="image/*" onChange={onChangeAddFile} style={{ display: "none" }} />
              <div className="h-[8px] bg-gray06 border" />
              <img src={xmark} onClick={resetImgFile} className="w-[16px] h-[16px] cursor-pointer" />
            </div>
          </div>
          <p className="text-[24px] font-normal leading-[145%]">{`${currentUser.name} 님`}</p>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex contents-center w-[624px]">
          <div className="flex-column w-full gap-[24px]">
            {/* 프로필 사진 빈공간 */}
            {/* <div className="border-b flex-column border-b-gray06">
              <div className="flex gap-[24px] pb-[24px]">
                <label className={LABEL_STYLE}>프로필 사진</label>
                <div className="h-[48px]" />
              </div>
            </div> */}

            {/* 닉네임 */}
            <div className="flex-column">
              <div className="flex gap-[24px]">
                <label className={LABEL_STYLE}>닉네임</label>
                <input
                  id={"name"}
                  placeholder={"닉네임"}
                  defaultValue={currentUser?.name}
                  className="auth-input w-[300px]"
                  {...register("name", {
                    required: "닉네임은 필수 입력 사항입니다.",
                    minLength: { value: 2, message: "닉네임이 너무 짧습니다." },
                    maxLength: { value: 10, message: "닉네임이 너무 깁니다." },
                    onChange: () => { setCheckedDuplicate(false) }
                  })}
                />
                <button type="button" onClick={duplicateCheck} className="w-[120px] border border-black rounded-[8px] h-[48px] body-3" >중복체크</button>
              </div>
              {checkedDuplicate
                ? <p className={"h-[40px] w-full flex items-center text-[12px] text-green-500 font-normal justify-center border-b border-b-gray06 pb-[5px]"}>사용 가능한 닉네임입니다.</p>
                : <InvalidText className={"justify-center border-b border-b-gray06 pb-[5px]"} errorsMessage={errors.name?.message} size={40} />
              }
            </div>

            {/* 패스워드 */}
            <div className="flex-column">
              <div className="flex gap-[24px]">
                <label className={LABEL_STYLE}>비밀번호</label>
                <div className="flex-column gap-[8px] w-[300px]">
                  <div className="relative">
                    <input
                      placeholder="새 비밀번호"
                      type={showPassword.password ? "text" : "password"}
                      className="auth-input"
                      {...register("password", {
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
                <div className="w-[120px]" />
              </div>
              <InvalidText className={"justify-center border-b border-b-gray06 pb-[5px]"} errorsMessage={errors.password?.message} size={40} />
            </div>

            {/* 휴대전화 */}
            {/* TODO 셀렉트 인풋 넣기 */}
            <div className="border-b flex-column border-b-gray06">
              <div className="flex items-center gap-[24px]">
                <label className={LABEL_STYLE}>휴대전화</label>
                <div className="flex items-center w-[300px]">
                  <Select
                    option={phoneOptions}
                    selectedValue={selectPhoneFistNum}
                    setSelectedValue={setSelectPhoneFistNum}
                    selfEnterOption={true}
                    placeholder=""
                  />
                  <span className="mx-[6px]">-</span>
                  <input
                    {...register("phoneMiddleNum")}
                    type="text"
                    placeholder="휴대전화"
                    className="text-center auth-input body-3 w-[85px] px-[12px]"
                  />
                  <span className="mx-[6px]">-</span>
                  <input
                    {...register("phoneLastNum")}
                    type="text"
                    placeholder="휴대전화"
                    className="text-center auth-input body-3 w-[85px] px-[12px]"
                  />
                </div>
                <div className="w-[120px]" />
              </div>
              <InvalidText className={"justify-center border-b border-b-gray06 pb-[5px]"} errorsMessage={errors.phoneMiddleNum?.message} size={40} />
            </div>

            <div className="relative flex gap-[16px] justify-center items-center">
              <button className="flex contents-center w-[192px] h-[48px] rounded-[8px] bg-point text-[14px] font-normal leading-[130%]">
                회원정보 수정
              </button>
              <button
                type="button"
                className="flex contents-center w-[192px] h-[48px] rounded-[8px] bg-white border border-gray05 text-[14px] font-normal leading-[130%]"
                onClick={() => {
                  navigate(-1);
                }}
              >
                취소
              </button>
              <div className="right-[-33px] translate-x-full absolute flex items-center gap-[12px]">
                <p className="text-[14px] font-normal leading-[130%] text-gray02">더 이상 이용하지 않으시나요?</p>
                <button type="button" className="w-[120px] h-[48px] border border-gray05 text-gray02 rounded-[8px]">회원탈퇴</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >
  );
};
