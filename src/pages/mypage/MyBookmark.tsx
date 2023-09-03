import { type ChangeEvent, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";

import { storageUrl } from "api/supabase";
import { EmptyData, Modal, MypageSubTitle, MypageTitle } from "components";
import { ShowRoom } from "components/service/ShowRoom";
import { useMypage, usePagination } from "hooks";
import { useModalStore } from "store";

export const MyBookmark = () => {
  const [bookmarkIdsToDelete, setBookmarkIdsToDelete] = useState<string[]>([]);
  const { targetModal, setTargetModal, onOpenModal } = useModalStore();

  const filteredBookmarkIdsHandler = (selectId: string) => {
    return bookmarkIdsToDelete.filter((id) => id !== selectId);
  };

  const { userBookmarksResponse, deleteUserBookmarkMutation } = useMypage();
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

  const createUrl = (type: "tile" | "wallpaper", interiorId: string) => {
    return `${storageUrl}/${type}/${interiorId}`;
  };

  if (userBookmarkData === undefined) return <p>에러페이지</p>;

  const { pageData, showPageComponent } = usePagination({
    data: userBookmarkData,
    dataLength: userBookmarkData.length,
    postPerPage: 8,
  });
  // 디브 전체 라벨로 감싸기
  return (
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <MypageTitle />
      <MypageSubTitle type="bookmark" />
      {userBookmarkData.length === 0 ? (
        <EmptyData type="bookmark" />
      ) : (
        <ul className="flex flex-wrap gap-y-[64px] gap-x-[40px] w-full mt-[40px]">
          {pageData.map((bookmark) => {
            return (
              <li
                key={bookmark.id}
                className="relative border border-gray05 rounded-[12px] w-[400px] gap-[16px] h-[200px]"
              >
                {/* 체크박스 */}
                <div className="absolute bg-white left-[16px] top-[16px] ">
                  <input
                    id={bookmark.id}
                    type="checkbox"
                    className="hidden"
                    onChange={(event) => {
                      onChange(event, bookmark.id);
                    }}
                  />
                  <label className="" htmlFor={bookmark.id}>
                    {bookmarkIdsToDelete.find((id) => id === bookmark.id) !== undefined ? (
                      // FIXME 체크박스 흰배경있는 SVG 뽑아서 쓰기
                      <FaRegSquareCheck className="w-[20px] h-[20px] text-black" />
                    ) : (
                      <FaRegSquareCheck className="w-[20px] h-[20px] text-gray05" />
                    )}
                  </label>
                </div>
                {/* 조합 이미지 */}
                <button
                  onMouseUp={() => {
                    onOpenModal();
                  }}
                  onMouseDown={() => {
                    setTargetModal(bookmark.id);
                  }}
                  className="relative flex w-[300px] mx-auto h-full contents-center"
                >
                  <img
                    src={`${storageUrl}/wallpaper/${bookmark.leftWallpaperId as string}`}
                    className={`absolute translate-x-[-40%] translate-y-[-30%] w-[96px] border-[4px] border-white h-[96px] rounded-full bg-blue-500`}
                  />
                  <img
                    src={`${storageUrl}/wallpaper/${bookmark.rightWallpaperId as string}`}
                    className={`absolute translate-x-[40%] translate-y-[-30%] w-[96px] border-[4px] border-white h-[96px] rounded-full bg-blue-500`}
                  />
                  <img
                    src={`${storageUrl}/tile/${bookmark.tileId as string}`}
                    className={`absolute translate-y-[30%] w-[96px] border-[4px] border-white h-[96px] rounded-full bg-green-500`}
                  />
                </button>
                {targetModal === bookmark.id && (
                  <Modal title="">
                    <p>벽타일 조합 컴포넌트</p>
                    <ShowRoom
                      leftWallpaperBg={createUrl("wallpaper", bookmark.leftWallpaperId)}
                      rightWallpaperBg={createUrl("wallpaper", bookmark.rightWallpaperId)}
                      tileBg={createUrl("tile", bookmark.tileId)}
                    />
                  </Modal>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between w-full mt-[68px]">
        <button onClick={deletePosts} className="w-[100px] h-[48px] border border-gray05 rounded-[8px]">
          선택삭제
        </button>
      </div>
      {/* 페이지네이션 */}
      <div className="mt-[120px]">{showPageComponent}</div>
    </div>
  );
};
