import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

interface Props {
  page: string;
  title: string;
}

export const HomeContentsTitle = ({ title, page }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="contents-between">
      <h1 className="section-title">{title}</h1>
      <div>
        <label htmlFor={page} className="hover:cursor-pointer">
          VIEW MORE
        </label>
        <button
          id={page}
          onClick={() => {
            navigate(`/${page}`);
          }}
        >
          <RxChevronRight className="view-more-icon" />
        </button>
      </div>
    </div>
  );
};
