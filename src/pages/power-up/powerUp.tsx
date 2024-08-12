import bgBlurImg2 from "../../assets/img/bg-blur-2.png";
import { NavLink } from "react-router-dom";
import lock from "../../assets/img/lock.png";
import yellowStar from "../../assets/img/yellow-star.png";
import shoe from "../../assets/img/shoe1.png";
import shoe2 from "../../assets/img/shoe2.png";
import shoe3 from "../../assets/img/shoe3.png";
import shoe4 from "../../assets/img/shoe4.png";
import shoe5 from "../../assets/img/shoe5.png";
import shoe6 from "../../assets/img/shoe6.png";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import { getUser, levelUp } from "../../api";

interface LevelData {
    id: number;
    level: string;
    levelIndex: number;
    starsNumber: string;
    prize: number;
    prizeText: string;
    bgShoe: string;
}

const levelData: LevelData[] = [
    {
        id: 1,
        level: "Blue Petal ZD",
        levelIndex: 1,
        starsNumber: "5",
        prize: 50000,
        prizeText: "-50,000",
        bgShoe: shoe,
    },
    {
        id: 2,
        level: "FC Sprint X",
        levelIndex: 2,
        starsNumber: "10",
        prize: 200000,
        prizeText: "-200,000",
        bgShoe: shoe2,
    },
    {
        id: 3,
        level: "Astral Drift 3X",
        levelIndex: 3,
        starsNumber: "15",
        prize: 450000,
        prizeText: "-450,000",
        bgShoe: shoe3,
    },
    {
        id: 4,
        level: "Firestorm IX",
        levelIndex: 4,
        starsNumber: "20",
        prize: 800000,
        prizeText: "-800,000",
        bgShoe: shoe4,
    },
    {
        id: 5,
        level: "Midnight Pulse Z5",
        levelIndex: 5,
        starsNumber: "25",
        prize: 1250000,
        prizeText: "-1.25M",
        bgShoe: shoe5,
    },
    {
        id: 6,
        level: "FC Inferno X",
        levelIndex: 6,
        starsNumber: "30",
        prize: 1800000,
        prizeText: "-1.8M",
        bgShoe: shoe6,
    },
];

export const levelList = [
    {
        levelIndex: 1,
        name: "Blue Petal ZD",
        steps: "5",
    },
    {
        levelIndex: 2,
        name: "FC Sprint X",
        steps: "10",
    },
    {
        levelIndex: 3,
        name: "Astral Drift 3X",
        steps: "15",
    },
    {
        levelIndex: 4,
        name: "Firestorm IX",
        steps: "20",
    },
    {
        levelIndex: 5,
        name: "Midnight Pulse Z5",
        steps: "25",
    },
    {
        levelIndex: 6,
        name: "FC Inferno X",
        steps: "30",
    },
];

const PowerUp = () => {
    const [level, setLevel] = useState(sessionStorage.getItem("level") as unknown as number);
    const [points, setPoints] = useState(sessionStorage.getItem("points") as unknown as number);

    const tid = sessionStorage.getItem("tid");
    const loadUser = getUser(Number(tid)).then((res) => {
        if (res.status == 404) {
            console.log("User not found");
        } else {
            const userData = res.data;
            sessionStorage.setItem("level", userData.level);
            sessionStorage.setItem("points", userData.points);
            setLevel(userData.level);
            setPoints(userData.points);
        }
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded == false) {
            loadUser;
        }
        setLoaded(true);
    }, []);

    const PowerUp = async (e: React.MouseEvent, levelData: LevelData) => {
        e.preventDefault();
        if (points >= Number(levelData.prize) && points > 0 && levelData.levelIndex == level + 1) {
            console.log("Power up unlocked");
            await levelUp(Number(sessionStorage.getItem("tid")), levelData.levelIndex, Number(levelData.prize)).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    console.log("Level up successful");
                    setLevel(levelData.levelIndex);
                    loadUser;
                }
            });
        } else {
            console.log("Insufficient points");
        }
    };

    const FormattedLevelData = () => {
        return levelData.map((data) => (
            <>
                <div key={data.id} className={`bg-[#FFFFFF] ${data.levelIndex <= level ? "bg-opacity-10" : "bg-opacity-30"} w-full px-3 py-5 rounded-lg relative`}>
                    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-start">
                        <div className="w-[150px]">
                            <img className={`w-full ${data.levelIndex <= level && "mt-[19px]"}`} src={data.bgShoe} alt="" />
                        </div>
                    </div>
                    <div className="relative z-30 w-full">
                        <div className="flex justify-start">
                            <p className="text-[#FFFFFF] text-sm font-Rockwell">{data.level}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 mt-5">
                            <div className="w-[50px]">{data.levelIndex <= level ? <img className="w-full opacity-0" src={lock} alt="" /> : <img className="w-full" src={lock} alt="" />}</div>
                            <div className="flex flex-col gap-1 justify-center items-center">
                                <p className="text-[#FEC95E] text-xs flex items-center">
                                    <span className="pe-1">You'll earn {data.starsNumber}</span> <img className="w-[10px]" src={yellowStar} alt="" />
                                    <span className="ps-1">per step</span>
                                </p>
                                {data.levelIndex <= level ? null : <p className="text-[#FEC95E] text-sm font-bold">{data.prizeText}</p>}
                                <div className="flex justify-center items-center">
                                    {level + 1 < data.levelIndex == true ? (
                                        <div className="py-1 px-3"></div>
                                    ) : (
                                        <button
                                            className={`font-sans bg-gradient-to-r from-[#ff8c28] to-[#ffb54c] text-[#ffffff] text-[12px] ${
                                                data.levelIndex <= level && "opacity-0"
                                            } py-1 px-3 rounded-sm shadow-button-shadow ${points < Number(data.prize) && level + 1 < data.levelIndex && "opacity-0"}`}
                                            onClick={(e) => PowerUp(e, data)}
                                            disabled={points < Number(data.prize) || data.levelIndex != level + 1}
                                        >
                                            Unlock Booster
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ));
    };

    return (
        <section className="flex flex-col h-screen w-full bg-[#060c1d] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col w-full overflow-y-auto h-[100%]">
                <div className="absolute top-0 bottom-0 left-0 right-0 z-[-5]">
                    <img src={bgBlurImg2} className="w-full h-full" alt="" />
                </div>
                <div className="fixed top-0 bottom-[10vh] w-full overflow-y-scroll">
                    <div className="flex flex-col items-center justify-start px-5 py-5 h-full relative z-40">
                        <div className="flex justify-start w-full">
                            <NavLink className="text-[#FEC95E] flex items-center gap-2 text-xl" to="/">
                                <i className="bx bx-arrow-back"></i> Power up
                            </NavLink>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-full mt-5 pb-5">{levelData?.length > 0 && <FormattedLevelData />}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default PowerUp;
