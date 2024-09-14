import { useState, useEffect, FC } from 'react';

const Countdown:FC<any> = ({ targetTime }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(targetTime);
    const difference = targetDate.getTime() + (24 * 60 * 60 * 1000) - now.getTime(); // 24 hours from the target time

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { hours, minutes, seconds };
    } else {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div>
      {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
        <></>
      ) : (
        <div className="h-auto font-neuropol py-2">
            <div className="text-center text-white flex gap-5 px-4 justify-center items-center">
                <div className="text-sm">
                {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
