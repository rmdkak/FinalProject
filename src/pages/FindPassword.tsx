import React, { useState } from "react";

import { Select } from "components";
import { emailOptions } from "components/signup/constant";

export const FindPassword = () => {
  const [selectEmail, setSelectEmail] = useState<string | undefined>();
  return (
    <>
      <section className="flex flex-col w-[480px] mx-auto mt-[71px]">
        <h2 className="text-[32px] text-center">비밀번호 찾기</h2>

        <form action="#" className="mt-[40px]">
          <div className="flex">
            <label className="indent-[-9999px]" htmlFor="findPasswordEmail">
              이메일
            </label>
            <input
              className="border border-[#888] box-border pl-6 w-[180px]"
              type="text"
              name="email"
              id="findPasswordEmail"
              placeholder="이메일"
            />
            <span className="flex items-center justify-center mx-4">@</span>
            <Select
              option={emailOptions}
              selectedValue={selectEmail}
              setSelectedValue={setSelectEmail}
              selfEnterOption={true}
            />
          </div>
          <button className="mt-6 w-full text-[#fff] py-3 bg-[#888]">이메일 전송</button>
        </form>
      </section>
    </>
  );
};
