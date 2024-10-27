import { useState, useEffect, FC } from 'react';

// Utility function to get time until next midnight
const getTimeUntilNextMidnight = () => {
  const now: any = new Date();
  const nextMidnight: any = new Date();
  nextMidnight.setHours(336, 0, 0, 0);
  return nextMidnight - now;
};

const CountdownTimer:FC<any> = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilNextMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: any) => {
    const days = String(Math.floor((time / (1000 * 60 * 60 * 24))));
    const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    return(
      <div className='flex w-full px-5 pt-5 justify-between items-end'>
        <div className='flex flex-col'>
          <div className='opacity-40'>DAYS</div>
          <div className='text-5xl text-[#05F84E]'>{days}</div>
        </div>
        <div className='bg-white w-[1px] h-[40px] bg-opacity-40'>
         
        </div>
        <div className='flex flex-col'>
          <div  className='opacity-40'>HOURS</div>
          <div className='text-5xl  text-[#05F84E]'>{hours}</div>
        </div>
        <div className='bg-white w-[1px] h-[40px] bg-opacity-40'>
         
         </div>
        <div className='flex flex-col'>
          <div  className='opacity-40'>MINS</div>
          <div className='text-5xl  text-[#05F84E]'>{minutes}</div>
        </div>
        <div className='bg-white w-[1px] h-[40px] bg-opacity-40'>
         
         </div>
        <div className='flex flex-col'>
          <div  className='opacity-40'>SECS</div>
          <div className='text-5xl  text-[#05F84E]'>{seconds}</div>
        </div>

      </div>
    )
    

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
