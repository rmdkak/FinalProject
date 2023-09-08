// import { usePagination } from "hooks";

export const EventList = () => {
  //   const { pageData, showPageComponent } = usePagination({
  //     data: ,
  //     dataLength: ,
  //     postPerPage: ,
  //   });

  return (
    <div className="flex-column w-[1280px] mx-auto my-20 ">
      <div className="border-b border-black">
        <h1 className="mb-6 text-2xl text-center">EVENT</h1>
      </div>
      <div className="flex gap-10 mt-10 mb-16">
        <div className="w-full gap-6 flex-column" onClick={() => {}}>
          <img
            src=""
            alt="thumnail"
            className="h-[400px] rounded-xl object-contain hover:cursor-pointer bg-gray03"
          ></img>
          <div className="gap-8 flex-column hover:cursor-pointer">
            <div className="gap-2 flex-column">
              <h2 className="text-2xl font-medium">Title</h2>
              <p className="text-gray02">subTitle</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray03">
              <p>이벤트 진행기간</p>
              <span className="h-2 border border-gray06" />
              <p>YYYY.MM.DD - YYYY.MM.DD</p>
            </div>
          </div>
        </div>
        <div className="w-full gap-6 flex-column">
          <img
            src=""
            alt="thumnail"
            className="h-[400px] rounded-xl object-contain hover:cursor-pointer bg-gray03"
          ></img>
          <div className="gap-8 flex-column hover:cursor-pointer">
            <div className="gap-2 flex-column">
              <h2 className="text-2xl font-medium">Title</h2>
              <p className="text-gray02">subTitle</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray03">
              <p>이벤트 진행기간</p>
              <span className="h-2 border border-gray06" />
              <p>YYYY.MM.DD - YYYY.MM.DD</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">{}</div>
    </div>
  );
};
