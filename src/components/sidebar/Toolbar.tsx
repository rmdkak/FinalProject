import { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import { useDialog } from "components/common";
import { useDynamicImport } from "hooks/useDynamicImport";
import { useAuthStore } from "store";

export const Toolbar = () => {
  const { currentSession } = useAuthStore();
  const navigate = useNavigate();
  const { Confirm } = useDialog();
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const { preFetchPageBeforeEnter } = useDynamicImport();

  const movePostPageHandler = async () => {
    if (currentSession === null) {
      await preFetchPageBeforeEnter("login");
      const confirmCheck = await Confirm(
        <div>
          <div className="flex text-[18px] justify-center mb-2.5">
            <p className="font-medium mr-2.5">STILE</p>
            <p>회원 이신가요?</p>
          </div>
          <div className="text-[14px] text-gray02">
            <p>해당 서비스는 로그인 후 진행 가능합니다.</p>
            <p>로그인 혹은 회원가입 해주세요.</p>
          </div>
        </div>,
      );
      if (confirmCheck) navigate("/login");
      return;
    }
    navigate("/post");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = (currentScroll / scrollHeight) * 100;
      setScrollPercent(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed gap-4 bottom-[20%] right-[10%] w-12 inline-flex flex-col z-[9100]">
      <button className="w-12 h-12 rounded-full sm:w-8 sm:h-8 bg-point" onClick={movePostPageHandler}>
        <BsPencilSquare className="w-5 h-5 mx-auto sm:w-4 sm:h-4 fill-gray01" />
      </button>
      {scrollPercent <= 50 ? (
        <button className="w-12 h-12 bg-white border rounded-full sm:w-8 sm:h-8 border-gray05" onClick={scrollToBottom}>
          <SlArrowDown className="w-5 h-5 mx-auto sm:w-4 sm:h-4 fill-gray01" />
        </button>
      ) : (
        <button className="w-12 h-12 bg-white border rounded-full sm:w-8 sm:h-8 border-gray05" onClick={scrollToTop}>
          <SlArrowUp className="w-5 h-5 mx-auto sm:w-4 sm:h-4 fill-gray01" />
        </button>
      )}
    </div>
  );
};
