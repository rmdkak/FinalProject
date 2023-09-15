import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import uuid from "react-uuid";

import { deletePostImage, savePostImageHandler } from "api/supabase/postData";
import { STORAGE_URL } from "api/supabase/supabaseClient";
import { InteriorCombination, InteriorSection, InvalidText } from "components";
import { Button, Modal, SubTitle, Title } from "components/common";
import { useDynamicImport } from "hooks/useDynamicImport";
import { useImageResize } from "hooks/useImageResize";
import { usePostsQuery } from "hooks/usePostsQuery";
import { useModalStore, useServiceStore } from "store";

interface Inputs {
  title: string;
  content: string;
  file: FileList;
}

const UpdatePost = () => {
  const navigate = useNavigate();
  const { fetchDetailMutation, updatePostMutation } = usePostsQuery();
  const { data: postData } = fetchDetailMutation;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });
  const titleValue = watch("title") ?? 0;
  const contentValue = watch("content") ?? 0;
  const { onOpenModal, onCloseModal } = useModalStore();
  const { resizePixelHandler, resizeFile, imageSizeSaveHandler, imageFile, setImageFile } = useImageResize();
  const { wallPaper, tile, wallpaperPaint, resetWallPaper, resetWallpaperPaint, resetTile } = useServiceStore();
  const { preFetchPageBeforeEnter } = useDynamicImport();

  if (postData === undefined) return <></>;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const imageFile = data.file[0];
    const fileUuid = uuid();
    const postImage = imageFile === undefined ? postData.postImage : `/postImg/${fileUuid}`;

    if (wallPaper.left.id !== null && wallpaperPaint.right !== null) {
      toast("벽지와 페인트는 동시 선택할 수 없습니다.", { theme: "failure", zIndex: 9999 });
      return;
    }

    if (wallPaper.right.id !== null && wallpaperPaint.left !== null) {
      toast("벽지와 페인트는 동시 선택할 수 없습니다.", { theme: "failure", zIndex: 9999 });
      return;
    }

    if (wallPaper.left.id === null && wallPaper.right.id !== null) {
      toast("왼쪽 벽지를 선택해 주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }

    if (wallPaper.left.id !== null && wallPaper.right.id === null) {
      toast("오른쪽 벽지를 선택해 주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }

    if (wallpaperPaint.left === null && wallpaperPaint.right !== null) {
      toast("왼쪽 페인트를 선택해 주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }

    if (wallpaperPaint.left !== null && wallpaperPaint.right === null) {
      toast("오른쪽 페인트를 선택해 주세요.", { theme: "failure", zIndex: 9999 });
      return;
    }

    const updateData = {
      id: postData.id,
      title: data.title,
      content: data.content,
      postImage,
      tileId: tile.id === null ? postData?.tileId : tile.id,
      leftWallpaperId:
        wallpaperPaint.left !== null
          ? null
          : wallPaper.left.id === null
          ? postData?.leftWallpaperId
          : wallPaper.left.id,
      rightWallpaperId:
        wallpaperPaint.right !== null
          ? null
          : wallPaper.right.id === null
          ? postData?.rightWallpaperId
          : wallPaper.right.id,
      leftColorCode:
        wallPaper.left.id !== null
          ? null
          : wallpaperPaint.left === null
          ? postData?.leftColorCode
          : wallpaperPaint.left,
      rightColorCode:
        wallPaper.right.id !== null
          ? null
          : wallpaperPaint.right === null
          ? postData?.rightColorCode
          : wallpaperPaint.right,
    };

    try {
      if (postData.postImage !== null) {
        await deletePostImage(postData.postImage);
      }
      if (imageFile !== null && imageFile !== undefined) {
        const resizePixel = await resizePixelHandler(1000);
        const resizeImageFile = await resizeFile(imageFile, resizePixel);
        if (resizeImageFile === undefined) return;
        await savePostImageHandler({ UUID: fileUuid, resizeImageFile });
      }
      updatePostMutation.mutate(updateData);
      navigate("/community");
    } catch (error) {
      console.error("error :", error);
    }

    resetWallPaper();
    resetWallpaperPaint();
    resetTile();
  };

  useEffect(() => {
    void preFetchPageBeforeEnter("community");
    if (postData === undefined) return;
    setValue("title", postData.title);
    setValue("content", postData.content);
  }, []);

  if (postData === undefined) return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <div className="max-w-[1280px] w-full min-w-[360px] mx-auto px-6 xs:text-[12px] pt-6">
      <Title title="커뮤니티" isBorder={true} pathName="community" />
      <SubTitle type="post" />
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full border-b border-gray06 h-[72px] items-center">
          <label htmlFor="title" className="w-10 text-[18px] font-normal xs:text-[14px]">
            제목
          </label>
          <div className="flex items-center w-full border border-gray05">
            <input
              className="w-full text-[18px] p-2 focus:outline-none xs:text-[14px]"
              {...register("title", {
                required: "제목을 입력해주세요.",
                maxLength: { value: 100, message: "100자 까지만 입력할 수 있습니다!" },
              })}
            />
            <p
              className={`flex-none text-base mr-2 xs:text-[14px] ${
                errors.title?.type === "maxLength" ? "text-error" : "text-gray03"
              }`}
            >
              글자 수: {titleValue.length ?? 0} / 100
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <InvalidText className={"text-base"} errorsMessage={errors.title?.message} />
          <div className="flex">
            <InteriorCombination
              interiorItemId={{
                leftWallpaperId: postData.leftWallpaperId,
                stateLeftWallpaperId: wallPaper.left.id,
                rightWallpaperId: postData.rightWallpaperId,
                stateRightWallpaperId: wallPaper.right.id,
                tileId: postData.tileId,
                stateTileId: tile.id,
                wallpaperPaint: { left: postData.leftColorCode, right: postData.rightColorCode },
                stateWallpaperPaint: { left: wallpaperPaint.left, right: wallpaperPaint.right },
              }}
              type="post"
            />
            <button
              type="button"
              onClick={onOpenModal}
              className="text-[14px] w-[100px] h-10 border border-gray03 rounded-lg"
            >
              조합 변경하기
            </button>
          </div>
        </div>
        <Modal title="인테리어 조합" type="mobile">
          <div className="gap-10 flex-column w-[528px] sm:w-[90%] scale sm:mb-10 sm:min-w-[322px]">
            <InteriorSection />
            <div className="flex justify-end sm:hidden">
              <Button onClick={onCloseModal}>확인</Button>
            </div>
          </div>
        </Modal>
        <textarea
          placeholder="게시물 내용을 입력하세요"
          className="h-[350px] border border-gray06 focus:outline-none p-4 text-[18px] xs:text-[14px] resize-none"
          {...register("content", {
            required: "내용을 입력해주세요.",
            maxLength: { value: 1000, message: "1000자 이내로 작성해 주세요!" },
          })}
        />
        <div className="items-center gap-2 my-2 contents-between">
          <InvalidText className="text-base" errorsMessage={errors.content?.message} />
          <p
            className={`${
              errors.content?.type === "maxLength" ? "text-error" : "text-gray03"
            } flex-none text-base xs:text-[14px]`}
          >
            글자 수: {contentValue.length ?? 0} / 1000
          </p>
        </div>

        {imageFile !== null ? (
          <img src={URL.createObjectURL(imageFile)} alt="미리보기 이미지" className="object-contain w-80" />
        ) : postData?.postImage !== null ? (
          <img src={`${STORAGE_URL}${postData?.postImage}`} alt="포스트 이미지" className="object-contain w-80" />
        ) : null}

        <div className="flex w-full h-[72px] mt-5 border-y border-gray06 contents-center">
          <label htmlFor="img" className="w-32 font-normal body-3">
            첨부파일
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="w-full body-3 focus:outline-none"
            {...register("file", {
              onChange: (e) => {
                imageSizeSaveHandler(e);
              },
            })}
          />
          <button
            type="button"
            onClick={() => {
              resetField("file");
              setImageFile(null);
            }}
            className="w-[160px] h-12 xs:w-[100px] border border-gray-300 rounded-[8px]"
          >
            선택해제
          </button>
        </div>
        <div className="my-10 contents-between sm:flex-column">
          <button
            type="button"
            className="w-[160px] sm:w-full h-12 border border-gray-300 mr-5 rounded-lg"
            onClick={() => {
              navigate("/community");
            }}
          >
            커뮤니티 이동
          </button>
          <div className="sm:flex sm:mt-6">
            <button
              type="button"
              className="w-[160px] sm:w-full h-12 border border-gray-300 mr-5 rounded-lg"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전으로
            </button>
            <button className="bg-point w-[160px] sm:w-full h-12 rounded-lg">수정하기</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
