import AiDog from "../../assets/img/doggy.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SplashScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);

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
          if (!getUserData?.data?.userData?.earlyAdopterBonusClaimed) {
            setTimeout(() => {
                navigate(`/early-adopters`);
            }, 5000);
          } else {
            setTimeout(() => {
                navigate(`/home`);
            }, 5000);
          }
        }
        if (user) {
          fetchUserData();
        }
    }, [user])

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



