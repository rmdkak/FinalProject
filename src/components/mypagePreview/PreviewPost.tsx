import { Link } from "react-router-dom";

import { DateConvertor } from "components/common";
import { type Tables } from "types/supabase";

import { dateStyle, innerBoxStyle, linkStyle, outerBoxStyle } from "./preview.style";
import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  postData: Array<Tables<"POSTS", "Row">> | undefined;
}

export const PreviewPost = ({ postData }: Props) => {
  if (postData === undefined) return <PreviewEmpty />;
  return (
    <ul className={outerBoxStyle}>
      {postData.length === 0 ? <PreviewEmpty /> : null}
      {postData.map((post) => {
        return (
          <li key={post.id} className={innerBoxStyle}>
            <Link to={`/detail/${post.id}`} className={linkStyle}>
              {post.title}
            </Link>
            <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
          </li>
        );
      })}
    </ul>
  );
};
