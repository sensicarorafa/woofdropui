
import medal from "../../assets/img/medal.png";
import Footer from "../../components/footer";
import { getLeaderBoard } from "../../api";
import { useEffect, useState } from "react";

const Stats = () => {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [totalPoints] = useState(Number(sessionStorage.getItem("totalPoints")));
    const [userId] = useState(String(sessionStorage.getItem("totalPoints")));

  
    useEffect(() => {
        getLeaderBoard().then((res) => {
            if (res.status == 200) {
                setLeaderboard(res.data);
            }
        });
    }, []);

    let usersIndex = leaderboard ? leaderboard.findIndex((item) => item.userId == userId) : null;
    console.log(leaderboard, usersIndex);

    return (
        <section className="flex flex-col h-screen w-full bg-[#000000] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
           
            <div className="flex flex-col w-full overflow-y-auto h-[100%]">
                <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                    <div className="fixed top-0 bottom-[10vh] w-full overflow-y-scroll mb-[10px]">
                        <div className="flex flex-col items-center justify-start px-5 pt-12 py-5 h-full relative z-40">
                            {/* <div className="flex justify-start w-full">
                                <NavLink className="text-[#FFFFFF] flex items-center gap-2 text-xl" to="/">
                                    <i className="bx bx-arrow-back"></i> Stats
                                </NavLink>
                            </div> */}
                            <div className="w-full flex flex-col items-center pb-3 justify-center">
                                {/* <div className="w-[200px] mt-[-20px]">
                                    <img className="w-full" src={shield} alt="" />
                                </div> */}
                                {leaderboard.length > 0 && usersIndex != null && (
                                    <p className="text-[#FFFFFF] text-bold mt-[-15px] text-3xl font-Rockwell">
                                        Wall of Fame{" "}
                                        {/* {!!sessionStorage.getItem("level") == false
                                            ? leaderboard.length > 0
                                                ? levelList.map((l) => {
                                                    if (l.levelIndex == leaderboard[0].level) {
                                                        return l.name;
                                                    }
                                                })
                                                : null
                                            : "Stepper"} */}
                                    </p>
                                )}
                            </div>
                            <div className=" flex justify-between items-center px-5 py-3 w-full bg-[#FFFFFF] bg-opacity-10 rounded-lg gap-5 mt-2">
                                <div className="flex gap-3 py-4 items-center">
                                    {leaderboard.length > 0 && usersIndex != null ? (
                                        <>
                                            <div className="bg-[#314359] flex justify-center h-[45px] w-[45px] items-center px-3 py-3 rounded-full">
                                                <p className="text-[#FFFFFF] text-lg font-bold">
                                                    {leaderboard[usersIndex]?.firstName.charAt(0).toUpperCase() + leaderboard[usersIndex]?.firstName.charAt(1).toUpperCase() }
                                                 
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p className="text-[#FFFFFF] leading-none font-bold text-sm">
                                                    {leaderboard[usersIndex]?.firstName.charAt(0).toUpperCase() +
                                                        leaderboard[usersIndex]?.firstName.slice(1) +
                                                        " " +
                                                        (leaderboard[usersIndex]?.lastName.includes("undefined")
                                                            ? ""
                                                            : leaderboard[usersIndex]?.lastName.charAt(0).toUpperCase() + leaderboard[usersIndex]?.lastName.slice(1))}
                                                </p>
                                                <div className="flex gap-2 items-center mt-[-2px]">
                                                    {/* <div className="w-[15px]">
                                                        <img className="w-full" src={yellowStar} alt="" />
                                                    </div> */}
                                                    <p className="text-[#A6A6A6] pt-1 leading-none text-xl font-bold">{leaderboard[usersIndex]?.totalPoints?.toLocaleString() || totalPoints.toLocaleString()} $AIDOGS</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-[#FFFFFF]">Loading</span>
                                    )}
                                </div>
                                <div className="flex-col gap-1">
                                    {leaderboard.length > 0 && usersIndex != null ? (
                                        <>
                                            {/* <p className="text-[#FEC95E] font-normal font-OpenSans text-sm">Ranking</p> */}
                                            <p className="text-[#FFFFFF] font-bold font-OpenSans text-xl">{"#" + (Number(usersIndex) + 1)}</p>
                                        </>
                                    ) : (
                                        <span className="text-[#FFFFFF]">...</span>
                                    )}
                                </div>
                            </div>
                            <h1 className="text-[#FFFFFF] w-full text-left font-bold text-xl my-7">{leaderboard.length > 0 && usersIndex != null && "Leaderboard"}</h1>
                            <div className="flex flex-col items-center justify-start w-full bg-[#FFFFFF] bg-opacity-10 rounded-md gap-5 relative">
                                <div className="h-full w-full">
                                    {leaderboard.length > 0
                                        ? leaderboard.slice(0, 100).map((item, idx) => (
                                            <div key={idx.toString()} className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center ps-3 pe-10 py-3">
                                                <div className="flex">
                                                    <div className="bg-[#314359] flex justify-center h-[45px] w-[45px] items-center px-3 py-3 rounded-full">
                                                        <p className="text-[#FFFFFF] text-lg font-bold">
                                                            {item?.firstName.charAt(0).toUpperCase() + item?.firstName.charAt(1).toUpperCase()}
                                                            {/* {item.firstName.charAt(1).toUpperCase() + item?.lastName.charAt(0).toUpperCase()}{" "} */}
                                                        </p>
                                                    </div>
                                                    <div className="pl-3">
                                                        <p className="text-[#FFFFFF] w-[79px] font-Rockwell">{item?.firstName.charAt(0).toUpperCase() + item.firstName.slice(1)}</p>
                                                        <p className="text-[#A6A6A6] w-[80px] text-nowrap text-left font-Rockwell">{`${item.totalPoints}`?.toLocaleString() } $AIDOGS</p>
                                                    </div>
                                                </div>



                                                <div className=" flex justify-end items-center">
                                                    {idx === 0 || idx === 1 || idx === 2 ? <>
                                                        <div className=" flex w-full justify-end small-mobile:w-[26%] translate-x-[10px] mobile:w-[36%]">
                        <img className="" src={medal} alt="" />
                    </div>
                                                    </> :   <p className="text-[#FEC95E] font-OpenSans">#{idx + 1}</p>}
                                                    
                                                </div>
                                            </div>
                                        ))
                                        : null}
                                    {leaderboard.length > 0 && leaderboard.findIndex((item) => item.telegramId == localStorage.getItem("telegramId")) > 10 ? (
                                        <div className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center ps-3 pe-10 py-3">
                                            <p className="text-[#FFFFFF] w-[79px] font-Rockwell">
                                                {leaderboard[leaderboard.findIndex((item) => item.telegramId == localStorage.getItem("telegramId"))].firstName.charAt(0).toUpperCase() +
                                                    leaderboard[leaderboard.findIndex((item) => item.telegramId == localStorage.getItem("telegramId"))].firstName.slice(1)}
                                            </p>
                                            <p className="text-[#FFFFFF] w-[80px] text-left font-Rockwell">
                                                {leaderboard[leaderboard.findIndex((item) => item.telegramId == localStorage.getItem("telegramId"))].points?.toLocaleString()}
                                            </p>
                                            <p className="text-[#FEC95E] font-OpenSans">#{leaderboard.findIndex((item) => item.telegramId == localStorage.getItem("telegramId")) + 1}</p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Stats;
