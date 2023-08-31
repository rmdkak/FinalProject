/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { useEffect, useState } from "react";

interface DateConvertorProps {
  datetime: string;
  type: "timeAgo" | "dotDate" | "hourMinute";
  className?: string;
}

export const DateConvertor: React.FC<DateConvertorProps> = ({ datetime, type, className }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  const currentTime = new Date();
  const date = new Date(datetime);
  const timeDifference: number = currentTime.getTime() - date.getTime();

  useEffect(() => {
    switch (type) {
      case "timeAgo":
        if (timeDifference < 1000) {
          setFormattedDate("방금 전");
        } else if (timeDifference < 60 * 1000) {
          const seconds = Math.floor(timeDifference / 1000);
          setFormattedDate(`${seconds}초 전`);
        } else if (timeDifference < 60 * 60 * 1000) {
          const minutes = Math.floor(timeDifference / (60 * 1000));
          setFormattedDate(`${minutes}분 전`);
        } else if (timeDifference < 24 * 60 * 60 * 1000) {
          const hours = Math.floor(timeDifference / (60 * 60 * 1000));
          setFormattedDate(`${hours}시간 전`);
        } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
          const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
          setFormattedDate(`${days}일 전`);
        } else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) {
          const months = Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000));
          setFormattedDate(`${months}개월 전`);
        } else {
          const years = Math.floor(timeDifference / (12 * 30 * 24 * 60 * 60 * 1000));
          setFormattedDate(`${years}년 전`);
        }
        break;

      case "dotDate":
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dotDate = `${year}.${month}.${day}`;
        setFormattedDate(dotDate);
        break;

      case "hourMinute":
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let formattedHours = hours.toString();
        let formattedMinutes = minutes.toString();
        if (hours < 10) {
          formattedHours = hours.toString().padStart(2, "0");
        }
        if (minutes < 10) {
          formattedMinutes = minutes.toString().padStart(2, "0");
        }
        setFormattedDate(`${formattedHours}:${formattedMinutes}`);
        break;

      default:
        break;
    }
  }, [datetime, type]);

  if (formattedDate.includes("NaN")) {
    setFormattedDate("");
  }

  return <p className={className}>{formattedDate}</p>;
};
