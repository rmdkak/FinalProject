import { type ChangeEvent, useState } from "react";

import { CheckBoxIcon, EmptyData, InteriorCombination, Modal, MypageSubTitle, Title } from "components";
import { ShowRoom } from "components/service/ShowRoom";
import { useMypageQuery } from "hooks/useMypageQuery";
import { usePagination } from "hooks/usePagination";
import { useModalStore } from "store";

import { MYPAGE_LAYOUT_STYLE } from "./Mypage";

export const MyBookmark = () => {
  const [bookmarkIdsToDelete, setBookmarkIdsToDelete] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { targetModal, setTargetModal, onOpenModal } = useModalStore();

  const filteredBookmarkIdsHandler = (selectId: string) => {
    return bookmarkIdsToDelete.filter((id) => id !== selectId);
  };

  const { userBookmarksResponse, deleteUserBookmarkMutation } = useMypageQuery();
  const { data: userBookmarkData } = userBookmarksResponse;

  const deletePosts = () => {
    deleteUserBookmarkMutation.mutate(bookmarkIdsToDelete);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const filteredBookmarkIds = filteredBookmarkIdsHandler(id);
    if (event.target.checked) {
      setBookmarkIdsToDelete([...bookmarkIdsToDelete, id]);
      return;
    }
    if (!event.target.checked) {
      setBookmarkIdsToDelete(filteredBookmarkIds);
    }
  };

  const { pageData, showPageComponent } = usePagination({
    data: userBookmarkData,
    dataLength: userBookmarkData === undefined ? 0 : userBookmarkData.length,
    postPerPage: 8,
  });

  return (
    <div className={MYPAGE_LAYOUT_STYLE}>
      <Title title="마이페이지" isBorder={false} />
      <MypageSubTitle type="bookmark" />
      {pageData.length === 0 ? (
        <EmptyData type="bookmark" />
      ) : (
        <ul className="flex flex-wrap justify-center w-full mt-10 gap-y-16 gap-x-10 sm:gap-0">
          {pageData.map((bookmark) => {
            const { leftWallpaperId, rightWallpaperId, tileId } = bookmark;
            const isSelectBookmark = bookmarkIdsToDelete.find((id) => id === bookmark.id) !== undefined;
            return (
              <li key={bookmark.id} className="relative w-56 h-40 gap-4 sm:w-1/3 sm:h-20">
                {isDeleteMode && (
                  <div className="relative w-full h-full">
                    <input
                      id={bookmark.id}
                      type="checkbox"
                      className="hidden"
                      onChange={(event) => {
                        onChange(event, bookmark.id);
                      }}
                    />
                    <label
                      className={`absolute left-4 top-4 flex w-full h-full ${isDeleteMode && "z-10"}`}
                      htmlFor={bookmark.id}
                    >
                      <CheckBoxIcon isCheck={isSelectBookmark} type="black" />
                    </label>
                  </div>
                )}

                <button
                  onMouseUp={() => {
                    if (isDeleteMode) return;
                    onOpenModal();
                  }}
                  onMouseDown={() => {
                    if (isDeleteMode) return;
                    setTargetModal(bookmark.id);
                  }}
                  className={`absolute top-0 flex w-full h-full mx-auto contents-center ${isDeleteMode ? "z-0" : ""}`}
                >
                  <InteriorCombination type="mypage" interiorItemId={{ leftWallpaperId, rightWallpaperId, tileId }} />
                </button>

                {targetModal === bookmark.id && (
                  <Modal title="">
                    <ShowRoom
                      leftWallpaperBg={bookmark.leftWallpaperId}
                      rightWallpaperBg={bookmark.rightWallpaperId}
                      tileBg={bookmark.tileId}
                      page={"mypage"}
                    />
                  </Modal>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center w-full mt-16">
        {isDeleteMode ? (
          <div className="flex w-full gap-3">
            <button
              onClick={() => {
                setIsDeleteMode(false);
                setBookmarkIdsToDelete([]);
              }}
              className="w-24 h-12 rounded-lg gray-outline-button body-3 sm:w-1/2"
            >
              취소하기
            </button>
            <button onClick={deletePosts} className="w-24 h-12 rounded-lg point-button body-3 sm:w-1/2">
              선택삭제
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsDeleteMode(true);
            }}
            className="w-24 h-12 rounded-lg gray-outline-button body-3 sm:w-full"
          >
            편집하기
          </button>
        )}
      </div>
      <div className="mt-[120px] sm:mt-16">{showPageComponent}</div>
    </div>
  );
};
