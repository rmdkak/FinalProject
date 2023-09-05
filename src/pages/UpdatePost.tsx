import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { deletePostImage, savePostImageHandler, storageUrl } from "api/supabase";
import { InteriorSection, InvalidText, Modal } from "components";
import { usePosts } from "hooks";
import { useModalStore, useServiceStore } from "store";

interface Inputs {
  title: string;
  content: string;
  file: FileList;
}

export const UpdatePost = () => {
  const navigate = useNavigate();

  const { fetchDetailMutation, updatePostMutation } = usePosts();
  const { data: postData } = fetchDetailMutation;

  const [previewImg, setPreviewImg] = useState<string | null>(null);

  if (postData === undefined) return <p>데이터를 불러올 수 없습니다.</p>;
  if (postData.postImage === null) return <p>데이터를 불러올 수 없습니다.</p>;

  const { id, title, content, tileId, leftWallpaperId, rightWallpaperId } = postData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const titleValue = watch("title") ?? 0;
  const contentValue = watch("content") ?? 0;
  const { onOpenModal } = useModalStore();
  const { wallPaper, tile, wallpaperPaint } = useServiceStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const postImgFile = data.file[0];
    const fileUuid = uuid();
    const postImage = postImgFile === undefined ? postData.postImage : `/postImg/${fileUuid}`;

    const isInteriorSelected = wallPaper.left.id !== null && wallPaper.right.id !== null;
    const isNotColorCodeSeleted = wallpaperPaint.left === null && wallpaperPaint.right === null;

    const isNotInteriorSelected = wallPaper.left.id === null && wallPaper.right.id === null;
    const isColorCodeSeleted = wallpaperPaint.left !== null && wallpaperPaint.right !== null;

    const updateData = {
      id,
      title: data.title,
      content: data.content,
      postImage,
      tileId: tile.id,
      leftWallpaperId: wallPaper.left.id,
      rightWallpaperId: wallPaper.right.id,
    };

    if (
      (tile.id !== null && isInteriorSelected && isNotColorCodeSeleted) ||
      (tile.id !== null && isNotInteriorSelected && isColorCodeSeleted)
    ) {
      try {
        if (postData.postImage !== null) {
          await deletePostImage(postData.postImage);
        }
        if (postImgFile !== null) {
          await savePostImageHandler({ UUID: fileUuid, postImgFile });
        }
        updatePostMutation.mutate(updateData);
        navigate(-1);
      } catch (error) {
        console.error("error :", error);
      }
    }
  };

  useEffect(() => {
    setValue("title", title);
    setValue("content", content);
  }, []);

  return (
    <div className="w-[1600px] mx-auto mt-[40px]">
      <div className="items-center flex-column">
        <p className="font-medium text-[32px]">커뮤니티</p>
        <div className="w-full border-b-2 border-gray01 mt-[70px]"></div>
      </div>
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full border-b border-gray06 h-[72px] justify-center items-center">
          <label htmlFor="title" className="w-[40px] text-[18px] font-normal">
            제목
          </label>
          <input
            className="w-full h-[48px] text-[20px] px-[24px] py-[12px] border border-gray05 focus:outline-none"
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
        <div className="relative flex items-center justify-end h-[70px] border-y border-gray05 my-[20px]">
          {/* 왼쪽 벽지 */}
          {wallpaperPaint.left !== null ? (
            <div
              className="w-[40px] h-[40px] rounded-full absolute right-[200px]"
              style={{ backgroundColor: wallpaperPaint.left }}
            />
          ) : wallPaper.left.image !== null ? (
            <img
              src={`${storageUrl}${wallPaper.left.image}`}
              alt="왼쪽벽지"
              className="w-[40px] h-[40px] rounded-full absolute right-[200px]"
            />
          ) : leftWallpaperId === null ? (
            <div className="bg-gray06 w-[40px] h-[40px] rounded-full absolute right-[200px] border border-gray01" />
          ) : (
            <img
              src={`${storageUrl}/wallpaper/${leftWallpaperId}`}
              alt="왼쪽벽지"
              className="w-[40px] h-[40px] rounded-full absolute right-[200px]"
            />
          )}
          {/* 오른쪽 벽지 */}
          {wallpaperPaint.right !== null ? (
            <div
              className="w-[40px] h-[40px] rounded-full absolute right-[170px]"
              style={{ backgroundColor: wallpaperPaint.right }}
            />
          ) : wallPaper.right.image !== null ? (
            <img
              src={`${storageUrl}${wallPaper.right.image}`}
              alt="오른쪽벽지"
              className="w-[40px] h-[40px] rounded-full absolute right-[170px]"
            />
          ) : rightWallpaperId === null ? (
            <div className="bg-gray06 w-[40px] h-[40px] rounded-full absolute right-[170px] border border-gray01" />
          ) : (
            <img
              src={`${storageUrl}/wallpaper/${rightWallpaperId}`}
              alt="오른쪽벽지"
              className="w-[40px] h-[40px] rounded-full absolute right-[200px]"
            />
          )}
          {/* 타일 */}
          {tile.image !== null ? (
            <img
              src={`${storageUrl}${tile.image}`}
              alt="바닥재"
              className="w-[40px] h-[40px] rounded-full absolute right-[140px]"
            />
          ) : tileId === null ? (
            <div className="bg-gray06 w-[40px] h-[40px] rounded-full absolute right-[140px] border border-gray01" />
          ) : (
            <img
              src={`${storageUrl}/wallpaper/${tileId}`}
              alt="바닥재"
              className="w-[40px] h-[40px] rounded-full absolute right-[200px]"
            />
          )}
          <button
            type="button"
            onClick={onOpenModal}
            className="text-[13px] w-[130px] h-[40px] gray-outline-button rounded-lg"
          >
            조합 변경하기
          </button>
        </div>
        <Modal title="인테리어 조합">
          <div className="gap-10 flex-column w-[528px]">
            <InteriorSection />
          </div>
        </Modal>
        <textarea
          placeholder="게시물 내용을 입력하세요"
          className="h-[449px] border-[1px] border-[#a7a7a7] focus:outline-none p-[20px] text-[25px] resize-none"
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
            <img src={`${storageUrl}${postData?.postImage}`} alt="포스트 이미지" className="w-[320px] object-contain" />
          )
        ) : (
          <img src={previewImg} alt="미리보기 이미지" className="w-[320px] object-contain" />
        )}
        <div className="flex w-full border-y border-gray06 h-[72px] justify-center items-center mt-[20px]">
          <label htmlFor="img" className="w-[128px] text-[14px] font-normal">
            첨부파일
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="w-full text-[14px] focus:outline-none"
            {...register("file", {
              onChange: (event) => {
                setPreviewImg(URL.createObjectURL(event.target.files[0]));
              },
            })}
          />
        </div>
        <div className="contents-between mt-[40px]">
          <button
            type="button"
            className="w-[160px] h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
            onClick={() => {
              navigate("/community");
            }}
          >
            커뮤니티 이동
          </button>
          <div>
            <button
              type="button"
              className="w-[160px] h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전으로
            </button>
            <button type="submit" className="bg-point w-[160px] h-[48px] rounded-lg">
              작성하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
