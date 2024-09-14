import { useState, useEffect } from 'react';



// Utility function to get time until next midnight
const getTimeUntilNextThreeDays= ({taskTime}:any) => {
  const now: any = new Date();
  const addedTime = Number(taskTime) + 259200000
  const nextThreeDays: any = new Date(addedTime) ;
  // nextThreeDays.setHours(24, 0, 0, 0);
  return nextThreeDays - now;
};

const CountdownTimer = (taskTime:any) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextThreeDays(taskTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilNextThreeDays(taskTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const days = String(Math.floor((time / (1000 * 60 * 60 * 24)))).padStart(2, '0');
    const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="h-auto font-neuropol py-2 ">
      <div className="text-center text-white flex gap-5  justify-center items-center">
        <div className="text-sm">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
