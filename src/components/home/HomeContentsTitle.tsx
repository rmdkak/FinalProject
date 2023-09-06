import { useNavigate } from "react-router-dom";

import calcArrow from "assets/svgs/calcArrow.svg";

interface Props {
  page?: string;
  title: string;
  navigation: boolean;
}

export const HomeContentsTitle = ({ title, page, navigation }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {navigation ? (
        <div className="items-center contents-between">
          <h2 className="section-title">{title}</h2>
          <div>
            <label htmlFor={page} className="mr-3 text-[12px] text-gray02 hover:cursor-pointer">
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
      ) : (
        <div className="flex items-center">
          <h2 className="section-title mr-auto">{title}</h2>
        </div>
      )}
    </>
  );
};
