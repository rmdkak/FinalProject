import { useState, Fragment } from "react";

import { DateConvertor } from "components";
import { type Tables } from "types/supabase";

interface Props {
  data: Array<Tables<"MANTOMAN", "Row">> | undefined;
}

const manToManCategory = ["문의", "칭찬", "제안", "불만"];

export const ManToMan = ({ data: manToManData }: Props) => {
  const [currentCategory, setCurrentCategory] = useState<string>();

  const toggleHandler = (target: string) => {
    currentCategory === target ? setCurrentCategory(undefined) : setCurrentCategory(target);
  };

  if (manToManData === undefined) return <p>문의가 없습니다.</p>;

  return (
    <div className="w-full flex-column">
      {manToManCategory.map((category) => {
        return (
          <ul
            key={category}
            className="items-center justify-center w-full gap-3 mb-3 align-middle flex-column"
            onClick={() => {
              toggleHandler(category);
            }}
          >
            <p className="flex items-center w-full border-b-2 border-black cursor-pointer h-14 body-1">{category}</p>
            <p>{manToManCategory.filter((current) => current === category).length}</p>
            {manToManData.map((manToMan) => {
              return (
                <Fragment key={manToMan.id}>
                  {currentCategory === category && manToMan.category === category && (
                    <li className="flex items-center justify-between w-full h-10 px-4 py-1 border-b border-gray03">
                      <p className="">{manToMan.content}</p>
                      <div className="flex gap-3">
                        <DateConvertor datetime={manToMan.created_at} type={"dotDate"} />
                        <button className="px-3 rounded-lg point-button ">답변하기</button>
                        <button className="px-3 rounded-lg ">삭제하기</button>
                      </div>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
