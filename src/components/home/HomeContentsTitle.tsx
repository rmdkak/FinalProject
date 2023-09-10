import { useNavigate } from "react-router-dom";

import calcArrow from "assets/svgs/calcArrow.svg";

interface Props {
  page?: string;
  title?: string;
  type: "noTitle" | "noNavigate" | "useAll";
}

export const HomeContentsTitle = ({ title, page, type }: Props) => {
  const navigate = useNavigate();

  switch (type) {
    case "useAll":
      return (
        <div className="items-center contents-between">
          <h2 className="section-title">{title}</h2>
          <div>
            <label htmlFor={page} className="mr-[10px] text-[14px] text-gray02 hover:cursor-pointer">
              VIEW MORE
            </label>
            <button
              id={page}
              onClick={() => {
                navigate(`/${page as string}`);
              }}
            >
              <img src={calcArrow} className="view-more-icon" />
            </button>
          </div>
        </div>
      );

    case "noTitle":
      return (
        <>
          {" "}
          <label htmlFor="toInteriorPreview" className="mr-3 text-[12px] text-gray02 hover:cursor-pointer">
            VIEW MORE
          </label>
          <button
            id="toInteriorPreview"
            onClick={() => {
              navigate("/interior-preview");
            }}
          >
            <img src={calcArrow} className="view-more-icon" />
          </button>
        </>
      );

    case "noNavigate":
      return (
        <div className="flex items-center">
          <h2 className="mr-auto section-title">{title}</h2>
        </div>
      );
  }
};
