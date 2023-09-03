import { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import { useDialog } from "components/common";
import { useAuthStore } from "store";

export const Toolbar = () => {
  const { currentSession } = useAuthStore();
  const navigate = useNavigate();
  const { Confirm } = useDialog();
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  const movePostPageHandler = async () => {
    if (currentSession === null) {
      const confirmCheck = await Confirm(
        <div>
          <div className="flex text-[18px] justify-center mb-[10px]">
            <p className="font-medium mr-[10px]">STILE</p>
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
    <div className="sticky gap-4 bottom-[50%] translate-x-[1650px] inline-flex flex-col z-[9100]">
      <button className="w-12 h-12 rounded-full bg-point" onClick={movePostPageHandler}>
        <BsPencilSquare className="w-6 h-6 mx-auto fill-gray01" />
      </button>
      {scrollPercent <= 50 ? (
        <button className="w-12 h-12 border rounded-full border-gray05" onClick={scrollToBottom}>
          <SlArrowDown className="w-[20px] h-[20px] mx-auto fill-gray01" />
        </button>
      ) : (
        <button className="w-12 h-12 border rounded-full border-gray05" onClick={scrollToTop}>
          <SlArrowUp className="w-[20px] h-[20px] mx-auto fill-gray01" />
        </button>
      )}
    </div>
  );
};
