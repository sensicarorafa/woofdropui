import { useEffect, useMemo, useState } from "react";
import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
//import { toast } from "react-hot-toast";
import axios from "axios";
import { capitalizeAllFirstLetters } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import medal from "../../assets/img/medal.png";




const Contest = () => {
    const colorCodes = useMemo(() => ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF", "#000000", "#A6A6A6"], []);

    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
    const [referralLeaderboard, setReferralLeaderboard] = useState<any>([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [username, setUserName] = useState('');
    const navigate = useNavigate()

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
        const fetchUserReferrals = async () => {
            const userCookies = Cookies.get('authLoggedUserAiDogs');
            if (userCookies) {
                const getUserData =  JSON.parse(userCookies) //await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user})
                console.log(getUserData?.data)
                setTotalPoints(getUserData?.data?.userData?.referralPoints);
                setUserName(getUserData?.data?.userData?.username ? getUserData?.data?.userData?.user?.username : `${getUserData?.data?.userData?.user?.first_name ?  getUserData?.data?.userData?.user?.first_name : ''} ${getUserData?.data?.userData?.user?.last_name ? getUserData?.data?.userData?.user?.last_name : ''}`);

                const getReferralsLeaderboard = await axios.post(`${import.meta.env.VITE_APP_URL}/referral-leaderboard-data`, {user})
                console.log(getReferralsLeaderboard?.data)
                const sortedData = getReferralsLeaderboard.data.leaderboardData.map((board: any, index: number) => {
                    return {
                      id: board.userId, 
                      name: board.username ? board.username : board.firstName, 
                      points: board.referralPoints, 
                      position: index + 1
                    }
                  })
                setReferralLeaderboard(sortedData);
            } else {
              navigate('/starter')
            }
        }
        if (user) {
          fetchUserReferrals();
        }
    }, [user])

    return (
        <section className="flex flex-col h-screen w-full bg-[#000000] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">

                <div className="w-full overflow-y-scroll h-[100%]">

                    <div className="my-6 flex justify-center items-center">
                        <img src={logoBig} className="w-[25%]" alt="Logo" />
                    </div>
                    
                    <div className=" flex justify-between items-center px-5 py-3 w-full bg-[#FFFFFF] bg-opacity-10 rounded-lg gap-5 mt-2">
                        <div className="flex gap-3 py-4 items-center">
                            {username && username.length > 0 ? (
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
                                            <p className="text-[#A6A6A6] pt-1 leading-none text-xl font-bold">{totalPoints.toLocaleString()} <span className="text-[#A6A6A6] text-sm">FRENS</span> </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <span className="text-[#FFFFFF]">Loading</span>
                            )}
                        </div>
                        <div className="flex-col gap-1">
                            <>
                                <img className="w-[10vw]" src={medal} alt="" />
                            </>
                        </div>
                    </div>
                    <h1 className="text-[#FFFFFF] w-full text-left font-bold text-xl my-7 text-center">{referralLeaderboard.length > 0 && "Referral Leaderboard"}</h1>
                    <div className="flex flex-col items-center justify-start w-full bg-[#FFFFFF] bg-opacity-10 rounded-md gap-5 relative">
                        <div className="h-full w-full">
                            {referralLeaderboard.length > 0
                                ? referralLeaderboard.slice(0, 100).map((item: any, idx: any) => (
                                    <div key={idx.toString()} className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center ps-3 pe-10 py-3">
                                        <div className="flex">
                                            <div className={`flex justify-center h-[45px] w-[45px]  items-center px-3 py-3 rounded-full`} style={{background:`${colorCodes[Math.floor(Math.random() * 10)]}`}}>
                                                <p className="text-[#FFFFFF] text-lg font-bold]">
                                                    {item?.name.charAt(0).toUpperCase() + item?.name.charAt(1).toUpperCase()}
                                                </p>
                                            </div>
                                            <div className="pl-3">
                                                <p className="text-[#FFFFFF] w-[79px] font-Rockwell">{capitalizeAllFirstLetters(item?.name)}</p>
                                                <p className="text-[#A6A6A6] text-nowrap text-left font-Rockwell">{`${item.points}`?.toLocaleString() } <span className="text-[#A6A6A6] text-sm">FRENS</span></p>
                                                {
                                                    idx === 0 &&
                                                    <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $1000</p>
                                                }
                                                {
                                                    idx >= 1 && idx <= 9 &&
                                                    <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $500</p>
                                                }
                                                {
                                                    idx >= 10 && idx <= 29 &&
                                                    <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $125</p>
                                                }
                                                {
                                                    idx >= 30 && idx <= 49 &&
                                                    <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $50</p>
                                                }
                                                {
                                                    idx >= 49 &&
                                                    <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $10</p>
                                                }
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
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Contest;
