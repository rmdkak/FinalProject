import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import { Arrow, AutoPlay } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import img01 from "assets/img01.png";
import img02 from "assets/img02.png";
import img03 from "assets/img03.png";
import img04 from "assets/img04.png";
import img05 from "assets/img05.png";

export const Home = () => {
  const navigate = useNavigate();
  const arrowPlugins = [new Arrow()];
  const mainAutoplayPlugins = [
    new AutoPlay({ duration: 50, animationDuration: 3000, direction: "NEXT", stopOnHover: false }),
  ];
  const serviceAutoplayPlugins = [
    new AutoPlay({ duration: 2000, animationDuration: 3000, direction: "NEXT", stopOnHover: false }),
  ];

  return (
    <>
      <div className="flex w-full h-[968px] mb-40 ">
        <div className="flex-column ml-20 mb-20 mt-[100px]">
          <div className="mx-auto my-auto">
            <h1 className="w-[560px] text-[56px]">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="text-xl text-[#666]">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
          </div>
        </div>
        <img src={img05} className="relative top-[35%] left-[20%] w-[160px] h-[160px] z-10" alt="" />
        <Flicking align={"prev"} horizontal={false} circular={true} plugins={mainAutoplayPlugins}>
          <div className="w-[900px]">
            <img src={img01} className="w-[500px] h-[300px] rounded-xl translate-x-28"></img>
          </div>
          <img src={img02} className="w-[700px] h-[500px] -translate-y-14 translate-x-48 rounded-xl -z-10"></img>
          <img src={img04} className="w-[700px] h-[500px] -translate-y-15 rounded-xl"></img>
          <img src={img03} className="w-[600px] h-[400px] translate-x-52 -translate-y-5  rounded-xl"></img>
          <img></img>
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
      <div className="flex-column contents-center h-[180px] bg-[#F3F3F3] mb-40">
        <h1 className="text-2xl">얼마나 필요한지 모르시나요? 스타일의 편리한 기능을 이용해보세요!</h1>
        <div className="text-[#888888]">
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
            <span className="flicking-arrow-prev is-circle"></span>
            <span className="flicking-arrow-next is-circle"></span>
          </ViewportSlot>
        </Flicking>
      </div>
    </>
  );
};
