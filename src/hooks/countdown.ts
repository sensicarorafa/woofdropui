import { useState, useEffect } from "react";

function formatTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function useCountdown(initialTime: number, suffix: string) {
    const getRemainingTime = () => {
        // Get the end time from localStorage
        const endTime = localStorage.getItem(`endTime-${suffix}`);
        if (endTime) {
            // Calculate the time left in seconds
            return Math.max(Math.floor((Number(endTime) - Date.now()) / 1000), 0);
        } else {
            return initialTime;
        }
    };

    const [timeLeft, setTimeLeft] = useState(getRemainingTime());
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (!isActive && timeLeft !== 0) {
            clearInterval(interval!);
        }

        if (timeLeft === 0) {
            setIsFinished(true);
            setIsActive(false);
        }

        return () => clearInterval(interval!);
    }, [isActive, isPaused, timeLeft]);

    useEffect(() => {
        // Save the end time to localStorage
        localStorage.setItem(`endTime-${suffix}`, (Date.now() + timeLeft * 1000).toString());
    }, [timeLeft]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const start = () => {
        setIsActive(true);
    };

    const stop = () => {
        setIsActive(false);
    };

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

    const resetTimer = () => {
        setTimeLeft(initialTime);
        setIsActive(false);
        setIsPaused(false);
        setIsFinished(false);
        localStorage.removeItem(`endTime-${suffix}`);
    };

    return {
        timeLeft,
        displayTime: formatTime(timeLeft),
        toggle,
        pause,
        resume,
        resetTimer,
        isFinished,
        isPaused,
        start,
        stop,
    };
}

export default useCountdown;
