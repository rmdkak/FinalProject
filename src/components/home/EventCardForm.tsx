import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase/supabaseClient";
import { useAdminQuery } from "hooks/useAdminQuery";

export const EventCardForm = () => {
  const navigate = useNavigate();

  const { fetchEventMutation } = useAdminQuery();
  const { data: eventData } = fetchEventMutation;
  const filterEventData = eventData?.slice(0, 2);

  if (filterEventData?.length === 0) {
    return <div className="w-full h-[488px] text-center">현재 진행중인 이벤트가 없습니다.</div>;
  } else if (filterEventData?.length === 1) {
    return (
      <div className="flex gap-10">
        {filterEventData?.map((data) => (
          <div
            key={data.id}
            className="w-full gap-6 flex-column "
            onClick={() => {
              navigate(`/event/${data.id}`);
            }}
          >
            <img
              src={`${STORAGE_URL}${data.eventImg}`}
              alt="eventImg"
              className="h-[400px] rounded-xl object-contain hover:cursor-pointer"
            />
            <div className="gap-2 flex-column hover:cursor-pointer">
              <h2 className="text-2xl font-medium line-clamp-2">{data.title}</h2>
              <pre className="h-6 overflow-hidden text-gray02">{data.content}</pre>
            </div>
          </div>
        ))}
        <div className="w-full"></div>
      </div>
    );
  } else
    return (
      <div className="flex gap-10">
        {filterEventData?.map((data) => (
          <div
            key={data.id}
            className="w-full gap-6 flex-column "
            onClick={() => {
              navigate(`/event/${data.id}`);
            }}
          >
            <img
              src={`${STORAGE_URL}${data.eventImg}`}
              alt="eventImg"
              className="h-[400px] rounded-xl object-contain hover:cursor-pointer"
            />
            <div className="gap-2 flex-column hover:cursor-pointer">
              <h2 className="text-2xl font-medium line-clamp-2">{data.title}</h2>
              <pre className="h-6 overflow-hidden text-gray02">{data.content}</pre>
            </div>
          </div>
        ))}
      </div>
    );
};
