import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Comments, DetailSideFunction, DetailSkeleton, PostData, Share } from "components";
import { useMovePage, usePostsQuery } from "hooks";
import { useLikeStore } from "store";

export const Detail = () => {
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const { setCurrentPathname } = useMovePage();
  setCurrentPathname();
  const { id: paramsId } = useParams();
  const { resetDetailPostId, setDetailPostId } = useLikeStore();
  const { fetchDetailMutation } = usePostsQuery();
  const { data: postData, isLoading } = fetchDetailMutation;

  useEffect(() => {
    setDetailPostId(paramsId);
    return () => {
      resetDetailPostId();
    };
  }, [paramsId]);

  const { PrevNextPostList, DetailSideBar } = DetailSideFunction({ paramsId, postData });

  if (isLoading) return <DetailSkeleton />;

  if (postData === undefined) return <></>;
  return (
    <div className="w-[1280px] mx-auto mt-[30px]">
      <PostData postData={postData} />
      <Comments postData={postData} />
      <PrevNextPostList />
      <DetailSideBar setOpenShareModal={setOpenShareModal} />
      {openShareModal && <Share setOpenShareModal={setOpenShareModal} />}
    </div>
  );
};
