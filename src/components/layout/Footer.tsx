import { Link } from "react-router-dom";

import blog from "assets/footerIcon/blogIcon.svg";
import github from "assets/footerIcon/githubIcon.svg";
import notion from "assets/footerIcon/notionIcon.svg";

export const Footer = () => {
  return (
    <>
      <footer className="box-border mx-auto my-10 flex-column bg-gray08 max-w-[1280px] w-full min-w-[360px]">
        {/* footHead */}
        <div className="relative mx-6">
          <div className="contents-between mb-[34px] border-b border-[#d9d9d9] pb-6 ">
            <h2 className="item text-[2rem] leading-none">
              <Link to="/" className="font-title">
                STILE
              </Link>
            </h2>

            <div className="sm:absolute sm:bottom-10 sm:left-0 ">
              <ul className="flex self-center justify-end">
                <li>
                  <a
                    className="mr-[8px] block w-6 h-6 self-start"
                    href="https://github.com/rmdkak/Stile"
                    target="_blink"
                  >
                    <img className="block w-6 h-6" src={github} alt="github ci" />
                  </a>
                </li>
                <li>
                  <a className="mr-[8px] block w-6 h-6" href="#외부경로" target="_blink">
                    <img className="block w-6 h-6" src={blog} alt="blog ci" />
                  </a>
                </li>
                <li>
                  <a
                    className="block w-6 h-6"
                    href="https://www.notion.so/bcb9f4acc35d4daa8ee06badfb06c0d6?pvs=4"
                    target="_blink"
                  >
                    <img className="block w-6 h-6" src={notion} alt="notion ci" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* footCopy */}
          <div className="relative sm:pb-10 sm:pt-[64px]">
            <div>
              <div className="flex justify-between mb-3">
                <ul className="flex items-center first-line:">
                  <li className="mr-[18px] text-[#888] text-xs">이용약관</li>
                  <li className="text-[13px]">개인정보 처리방침</li>
                </ul>
                <Link
                  to="/inquire"
                  className="sm:absolute sm:top-0 px-6 py-2 text-xs text-[#888] border rounded-lg border-gray05"
                >
                  1:1문의하기
                </Link>
              </div>
            </div>
            <p className="text-[#888] mb-10 text-[12px]">COPYRIGHT(C) STILE ALL RIGHT RESERVED</p>
          </div>
        </div>
      </footer>
    </>
  );
};
