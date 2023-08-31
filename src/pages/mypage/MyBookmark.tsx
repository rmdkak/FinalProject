import { type ChangeEvent, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";

import { storageUrl } from "api/supabase";
import { EmptyData, MypageSubTitle, MypageTitle } from "components";
import { useMypage, usePagination } from "hooks";

export const MyBookmark = () => {
  const [bookmarkIdsToDelete, setBookmarkIdsToDelete] = useState<string[]>([]);

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

  if (userBookmarkData === undefined) return <p>에러페이지</p>;

  const { pageData, showPageComponent } = usePagination({
    data: userBookmarkData,
    dataLength: userBookmarkData.length,
    postPerPage: 8,
  });

  return (
    <div className="flex-column items-center mt-[80px] w-[1280px] mx-auto">
      <MypageTitle />
      <MypageSubTitle type="bookmark" />
      {userBookmarkData.length === 0 ? <EmptyData type="bookmark" /> : (
        <ul className="flex flex-wrap gap-y-[64px] gap-x-[40px] w-full mt-[40px]">
          {pageData.map((bookmark) => {
            return (
              <li key={bookmark.id} className="flex contents-center w-[400px] gap-[16px] h-[200px]">
                <div className="relative">
                  {/* 백그라운드 지우고 url 넣기 */}
                  <img src={`공용컴포넌트`} className="w-[324px] h-[196px] rounded-[20px] bg-red-500" />
                  <div className="absolute p-0 bg-white left-[16px] top-[16px] ">
                    <input
                      id={`post.id`}
                      type="checkbox"
                      className="hidden"
                      onChange={(event) => {
                        onChange(event, `post.id`);
                      }}
                    />
                    <label className="" htmlFor={`post.id`}>
                      {bookmarkIdsToDelete.find((id) => id === `post.id`) !== undefined ? (
                        // FIXME 체크박스 흰배경있는 SVG 뽑아서 쓰기
                        <FaRegSquareCheck className="w-[20px] h-[20px] text-black" />
                      ) : (
                        <FaRegSquareCheck className="w-[20px] h-[20px] text-gray05" />
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex-column gap-[20px]">
                  <div className="flex-column gap-[8px]">
                    <p className="text-[14px] font-medium leading-[130%] text-center">벽지</p>
                    {/* FIXME */}
                    {/* <img
                    src={`${storageUrl}/wallpaper/${bookmark.leftWallpaperId as string}`}
                    className="w-[62px] h-[62px] rounded-[12px] bg-blue-500"
                  />
                  <img
                    src={`${storageUrl}/wallpaper/${bookmark.rightWallpaperId as string}`}
                    className="w-[62px] h-[62px] rounded-[12px] bg-blue-500"
                  /> */}
                    <div className="flex">
                      <img
                        src={`${storageUrl}/wallpaper/${bookmark.leftWallpaperId as string}`}
                        className="w-[31px] h-[62px] rounded-l-[12px] bg-blue-500"
                      />
                      <img
                        src={`${storageUrl}/wallpaper/${bookmark.rightWallpaperId as string}`}
                        className="w-[31px] h-[62px] rounded-r-[12px] bg-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex-column gap-[8px]">
                    <p className="text-[14px] font-medium leading-[130%] text-center">바닥재</p>
                    <img
                      src={`${storageUrl}/tile/${bookmark.tileId as string}`}
                      className="w-[62px] h-[62px] rounded-[12px] bg-green-500"
                    />
                  </div>
                </div>
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
