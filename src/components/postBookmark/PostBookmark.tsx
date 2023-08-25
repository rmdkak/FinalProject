import { useState, useEffect } from "react";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

import { usePostsBookmark } from "hooks";
import { useAuthStore } from "store";

interface FetchPostBookmark {
  postId: string;
  userId: string;
}

interface Props {
  postId: string;
}

export const PostBookmark = ({ postId }: Props) => {
  const [isPostBookmarkedData, setIsPostBookmarkedData] = useState<FetchPostBookmark[]>();
  const { currentSession } = useAuthStore();

  const { postBookmarkResponse, addBookmarkMutation, deleteBookmarkMutation } = usePostsBookmark();
  const { data: currentBookmarkData } = postBookmarkResponse;

  useEffect(() => {
    if (currentBookmarkData == null) return;
    setIsPostBookmarkedData(currentBookmarkData);
  }, [currentBookmarkData, currentSession]);

  let isPostBookmark: FetchPostBookmark | null | undefined = null;
  if (isPostBookmarkedData !== undefined) {
    isPostBookmark = isPostBookmarkedData.find((bookmarkItem) => bookmarkItem.postId === postId);
  }

  return (
    <>
      {isPostBookmark !== undefined ? (
        <RxBookmark
          className="text-[25px] cursor-pointer"
          onClick={async () => {
            if (currentSession === null) {
              alert("북마크 기능은 로그인 후 이용가능합니다.");
              return;
            }
            if (isPostBookmark == null) return;
            deleteBookmarkMutation.mutate({
              postId: isPostBookmark.postId,
              userId: currentSession.user.id,
            });
          }}
        />
      ) : (
        <RxBookmarkFilled
          className="text-[25px] cursor-pointer"
          onClick={async () => {
            if (currentSession === null) {
              alert("북마크 기능은 로그인 후 이용가능합니다.");
              return;
            }
            addBookmarkMutation.mutate({ postId, userId: currentSession.user.id });
          }}
        />
      )}
    </>
  );
};
