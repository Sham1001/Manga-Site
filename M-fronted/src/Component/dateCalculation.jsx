import { useState, useEffect } from "react";
// import { getDate } from "../";
import { formatDistanceToNow, differenceInDays, format } from "date-fns"

function ChapterTime({ releaseDate }) {
  const [time, setTime] = useState('');


  

  const getChapterTime = (releaseDate) => {
  const release = new Date(releaseDate);
  const days = differenceInDays(new Date(), release);

  return days < 7
    ? formatDistanceToNow(release, { addSuffix: true })
    : format(release, "d MMM yyyy");
};


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getChapterTime(releaseDate));
    }, 60000); // update every 1 minute

    return () => clearInterval(interval);
  }, [releaseDate]);

  return <span>{time}</span>;
}

export default ChapterTime;