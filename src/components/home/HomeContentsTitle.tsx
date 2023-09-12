import { useNavigate } from "react-router-dom";

import calcArrow from "assets/svgs/calcArrow.svg";
import smcalcArrow from "assets/svgs/smcalcArrow.svg";

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
        <div className="flex items-center sm:px-6 contents-between">
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
        <div className="sm:inline-flex sm:items-center sm:px-4 sm:py-2 sm:bg-white sm:rounded-full ">
          <label
            htmlFor="toInteriorPreview"
            className="mr-3 text-[14px] text-gray02 hover:cursor-pointer sm:mr-1 sm:text-black"
          >
            VIEW MORE
          </label>
          <button
            id="toInteriorPreview"
            onClick={() => {
              navigate("/interior-preview");
            }}
          >
            <img src={calcArrow} className="view-more-icon sm:hidden" />
            <img src={smcalcArrow} className="hidden view-more-icon sm:block" />
          </button>
        </div>
      );

    case "noNavigate":
      return (
        <div className="flex items-center sm:px-6">
          <h2 className="mr-auto section-title">{title}</h2>
        </div>
      );
  }
};
