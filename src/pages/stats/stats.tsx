
import medal from "../../assets/img/medal.png";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { capitalizeAllFirstLetters } from "../../utils/helpers";

const Stats = () => {

    const colorCodes: string[] = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF", "#000000", "#A6A6A6"];

    const [usersIndex, setUserIndex] = useState(0)

    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
    const [leaderboardData, setLeaderboardData] = useState<any>([])
    const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(false)
    const [username, setUserName] = useState('');
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        // Ensure the Telegram Web Apps SDK is ready
        Telegram.WebApp.ready();
    
        // Access the user information
        const userInfo = Telegram.WebApp.initDataUnsafe.user;
    
        // Check if the user information is available
        if (userInfo) {
          console.log({userInfo, url: window.location.href});
          setUser(userInfo);
        } else {
          console.log('No user information available.');
          setUser({
            allows_write_to_pm: true,
            first_name: "Qanda",
            id: 1354055384,
            language_code: "en",
            last_name: "Sensei",
            username: "qandasensei"
          })
        }
    }, []);

    useEffect (() => {
        const fetchUserData = async () => {
          const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user})
          console.log(getUserData?.data)
          setTotalPoints(getUserData?.data?.userData?.pointsNo);
          setUserName(getUserData?.data?.userData?.username ? getUserData?.data?.userData?.user?.username : `${getUserData?.data?.userData?.user?.first_name ?  getUserData?.data?.userData?.user?.first_name : ''} ${getUserData?.data?.userData?.user?.last_name ? getUserData?.data?.userData?.user?.last_name : ''}`);
        }
        if (user) {
          fetchUserData();
        }
    }, [user])

    useEffect (() => {
        const fetchLeaderboardData = async () => {
          setLeaderboardLoading(true)
          const getLeaderboardData = await axios.post(`${import.meta.env.VITE_APP_URL}/leaderboard-data`, {user})
    
          const sortedData = getLeaderboardData.data.leaderboardData.map((board: any, index: number) => {
            if (user && user.id === board.user.id) setUserIndex(getLeaderboardData.data.userRank)
            return {
              id: board.user.id, 
              name: board.user.username ? board.user.username : board.user.first_name, 
              points: board.pointsNo, 
              referrals: board.referralPoints, 
              total: board.totalPoints,
              position: index + 1
            }
          })
    
          setLeaderboardData(sortedData)
          setLeaderboardLoading(false)
        }
        if (user && user !== null && user.id) fetchLeaderboardData();
      }, [user]);

    return (
        <section className="flex flex-col h-screen w-full bg-[#000000] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
           
            <div className="flex flex-col w-full overflow-y-auto h-[100%]">
                <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                    <div className="fixed top-0 bottom-[10vh] w-full overflow-y-scroll mb-[10px]">
                        <div className="flex flex-col items-center justify-start px-5 pt-12 py-5 h-full relative z-40">
                            <div className="w-full flex flex-col items-center pb-3 justify-center">
                                {(
                                    <p className="text-[#FFFFFF] text-bold mt-[-15px] text-3xl font-Rockwell">
                                        Wall of Fame{" "}
                                    </p>
                                )}
                            </div>
                            <div className=" flex justify-between items-center px-5 py-3 w-full bg-[#FFFFFF] bg-opacity-10 rounded-lg gap-5 mt-2">
                                <div className="flex gap-3 py-4 items-center">
                                    {!leaderboardLoading ? (
                                        <>
                                            <div className="bg-[#314359] flex justify-center h-[45px] w-[45px] items-center px-3 py-3 rounded-full">
                                                <p className="text-[#FFFFFF] text-lg font-bold">
                                                    {username?.charAt(0).toUpperCase() + username?.charAt(1).toUpperCase() }
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p className="text-[#FFFFFF] leading-none font-bold text-sm">
                                                    {capitalizeAllFirstLetters(username)}
                                                </p>
                                                <div className="flex gap-2 items-center mt-[-2px]">
                                                    <p className="text-[#A6A6A6] pt-1 leading-none text-xl font-bold">{totalPoints.toLocaleString()} <span className="text-[#A6A6A6] text-sm">$AIDOGS</span> </p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-[#FFFFFF]">Loading</span>
                                    )}
                                </div>
                                <div className="flex-col gap-1">
                                    {leaderboardData.length > 0 ? (
                                        <>
                                            {/* <p className="text-[#FEC95E] font-normal font-OpenSans text-sm">Ranking</p> */}
                                            <p className="text-[#FFFFFF] font-bold font-OpenSans text-xl">{"#" + (usersIndex)}</p>
                                        </>
                                    ) : (
                                        <span className="text-[#FFFFFF]">...</span>
                                    )}
                                </div>
                            </div>
                            <h1 className="text-[#FFFFFF] w-full text-left font-bold text-xl my-7">{leaderboardData.length > 0 && "Leaderboard"}</h1>
                            <div className="flex flex-col items-center justify-start w-full bg-[#FFFFFF] bg-opacity-10 rounded-md gap-5 relative">
                                <div className="h-full w-full">
                                    {leaderboardData.length > 0
                                        ? leaderboardData.slice(0, 100).map((item: any, idx: any) => (
                                            <div key={idx.toString()} className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center ps-3 pe-10 py-3">
                                                <div className="flex">
                                                    <div className={`flex justify-center h-[45px] w-[45px]  items-center px-3 py-3 rounded-full`} style={{background:`${colorCodes[Math.floor(Math.random() * 10)]}`}}>
                                                        <p className="text-[#FFFFFF] text-lg font-bold]">
                                                            {item?.name.charAt(0).toUpperCase() + item?.name.charAt(1).toUpperCase()}
                                                        </p>
                                                    </div>
                                                    <div className="pl-3">
                                                        <p className="text-[#FFFFFF] w-[79px] font-Rockwell">{capitalizeAllFirstLetters(item?.name)}</p>
                                                        <p className="text-[#A6A6A6] w-[80px] text-nowrap text-left font-Rockwell">{`${item.points}`?.toLocaleString() } <span className="text-[#A6A6A6] text-sm">$AIDOGS</span></p>
                                                    </div>
                                                </div>



                                                <div className=" flex justify-end items-center">
                                                    {idx === 0 || idx === 1 || idx === 2 ? 
                                                        <>
                                                            <div className=" flex w-full justify-end small-mobile:w-[26%] translate-x-[10px] mobile:w-[36%]">
                                                                <img className="" src={medal} alt="" />
                                                            </div>
                                                        </> :   <p className="text-[#FEC95E] font-OpenSans">#{idx + 1}</p>}
                                                    
                                                </div>
                                            </div>
                                        ))
                                        : null}
                                    {/*leaderboard.length > 0 && leaderboard.findIndex((item) => item.telegramId == localStorage.getItem("telegramId")) > 10 ? (
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
                                    ) : null*/}
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
