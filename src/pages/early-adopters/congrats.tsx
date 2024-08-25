import logoBig from "../../assets/img/logobig.png";
// import link from "../../assets/img/copy.png";
// import fingerSwipe from "../../assets/img/finger-swipe.png";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from '../../utils/useWindowSize'
import Confetti from 'react-confetti'
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const Congrats = () => {
    const navigate = useNavigate();
    const { width, height } = useWindowDimensions()
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
    
    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === "Left") {
                navigate("/home");
            }
        },
    });

    // const shareToTwitter = async (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     const referralLink = sessionStorage.getItem("referralLink");
    //     const text = encodeURIComponent("Join me on AiDog and be a part of the dog revolution.. Earn 75.000 $AiDog when you join via this link " + referralLink);
    //     const url = `https://twitter.com/intent/tweet?text=${text}`;
    //     window.open(url, "_blank");
    // };

    const shareToTg = async (e: React.MouseEvent) => {
        e.preventDefault();
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user})
        const referralLink = `${import.meta.env.VITE_TEST_BOT_URL}?start=${getUserData?.data?.userData?.referralCode}`;
        const text = encodeURIComponent("GOT DOGS?? Join me on AiDogs and be a part of the dog revolution.. Earn 1.000 $AIDOG when you signup. ");
        const urlTo = `https://t.me/share/url?url=${referralLink}&text=${text}`;
        window.open(urlTo, "_blank");
    };

    

    const copyLink = async (e: React.MouseEvent) => {
        e.preventDefault();
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user})
        const referralLink = `${import.meta.env.VITE_TEST_BOT_URL}?start=${getUserData?.data?.userData?.referralCode}`;
        navigator.clipboard.writeText(referralLink as string);
        toast("Copied!", {
            className: "",
            duration: 799,
            style: {
              background: "#363636",
              color: "#fff",
            },
        });
    };

    const goHome = () => {
        navigate("/home")
    }

    return (
        <section {...handlers} className="h-screen w-full bg-[#000000] flex flex-col items-center overflow-hidden relative font-ZillaSlab md:hidden">
            <Confetti
                width={width}
                height={height}
            />
            <div className="flex h-full flex-col items-center pt-20 justify-between  ">

            <div className="flex pt-10 flex-col items-center">
                            <p className="text-[#FFFFFF] text-4xl">Way to go!</p>
                            <h1 className="text-[#FFFFFF] text-lg font-bold">Here is your $AIDOG reward</h1>
                         
                        </div>
                <div className="flex flex-col items-center">
                    <div className="w-[40%]">
                        <img className="w-full" src={logoBig} alt="" />

                    </div>
                    <div className="flex pt-10 flex-col items-center">
                     
                        <h1 className="text-[#FFFFFF] text-4xl font-bold">2,500 $AIDOGS</h1>
                        <p className="text-[#A6A6A6] text-lg">Welcome Bonus </p>
                    </div>
                </div>


                <div className=" w-full flex items-center justify-center pb-10">
                    <div className="flex flex-col justify-center gap-7 items-center">

                        <div className="flex flex-col items-center text-[#FFFFFF] pt-3 pb-1 rounded-lg text-base w-full">
                            <p className="text-center">Invite to get 10% of your frens rewards.</p>
                            <p className="text-center"></p>
                        </div>
                        <div className="flex items-center justify-center " onClick={copyLink}>
                            <p className="text-[#A6A6A6] text-2xl underline">Copy invite link
                            </p>
                            <span className="flex" >
                                &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="#A6A6A6" width='20px' height='20px' viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg>

                            </span>
                            &nbsp;
                            &nbsp;
                            <button className=" text-[#000000] px-2 flex justify-center items-center border-[2px] bg-[#87ceeb] rounded-md" onClick={shareToTg}>
                                {/* <img className="w-1/2" src={link} alt="" /> */}
                            &nbsp;<svg xmlns="http://www.w3.org/2000/svg"  fill="#000000" width="20px" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
                              &nbsp;Share 
                            </button>
                           
                        </div>
                        <div className="flex justify-center gap-2">

                            <button
                                className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2   rounded-[1px] w-full"
                                onClick={goHome}


                            >
                                Continue
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Congrats;
