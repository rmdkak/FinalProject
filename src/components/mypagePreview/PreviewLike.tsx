import { Fragment } from "react";
import { Link } from "react-router-dom";

import { DateConvertor } from "components/common";
import { type Tables } from "types/supabase";

import { dateStyle, innerBoxStyle, linkStyle } from "./preview.style";
import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  likeData: Array<Tables<"POSTLIKES", "Row"> & { POSTS: Tables<"POSTS", "Row"> | null }> | undefined;
}

export const PreviewLike = ({ likeData }: Props) => {
  if (likeData === undefined) return <PreviewEmpty />;

  return (
    <ul className="flex-column h-[130px]">
      {likeData.length === 0 ? <PreviewEmpty /> : null}
      {likeData.map((like) => {
        const { POSTS: post } = like;
        return (
          <Fragment key={like.id}>
            {post !== null && (
              <li className={innerBoxStyle}>
                <Link to={`/detail/${post.id}`} className={linkStyle}>
                  {post.content}
                </Link>
                <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};
