import { useState, useEffect, useRef } from "react";

import { Sync } from "@egjs/flicking-plugins";
import Flicking, { type Plugin } from "@egjs/react-flicking";
import { EventCardForm, HomeContentsTitle, HomeKvBanner } from "components/home";
import { usePostsData, useMovePage } from "hooks";

export const Home = () => {
  const { setCurrentPathname } = useMovePage();
  setCurrentPathname();
  const { ShowBestPostElements, ShowBestRankingElements, ShowBestRankingPreview } = usePostsData();
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const flicking0 = useRef() as React.LegacyRef<Flicking> | undefined;
  const flicking1 = useRef() as React.LegacyRef<Flicking> | undefined;

  useEffect(() => {
    setPlugins([
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          { flicking: (flicking0 as React.RefObject<Flicking>).current as Flicking },
          {
            flicking: (flicking1 as React.RefObject<Flicking>).current as Flicking,
            isClickable: true,
            activeClass: "active",
          },
        ],
      }),
    ]);
  }, []);

  return (
    <div className="items-center mt-16 flex-column sm:mt-0">
      <div className="flex w-full mb-[120px] sm:mb-16 sm:h-[640px]">
        <div className="flex-column w-[30%] min-w-[561px] mx-[5%] mb-20 mt-[100px] sm:w-full sm:mr-[18%] sm:mx-0 sm:min-w-0">
          <div className="my-auto mx-auto sm:mx-0 sm:ml-[15%] sm:min-w-[284px]">
            <h1 className="text-[56px] leading-[130%] sm:text-[28px]">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="mt-4 mb-10 text-xl text-gray01 leading-[30px] sm:hidden">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
            <p className="hidden sm:block sm:text-[15px] sm:leading-[145%] sm:mb-10 sm:mt-4">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는
              <br />
              따뜻한 인테리어 세상에 오세요.
            </p>
            <HomeContentsTitle page={"interior-preview"} type={"noTitle"} />
          </div>
        </div>
        <div className="flex w-[70%] gap-[5%] sm:absolute sm:top-0 sm:-z-10 sm:gap-0 sm:w-full">
          <HomeKvBanner />
        </div>
      </div>
      <div className="w-[1280px] flex-column mb-[80px] sm:w-full">
        <HomeContentsTitle title={"지금 뜨고있는 베스트조합"} type={"noNavigate"} />
        <div className="sm:mx-6">
          <Flicking ref={flicking0} plugins={plugins} circular={true} disableOnInit={true} align={"prev"}>
            {ShowBestRankingPreview()}
          </Flicking>
          <Flicking inputType={["touch", "mouse"]} ref={flicking1} align={"prev"} circular={true}>
            {ShowBestRankingElements()}
          </Flicking>
        </div>
      </div>
      <div className="home-section mb-[120px] sm:w-full">
        <HomeContentsTitle title={"이벤트"} page={"eventlist"} type={"useAll"} />
        <div className="flex gap-10 sm:hidden">
          <EventCardForm />
        </div>
        <div className="hidden sm:block sm:mx-6">
          <Flicking
            inputType={["touch", "mouse"]}
            align={"prev"}
            moveType={"strict"}
            circular={true}
            circularFallback={"bound"}
          >
            {EventCardForm()}
          </Flicking>
        </div>
      </div>
      <div className="mb-[120px] home-section sm:w-full">
        <HomeContentsTitle title={"COMMUNITY"} page={"community"} type={"useAll"} />
        <div className="flex w-full sm:hidden ">
          <ShowBestPostElements dataLength={3} />
        </div>
        <div className="hidden sm:block sm:mx-6 ">
          <Flicking
            inputType={["touch", "mouse"]}
            align={"prev"}
            moveType={"strict"}
            circular={true}
            circularFallback={"bound"}
          >
            {ShowBestPostElements({ dataLength: 3 })}
          </Flicking>
        </div>
      </div>
    </div>
  );
};
