import { type ChangeEvent, useState } from "react";

import { CheckBoxIcon, DateConvertor, EmptyData, MypageSubTitle, MypageTitle } from "components";
import { useMypageQuery } from "hooks";

import { MYPAGE_LAYOUT_STYLE } from "./Mypage";

export const MyInquiry = () => {
  const { userInquiryResponse, deleteUserInquiryMutation } = useMypageQuery();
  const { data: userInquiryData } = userInquiryResponse;

  const [isOpenInquiry, setIsOpenInquiry] = useState<string>();
  const [postIdsToDelete, setPostIdsToDelete] = useState<string[]>([]);

  const openCommentHandler = (commentId: string) => {
    isOpenInquiry !== undefined ? setIsOpenInquiry(undefined) : setIsOpenInquiry(commentId);
  };

  const filteredPostIdsHandler = (selectId: string) => {
    return postIdsToDelete.filter((id) => id !== selectId);
  };

  // 선택 된 아이디 배열 삭제
  const deletePosts = () => {
    deleteUserInquiryMutation.mutate(postIdsToDelete);
  };

  // 체크 상태 변경
  const onChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const filteredPostIds = filteredPostIdsHandler(id);
    if (event.target.checked) {
      setPostIdsToDelete([...postIdsToDelete, id]);
      return;
    }
    if (!event.target.checked) {
      setPostIdsToDelete(filteredPostIds);
    }
  };

  if (userInquiryData === undefined) return <></>;

  return (
    <div className={`${MYPAGE_LAYOUT_STYLE}`}>
      <MypageTitle title="마이페이지" isBorder={false} />
      <MypageSubTitle type="inquiry" />
      {/* 글 목록 */}
      {userInquiryData.length === 0 ? (
        <EmptyData type="inquiry" />
      ) : (
        <ul className="w-full">
          {userInquiryData?.map((post, index) => {
            return (
              <li key={post.id} className="flex-column border-y border-gray06 ">
                <div className="flex gap-6 px-6 contents-center">
                  <input
                    id={post.id}
                    type="checkbox"
                    className="hidden"
                    onChange={(event) => {
                      onChange(event, post.id);
                    }}
                  />
                  <label htmlFor={post.id}>
                    <CheckBoxIcon isCheck={postIdsToDelete.find((id) => id === post.id) !== undefined} />
                  </label>
                  <p className="w-[80px]">{index + 1}</p>
                  <p className="w-[40px]">{post.category}</p>
                  <pre
                    className={`w-[830px] py-2 my-2 ${post.isCheck ? "cursor-pointer" : ""}`}
                    onClick={() => {
                      openCommentHandler(post.id);
                    }}
                  >
                    {post.content}
                  </pre>
                  <div className="flex justify-between gap-3 w-52">
                    {post.isCheck ? (
                      <button
                        className="px-3 py-1 text-black bg-green-300 rounded-2xl"
                        type="button"
                        onClick={() => {
                          openCommentHandler(post.id);
                        }}
                      >
                        답변완료
                      </button>
                    ) : (
                      <p className="px-3 py-1 text-black bg-point rounded-2xl">처리 중</p>
                    )}
                    <DateConvertor className={"w-[100px]"} datetime={post.created_at} type={"dotDate"} />
                  </div>
                </div>
                {post.isCheck && isOpenInquiry === post.id && (
                  <pre className="flex p-6 m-1 border-t contents-center border-gray05 ">{post.adminAnswer}</pre>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* 버튼 박스 */}
      <div className="flex items-center justify-between w-full mt-[68px]">
        <button onClick={deletePosts} className="w-[100px] h-[48px] border border-gray05 rounded-[8px]">
          선택삭제
        </button>
      </div>
    </div>
  );
};
