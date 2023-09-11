import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase";
import { DateConvertor } from "components";
import { useAdminQuery, usePagination } from "hooks";
export const EventList = () => {
  const navigate = useNavigate();
  const { fetchEventMutation } = useAdminQuery();
  const { data: eventAllData } = fetchEventMutation;

  const { pageData, showPageComponent } = usePagination({
    data: eventAllData,
    dataLength: eventAllData?.length,
    postPerPage: 2,
  });

  return (
    <div className="flex-column w-[1280px] mx-auto my-20 ">
      <div className="border-b border-black">
        <h1 className="mb-6 text-2xl text-center">EVENT</h1>
      </div>
      <div className="flex flex-wrap gap-10 mt-10 mb-16">
        {pageData?.map((eventData) => (
          <div
            key={eventData.id}
            className="w-[600px] gap-6 flex-column"
            onClick={() => {
              navigate(`/event/${eventData.id as string}`);
            }}
          >
            <img
              src={`${STORAGE_URL}${eventData.eventImg as string}`}
              alt="postImg"
              className="rounded-xl hover:cursor-pointer h-[400px] object-contain"
            />
            <div className="gap-4 flex-column hover:cursor-pointer">
              <div className="gap-2 flex-column">
                <h2 className="text-2xl font-medium line-clamp-2">{eventData.title}</h2>
                <pre className="h-6 overflow-hidden text-gray02">{eventData.content}</pre>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray03">
                {eventData?.minDate !== null && eventData?.maxDate !== null && (
                  <>
                    <p>진행기간:</p>
                    <DateConvertor datetime={eventData?.minDate} type={"dotDate"} />
                    <p>~</p>
                    <DateConvertor datetime={eventData?.maxDate} type={"dotDate"} />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">{showPageComponent}</div>
    </div>
  );
};
