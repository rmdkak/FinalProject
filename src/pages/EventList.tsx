import { useNavigate } from "react-router-dom";

import { STORAGE_URL } from "api/supabase/supabaseClient";
import { DateConvertor } from "components";
import { useAdminQuery } from "hooks/useAdminQuery";
import { usePagination } from "hooks/usePagination";
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
    <div className="flex-column w-[1280px] px-6 mx-auto my-20 sm:mt-6 sm:mb-20 sm:w-full lg:w-full md:w-full">
      <div className="border-b border-black sm:hidden">
        <h1 className="mb-6 text-2xl text-center">EVENT</h1>
      </div>
      <div className="flex gap-10 mt-10 mb-16 sm:mt-0 sm:flex-col sm:items-center sm:mx-6">
        {pageData?.map((eventData) => (
          <div
            key={eventData.id}
            className="mx-w-[600px] gap-6 flex-column sm:min-w-[312px] sm:gap-4"
            onClick={() => {
              navigate(`/event/${eventData.id as string}`);
            }}
          >
            <img
              src={`${STORAGE_URL}${eventData.eventImg as string}`}
              alt="postImg"
              className="rounded-xl hover:cursor-pointer max-h-[400px] object-contain sm:min-h-[200px]"
            />
            <div className="gap-4 flex-column hover:cursor-pointer">
              <div className="gap-2 flex-column sm:gap-1">
                <h2 className="text-2xl font-medium line-clamp-2 sm:text-base">{eventData.title}</h2>
                <pre className="h-6 overflow-hidden break-words whitespace-pre-wrap text-gray02 sm:text-sm">
                  {eventData.content}
                </pre>
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
