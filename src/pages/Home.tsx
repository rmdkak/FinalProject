import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-[800px] bg-gray-400 mb-40"></div>
      <div className="flex flex-col gap-8 mx-20 mb-40">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">한눈에 보는 우리집</h1>
          <button
            onClick={() => {
              navigate("/service");
            }}
          >
            VIEW MORE {`>`}
          </button>
        </div>
        <div className="flex gap-10">
          <div className="w-[820px] h-[460px] bg-gray-400"></div>
          <div className="flex flex-col gap-24">
            <div>
              <p>내 마음대로 꾸미고 조합해보세요.</p>
              <br />
              <h2 className="text-5xl leading-[70px]">
                자유롭게 조합하고
                <br />
                확인할 수 있는 인테리어
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-3 text-gray-400">
                <span>벽지</span>|<span>바닥재</span>
              </div>
              <ul className="flex gap-4">
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
                <li className="w-32 h-32 bg-gray-200"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 mx-20 mb-40">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">EVENT</h1>
          <button>VIEW MORE {`>`}</button>
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
      <div className="flex flex-col gap-8 mx-20 mb-40">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">COMMUNTY</h1>
          <button
            onClick={() => {
              navigate("/community");
            }}
          >
            VIEW MORE {`>`}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-[520px] h-[254px] bg-gray-200"></div>
          <div className="w-[640px] h-[340px] bg-gray-400"></div>
          <div className="w-[520px] h-[254px] bg-gray-200"></div>
        </div>
      </div>
    </>
  );
};
