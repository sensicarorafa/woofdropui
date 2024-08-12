import dollarCoin from "../../assets/img/dollar-coin.png";
import powerBtn from "../../assets/img/power-btn.png";
import girlPlatform from "../../assets/img/girl-walk.png";
import boyPlatform from "../../assets/img/boy-walk.png";
import feet from "../../assets/img/feet.png";
import flame from "../../assets/img/flame.png";
import sneaker from "../../assets/img/sneakers.png";
import { NavLink } from "react-router-dom";
import Footer from "../footer";
import { useEffect, useState } from "react";
import useCountdown from "../../hooks/countdown";
import { levelList } from "../../pages/power-up/powerUp";
import { addPoints } from "../../api";
import { debounce } from "lodash";

const HomeTab = () => {
    const gender = sessionStorage.getItem("gender");
    const character = gender == "male" ? boyPlatform : girlPlatform;

    const [powerOn, setPowerOn] = useState(localStorage.getItem("powerOn") === "false" ? false : true);

    const getRemainingTime = () => {
        const endTime = localStorage.getItem("endTime");
        if (endTime) {
            return Math.max(Math.floor((Number(endTime) - Date.now()) / 1000), 0);
        } else {
            return 7200;
        }
    };

    const suffix = sessionStorage.getItem("tid") as string;
    const { displayTime, start, resetTimer, isFinished, timeLeft } = useCountdown(getRemainingTime(), suffix);

    if (isFinished == true) {
        resetTimer();
        setPowerOn(false);
    }

    useEffect(() => {
        if (powerOn) {
            start();
            localStorage.setItem("endTime", (Date.now() + timeLeft * 1000).toString());
        }
    }, [powerOn]);

    const handlePower = () => {
        if (!powerOn) {
            start();
        }
        setPowerOn(true);
        localStorage.setItem("powerOn", "true");
        startTracking();
    };

    const startTracking = () => {
        setStepCount(0); // Reset step count when tracking starts
        setIsTracking(true);
    };

    const [stepCount, setStepCount] = useState(0);
    const [isTracking, setIsTracking] = useState(false);

    const tId = sessionStorage.getItem("tid");

    const [points, setPoints] = useState(Number(sessionStorage.getItem("points")));

    const level = Number(sessionStorage.getItem("level"));
    const pointsPerStep = level != 0 ? Number(levelList[level].steps) : 1;
    const pointLevel = level != 0 ? levelList[level].name : "Stepper";
    let pointStepCount = pointsPerStep * stepCount;

    const debouncedAddPoints = debounce(async (tId: number, pointStepCount: number) => {
        await addPoints(tId, pointStepCount);
    }, 1000);

    useEffect(() => {
        if (isTracking) {
            let newPoints = Number(sessionStorage.getItem("points")) + pointsPerStep * stepCount;
            sessionStorage.setItem("points", newPoints.toString());
            setPoints(newPoints);
            let footPrint = JSON.parse(localStorage.getItem("footPrint") as string);
            if (footPrint?.logged == false && footPrint?.point < 1500) {
                let newPoint = footPrint.point + pointStepCount;
                localStorage.setItem("footPrint", JSON.stringify({ logged: false, date: new Date().toDateString(), point: newPoint }));
            }
            debouncedAddPoints(Number(tId), pointStepCount);
        }
    }, [stepCount]);

    useEffect(() => {
        let lastAcceleration = null as any;
        let stepThreshold = 1.6;

        const handleMotionEvent = (event: DeviceMotionEvent) => {
            const { x, y, z } = event.acceleration as DeviceMotionEventAcceleration;
            if (lastAcceleration) {
                const deltaX = (x as number) - lastAcceleration.x;
                const deltaY = (y as number) - lastAcceleration.y;
                const deltaZ = (z as number) - lastAcceleration.z;

                const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

                if (magnitude > stepThreshold) {
                    setStepCount((prevStepCount) => prevStepCount + 1);
                }
            }
            lastAcceleration = { x, y, z };
        };

        if (isTracking) {
            window.addEventListener("devicemotion", handleMotionEvent);
        } else {
            window.removeEventListener("devicemotion", handleMotionEvent);
        }

        return () => {
            window.removeEventListener("devicemotion", handleMotionEvent);
        };
    }, [isTracking]);

    return (
        <div className="flex flex-col items-center justify-end  w-full h-[100%] overflow-hidden">
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                <div className="flex flex-col items-center px-10 w-full flex-1">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-[40px]">
                                <img className="w-full" src={dollarCoin} alt="" />
                            </div>
                            <p className="text-3xl text-[#FEC95E] font-bold mb-[10px]">{points.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-[40px] mt-3" onClick={handlePower}>
                                <img className={`w-full ${powerOn && "filter grayscale"}`} src={powerBtn} alt="" />
                            </div>
                            <p className="text-[10px] text-[#FFFFFF] font-normal">{displayTime}</p>
                        </div>
                    </div>
                    <div className=" w-[50%] small-mobile:w-[52%] mobile:w-[65%]">
                        <img className="w-full" src={character} alt="" />
                    </div>
                </div>
                <div className="w-full rounded-tr-[40px] rounded-tl-[40px] bg-[#1D2849] bg-opacity-[69%] flex flex-col relative z-10">
                    <div className="border-b-[1px] border-opacity-20 border-b-[#FFFFFF] flex justify-between items-center px-[25px] py-3">
                        <div className="flex flex-col text-[#FEC95E] text-lg font-medium">
                            History
                            <p className="text-[#FFE2A7] text-sm font-OpenSans font-light">Today</p>
                        </div>
                        <NavLink to="/history" className="text-[#FEC95E] text-lg font-medium">
                            <i className="bx bx-dots-vertical-rounded text-xl text-[#FFE2A7]"></i>
                        </NavLink>
                    </div>
                    <div className="border-b-[1px] border-opacity-20 border-b-[#FFFFFF] flex justify-between items-center px-[25px] py-3">
                        <div className="flex">
                            <div className="w-[30px]">
                                <img className="" src={feet} alt="" />
                            </div>
                            <div className="flex flex-col ml-[4px]">
                                <p className="font-Rockwell text-[#FEC95E] text-2xl leading-[24px] pb-[4px]">{stepCount.toLocaleString()}</p>
                                <p className="font-Ravie text-[#FFE2A7] text-xs">Steps</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[18px] mb-[20px]">
                                <img className="" src={flame} alt="" />
                            </div>
                            <div className="flex flex-col ml-[4px]">
                                <p className="font-Rockwell text-[#FEC95E] text-2xl leading-[24px]">{(26.3 * stepCount).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                <p className="font-Ravie text-[#FFE2A7] text-[10px]">Calories Burnt</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-[25px] py-3">
                        <div className="flex gap-2">
                            <div className="w-[20%]">
                                <img className="w-full" src={sneaker} alt="" />
                            </div>
                            <div className="flex flex-col font-OpenSans justify-center">
                                <p className="font-OpenSans text-[#FEC95E] text-sm">{pointLevel}</p>
                                <p className="text-[#FFE2A7] font-OpenSans text-xs">Earning Rate - {pointsPerStep} points per step</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeTab;
