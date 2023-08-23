import { useEffect, useState } from "react";

interface DateConvertorProps {
  datetime: string;
  type: string;
}
export const DateConvertor: React.FC<DateConvertorProps> = ({ datetime, type }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [dotDate, setDotDate] = useState("");
  let date;
  useEffect(() => {
    const currentTime = new Date();
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dotDate = `${year}.${month}.${day}`;
    setDotDate(dotDate);

    const timeDifference: number = currentTime.getTime() - date.getTime();
    if (timeDifference < 1000) {
      setTimeAgo("방금 전");
    } else if (timeDifference < 60 * 1000) {
      const seconds = Math.floor(timeDifference / 1000);
      setTimeAgo(`${seconds}초 전`);
    } else if (timeDifference < 60 * 60 * 1000) {
      const minutes = Math.floor(timeDifference / (60 * 1000));
      setTimeAgo(`${minutes}분 전`);
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      setTimeAgo(`${hours}시간 전`);
    } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      setTimeAgo(`${days}일 전`);
    } else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) {
      const months = Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000));
      setTimeAgo(`${months}개월 전`);
    } else {
      const years = Math.floor(timeDifference / (12 * 30 * 24 * 60 * 60 * 1000));
      setTimeAgo(`${years}년 전`);
    }
  }, [datetime]);

  if (type === "timeAgo") {
    date = timeAgo;
  } else if (type === "dotDate") {
    date = dotDate;
  } else {
    date = dotDate;
  }
  return date;
};
