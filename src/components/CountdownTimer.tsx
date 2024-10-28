import { useState, useEffect, FC } from 'react';

// Utility function to get time until October 10, 2024, at 2:00 PM
const getTimeUntilTargetDate = () => {
  const now = new Date().getTime();
  const targetDate = new Date('2024-11-11T14:00:00').getTime();
  return targetDate - now;
};

const CountdownTimer: FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilTargetDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilTargetDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const days = String(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');

    return (
      <div className="flex w-full px-5 pt-2 justify-between items-end">
        <div className="flex flex-col">
          <div className="opacity-40">DAYS</div>
          <div className="text-2xl text-[#05F84E]">{days}</div>
        </div>
        <div className="bg-white w-[1px] h-[40px] bg-opacity-40"></div>
        <div className="flex flex-col">
          <div className="opacity-40">HOURS</div>
          <div className="text-2xl text-[#05F84E]">{hours}</div>
        </div>
        <div className="bg-white w-[1px] h-[40px] bg-opacity-40"></div>
        <div className="flex flex-col">
          <div className="opacity-40">MINS</div>
          <div className="text-2xl text-[#05F84E]">{minutes}</div>
        </div>
        <div className="bg-white w-[1px] h-[40px] bg-opacity-40"></div>
        <div className="flex flex-col">
          <div className="opacity-40">SECS</div>
          <div className="text-2xl text-[#05F84E]">{seconds}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-auto font-neuropol w-full">
      <div className="text-center text-white flex gap-5 px-4 justify-center items-center w-full">
        <div className="text-lg w-full">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
