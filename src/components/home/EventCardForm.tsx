import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase";
import { useAdminQuery } from "hooks";

export const EventCardForm = () => {
  const navigate = useNavigate();

  const { fetchEventMutation } = useAdminQuery();
  const { data: eventData } = fetchEventMutation;
  const filterEventData = eventData?.slice(0, 2);

  if (filterEventData?.length === 0) {
    return <div className="w-full h-[488px] text-center sm:h-[295px]">현재 진행중인 이벤트가 없습니다.</div>;
  } else if (filterEventData?.length === 1) {
    return (
      <>
        {filterEventData?.map((data) => (
          <div
            key={data.id}
            className="w-full gap-6 flex-column sm:mx-6 sm:gap-4"
            onClick={() => {
              navigate(`/event/${data.id}`);
            }}
          >
            <img
              src={`${STORAGE_URL}${data.eventImg}`}
              alt="eventImg"
              className="max-h-[400px] rounded-xl object-contain hover:cursor-pointer sm:min-w-[321px] sm:min-h-[200px] mr-auto"
            />
            <div className="gap-2 flex-column hover:cursor-pointer">
              <h2 className="text-2xl font-medium line-clamp-2 sm:text-lg">{data.title}</h2>
              <pre className="h-6 overflow-hidden text-gray02">{data.content}</pre>
            </div>
          </div>
        ))}
      </>
    );
  } else
    return (
      <>
        {filterEventData?.map((data) => (
          <div
            key={data.id}
            className="w-full gap-6 flex-column sm:mx-6 sm:gap-4 sm:w-[312px]"
            onClick={() => {
              navigate(`/event/${data.id}`);
            }}
          >
            <img
              src={`${STORAGE_URL}${data.eventImg}`}
              alt="eventImg"
              className="max-h-[400px] rounded-xl object-contain hover:cursor-pointer sm:h-[200px]"
            />
            <div className="gap-2 flex-column hover:cursor-pointer">
              <h2 className="text-2xl font-medium line-clamp-2 sm:text-lg">{data.title}</h2>
              <pre className="h-6 overflow-hidden text-gray02">{data.content}</pre>
            </div>
          </div>
        ))}
      </>
    );
};
