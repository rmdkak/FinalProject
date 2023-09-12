import { Link } from "react-router-dom";

interface Props {
  title: string;
  isBorder: boolean;
}

export const Title = ({ title, isBorder }: Props) => {
  return (
    <div className={`w-full text-center sm:hidden ${isBorder ? "underline-pb" : "pb-6"}`}>
      <Link to="/mypage" className="title-3">
        {title}
      </Link>
    </div>
  );
};
