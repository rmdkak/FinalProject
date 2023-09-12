import { useCallback, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { savePostImageHandler } from "api/supabase/postData";
import { STORAGE_URL } from "api/supabase/supabaseClient";
import { Button, InteriorSection, Modal, MypageSubTitle, useDialog } from "components";
import { usePostsQuery } from "hooks/usePostsQuery";
import { debounce } from "lodash";
import { useAuthStore, useModalStore, useServiceStore } from "store";

interface Inputs {
  title: string;
  textarea: string;
  file: FileList;
}
interface WallorTile {
  image: string;
  id: string;
}
interface SelectedData {
  leftWall: WallorTile | null;
  rightWall: WallorTile | null;
  leftWallPaint: string | null;
  rightWallPaint: string | null;
  tile: WallorTile | null;
}

export const Post = () => {
  const { Alert } = useDialog();
  const { currentSession, currentUserId } = useAuthStore();
  const navigate = useNavigate();
  const { onOpenModal, onCloseModal } = useModalStore((state) => state);
  const { createPostMutation } = usePostsQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<Inputs>();
  const {
    wallPaper,
    tile,
    wallpaperPaint,
    resetWallPaper,
    resetWallpaperPaint,
    resetTile,
    setWallPaper,
    setWallpaperPaint,
    setTile,
  } = useServiceStore();

  useEffect(() => {
    const data: SelectedData | null =
      localStorage.getItem("selectedData") !== null ? JSON.parse(localStorage.getItem("selectedData") ?? "") : null;
    if (data !== null) {
      if (data.leftWall !== null && data.rightWall !== null && data.tile !== null) {
        setWallPaper(data.leftWall, "left");
        setWallPaper(data.rightWall, "right");
        setTile(data.tile);
      } else if (data.leftWallPaint !== null && data.rightWallPaint !== null && data.tile !== null) {
        setWallpaperPaint(data.leftWallPaint, "left");
        setWallpaperPaint(data.rightWallPaint, "right");
        setTile(data.tile);
      }
    }
  }, []);

  const title = watch("title") ?? 0;
  const textarea = watch("textarea") ?? 0;

  const titleValidationColor = title.length > 100 ? "text-red-600" : "text-gray03";

  const isInteriorSelected = wallPaper.left.id !== null && wallPaper.right.id !== null;
  const isNotColorCodeSeleted = wallpaperPaint.left === null && wallpaperPaint.right === null;

  const isNotInteriorSelected = wallPaper.left.id === null && wallPaper.right.id === null;
  const isColorCodeSeleted = wallpaperPaint.left !== null && wallpaperPaint.right !== null;

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    debounce(async (data) => {
      const UUID = uuid();
      const postImgFile = data?.file[0];
      const postImage = data?.file[0] == null ? null : `/postImg/${UUID}`;

      if (
        (tile.id !== null && isInteriorSelected && isNotColorCodeSeleted) ||
        (tile.id !== null && isNotInteriorSelected && isColorCodeSeleted) ||
        (tile.id === null && isNotInteriorSelected && isNotColorCodeSeleted)
      ) {
        const postData = {
          id: UUID,
          title: data.title,
          content: data.textarea,
          postImage,
          userId: currentUserId,
          tileId: tile.id,
          leftWallpaperId: wallPaper.left.id,
          rightWallpaperId: wallPaper.right.id,
          leftColorCode: wallpaperPaint.left,
          rightColorCode: wallpaperPaint.right,
        };
        try {
          if (postImgFile !== undefined) {
            await savePostImageHandler({ UUID, postImgFile });
          }
          createPostMutation.mutate(postData);
        } catch (error) {
          console.error("error", error);
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
      localStorage.removeItem("selectedData");
      navigate("/community");
    }, 500),
    [tile.id, wallPaper.left.id, wallPaper.right.id, wallpaperPaint.left, wallpaperPaint.right],
  );

  useEffect(() => {
    if (currentSession === null) {
      navigate("/login");
    }
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
    <div className="w-full max-w-[1280px] min-w-[360px] mx-auto px-6 xs:text-[11px]">
      <div className="items-center py-10 border-b border-black flex-column sm:hidden">
        <p className="font-medium text-[32px]">커뮤니티</p>
      </div>
      <MypageSubTitle type="post" />
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full border-b border-gray06 h-[72px] items-center">
          <label htmlFor="title" className="w-[40px] text-[18px] font-normal sm:text-[14px]">
            제목
          </label>
          <div className="flex items-center w-full border border-gray05">
            <input
              className="w-full text-[18px] px-3 py-2 focus:outline-none xs:text-[14px]"
              {...register("title", { required: true, maxLength: 100 })}
            />
            <div
              className={`${titleValidationColor} flex sm:flex-col sm:w-[140px] sm:text-[13px] items-center justify-end w-[205px]`}
            >
              <p>제목 글자 수: </p>
              <p className="mx-1">{title.length} / 100</p>
            </div>
          </div>
        </div>
        <div className="relative flex justify-between xs:text-[13px] items-center my-3">
          <div>
            {errors.title?.type === "maxLength" ? (
              <div className="text-red-600 xs:w-[100px]">최대 100자 까지만 작성할 수 있습니다!</div>
            ) : errors.title?.type === "required" ? (
              <div className="text-red-600">1자 이상 작성해 주세요.</div>
            ) : (
              <></>
            )}
          </div>
          {wallpaperPaint.left !== null ? (
            <div
              className="w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[170px] xs:right-[150px] border border-gray05"
              style={{ backgroundColor: wallpaperPaint.left }}
            />
          ) : wallPaper.left.image !== null ? (
            <img
              src={`${STORAGE_URL}${wallPaper.left.image}`}
              alt="왼쪽벽지"
              className="w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[170px] xs:right-[150px] border border-gray05"
            />
          ) : (
            <div className="bg-gray06 w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[170px] xs:right-[150px] border border-gray01" />
          )}
          {wallpaperPaint.right !== null ? (
            <div
              className="w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[140px] xs:right-[125px] border border-gray05"
              style={{ backgroundColor: wallpaperPaint.right }}
            />
          ) : wallPaper.right.image !== null ? (
            <img
              src={`${STORAGE_URL}${wallPaper.right.image}`}
              alt="오른쪽벽지"
              className="w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[140px] xs:right-[125px] border border-gray05"
            />
          ) : (
            <div className="bg-gray07 w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[140px] xs:right-[125px] border border-gray01" />
          )}
          {tile.image !== null ? (
            <img
              src={`${STORAGE_URL}${tile.image}`}
              alt="바닥재"
              className="w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[110px] xs:right-[100px] border border-gray05"
            />
          ) : (
            <div className="bg-gray08 w-[40px] h-[40px] xs:w-8 xs:h-8 rounded-full absolute right-[110px] xs:right-[100px] border border-gray01" />
          )}
          <button
            type="button"
            onClick={onOpenModal}
            className="text-[13px] xs:text-[11px] w-[100px] xs:w-[90px] h-[40px] border border-gray03 rounded-[8px]"
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
          className="h-[350px] border border-[#a7a7a7] focus:outline-none p-[20px] text-[18px] xs:text-[14px] resize-none"
          {...register("textarea", { required: true, maxLength: 1000 })}
        />
        <div className="my-5 contents-between">
          {errors.textarea?.type === "maxLength" ? (
            <div className="text-red-600">최대 1000자 이내로 작성해 주세요!</div>
          ) : errors.textarea?.type === "required" ? (
            <div className="text-red-600">최소 1자 이상 작성해 주세요.</div>
          ) : (
            <div></div>
          )}
          <p className={textarea.length > 1000 ? "text-red-600" : "text-gray-400"}>
            내용 글자 수: {textarea.length} / 1000
          </p>
        </div>
        <div className="flex w-full border-y border-gray06 h-[72px] items-center">
          <label htmlFor="img" className="min-w-[60px] text-[14px] xs:text-[11px] font-normal">
            첨부파일
          </label>
          <div className="flex items-center justify-between w-full">
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              className="w-[170px] xs:w-[150px] text-[14px] xs:text-[11px] focus:outline-none"
              {...register("file")}
            />
            <button
              type="button"
              onClick={() => {
                resetField("file");
              }}
              className="w-[160px] h-[48px] xs:w-[100px] border border-gray-300 rounded-[8px]"
            >
              선택해제
            </button>
          </div>
        </div>
        <div className="my-10 contents-between sm:flex-column">
          <button
            type="button"
            className="w-[160px] sm:w-full h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
            onClick={() => {
              movePageHandler("community");
            }}
          >
            커뮤니티 이동
          </button>
          <div className="sm:flex sm:mt-6">
            <button
              type="button"
              className="w-[160px] sm:w-full h-[48px] border border-gray-300 mr-[20px] rounded-[8px]"
              onClick={() => {
                movePageHandler("back");
              }}
            >
              이전으로
            </button>
            <button type="submit" className="bg-point w-[160px] sm:w-full h-[48px] rounded-[8px]">
              작성하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
