export const EventCardForm = () => {
  return (
    <div className="flex gap-10">
      <div className="w-full gap-6 flex-column" onClick={() => {}}>
        <img src="" alt="eventThumnail" className="h-[400px] rounded-xl object-contain hover:cursor-pointer"></img>
        <div className="gap-2 flex-column hover:cursor-pointer">
          <h2 className="text-2xl font-medium">TITLE</h2>
          <p className="text-gray02">subTitle</p>
        </div>
      </div>
    </div>
  );
};
