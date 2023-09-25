import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { changeMetaAvatar, deleteImage, uploadImage } from "api/supabase/auth";
import { STORAGE_URL } from "api/supabase/supabaseClient";
import defaultImg from "assets/defaultImg.jpg";
import defaultImgWebp from "assets/defaultImgWebp.webp";
import photoCamera from "assets/svgs/photoCamera.svg";
import xmark from "assets/svgs/xmark.svg";
import { Title } from "components";
import { useAuthQuery } from "hooks/useAuthQuery";
import { useImageResize } from "hooks/useImageResize";
import Error from "pages/Error";
import { useAuthStore } from "store";

import { ButtonBox } from "./ButtonBox";
import { NameForm } from "./NameForm";
import { PasswordForm } from "./PasswordForm";

interface UpdateInput {
  name: string;
  password: string;
  passwordConfirm: string;
}

export const LABEL_STYLE = "self-center w-[136px] px-[24px] text-[14px] font-normal leading-[130%]";

const UpdateUser = () => {
  const navigate = useNavigate();

  const [isOpenToggle, setIsOpenToggle] = useState({ name: false, password: false });
  const { imageFile, setImageFile, resizePixelHandler, imageSizeSaveHandler, resizeFile } = useImageResize();

  const { currentUserResponse, patchUserMutation } = useAuthQuery();
  const { data: currentUser } = currentUserResponse;
  const { currentUserId } = useAuthStore();

  if (currentUser === undefined || currentUserId === undefined) {
    navigate("/");
    return <Error />;
  }

  const { name: currentName, avatar_url: currentProfileImg } = currentUser;
  const userId = currentUserId;

  const prevProfileImageId =
    currentProfileImg === "" ? "" : currentProfileImg.replace(`${STORAGE_URL}/profileImg/`, "");

  const { handleSubmit } = useForm<UpdateInput>();

  const submitProfileImgHandler: SubmitHandler<UpdateInput> = async () => {
    const uid = uuid();
    if (imageFile === null) return;

    const resizePixel = await resizePixelHandler(160);
    const resizeImageFile = await resizeFile(imageFile, resizePixel);
    if (resizeImageFile === undefined) return;

    const profileImg = `${STORAGE_URL}/profileImg/${uid}`;
    await deleteImage(prevProfileImageId);
    patchUserMutation.mutate({ inputValue: { avatar_url: profileImg }, userId });
    await changeMetaAvatar(profileImg);
    void uploadImage({ file: resizeImageFile, userId: uid });
    setImageFile(null);
  };

  const resetImgFile = async () => {
    if (imageFile !== null) {
      setImageFile(null);
    }
    if (currentProfileImg !== "") {
      await deleteImage(prevProfileImageId);
      await changeMetaAvatar("");
      patchUserMutation.mutate({ inputValue: { name: currentName, avatar_url: "" }, userId });
    }
  };

  const toggleChangeHandler = (target: "name" | "password") => {
    target === "name"
      ? setIsOpenToggle({ password: false, name: !isOpenToggle.name })
      : setIsOpenToggle({ name: false, password: !isOpenToggle.password });
  };

  return (
    <div className="relative mx-auto flex-column m-[60px] max-w-[1280px] w-[90%] sm:my-6">
      <Title title="회원정보수정" isBorder={true} pathName="/mypage/update" />
      <div className="flex w-full mt-10 sm:flex-col sm:gap-10 sm:contents-center">
        <form onSubmit={handleSubmit(submitProfileImgHandler)} className="flex-column items-center w-[328px] gap-9">
          <div className="relative w-[120px]">
            <picture>
              <source srcSet={currentProfileImg === "" ? defaultImgWebp : currentProfileImg} type="image/webp" />
              <img
                src={currentProfileImg === "" ? defaultImg : currentProfileImg}
                alt="프로필이미지"
                className="w-32 h-32 rounded-full"
              />
            </picture>
            <div className="absolute bottom-0 flex items-center justify-center w-20 h-8 gap-2 -translate-x-1/2 bg-white border rounded-lg left-1/2 translate-y-1/4">
              <label htmlFor="profileImgButton">
                <img src={photoCamera} alt="이미지 등록" className="w-4 h-4 cursor-pointer" />
              </label>
              <input
                id="profileImgButton"
                type="file"
                accept="image/png, image/jpeg, image/gif"
                onChange={(event) => {
                  imageSizeSaveHandler(event);
                }}
                className="hidden"
              />
              <div className="h-2 border bg-gray06" />
              <img src={xmark} alt="닫기" onClick={resetImgFile} className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
          <p className="title-4">{`${currentName} 님`}</p>
          {imageFile !== null && <button className="w-32 h-12 rounded-lg point-button body-3">이미지 변경하기</button>}
        </form>
        <div className="flex-column contents-center w-[624px] sm:w-full lg:w-full md:w-full">
          <div className="w-full gap-6 flex-column sm:w-full">
            <NameForm toggleChangeHandler={toggleChangeHandler} isOpen={isOpenToggle.name} />

            <PasswordForm toggleChangeHandler={toggleChangeHandler} isOpen={isOpenToggle.password} />
          </div>
          <ButtonBox prevProfileImageId={prevProfileImageId} />
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
