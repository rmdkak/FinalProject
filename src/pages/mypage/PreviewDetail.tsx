import { Link } from "react-router-dom";

import { DateConvertor } from "components"
import { type Tables } from "types/supabase"

interface Props {
  postData: Array<Tables<"POSTS", "Row">> | undefined;
  commentData: Array<Tables<"COMMENTS", "Row">> | undefined;
  bookmarkData: Array<Tables<"ITEM-BOOKMARK", "Row">> | undefined;
  likeData: Array<Tables<"POST-BOOKMARKS", "Row">> | undefined;
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
  return (
    <ul className="flex-column h-[130px]">
      {commentData.length === 0 ? <PreviewEmpty /> : null}
      {commentData.map((comment) => {
        return (
          <li key={comment.id} className={innerBoxStyle}>
            <Link to={`/detail/${comment.postId}`} className={linkStyle}>{comment.content}</Link>
            <DateConvertor datetime={comment.created_at} type={"dotDate"} className={dateStyle} />
          </li>
        )
      })}
    </ul >
  )
}

export const PreviewBookmark = ({ bookmarkData }: Pick<Props, "bookmarkData">) => {
  if (bookmarkData === undefined) return <PreviewEmpty />
  return (
    <ul className="flex-column h-[130px]">
      {bookmarkData.length === 0 ? <PreviewEmpty /> : null}
      {bookmarkData.map((bookmark) => {
        return (
          <li key={bookmark.id} className="w-full h-[64px] flex justify-between items-center px-[24px]">
            <p className="text-black body-3">{bookmark.id}</p>
          </li>
        )
      })}
    </ul>
  )
}

export const PreviewLike = ({ likeData }: Pick<Props, "likeData">) => {
  if (likeData === undefined) return <PreviewEmpty />

  return (
    <ul className="flex-column h-[130px]">
      {likeData.length === 0 ? <PreviewEmpty /> : null}
      {likeData.map((like) => {
        return (
          <li key={like.postId} className="w-full h-[64px] flex justify-between items-center px-[24px]">
            <p className="text-black body-3">{like.postId}</p>
            {/* <DateConvertor datetime={likeData[0].id} type={"dotDate"} className={"text-gray02 body-3"} /> */}
          </li>
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