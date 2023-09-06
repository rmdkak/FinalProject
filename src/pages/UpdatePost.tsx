import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { deletePostImage, savePostImageHandler, storageUrl } from "api/supabase";
import { Button, InteriorSection, InvalidText, Modal, useDialog } from "components";
import { usePosts } from "hooks";
import { useModalStore, useServiceStore } from "store";

interface Inputs {
  title: string;
  content: string;
  file: FileList;
}

export const UpdatePost = () => {
  const { Alert } = useDialog();
  const navigate = useNavigate();
  const { fetchDetailMutation, updatePostMutation } = usePosts();
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

  const isInteriorSelected = wallPaper.left.id !== null && wallPaper.right.id !== null;
  const isNotColorCodeSeleted = wallpaperPaint.left === null && wallpaperPaint.right === null;

  const isNotInteriorSelected = wallPaper.left.id === null && wallPaper.right.id === null;
  const isColorCodeSeleted = wallpaperPaint.left !== null && wallpaperPaint.right !== null;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (postData === undefined) return;
    const postImgFile = data.file[0];
    const fileUuid = uuid();
    const postImage = postImgFile === undefined ? postData.postImage : `/postImg/${fileUuid}`;

    if (
      (tile.id !== null && isInteriorSelected && isNotColorCodeSeleted) ||
      (tile.id !== null && isNotInteriorSelected && isColorCodeSeleted) ||
      (tile.id === null && isNotInteriorSelected && isNotColorCodeSeleted)
    ) {
      const updateData = {
        id: postData.id,
        title: data.title,
        content: data.content,
        postImage,
        tileId: tile.id === null ? postData?.tileId : tile.id,
        leftWallpaperId: wallPaper.left.id === null ? postData?.leftWallpaperId : wallPaper.left.id,
        rightWallpaperId: wallPaper.right.id === null ? postData?.rightWallpaperId : wallPaper.right.id,
        leftColorCode: wallpaperPaint.left === null ? postData?.leftColorCode : wallpaperPaint.left,
        rightColorCode: wallpaperPaint.right === null ? postData?.rightColorCode : wallpaperPaint.right,
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
    } else {
      if (tile.id === null) {
        await Alert("타일이 선택되지 않았습니다.");
        return;
      } else if (wallPaper.left.id === null && wallpaperPaint.left === "") {
        await Alert(`왼쪽 벽이 선택되지 않았습니다.`);
        return;
      } else if (wallPaper.right.id === null && wallpaperPaint.right === "") {
        await Alert(`오른쪽 벽이 선택되지 않았습니다.`);
        return;
      }
    }
    resetWallPaper();
    resetWallpaperPaint();
    resetTile();
  };

  useEffect(() => {
    if (postData === undefined) return;
    setValue("title", postData.title);
    setValue("content", postData.content);
  }, []);
  if (postData === undefined) return <p>데이터를 불러올 수 없습니다.</p>;
  return (
    <div className="w-[1280px] mx-auto mt-10">
      <div className="items-center flex-column">
        <p className="font-medium text-[32px]">커뮤니티</p>
        <div className="w-full border-b-2 border-gray01 mt-[70px]"></div>
      </div>
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full border-b border-gray06 h-[72px] justify-center items-center">
          <label htmlFor="title" className="w-10 text-[18px] font-normal">
            제목
          </label>
          <input
            className="w-full h-12 text-[20px] px-6 py-3 border border-gray05 focus:outline-none"
            {...register("title", {
              required: "제목을 입력해주세요",
              maxLength: { value: 100, message: "제목은 최대 100자 까지만 입력할 수 있습니다!" },
            })}
          />
        </div>
        <div className="mt-2 contents-between">
          <InvalidText className={"text-base"} errorsMessage={errors.title?.message} />
          <p className={`${errors.title?.type === "maxLength" ? "text-error" : "text-gray03"} flex-none text-base`}>
            제목 글자 수: {titleValue.length ?? 0} / 100
          </p>
        </div>
        <div className="relative flex items-center justify-end h-[70px] border-y border-gray05 my-5">
          {/* 왼쪽 벽지 */}
          {wallpaperPaint.left !== null ? (
            <div
              className="w-10 h-10 rounded-full absolute right-[200px] border border-gray05"
              style={{ backgroundColor: wallpaperPaint.left }}
            />
          ) : wallPaper.left.image !== null ? (
            <img
              src={`${storageUrl}${wallPaper.left.image}`}
              alt="왼쪽벽지"
              className="w-10 h-10 rounded-full absolute right-[200px] border border-gray05"
            />
          ) : postData.leftWallpaperId === null ? (
            <div className="bg-gray06 w-10 h-10 rounded-full absolute right-[200px] border border-gray01" />
          ) : (
            <img
              src={`${storageUrl}/wallpaper/${postData.leftWallpaperId}`}
              alt="왼쪽벽지"
              className="w-10 h-10 rounded-full absolute right-[200px] border border-gray05"
            />
          )}
          {/* 오른쪽 벽지 */}
          {wallpaperPaint.right !== null ? (
            <div
              className="w-10 h-10 rounded-full absolute right-[170px] border border-gray05"
              style={{ backgroundColor: wallpaperPaint.right }}
            />
          ) : wallPaper.right.image !== null ? (
            <img
              src={`${storageUrl}${wallPaper.right.image}`}
              alt="오른쪽벽지"
              className="w-10 h-10 rounded-full absolute right-[170px] border border-gray05"
            />
          ) : postData.rightWallpaperId === null ? (
            <div className="bg-gray06 w-10 h-10 rounded-full absolute right-[170px] border border-gray01" />
          ) : (
            <img
              src={`${storageUrl}/wallpaper/${postData.rightWallpaperId}`}
              alt="오른쪽벽지"
              className="w-10 h-10 rounded-full absolute right-[170px] border border-gray05"
            />
          )}
          {/* 타일 */}
          {tile.image !== null ? (
            <img
              src={`${storageUrl}${tile.image}`}
              alt="바닥재"
              className="w-10 h-10 rounded-full absolute right-[140px] border border-gray05"
            />
          ) : postData.tileId === null ? (
            <div className="bg-gray06 w-10 h-10 rounded-full absolute right-[140px] border border-gray01" />
          ) : (
            <img
              src={`${storageUrl}/tile/${postData.tileId}`}
              alt="바닥재"
              className="w-10 h-10 rounded-full absolute right-[140px] border border-gray05"
            />
          )}
          <button
            type="button"
            onClick={onOpenModal}
            className="text-[13px] w-[130px] h-10 gray-outline-button rounded-lg"
          >
            조합 변경하기
          </button>
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
          className="h-[449px] border border-gray06 focus:outline-none p-5 text-[25px] resize-none"
          {...register("content", {
            required: "내용을 입력해주세요.",
            maxLength: { value: 1000, message: "내용은 1000자 이내로 작성해 주세요!" },
          })}
        />
        <div className="mt-2 contents-between">
          <InvalidText className="text-base " errorsMessage={errors.content?.message} />
          <p className={`${errors.content?.type === "maxLength" ? "text-error" : "text-gray-400"} flex-none text-base`}>
            내용 글자 수: {contentValue.length ?? 0} / 1000
          </p>
        </div>
        {previewImg === null ? (
          postData?.postImage === null ? null : (
            <img src={`${storageUrl}${postData?.postImage}`} alt="포스트 이미지" className="object-contain w-80" />
          )
        ) : (
          <img src={previewImg} alt="미리보기 이미지" className="object-contain w-80" />
        )}
        <div className="flex w-full border-y border-gray06 h-[72px] justify-center items-center mt-5">
          <label htmlFor="img" className="w-32 font-normal body-3">
            첨부파일
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="w-full body-3 focus:outline-none"
            {...register("file", {
              onChange: (event) => {
                setPreviewImg(URL.createObjectURL(event.target.files[0]));
              },
            })}
          />
        </div>
        <div className="my-[60px] contents-between">
          <button
            type="button"
            className="w-40 h-12 mr-5 border border-gray-300 rounded-lg"
            onClick={() => {
              navigate("/community");
            }}
          >
            커뮤니티 이동
          </button>
          <div>
            <button
              type="button"
              className="w-40 h-12 mr-5 border border-gray-300 rounded-lg"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전으로
            </button>
            <button type="submit" className="bg-point w-[160px] h-12 rounded-lg">
              수정하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
