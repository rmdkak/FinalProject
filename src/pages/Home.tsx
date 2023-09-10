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
    <div className="items-center mt-16 flex-column">
      <div className="flex w-full mb-[120px]">
        <div className="flex-column w-[30%] min-w-[561px] mx-[5%] mb-20 mt-[100px]">
          <div className="mx-auto my-auto">
            <h1 className="text-[56px] leading-[130%]">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="mt-4 mb-10 text-xl text-gray01 leading-[30px]">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
            <HomeContentsTitle page={"interior-preview"} type={"noTitle"} />
          </div>
        </div>
        <div className="flex w-[70%] gap-[5%]">
          <HomeKvBanner />
        </div>
      </div>
      <div className="w-[1280px] flex-column mb-[80px]">
        <HomeContentsTitle title={"지금 뜨고있는 베스트조합"} type={"noNavigate"} />
        <Flicking ref={flicking0} plugins={plugins} circular={true} disableOnInit={true}>
          {ShowBestRankingPreview()}
        </Flicking>
        <Flicking ref={flicking1} align={"prev"} moveType={"strict"} circular={true}>
          {ShowBestRankingElements()}
        </Flicking>
      </div>
      <div className="home-section mb-[120px]">
        <HomeContentsTitle title={"이벤트"} page={"eventlist"} type={"useAll"} />
        <EventCardForm />
      </div>
      <div className="mb-[120px] home-section">
        <HomeContentsTitle title={"COMMUNITY"} page={"community"} type={"useAll"} />
        <div className="flex w-full">
          <ShowBestPostElements dataLength={3} />
        </div>
      </div>
    </div>
  );
};
