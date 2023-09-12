import { type ChangeEvent, useState } from "react";

import { CheckBoxIcon, DateConvertor, EmptyData, SubTitle, Title } from "components";
import { useMypageQuery } from "hooks/useMypageQuery";

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
      <Title title="마이페이지" isBorder={false} />
      <SubTitle type="myInquiry" />

      {userInquiryData.length === 0 ? (
        <EmptyData type="myInquiry" />
      ) : (
        <ul className="w-full">
          {userInquiryData?.map((post, index) => {
            return (
              <li key={post.id} className="flex-column contents-center border-y border-gray06 ">
                <div className="flex w-full gap-6 px-6 py-2 sm:px-2 sm:gap-3 contents-center">
                  <input
                    id={post.id}
                    type="checkbox"
                    className="hidden"
                    onChange={(event) => {
                      onChange(event, post.id);
                    }}
                  />
                  <label htmlFor={post.id}>
                    <CheckBoxIcon
                      type="pointColor"
                      isCheck={postIdsToDelete.find((id) => id === post.id) !== undefined}
                    />
                  </label>
                  <p className="flex w-[6%] h-full contents-center">{index + 1}</p>
                  <p className="flex w-[6%] sm:min-w-[9%] h-full contents-center">{post.category}</p>
                  <div className="flex items-center w-full h-full gap-6 sm:flex-column sm:gap-2 sm:justify-start">
                    <p
                      className={`w-3/4 sm:w-full py-2 my-2 ${post.isCheck ? "cursor-pointer" : "cursor-default"}`}
                      onClick={() => {
                        openCommentHandler(post.id);
                      }}
                    >
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between w-1/4 gap-3 sm:w-full">
                      {post.isCheck ? (
                        <button
                          className="px-3 py-1 text-black bg-green-300rounded-2xl"
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
                      <DateConvertor
                        className="flex h-full body-3 text-gray03 sm:body-4"
                        datetime={post.created_at}
                        type={"dotDate"}
                      />
                    </div>
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
        <button onClick={deletePosts} className="w-[100px] h-12 border border-gray05 rounded-lg">
          선택삭제
        </button>
      </div>
    </div>
  );
};
