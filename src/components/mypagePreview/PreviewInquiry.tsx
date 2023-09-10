import { Link } from "react-router-dom";

import { DateConvertor } from "components/common";
import { type Tables } from "types/supabase";

import { OUTER_BOX_STYLE, dateStyle, innerBoxStyle, linkStyle } from "./preview.style";
import { PreviewEmpty } from "./PreviewEmpty";

interface Props {
  inquiryData: Array<Tables<"MANTOMAN", "Row">> | undefined;
}

export const PreviewInquiry = ({ inquiryData }: Props) => {
  if (inquiryData === undefined) return <PreviewEmpty />;
  return (
    <ul className={OUTER_BOX_STYLE}>
      {inquiryData.length === 0 ? <PreviewEmpty /> : null}
      {inquiryData.map((post) => {
        return (
          <li key={post.id} className={innerBoxStyle}>
            <Link to={`/detail/${post.id}`} className={linkStyle}>
              {post.content}
            </Link>
            <DateConvertor datetime={post.created_at} type={"dotDate"} className={dateStyle} />
          </li>
        );
      })}
    </ul>
  );
};
