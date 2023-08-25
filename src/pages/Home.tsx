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
        <div className="flex justify-between mx-20 mb-20 mt-[100px]">
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
          <div className="flex flex-col mt-auto">
            <span className="-rotate-90 text-[#9A9A9A] -translate-y-3">scroll</span>
            <span className="h-20 border-r-[1px] border-[#9A9A9A] -translate-x-[18px]" />
          </div>
        </div>
        <Flicking align={"prev"} circular={true} autoResize={false} plugins={autoplayPlugins}>
          <img src={img01} className="w-[800px] h-[450px] rounded-xl mx-5"></img>
          <img src={img02} className="w-[800px] h-[450px] rounded-xl mx-5"></img>
          <img src={img03} className="w-[800px] h-[450px] rounded-xl mx-5 "></img>
          <img src={img04} className="w-[800px] h-[450px] rounded-xl mx-5"></img>
        </Flicking>
      </div>
      <div className="flex flex-col gap-10 mx-20 mb-40">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">한눈에 보는 우리집</h1>
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
              <RxChevronRight className="text-xl translate-y-1" />
            </button>
          </div>
        </div>
        <div className="flex gap-20">
          <div className="w-[880px] h-[538px] bg-gray-400"></div>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-6">
              <p>내 마음대로 꾸미고 조합해보세요.</p>
              <h2 className="text-[32px] leading-[41px]">
                디자인과 색상까지, 마음대로 설정 가능한
                <br />
                나만의 맞춤형 스타일링!
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-6 text-gray-400">
                <button className="w-28 h-12 border-[1px] border-[#d5d5d5] rounded-full hover:bg-[#FFDF7C] hover:text-black">
                  벽지
                </button>
                <button className="w-28 h-12 border-[1px] border-[#d5d5d5] rounded-full hover:bg-[#FFDF7C] hover:text-black">
                  바닥재
                </button>
              </div>
              <ul className="flex flex-wrap gap-4 w-[800px]">
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
                <li className="w-[120px] h-[120px] rounded-xl bg-gray-200"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 mx-20 mb-40">
        <h1 className="text-3xl font-semibold">BEST COLORS</h1>
        <ul className="flex">
          <li className="flex">
            <p className="text-2xl mr-7">1</p>
            <div className="w-40 h-40 rounded-xl bg-slate-600"></div>
            <div className="z-10 w-40 h-40 -translate-x-20 translate-y-10 rounded-xl bg-slate-400"></div>
          </li>
          <li className="flex">
            <p className="text-2xl mr-7">2</p>
            <div className="w-40 h-40 rounded-xl bg-slate-600"></div>
            <div className="z-10 w-40 h-40 -translate-x-20 translate-y-10 rounded-xl bg-slate-400"></div>
          </li>
          <li className="flex">
            <p className="text-2xl mr-7">3</p>
            <div className="w-40 h-40 rounded-xl bg-slate-600"></div>
            <div className="z-10 w-40 h-40 -translate-x-20 translate-y-10 rounded-xl bg-slate-400"></div>
          </li>
          <li className="flex">
            <p className="text-2xl mr-7">4</p>
            <div className="w-40 h-40 rounded-xl bg-slate-600"></div>
            <div className="z-10 w-40 h-40 -translate-x-20 translate-y-10 rounded-xl bg-slate-400"></div>
          </li>
          <li className="flex">
            <p className="text-2xl mr-7">5</p>
            <div className="w-40 h-40 rounded-xl bg-slate-600"></div>
            <div className="z-10 w-40 h-40 -translate-x-20 translate-y-10 rounded-xl bg-slate-400"></div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-8 mx-20 mb-40">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">EVENT</h1>
          <div>
            <label htmlFor="moveToEvent" className="hover:cursor-pointer">
              VIEW MORE
            </label>
            <button id="moveToEvent">
              <RxChevronRight className="text-xl translate-y-1" />
            </button>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col w-[860px] h-[570px] gap-10">
            <div className="w-full h-[460px] bg-gray-200"></div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl">이벤트 배너 영역</h2>
              <p> 서브타이틀 영억 {`(날짜 및 설명글)`}</p>
            </div>
          </div>
          <div className="flex flex-col w-[860px] h-[570px] gap-10">
            <div className="w-full h-[460px] bg-gray-200"></div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl">이벤트 배너 영역</h2>
              <p> 서브타이틀 영억 {`(날짜 및 설명글)`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-[180px] bg-[#F3F3F3] mb-40">
        <h1 className="text-2xl">얼마나 필요한지 모르시나요? 스타일의 편리한 기능을 이용해보세요!</h1>
        <div className="text-[#888888]">
          <label htmlFor="moveToEvent" className="hover:cursor-pointer">
            VIEW MORE
          </label>
          <button id="moveToEvent">
            <RxChevronRight className="text-xl translate-y-1" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 mx-20 mb-40">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">COMMUNTY</h1>
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
              <RxChevronRight className="text-xl translate-y-1" />
            </button>
          </div>
        </div>
        <Flicking align={"prev"} circular={true} panelsPerView={3} plugins={arrowPlugins}>
          <div className="w-[520px] h-[254px] bg-gray-200 mx-5"></div>
          <div className="w-[520px] h-[254px] bg-gray-200 mx-5"></div>
          <div className="w-[520px] h-[254px] bg-gray-200 mx-5"></div>
          <div className="w-[520px] h-[254px] bg-gray-200 mx-5"></div>
          <div className="w-[520px] h-[254px] bg-gray-200 mx-5"></div>
          <ViewportSlot>
            <span className="flicking-arrow-prev is-circle"></span>
            <span className="flicking-arrow-next is-circle"></span>
          </ViewportSlot>
        </Flicking>
      </div>
    </>
  );
};
