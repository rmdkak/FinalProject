import { useState, useEffect, useRef } from "react";

import { Sync } from "@egjs/flicking-plugins";
import Flicking, { type Plugin } from "@egjs/react-flicking";
import { EventCardForm, HomeContentsTitle, HomeKvBanner } from "components/home";
import { useMovePage } from "hooks/useMovePage";
import { usePostsData } from "hooks/usePostsData";

const Home = () => {
  const { setCurrentPathname } = useMovePage();
  setCurrentPathname();
  const { ShowBestPostElements, ShowBestRankingElements, ShowBestRankingPreview } = usePostsData();
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const flicking0 = useRef() as React.LegacyRef<Flicking> | undefined;
  const flicking1 = useRef() as React.LegacyRef<Flicking> | undefined;
  const flicking2 = useRef() as React.LegacyRef<Flicking> | undefined;

  useEffect(() => {
    setPlugins([
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          { flicking: (flicking0 as React.RefObject<Flicking>).current as Flicking },
          { flicking: (flicking2 as React.RefObject<Flicking>).current as Flicking },
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
        <div className="flex-column w-[30%] min-w-[561px] mx-[5%] mb-20 mt-[100px] sm:w-full sm:mr-[18%] sm:mx-0 sm:min-w-0 lg:mx-6 lg:min-w-[481px] md:mx-6 md:min-w-[406px]">
          <div className="my-auto mx-auto sm:mx-0 sm:my-0 sm:ml-6 sm:mb-auto sm:min-w-[284px]">
            <h1 className="text-[56px] leading-[130%] sm:text-[28px] lg:text-5xl md:text-[40px] sm:font-medium">
              내 스타일 그대로,
              <br />
              인테리어를 완성해보세요!
            </h1>
            <p className="mt-4 mb-10 text-xl text-gray01 leading-[30px] sm:hidden lg:text-lg md:text-base">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는 따뜻한 인테리어 세상에 오세요.
            </p>
            <p className="hidden text-gray01 sm:block sm:text-[15px] sm:leading-[145%] sm:mb-10 sm:mt-4">
              나만의 조합으로 완성되는, 소중한 우리 공간!
              <br />
              당신의 취향이 만들어가는
              <br />
              따뜻한 인테리어 세상에 오세요.
            </p>
            <HomeContentsTitle page={"interior-preview"} type={"noTitle"} />
          </div>
        </div>
        <div className="flex w-full gap-[5%] sm:absolute sm:top-0 sm:-z-10 sm:gap-0">
          <HomeKvBanner />
        </div>
      </div>
      <div className="w-[1280px] flex-column mb-20 sm:w-full sm:mb-5 md:w-full md:px-6 lg:w-full lg:px-6">
        <HomeContentsTitle title={"지금 뜨고있는 베스트조합"} type={"noNavigate"} />
        <div className="sm:mx-6">
          <div className="sm:hidden">
            <Flicking
              ref={flicking0}
              plugins={plugins}
              panelsPerView={1}
              circular={true}
              disableOnInit={true}
              align={"prev"}
            >
              {ShowBestRankingPreview()}
            </Flicking>
          </div>
          <div className="hidden sm:block">
            <Flicking ref={flicking2} plugins={plugins} circular={true} disableOnInit={true} align={"prev"}>
              {ShowBestRankingPreview()}
            </Flicking>
          </div>
          <Flicking inputType={["touch", "mouse"]} ref={flicking1} align={"prev"} circular={true}>
            {ShowBestRankingElements()}
          </Flicking>
        </div>
      </div>
      <div className="home-section mb-[120px] sm:w-full sm:mb-5 md:w-full md:px-6 lg:w-full lg:px-6">
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
      <div className="mb-[120px] home-section sm:w-full sm:mb-5 md:w-full md:px-6 lg:w-full lg:px-6">
        <HomeContentsTitle title={"COMMUNITY"} page={"community"} type={"useAll"} />
        <div className="flex w-full sm:hidden">
          <ShowBestPostElements dataLength={3} />
        </div>
        <div className="hidden sm:block sm:px-6 ">
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

export default Home;
