import { useEffect, useMemo } from "react";
// import welcome from "../../assets/img/welcome.png";
import AiDog from "../../assets/img/doggy.png";

import { useSearchParams, useNavigate } from "react-router-dom";
import {  getRefereesPoints, getUser } from "../../api";

type TelegramUser = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
};

const w = window as any;
const parseTelegramInitData = (initData: string): TelegramUser | null => {
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


    const tid = useMemo(() => liveData ? liveData.id : searchParams.get("tid"), [liveData, searchParams]);
    const username = useMemo(() => liveData ? liveData.username : searchParams.get("u"), [liveData, searchParams]);
    const fullname = useMemo(() => liveData ? liveData.first_name + " " + liveData.last_name : searchParams.get("fn"), [liveData, searchParams]);
    const referralCode = useMemo(() => searchParams.get("r"), [searchParams]);


    useEffect(() => {
        if (referralCode) {
            sessionStorage.setItem("referralCode", referralCode);
        }
        sessionStorage.setItem("username", username as string);
        sessionStorage.setItem("fullname", fullname as string);
        sessionStorage.setItem("tid", tid?.toString() as string);
    }, [tid, username, fullname, referralCode]);
   


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await getUser(Number(tid));
                if (userResponse.status === 404) {
                    sessionStorage.setItem("referees", JSON.stringify([]));
                    navigate(`/early-adopters`, { replace: true });
                } else {
                    const userData = userResponse.data;
                    const referralLink = `${import.meta.env.VITE_BOT_LINK}?start=${userData.referralCode}`;

                    sessionStorage.setItem("referralLink", referralLink);
                    sessionStorage.setItem("points", userData.points);
                    sessionStorage.setItem("totalPoints", userData.totalPoints);
                    sessionStorage.setItem("referees", JSON.stringify(userData.referees));
                    sessionStorage.setItem("claimedTasks", JSON.stringify(userData.tasksClaimed));
                    sessionStorage.setItem("userId", userData.userId.toString());

                    const refereesResponse = await getRefereesPoints(referralCode!);
                    if (refereesResponse) {
                        const updatedUserResponse = await getUser(Number(tid));
                        if (updatedUserResponse.status === 200) {
                            sessionStorage.setItem("totalPoints", updatedUserResponse.data.totalPoints);
                            sessionStorage.setItem("referees", JSON.stringify(updatedUserResponse.data.referees));
                        }
                    }

                    navigate(`/`, { replace: true });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [tid, navigate, referralCode]);

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
