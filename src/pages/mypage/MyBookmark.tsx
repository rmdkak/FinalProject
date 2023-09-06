import { type ChangeEvent, useState } from "react";

import checkboxtrue from "assets/svgs/checkboxtrue.svg";
import ckeckboxfalse from "assets/svgs/ckeckboxfalse.svg";
import { EmptyData, Modal, MypageSubTitle, MypageTitle, PreviewItem } from "components";
import { ShowRoom } from "components/service/ShowRoom";
import { useMypageQuery, usePagination } from "hooks";
import { useModalStore } from "store";

export const MyBookmark = () => {
  const [bookmarkIdsToDelete, setBookmarkIdsToDelete] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { targetModal, setTargetModal, onOpenModal } = useModalStore();

  const filteredBookmarkIdsHandler = (selectId: string) => {
    return bookmarkIdsToDelete.filter((id) => id !== selectId);
  };

  const { userBookmarksResponse, deleteUserBookmarkMutation } = useMypageQuery();
  const { data: userBookmarkData } = userBookmarksResponse;

  // 선택 된 아이디 배열 삭제
  const deletePosts = () => {
    deleteUserBookmarkMutation.mutate(bookmarkIdsToDelete);
  };

  // 체크 상태 변경
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
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <MypageTitle />
      <MypageSubTitle type="bookmark" />
      {pageData.length === 0 ? (
        <EmptyData type="bookmark" />
      ) : (
        <ul className="flex flex-wrap gap-y-[64px] gap-x-[40px] w-full mt-[40px]">
          {pageData.map((bookmark) => {
            return (
              <li
                key={bookmark.id}
                className={`relative border ${
                  bookmarkIdsToDelete.find((id) => id === bookmark.id) === undefined ? "border-gray05" : "border-black"
                } rounded-[12px] w-[400px] gap-[16px] h-[200px]`}
              >
                {/* 체크박스 */}
                {isDeleteMode ? (
                  <div className="w-full h-full">
                    <input
                      id={bookmark.id}
                      type="checkbox"
                      className="hidden"
                      onChange={(event) => {
                        onChange(event, bookmark.id);
                      }}
                    />
                    <label
                      className={`relative flex w-full h-full ${isDeleteMode ? "z-[1]" : ""}`}
                      htmlFor={bookmark.id}
                    >
                      {bookmarkIdsToDelete.find((id) => id === bookmark.id) !== undefined ? (
                        <img className="absolute bg-white left-[16px] top-[16px]" src={checkboxtrue} alt="checkbox" />
                      ) : (
                        <img className="absolute bg-white left-[16px] top-[16px]" src={ckeckboxfalse} alt="checkbox" />
                      )}
                    </label>
                  </div>
                ) : null}

                {/* 조합 이미지 */}

                <button
                  onMouseUp={() => {
                    if (isDeleteMode) return;
                    onOpenModal();
                  }}
                  onMouseDown={() => {
                    if (isDeleteMode) return;
                    setTargetModal(bookmark.id);
                  }}
                  className={`absolute top-0 flex w-full h-full mx-auto contents-center ${isDeleteMode ? "z-[0]" : ""}`}
                >
                  <PreviewItem
                    leftWallpaperId={bookmark.leftWallpaperId}
                    rightWallpaperId={bookmark.rightWallpaperId}
                    tileId={bookmark.tileId}
                  />
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

      <div className="flex items-center w-full mt-[68px]">
        {isDeleteMode ? (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsDeleteMode(false);
                setBookmarkIdsToDelete([]);
              }}
              className="w-24 h-12 rounded-lg gray-outline-button body-3"
            >
              취소
            </button>
            <button onClick={deletePosts} className="w-24 h-12 rounded-lg point-button body-3">
              선택삭제
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsDeleteMode(true);
            }}
            className="w-24 h-12 rounded-lg gray-outline-button body-3"
          >
            편집
          </button>
        )}
      </div>
      {/* 페이지네이션 */}
      <div className="mt-[120px]">{showPageComponent}</div>
    </div>
  );
};
