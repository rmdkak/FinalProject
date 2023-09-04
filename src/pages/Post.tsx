import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { savePostImageHandler, storageUrl } from "api/supabase";
import { Button, InteriorSection, Modal, useDialog } from "components";
import { usePosts } from "hooks";
import { useAuthStore, useModalStore, useServiceStore } from "store";

interface Inputs {
  title: string;
  textarea: string;
  file: FileList;
}
export const Post = () => {
  const { Alert } = useDialog();
  const { currentSession } = useAuthStore();
  const userId = currentSession?.user.id;
  const nickname = currentSession?.user.user_metadata.name;
  const navigate = useNavigate();
  const { onOpenModal, onCloseModal } = useModalStore((state) => state);
  const { createPostMutation } = usePosts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const title = watch("title") ?? 0;
  const textarea = watch("textarea") ?? 0;
  const { wallPaper, tile, wallpaperPaint, resetWallPaper, resetWallpaperPaint, resetTile } = useServiceStore();

  const isInteriorSelected = wallPaper.left.id !== null && wallPaper.right.id !== null;
  const isNotColorCodeSeleted = wallpaperPaint.left === null && wallpaperPaint.right === null;

  const isNotInteriorSelected = wallPaper.left.id === null && wallPaper.right.id === null;
  const isColorCodeSeleted = wallpaperPaint.left !== null && wallpaperPaint.right !== null;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const UUID = uuid();
    const postImgfile = data.file[0];
    const postImage = data.file[0] == null ? null : `/postImg/${UUID}`;

    if (
      (tile.id !== null && isInteriorSelected && isNotColorCodeSeleted) ||
      (tile.id !== null && isNotInteriorSelected && isColorCodeSeleted)
    ) {
      const postData = {
        id: UUID,
        title: data.title,
        content: data.textarea,
        bookmark: 0,
        nickname,
        postImage,
        userId,
        tileId: tile.id,
        leftWallpaperId: wallPaper.left.id,
        rightWallpaperId: wallPaper.right.id,
        leftColorCode: wallpaperPaint.left,
        rightColorCode: wallpaperPaint.right,
      };
      try {
        await savePostImageHandler({ UUID, postImgfile });
        createPostMutation.mutate(postData);
      } catch (error) {
        console.log("error", error);
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
      return;
    }
    resetWallPaper();
    resetWallpaperPaint();
    resetTile();
    navigate("/community");
  };

  useEffect(() => {
    if (currentSession === null) navigate("/login");
  }, [currentSession]);

  const movePageHandler = (moveEvent: string) => {
    switch (moveEvent) {
      case "back":
        navigate(-1);
        break;
      case "community":
        navigate("/community");
        break;
    }
  };

  return (
    <div className="w-[1280px] mx-auto mt-[40px]">
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
            {...register("title", { required: true, maxLength: 100 })}
          />
        </div>
        <div className="mt-2 contents-between">
          {errors.title?.type === "maxLength" ? (
            <div className="text-red-600">제목은 최대 100자 까지만 입력할 수 있습니다!</div>
          ) : errors.title?.type === "required" ? (
            <div className="text-red-600">제목은 최소 1자 이상 작성해 주세요.</div>
          ) : (
            <div></div>
          )}
          <p className={title.length > 100 ? "text-red-600" : "text-gray03"}>제목 글자 수: {title.length} / 100</p>
        </div>
        <div className="relative flex items-center justify-end h-[70px] border-y border-gray05 my-[20px]">
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
          ) : (
            <div className="bg-gray06 w-[40px] h-[40px] rounded-full absolute right-[200px] border border-gray01" />
          )}
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
          ) : (
            <div className="bg-gray07 w-[40px] h-[40px] rounded-full absolute right-[170px] border border-gray01" />
          )}
          {tile.image !== null ? (
            <img
              src={`${storageUrl}${tile.image}`}
              alt="바닥재"
              className="w-[40px] h-[40px] rounded-full absolute right-[140px]"
            />
          ) : (
            <div className="bg-gray08 w-[40px] h-[40px] rounded-full absolute right-[140px] border border-gray01" />
          )}
          <button
            type="button"
            onClick={onOpenModal}
            className="text-[13px] w-[130px] h-[40px] border border-gray03 rounded-[8px]"
          >
            조합 추가하기 +
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
          className="h-[449px] border-[1px] border-[#a7a7a7] focus:outline-none p-[20px] text-[25px]"
          {...register("textarea", { required: true, maxLength: 1000 })}
        />
        <div className="mt-2 contents-between">
          {errors.textarea?.type === "maxLength" ? (
            <div className="text-red-600">내용은 1000자 이내로 작성해 주세요!</div>
          ) : errors.textarea?.type === "required" ? (
            <div className="text-red-600">내용은 최소 1자 이상 작성해 주세요.</div>
          ) : (
            <div></div>
          )}
          <p className={textarea.length > 1000 ? "text-red-600" : "text-gray-400"}>
            내용 글자 수: {textarea.length} / 1000
          </p>
        </div>
        <div className="flex w-full border-y border-gray06 h-[72px] justify-center items-center mt-[20px]">
          <label htmlFor="img" className="w-[128px] text-[14px] font-normal">
            첨부파일
          </label>
          <input type="file" className="w-full text-[14px] focus:outline-none" {...register("file")} />
        </div>
        <div className="my-[60px] contents-between">
          <button
            type="button"
            className="w-[160px] h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
            onClick={() => {
              movePageHandler("community");
            }}
          >
            커뮤니티 이동
          </button>
          <div>
            <button
              type="button"
              className="w-[160px] h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
              onClick={() => {
                movePageHandler("back");
              }}
            >
              이전으로
            </button>
            <button type="submit" className="bg-point w-[160px] h-[48px] rounded-[8px]">
              작성하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
