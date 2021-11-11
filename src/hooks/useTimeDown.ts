import { useEffect, useState } from "react"
export const useTimeDown = (s:number) => {
  const [seconds, setSeconds] = useState(s);
  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]);

  return [seconds, setSeconds];
};