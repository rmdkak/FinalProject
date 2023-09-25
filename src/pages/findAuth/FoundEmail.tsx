import { Link } from "react-router-dom";

import { DateConvertor } from "components";
import { useDynamicImport } from "hooks/useDynamicImport";
import { type Tables } from "types/supabase";

interface Props {
  findUser: Tables<"USERS", "Row"> | undefined;
}

export const FoundEmail = ({ findUser }: Props) => {
  const { preFetchPageBeforeEnter } = useDynamicImport();

  return (
    <>
      <div className="flex-column w-full pb-[24px] border-b-[1px] border-b-black">
        <div className="flex h-12 items-center px-[24px] gap-4 body-3">
          <p className="text-gray03 min-w-[100px]">닉네임</p>
          <p className="w-full text-black">{findUser?.name}</p>
        </div>
        <div className="flex h-12 items-center px-[24px] gap-4 body-3 sm:items-start sm:mt-6">
          <p className="text-gray03 min-w-[100px]">가입된 이메일</p>
          <div className="flex contents-center sm:flex-col">
            <p className="mr-4 text-black">{findUser?.email}</p>
            <div className="text-gray03 text-[12px] w-full flex gap-1 sm:mt-3">
              <span>(</span>
              <DateConvertor datetime={findUser?.created_at as string} type="dotDate" />
              <span>가입 )</span>
            </div>
          </div>
        </div>
      </div>
      <Link
        to="/login"
        className="text-center auth-button body-3 point-button"
        onMouseEnter={async () => {
          await preFetchPageBeforeEnter("signup");
        }}
      >
        로그인
      </Link>
    </>
  );
};
