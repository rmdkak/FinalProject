import { useNavigate } from "react-router-dom";

import calcArrow from "assets/svgs/calcArrow.svg";
import smViewMore from "assets/svgs/more.svg";
import smcalcArrow from "assets/svgs/smcalcArrow.svg";
import { type PathName, useDynamicImport } from "hooks/useDynamicImport";

interface Props {
  page?: PathName;
  title?: string;
  type: "noTitle" | "noNavigate" | "useAll";
}

export const HomeContentsTitle = ({ title, page, type }: Props) => {
  const navigate = useNavigate();
  const { preFetchPageBeforeEnter } = useDynamicImport();

  switch (type) {
    case "useAll":
      if (page === undefined) return <></>;
      return (
        <div className="flex items-center sm:px-6 contents-between">
          <h2 className="section-title">{title}</h2>
          <div className="sm:hidden">
            <label htmlFor={page} className="mr-[10px] text-[14px] text-gray02 hover:cursor-pointer">
              VIEW MORE
            </label>
            <button
              id={page}
              onMouseEnter={async () => {
                await preFetchPageBeforeEnter(page);
              }}
              onClick={() => {
                navigate(`/${page as string}`);
              }}
            >
              <img src={calcArrow} className="view-more-icon" />
            </button>
          </div>
          <img src={smViewMore} alt="view more" className="hidden sm:block" />
        </div>
      );

    case "noTitle":
      if (page === undefined) return <></>;
      return (
        <div className="sm:inline-flex sm:items-center sm:px-4 sm:py-2 sm:bg-white sm:rounded-full ">
          <label
            htmlFor="toInteriorPreview"
            className="mr-3 text-[14px] text-gray02 hover:cursor-pointer sm:mr-1 sm:text-black"
          >
            VIEW MORE
          </label>
          <button
            onMouseEnter={async () => {
              await preFetchPageBeforeEnter(page);
            }}
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
