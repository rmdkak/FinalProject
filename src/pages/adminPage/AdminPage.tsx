import { useState, useEffect } from "react";
import { MdContactSupport, MdAnnouncement, MdFactCheck, MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { ADMIN_ID } from "api/supabase/supabaseClient";
import { useAuthStore } from "store";

import { DataForm } from "./DataForm";
import { EventForm } from "./EventForm";
import { ManToMan } from "./ManToMan";
import { Report } from "./Report";

export const AdminPage = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>("문의");
  const [manToManDataLength, setManToManDataLength] = useState(0);
  const [reportDataLength, setReportDataLength] = useState(0);

  const { currentSession } = useAuthStore();

  useEffect(() => {
    if (currentSession !== null && currentSession.user.id !== ADMIN_ID) {
      navigate("/");
    }
  }, [currentSession]);

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
    <div className="flex-column items-center m-10 max-w-[1280px] w-[90%] mx-auto px-10">
      <div className="w-full pb-6 text-center">
        <p className="title-3">관리자 페이지</p>
      </div>

      <div className="flex justify-around w-full p-5 border border-gray05 rounded-xl">
        {adminPageInfoTabArray.map((InfoTab, index) => {
          return (
            <div
              key={InfoTab.title}
              onClick={() => {
                setCurrentTab(InfoTab.title);
              }}
              className="relative flex-column contents-center w-[254px] h-36 gap-2.5 cursor-pointer"
            >
              <div className="gap-3 flex-column contents-center">
                <InfoTab.icon className="w-6 h-6 text-gray05" />
                <pre className="flex break-words contents-center body-2 sm:body-4">{InfoTab.title}</pre>
              </div>
              {index !== 0 && <div className="absolute left-0 w-px h-10 -translate-y-1/2 bg-gray06 top-1/2" />}
              <p className="absolute top-3/4 body-1">{InfoTab.length}</p>
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
