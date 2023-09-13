import { Link } from "react-router-dom";

import { type PathName, useDynamicImport } from "hooks/useDynamicImport";

interface Props {
  title: string;
  isBorder: boolean;
  pathName: PathName;
}

export const Title = ({ title, isBorder, pathName }: Props) => {
  const { preFetchPageBeforeEnter } = useDynamicImport();

  return (
    <div className={`w-full text-center sm:hidden ${isBorder ? "underline-pb" : "pb-6"}`}>
      <Link
        to={`/${pathName}`}
        className="title-3"
        onMouseEnter={async () => {
          await preFetchPageBeforeEnter(pathName);
        }}
      >
        {title}
      </Link>
    </div>
  );
};
