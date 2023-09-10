import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";

import { STORAGE_URL } from "api/supabase";
import defaultImg from "assets/defaultImg.jpg";
import { DateConvertor } from "components";
import { useAdminQuery } from "hooks";
export const Event = () => {
  const { id: paramsId } = useParams();
  const navigate = useNavigate();
  const { fetchEventDetailMutation, fetchEventMutation } = useAdminQuery();
  const { data: eventDetailData } = fetchEventDetailMutation;
  const { data: eventAllData } = fetchEventMutation;

  if (eventDetailData === undefined) return <></>;

  let prevPage = "";
  let nextPage = "";

  const findCurrentIdx: number | undefined = eventAllData?.findIndex((item) => item.id === paramsId);

  if (eventAllData !== undefined) {
    prevPage = eventAllData[(findCurrentIdx as number) - 1]?.id;
    nextPage = eventAllData[(findCurrentIdx as number) + 1]?.id;
  }
  return (
    <div className="flex-column w-[1280px] mx-auto my-20 ">
      <div className="border-b border-black">
        <h1 className="mb-6 text-2xl text-center">EVENT</h1>
      </div>
      <div className="gap-4 border-b flex-column border-gray05">
        <div className="gap-4 flex-column my-9">
          <h2 className="text-[18px] font-semibold">{eventDetailData?.title}</h2>
          <div className="flex items-center gap-2 text-gray02 text-[14px]">
            <img
              src={eventDetailData?.USERS?.avatar_url === "" ? defaultImg : eventDetailData?.USERS?.avatar_url}
              alt="userImg"
              className="w-8 h-8 border rounded-full border-gray05"
            />
            <p>{eventDetailData?.USERS?.name}</p>
            {eventDetailData?.minDate !== null && eventDetailData?.maxDate !== null && (
              <>
                <p>진행기간:</p>
                <DateConvertor datetime={eventDetailData?.minDate} type={"dotDate"} />
                <p>~</p>
                <DateConvertor datetime={eventDetailData?.maxDate} type={"dotDate"} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-column gap-10 mt-[15px] mb-[50px] border-b border-gray05 py-10">
        <img src={`${STORAGE_URL}${eventDetailData?.eventImg}`} alt="eventImg" />
        <pre className="w-full break-words whitespace-pre-wrap text-[18px] mb-10">{eventDetailData?.content}</pre>
      </div>
      <div className="flex justify-between">
        <button
          className="w-40 h-12 text-sm border rounded-lg border-gray05"
          onClick={() => {
            navigate(-1);
          }}
        >
          이전으로
        </button>
        <button
          className="w-40 h-12 text-sm border rounded-lg border-gray05"
          onClick={() => {
            navigate("/eventlist");
          }}
        >
          목록으로
        </button>
      </div>
      <div className="mt-20 flex-column border-t-[1px] border-gray06">
        {prevPage !== undefined && (
          <div
            className="flex gap-[10px] items-center py-6 border-b-[1px] border-gray06 hover:cursor-pointer"
            onClick={() => {
              navigate(`/event/${prevPage}`);
            }}
          >
            <SlArrowUp className="fill-gray02" />
            <label className="text-gray02 w-[80px]">이전글 보기</label>
            <span className="h-[8px] border border-gray08"></span>
            <p className="line-clamp-1">
              {eventAllData !== undefined ? eventAllData[(findCurrentIdx as number) - 1].title : ""}
            </p>
          </div>
        )}
        {nextPage !== undefined && (
          <div
            className="flex gap-[10px] items-center py-6 border-b-[1px] border-gray06 hover:cursor-pointer"
            onClick={() => {
              navigate(`/event/${nextPage}`);
            }}
          >
            <SlArrowDown className="fill-gray02" />
            <label className="text-gray02 w-[80px]">다음글 보기</label>
            <span className="h-[8px] border border-gray08"></span>
            <p>{eventAllData !== undefined ? eventAllData[(findCurrentIdx as number) + 1].title : ""}</p>
          </div>
        )}
      </div>
    </div>
  );
};
