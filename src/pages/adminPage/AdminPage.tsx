import { useState } from "react";
import { MdContactSupport, MdAnnouncement, MdFactCheck, MdLibraryAdd } from "react-icons/md";

import { DataForm } from "./DataForm";
import { EventForm } from "./EventForm";
import { ManToMan } from "./ManToMan";
import { Report } from "./Report";

export const AdminPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("문의");

  const [manToManDataLength, setManToManDataLength] = useState(0);
  const [reportDataLength, setReportDataLength] = useState(0);

  const adminPageInfoTabArray = [
    {
      title: "문의",
      icon: MdContactSupport,
      component: <ManToMan key="문의" setLength={setManToManDataLength} />,
      length: manToManDataLength,
    },
    {
      title: "신고",
      icon: MdAnnouncement,
      component: <Report key="신고" setLength={setReportDataLength} />,
      length: reportDataLength,
    },
    {
      title: "이벤트 작성",
      icon: MdFactCheck,
      component: <EventForm key="이벤트" />,
    },
    {
      title: "데이터 등록",
      icon: MdLibraryAdd,
      component: <DataForm key="데이터" />,
    },
  ];

  return (
    <div className="flex-column items-center m-10 w-[1280px] mx-auto px-10">
      <div className="w-full pb-6 text-center">
        <p className="text-[32px] font-normal leading-[130%]">관리자 페이지</p>
      </div>

      <div className="w-full flex justify-around border border-gray05 rounded-[12px] p-5">
        {adminPageInfoTabArray.map((InfoTab, index) => {
          return (
            <div
              key={InfoTab.title}
              onClick={() => {
                setCurrentTab(InfoTab.title);
              }}
              className="relative flex-column contents-center h-36 w-[254px] gap-[10px] cursor-pointer"
            >
              <div className="gap-3 flex-column contents-center">
                <InfoTab.icon className="w-6 h-6 text-gray05" />
                <p className="font-normal leading-[150%]">{InfoTab.title}</p>
              </div>
              {index !== 0 && (
                <div className="absolute w-[1px] h-[40px] bg-gray06 left-[-30px] top-1/2 translate-y-[-50%]" />
              )}
              <p className="absolute top-3/4 text-[18px] leading-[145%]">{InfoTab.length}</p>
            </div>
          );
        })}
      </div>

      <div className="w-full mt-5 flex-column">
        {adminPageInfoTabArray.map((InfoTab) => (
          <div key={InfoTab.title}>{currentTab === InfoTab.title && InfoTab.component}</div>
        ))}
      </div>
    </div>
  );
};
