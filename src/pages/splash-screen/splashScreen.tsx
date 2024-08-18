import { useEffect } from "react";
// import welcome from "../../assets/img/welcome.png";
import AiDog from "../../assets/img/doggy.png";

import { useSearchParams, useNavigate } from "react-router-dom";
import {  getRefereesPoints, getUser } from "../../api";

const w = window as any;
const parseTelegramInitData = (initData: string) => {
    const params = new URLSearchParams(initData);
    const userEncoded = params.get("user");

    if (!userEncoded) {
        console.error("User data not found in initData");
        return null;
    }

    const userDecoded = decodeURIComponent(userEncoded);

    let user;
    try {
        user = JSON.parse(userDecoded);
    } catch (error) {
        console.error("Failed to parse user data:", error);
        return null;
    }

    return user;
};
const liveData = parseTelegramInitData(w.Telegram.WebApp.initData);
if (liveData != null) {
    sessionStorage.setItem("tid", liveData.id.toString());
    sessionStorage.setItem("username", liveData.username);
    sessionStorage.setItem("fullname", liveData.first_name + " " + liveData.last_name);
}

const SplashScreen = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const tid = liveData == null ? (searchParams.get("tid") as unknown as number) : (sessionStorage.getItem("tid") as unknown as number);
    const username = liveData == null ? (searchParams.get("u") as unknown as string) : (sessionStorage.getItem("username") as unknown as string);
    const fullname = liveData == null ? (searchParams.get("fn") as unknown as string) : (sessionStorage.getItem("fullname") as unknown as string);
    const referralCode = searchParams.get("r") as unknown as string;
    sessionStorage.setItem("referralCode", referralCode);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("fullname", fullname);
    sessionStorage.setItem("tid", tid?.toString());

    console.log("referralCode", referralCode )
   

    // http://localhost:5173/splash-screen?r=7ify3
    useEffect(() => {
        setTimeout(() => {
            getUser(Number(tid))
                .then(async (res) => {
                    console.log(res);
                    if (res.status == 404) {
                        // hande footprint
                        localStorage.setItem("footPrint", JSON.stringify({ logged: false, date: new Date().toDateString(), point: 0 }));
                        sessionStorage.setItem("referees", JSON.stringify([]));
                        navigate(`/early-adopters`, {
                            replace: true,
                        });
                    } else {
                        const userData = res.data;
                        const referralLink = import.meta.env.VITE_BOT_LINK + `?start=${userData.referralCode}`;

                    
                        sessionStorage.setItem("referralLink", referralLink);
                        sessionStorage.setItem("points", userData.points);
                        sessionStorage.setItem("totalPoints", userData.totalPoints);
                        sessionStorage.setItem("referees", JSON.stringify(userData.referees));
                        sessionStorage.setItem("claimedTasks", JSON.stringify(userData.tasksClaimed));
                        sessionStorage.setItem("userId", JSON.stringify(userData.userId));

                        getRefereesPoints(String(sessionStorage.getItem("referralCode"))).then(() => {
                            getUser(Number(sessionStorage.getItem("tid"))).then((res) => {
                                if (res.status == 200) {
                                    sessionStorage.setItem("totalPoints", res.data.totalPoints);
                                    sessionStorage.setItem("referees", JSON.stringify(res.data.referees));
            
                                    console.log("user", res.data)
                    
                                }
                            });
                        });
                       
    

                        navigate(`/`, {
                            replace: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 10000);
    }, []);

    return (
        <section className="h-screen w-full bg-[#000000] flex flex-col items-center justify-center py-5 gap-10 overflow-hidden relative font-OpenSans md:hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0">
                {/* <img src={welcome} className="w-full h-full" alt="" /> */}
            </div>
            <div className="w-[100%] relative">
                <img src={AiDog} className="w-full" alt="" />
            <p className="text-[#A6A6A6] absolute right-[30%] top-[80%] text-3xl">Got $DOGS??</p>

            </div>
            <div className="flex flex-col items-center justify-center gap-3">

                {/* <h1 className="text-[#FFFFFF] text-2xl font-ZillaSlab tracking-wider font-bold">AiDogs</h1> */}
                {/* <h1 className="text-[#FFFFFF] text-2xl font-ZillaSlab tracking-wider">LOADING...</h1> */}
                <p className="text-[#A6A6A6] text-lg">Your $AIDOGS airdrop awaits</p>
                <p className="text-[#A6A6A6] text-lg">Please wait a bit...</p>
            </div>
        </section>
    );
};

export default SplashScreen;
