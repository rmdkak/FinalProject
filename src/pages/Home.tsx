import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import { Arrow, AutoPlay } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import img01 from "assets/img01.png";
import img02 from "assets/img02.png";
import img03 from "assets/img03.png";
import img04 from "assets/img04.png";

export const Home = () => {
  const navigate = useNavigate();
  const arrowPlugins = [new Arrow()];
  const autoplayPlugins = [
    new AutoPlay({ duration: 2000, animationDuration: 3000, direction: "NEXT", stopOnHover: false }),
  ];

  return (
    <>
      <div className="w-full h-[968px] mb-40">
        <div className="contents-between mx-20 mb-20 mt-[100px]">
          <div className="ml-20">
            <h1 className="text-[80px]">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="text-xl text-[#666]">
              나만의 조합으로 완성되는, 소중한 우리 공간! 당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
          </div>
          <div className="mt-auto flex-column">
            <span className="-rotate-90 -translate-y-3 text-gray03">scroll</span>
            <span className="h-20 border-r-[1px] border-gray03 -translate-x-[18px]" />
          </div>
        </div>
        <Flicking align={"prev"} circular={true} autoResize={false} plugins={autoplayPlugins}>
          <img src={img01} className="vanner-preview"></img>
          <img src={img02} className="vanner-preview"></img>
          <img src={img03} className="vanner-preview"></img>
          <img src={img04} className="vanner-preview"></img>
        </Flicking>
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
        <div className="flex gap-20">
          <div className="w-[880px] h-[538px] bg-gray-400"></div>
          <div className="gap-20 flex-column">
            <div className="gap-6 flex-column">
              <p>내 마음대로 꾸미고 조합해보세요.</p>
              <h2 className="text-[32px] leading-[41px]">
                디자인과 색상까지, 마음대로 설정 가능한
                <br />
                나만의 맞춤형 스타일링!
              </h2>
            </div>
            <div className="gap-6 flex-column">
              <div className="flex gap-6 text-gray-400">
                <button className="w-28 h-12 border-[1px] border-gray05 rounded-full hover:bg-[#FFDF7C] hover:text-black">
                  벽지
                </button>
                <button className="w-28 h-12 border-[1px] border-gray05 rounded-full hover:bg-[#FFDF7C] hover:text-black">
                  바닥재
                </button>
              </div>
              <ul className="flex flex-wrap gap-4 w-[800px]">
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
                <li className="service-item"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section">
        <h1 className="section-title">BEST COLORS</h1>
        <ul className="flex">
          <li className="flex">
            <p className="best-colors-item-text">1</p>
            <div className="best-colors-item-back"></div>
            <div className="best-colors-item-front"></div>
          </li>
          <li className="flex">
            <p className="best-colors-item-text">2</p>
            <div className="best-colors-item-back"></div>
            <div className="best-colors-item-front"></div>
          </li>
          <li className="flex">
            <p className="best-colors-item-text">3</p>
            <div className="best-colors-item-back"></div>
            <div className="best-colors-item-front"></div>
          </li>
          <li className="flex">
            <p className="best-colors-item-text">3</p>
            <div className="best-colors-item-back"></div>
            <div className="best-colors-item-front"></div>
          </li>
          <li className="flex">
            <p className="best-colors-item-text">3</p>
            <div className="best-colors-item-back"></div>
            <div className="best-colors-item-front"></div>
          </li>
        </ul>
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
      <div className="flex-column contents-center h-[180px] bg-gray07 mb-40">
        <h1 className="text-2xl">얼마나 필요한지 모르시나요? 스타일의 편리한 기능을 이용해보세요!</h1>
        <div className="text-gray02">
          <label htmlFor="moveToEvent" className="hover:cursor-pointer">
            VIEW MORE
          </label>
          <button id="moveToEvent">
            <RxChevronRight className="view-more-icon" />
          </button>
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
            <span className="flicking-arrow-prev circle"></span>
            <span className="flicking-arrow-next circle"></span>
          </ViewportSlot>
        </Flicking>
      </div>
    </>
  );
};
