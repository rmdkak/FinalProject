import { type ChangeEvent, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { deletePostImage, savePostImageHandler } from "api/supabase/postData";
import { STORAGE_URL } from "api/supabase/supabaseClient";
import {
  Button,
  InteriorCombination,
  InteriorSection,
  InvalidText,
  Modal,
  MypageSubTitle,
  Title,
  useDialog,
} from "components";
import { usePostsQuery } from "hooks/usePostsQuery";
import { useModalStore, useServiceStore } from "store";

interface Inputs {
  title: string;
  content: string;
  file: FileList;
}

export const UpdatePost = () => {
  const { Alert } = useDialog();
  const navigate = useNavigate();
  const { fetchDetailMutation, updatePostMutation } = usePostsQuery();
  const { data: postData } = fetchDetailMutation;

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });
  const titleValue = watch("title") ?? 0;
  const contentValue = watch("content") ?? 0;
  const { onOpenModal, onCloseModal } = useModalStore();
  const { wallPaper, tile, wallpaperPaint, resetWallPaper, resetWallpaperPaint, resetTile } = useServiceStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (postData === undefined) return;
    const postImgFile = data.file[0];
    const fileUuid = uuid();
    const postImage = postImgFile === undefined ? postData.postImage : `/postImg/${fileUuid}`;

    if (wallPaper.left.id !== null && wallpaperPaint.right !== null) {
      await Alert("벽지와 페인트는 동시 선택할 수 없습니다.");
      return;
    }

    if (wallPaper.right.id !== null && wallpaperPaint.left !== null) {
      await Alert("벽지와 페인트는 동시 선택할 수 없습니다.");
      return;
    }

    if (wallPaper.left.id === null && wallPaper.right.id !== null) {
      await Alert("왼쪽 벽지를 선택해 주세요.");
      return;
    }

    if (wallPaper.left.id !== null && wallPaper.right.id === null) {
      await Alert("오른쪽 벽지를 선택해 주세요.");
      return;
    }

    if (wallpaperPaint.left === null && wallpaperPaint.right !== null) {
      await Alert("왼쪽 페인트를 선택해 주세요.");
      return;
    }

    if (wallpaperPaint.left !== null && wallpaperPaint.right === null) {
      await Alert("오른쪽 페인트를 선택해 주세요.");
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
      if (postImgFile !== null) {
        await savePostImageHandler({ UUID: fileUuid, postImgFile });
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

  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setPreviewImg(URL.createObjectURL(event.target.files[0]));
  };

  const moveToCommunity = () => {
    navigate("community");
  };

  const moveToBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (postData === undefined) return;
    setValue("title", postData.title);
    setValue("content", postData.content);
  }, []);

  if (postData === undefined) return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <div className="max-w-[1280px] w-[85%] mx-auto mt-10">
      <Title title="커뮤니티" isBorder={true} />
      <MypageSubTitle type="post" />
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full border-b border-gray06 h-[72px] items-center">
          <label htmlFor="title" className="w-10 text-[18px] font-normal">
            제목
          </label>
          <div className="flex items-center w-full border border-gray05">
            <input
              className="w-full text-[18px] px-3 py-2 focus:outline-none"
              {...register("title", {
                required: "제목을 입력해주세요",
                maxLength: { value: 100, message: "제목은 최대 100자 까지만 입력할 수 있습니다!" },
              })}
            />
            <p
              className={`flex-none text-base w-[160px] ${
                errors.title?.type === "maxLength" ? "text-error" : "text-gray03"
              }`}
            >
              제목 글자 수: {titleValue.length ?? 0} / 100
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end my-3">
          <InvalidText className={"text-base "} errorsMessage={errors.title?.message} />
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
              className="text-[13px] w-[130px] h-10 gray-outline-button rounded-lg"
            >
              조합 변경하기
            </button>
          </div>
        </div>
        <Modal title="인테리어 조합">
          <div className="gap-10 flex-column w-[528px]">
            <InteriorSection />
            <div className="flex justify-end">
              <Button onClick={onCloseModal}>확인</Button>
            </div>
          </div>
        </Modal>
        <textarea
          placeholder="게시물 내용을 입력하세요"
          className="h-[350px] border border-gray06 focus:outline-none p-5 text-[18px] resize-none"
          {...register("content", {
            required: "내용을 입력해주세요.",
            maxLength: { value: 1000, message: "내용은 1000자 이내로 작성해 주세요!" },
          })}
        />
        <div className="mt-2 contents-between">
          <InvalidText className="text-base" errorsMessage={errors.content?.message} />
          <p className={`${errors.content?.type === "maxLength" ? "text-error" : "text-gray03"} flex-none text-base`}>
            내용 글자 수: {contentValue.length ?? 0} / 1000
          </p>
        </div>

        {previewImg !== null ? (
          <img src={previewImg} alt="미리보기 이미지" className="object-contain w-80" />
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
            {...register("file", { onChange: onFileChangeHandler })}
          />
        </div>
        <div className="my-10 contents-between">
          <button type="button" className="w-40 h-12 rounded-lg gray-outline-button" onClick={moveToCommunity}>
            커뮤니티 이동
          </button>
          <div className="flex gap-5">
            <button type="button" className="w-40 h-12 rounded-lg gray-outline-button" onClick={moveToBack}>
              이전으로
            </button>
            <button className="w-40 h-12 rounded-lg point-button">수정하기</button>
          </div>
        </div>
      </form>
    </div>
  );
};
