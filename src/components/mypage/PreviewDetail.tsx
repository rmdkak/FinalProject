import { useState, Fragment } from "react"
import { Link } from "react-router-dom";

import { storageUrl } from "api/supabase";
import arrowIcon from "assets/arrowIcon.svg";
import { DateConvertor } from "components"
import { type Tables } from "types/supabase"

interface Props {
  postData: Array<Tables<"POSTS", "Row">> | undefined;
  commentData: Array<Tables<"COMMENTS", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }> | undefined;
  bookmarkData: Array<Tables<"BOOKMARKS", "Row">> | undefined;
  likeData: Array<Tables<"POSTLIKES", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }> | undefined;
}

const outerBoxStyle = "flex-column h-[130px]"
const innerBoxStyle = "w-full h-[64px] flex justify-between items-center px-[24px]"
const linkStyle = "text-black cursor-pointer body-3 hover:text-gray03"
const dateStyle = "text-gray02 body-3"

export const PreviewPost = ({ postData }: Pick<Props, "postData">) => {
  if (postData === undefined) return <PreviewEmpty />
  return (
    <ul className={outerBoxStyle}>
      {postData.length === 0 ? <PreviewEmpty /> : null}
      {postData.map((post) => {
        return (
          <li key={post.id} className={innerBoxStyle}>
            <Link to={`/detail/${post.id}`} className={linkStyle}>{post.content}</Link>
            <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
          </li>
        )
      })}
    </ul>
  )
}

export const PreviewComment = ({ commentData }: Pick<Props, "commentData">) => {
  if (commentData === undefined) return <PreviewEmpty />
  const [isOpenComment, setIsOpenComment] = useState<string>();
  const openCommentHandler = (commentId: string) => {
    setIsOpenComment(commentId);
  };
  return (
    <ul className="flex-column h-[255px]">
      {commentData.length === 0 ? <PreviewEmpty /> : null}
      {commentData.map((comment) => {
        const { POSTS: post } = comment
        return (
          <Fragment key={comment.id}>
            {post !== null && (
              <li key={comment.id} className="flex-column contents-center border-y border-gray06">
                {/* 포스트 */}
                <div className="flex contents-center w-full border-y border-gray06 gap-[24px] h-[64px] px-[24px]">
                  {/* 체크 박스 */}
                  <div className="flex items-center justify-between gap-[24px] w-full h-full cursor-pointer" onClick={() => {
                    isOpenComment === comment.id ? openCommentHandler("") : openCommentHandler(comment.id)
                  }}>
                    <Link to={`/detail/${post.id}`} className={linkStyle}>{post.title}</Link>
                    <div className="flex">
                      <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
                      <button className="flex contents-center w-[16px] h-[16px] ml-[12px]">
                        {isOpenComment === comment.id ? (
                          <img className="rotate-180" src={arrowIcon}
                            onClick={() => { openCommentHandler("") }}
                          />
                        ) : (
                          <img src={arrowIcon}
                            onClick={() => { openCommentHandler(comment.id) }}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {/* 댓글 */}
                {isOpenComment === comment.id && (
                  <div className="flex items-center justify-between w-full h-[120px] p-[24px]">
                    <p className="flex self-start">{comment.content}</p>
                    <div className="flex contents-center gap-[12px]">
                      <DateConvertor datetime={comment.created_at} type={"dotDate"} />
                      <button className="w-[80px] h-[32px] border border-gray05 text-gray05 rounded-[8px] hover:border-black hover:text-black">수정</button>
                    </div>
                  </div>
                )}
              </li>
            )}
          </Fragment>
        )
      })}
    </ul >
  )
}

export const PreviewBookmark = ({ bookmarkData }: Pick<Props, "bookmarkData">) => {
  if (bookmarkData === undefined) return <PreviewEmpty />
  return (
    <ul className="flex h-[240px]">
      {bookmarkData.length === 0 ? <PreviewEmpty /> : null}
      {bookmarkData.map((bookmark) => {
        return (
          <li key={bookmark.id} className="flex contents-center w-[400px] gap-[16px] h-[200px] mt-[40px] mx-[20px]">
            <div className="relative">
              {/* 백그라운드 지우고 url 넣기 */}
              <img src={`공용컴포넌트`} className="w-[300px] h-[196px] rounded-[20px] bg-red-500" />
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
                    src={`${storageUrl}/wallpaper/${bookmark.leftWallpaperId}`}
                    className="w-[31px] h-[62px] rounded-l-[12px] bg-blue-500"
                  />
                  <img
                    src={`${storageUrl}/wallpaper/${bookmark.rightWallpaperId}`}
                    className="w-[31px] h-[62px] rounded-r-[12px] bg-blue-500"
                  />
                </div>
              </div>
              <div className="flex-column gap-[8px]">
                <p className="text-[14px] font-medium leading-[130%] text-center">바닥재</p>
                <img
                  src={`${storageUrl}/tile/${bookmark.tileId}`}
                  className="w-[62px] h-[62px] rounded-[12px] bg-green-500"
                />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export const PreviewLike = ({ likeData }: Pick<Props, "likeData">) => {
  if (likeData === undefined) return <PreviewEmpty />
  console.log('likeData :', likeData);

  return (
    <ul className="flex-column h-[130px]">
      {likeData.length === 0 ? <PreviewEmpty /> : null}
      {likeData.map((like) => {
        const { POSTS: post } = like
        return (
          <Fragment key={like.id}>
            {post !== null && (
              <li className={innerBoxStyle}>
                <Link to={`/detail/${post.id}`} className={linkStyle}>{post.content}</Link>
                <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
              </li>)}
          </Fragment>
        )
      })}
    </ul>
  )
}

export const PreviewEmpty = () => {
  return (
    <div className="w-full h-full flex contents-center px-[24px]">
      <p className="text-black body-3">현재 데이터가 없습니다.</p>
    </div>
  )
}