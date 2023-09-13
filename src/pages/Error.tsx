import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { STORAGE_URL, supabase } from "api/supabase/supabaseClient";
import { type Tables } from "types/supabase";

type PickImg = Pick<Tables<"WALLPAPER", "Row">, "image">;

export const Error = () => {
  const [randomImg, setRandomImg] = useState<PickImg[]>();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [errorImg, setErrorImg] = useState<string>("/wallpaper/003b3abe-d70a-49e5-98b6-059bf055d32b");
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data: wallpaper, error } = await supabase.from("WALLPAPER").select("image").limit(5);
    if (error !== null) {
      console.error(error);
      return;
    }
    setRandomImg(wallpaper);
  };

  useEffect(() => {
    fetchData().catch((error) => error(error));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      randomImg?.map((_, idx, arr) => {
        if (idx === currentIdx) {
          setErrorImg(arr[idx].image);
        }
        return null;
      });
      setCurrentIdx((currentIdx + 1) % 5);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIdx, randomImg]);

  return (
    <div className="flex-column items-center my-[195px] sm:my-20">
      <div className="flex items-center gap-6">
        <span className="text-[120px] font-normal">4</span>
        <img src={`${STORAGE_URL}${errorImg}`} className="w-20 h-20 rounded-full" alt="error0" />
        <span className="text-[120px] font-normal">4</span>
      </div>
      <p className="mt-2 text-xl">페이지를 찾을 수 없습니다.</p>
      <p className="mt-6 text-sm text-center text-gray02">
        찾으려는 페이지의 주소가 잘못 입력되었거나,
        <br />
        주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
        <br />
        입력하신 주소가 맞는지 다시 한번 확인해 주세요.
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="mt-10 text-base font-medium py-[15px] px-[45px] bg-point rounded-lg"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};
