import { useState, useEffect } from "react";
import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import { Arrow, AutoPlay } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import img01 from "assets/img01.png";
import img02 from "assets/img02.png";
import img03 from "assets/img03.png";

export const Home = () => {
  const navigate = useNavigate();
  const arrowPlugins = [new Arrow()];

  const serviceAutoplayPlugins = [
    new AutoPlay({ duration: 2000, animationDuration: 3000, direction: "NEXT", stopOnHover: false }),
  ];

  const initialWidths = ["w-[780px]", "w-[160px]", "w-[160px]"];
  const finalWidth = "w-[780px]";
  const transitionInterval = 3000;

  const [widths, setWidths] = useState<string[]>(initialWidths);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  //  5초마다 KV배너 이미지 크기 변화
  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedWidths = initialWidths.map((_, index) => {
        if (index === currentIdx) {
          return finalWidth;
        } else {
          return "w-[160px]";
        }
      });

      setWidths(updatedWidths);
      setCurrentIdx((currentIdx + 1) % 3);
    }, transitionInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIdx, initialWidths]);

  const VannerImgs = [img01, img02, img03];

  return (
    <>
      <div className="flex w-full mb-40 ">
        <div className="flex-column mx-20 mb-20 mt-[100px]">
          <div className="mx-auto my-auto">
            <h1 className="w-[560px] text-[56px]">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="text-xl text-gray01">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
          </div>
        </div>
        {widths.map((widths, idx) => (
          <img
            key={idx}
            src={VannerImgs[idx]}
            alt="preview image"
            className={`${widths} h-[800px] mr-10 rounded-xl object-cover transition-[width] duration-1000 ease-in-out`}
          />
        ))}
      </div>
      <div className="home-section">
        <div className="contents-between">
          <h1 className="section-title">한눈에 보는 우리집</h1>
          <div>
            <label htmlFor="moveToService" className="hover:cursor-pointer">
              VIEW MORE
            </label>
            <button
              id="moveToService"
              onClick={() => {
                navigate("/service");
              }}
            >
              <RxChevronRight className="view-more-icon" />
            </button>
          </div>
        </div>

        <div className="flex h-[740px] gap-20">
          <div className="w-[1280px] bg-gray-400"></div>
          <Flicking align={"prev"} horizontal={false} circular={true} plugins={serviceAutoplayPlugins}>
            <li className="flex w-[330px] mb-20">
              <p className="best-colors-item-text">1</p>
              <div className="best-colors-item-back"></div>
              <div className="best-colors-item-front"></div>
            </li>
            <li className="flex w-[330px] mb-20">
              <p className="best-colors-item-text">2</p>
              <div className="best-colors-item-back"></div>
              <div className="best-colors-item-front"></div>
            </li>
            <li className="flex w-[330px] mb-20">
              <p className="best-colors-item-text">3</p>
              <div className="best-colors-item-back"></div>
              <div className="best-colors-item-front"></div>
            </li>
            <li className="flex w-[330px] mb-20">
              <p className="best-colors-item-text">4</p>
              <div className="best-colors-item-back"></div>
              <div className="best-colors-item-front"></div>
            </li>
            <li className="flex w-[330px] mb-20">
              <p className="best-colors-item-text">5</p>
              <div className="best-colors-item-back"></div>
              <div className="best-colors-item-front"></div>
            </li>
          </Flicking>
        </div>
      </div>

      <div className="home-section">
        <div className="contents-between">
          <h1 className="section-title">EVENT</h1>
          <div>
            <label htmlFor="moveToEvent" className="hover:cursor-pointer">
              VIEW MORE
            </label>
            <button id="moveToEvent">
              <RxChevronRight className="view-more-icon" />
            </button>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex-column w-[860px] h-[570px] gap-10">
            <div className="w-full h-[460px] bg-gray-200"></div>
            <div className="gap-4 flex-column">
              <h2 className="text-2xl">이벤트 배너 영역</h2>
              <p> 서브타이틀 영억 {`(날짜 및 설명글)`}</p>
            </div>
          </div>
          <div className="flex-column w-[860px] h-[570px] gap-10">
            <div className="w-full h-[460px] bg-gray-200"></div>
            <div className="gap-4 flex-column">
              <h2 className="text-2xl">이벤트 배너 영역</h2>
              <p> 서브타이틀 영억 {`(날짜 및 설명글)`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-8 mx-20 mb-40 flex-column">
        <div className="contents-between">
          <h1 className="section-title">COMMUNTY</h1>
          <div>
            <label htmlFor="moveToCommunity" className="hover:cursor-pointer">
              VIEW MORE
            </label>
            <button
              id="moveToCommunity"
              onClick={() => {
                navigate("/community");
              }}
            >
              <RxChevronRight className="view-more-icon" />
            </button>
          </div>
        </div>
        <Flicking align={"prev"} circular={true} panelsPerView={3} plugins={arrowPlugins}>
          <div className="flicking-slide-item"></div>
          <div className="flicking-slide-item"></div>
          <div className="flicking-slide-item"></div>
          <div className="flicking-slide-item"></div>
          <div className="flicking-slide-item"></div>
          <ViewportSlot>
            <span className="flicking-arrow-prev is-circle"></span>
            <span className="flicking-arrow-next is-circle"></span>
          </ViewportSlot>
        </Flicking>
      </div>
    </>
  );
};
