interface Props {
  mypageInfoArray: MypageInfo[];
}

interface MypageInfo {
  title: string;
  link: string;
  icon: JSX.Element;
  data: any[] | undefined;
}

const BR_STYLE = "absolute w-[1px] h-[40px] bg-gray06 left-[-1px] top-1/2 translate-y-[-50%]";

export const MyActiveCountBox = ({ mypageInfoArray }: Props) => {
  return (
    <div className="flex items-start border border-gray05 rounded-[12px]">
      {mypageInfoArray.map((mypageInfo) => {
        return (
          <div key={mypageInfo.title} className="relative flex-column contents-center h-full w-[254px] gap-[24px]">
            <div className="flex-column contents-center gap-3">
              {mypageInfo.icon}
              <p className="text-[16px] font-normal leading-[150%]">{mypageInfo.title}</p>
            </div>
            <div className={BR_STYLE}></div>
            <p className="text-[24px] font-medium leading-[145%]">
              {mypageInfo.data === undefined ? 0 : mypageInfo.data.length}
            </p>
          </div>
        );
      })}
    </div>
  );
};
