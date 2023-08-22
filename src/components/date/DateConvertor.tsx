import { useEffect, useState } from "react";

export const DateConvertor = ({ datetime }: { datetime: string }) => {
  const [timeAgo, setTimeAgo] = useState("");
  useEffect(() => {
    const currentTime = new Date();
    const pastTime = new Date(datetime);
    const timeDifference: number = currentTime.getTime() - pastTime.getTime();

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

  return <div>{timeAgo}</div>;
};
