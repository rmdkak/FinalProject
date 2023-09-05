import { useNavigate } from "react-router-dom";

import calcArrow from "assets/svgs/calcArrow.svg";

interface Props {
  page: string;
  title: string;
}

export const HomeContentsTitle = ({ title, page }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="items-center contents-between">
      <h1 className="section-title">{title}</h1>
      <div>
        <label htmlFor={page} className="mr-3 text-[12px] text-gray02 hover:cursor-pointer">
          VIEW MORE
        </label>
        <button
          id={page}
          onClick={() => {
            navigate(`/${page}`);
          }}
        >
          <img src={calcArrow} className="view-more-icon" />
        </button>
      </div>
    </div>
  );
};
