import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="flex-column bg-gray08 ">
        {/* footHead */}
        <div className="w-[1280px] mx-auto my-10">
          <div className="contents-between mb-[50px] border-b border-[#d9d9d9] pb-6 ">
            <h2 className=" item text-[2rem] leading-none">
              <Link to="/" className="font-title">
                STILE
              </Link>
            </h2>
            {/* 이미지 추가해야합니다. */}
            <div>
              <ul className="flex self-center justify-end">
                <li>
                  <a
                    className="mr-[8px] block w-[15px] h-[15px] bg-red-300 self-start"
                    href="#외부경로"
                    target="_blink"
                  >
                    {/* 이미지 추가해야합니다. */}
                    {/* <img className="block w-[15px] h-[15px]" src="#" alt="#" /> */}
                  </a>
                </li>
                <li>
                  <a className="mr-[8px] block w-[15px] h-[15px] bg-red-500" href="#외부경로" target="_blink">
                    {/* 이미지 추가해야합니다. */}
                    {/* <img className="block w-[15px] h-[15px]" src="#" alt="#" /> */}
                  </a>
                </li>
                <li>
                  <a className="block w-[15px] h-[15px] bg-red-700 " href="외부경로" target="_blink">
                    {/* 이미지 추가해야합니다. */}
                    {/* <img className="block w-[15px] h-[15px]" src="#" alt="#" /> */}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* footCopy */}
          <div>
            <div className="mb-3">
              <ul className="flex items-center first-line:">
                <li className="mr-[18px] text-[#888]">이용약관</li>
                <li>개인정보 처리방침</li>
              </ul>
            </div>
          </div>
          <p className="text-[#888] mb-10">COPYRIGHT(C) STILE ALL RIGHT RESERVED</p>
        </div>
      </footer>
    </>
  );
};
