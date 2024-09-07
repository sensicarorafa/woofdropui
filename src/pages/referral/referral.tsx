import { useCallback, useEffect, useState } from "react";
import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
import { toast } from "react-hot-toast";
//import axios from "axios";
//import { capitalizeAllFirstLetters } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../../components/BottomSheet";
//import medal from "../../assets/img/medal.png";




const Referral = () => {
    //const colorCodes = useMemo(() => ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF", "#000000", "#A6A6A6"], []);

    const [open, setOpen] = useState<Boolean>()

    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
    //const [referralLeaderboard, setReferralLeaderboard] = useState<any>([]);
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
            console.log('ade')
        }
        if (user) {
          fetchUserReferrals();
        }
    }, [user])

    const copyToClipboard = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        navigator.clipboard.writeText(referralLink as string);
        toast("Copied to clipboard!", {
            className: "",
            duration: 799,
            style: {
                background: "#363636",
                color: "#fff",
            },
        });
    }, []);

    const shareToTg = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        const text = encodeURIComponent("Are you a Telegram OG? Join me on AiDogs and be a part of the dog revolution.. Earn 2,500 $AIDOG when you signup. ");
        const urlTo = `https://t.me/share/url?url=${referralLink}&text=${text}`;
        window.open(urlTo, "_blank");
    }, []);


    const toggleOverlay = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    return (
        <section className="flex flex-col h-screen w-full bg-[#210133] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
                <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                        <BottomSheet isOpen={true} onClose={() => {
                            navigate('/home')
                        }} bgColor="#180026" title="Frens">
                                <div className="w-full overflow-y-scroll h-[100%]">
                                    <div className="flex flex-col items-center justify-start px-5 py-5  relative z-40">
                                        <div className="relative w-full flex flex-col items-center z-40 h-[100%]">

                                            <div className="flex flex-col justify-between py-10 gap-5 h-[100%]">
                                                <div className="flex flex-col items-center w-full">
                                                    <p className="text-[#FFFFFF] text-center text-bold mt-[-15px] text-3xl font-Rockwell">
                                                        Invite friends and get more $AIDOGS
                                                    </p>
                                                    <div className=" w-[50%] pt-10 small-mobile:w-[32%] mobile:w-[36%]">
                                                        <img className="w-full" src={logoBig} alt="" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center w-full">
                                                    <p className="text-[#FFFFFF] text-center text-bold mt-[-15px] text-xl font-Rockwell">
                                                        Tap on the button to copy invite link for friends to join
                                                    </p>
                                                    <div className="flex justify-end items-end pt-6 border-opacity-20 border-b-[#FFFFFF] w-full px-2 mt-3 ">
                                                        <button
                                                            className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2   rounded-[1px] w-full"
                                                            onClick={toggleOverlay}

                                                        >
                                                            Invite friends
                                                        </button>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="flex px-10 py-5 justify-between">
                                        {referralLeaderboard?.length > 0 && <p className="text-white font-bold text-lg">{referralLeaderboard?.length || 0} frens</p>}
                                        {referralLeaderboard?.length > 0 && <p className="text-white">(Top 100)</p>}

                                    </div>
                                    {referralLeaderboard?.length > 0 ? <div className="flex flex-col items-center pb-10 px-5 justify-start w-full bg-[#FFFFFF] bg-opacity-10 rounded-md gap-5 relative">
                                        <div className="h-full w-full">
                                            {referralLeaderboard?.length > 0
                                                ? referralLeaderboard.slice(0, 100).map((item: any, idx: any) => (
                                                    <div key={idx.toString()} className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center ps-3 pe-10 py-3">
                                                        <div className="flex items-center">
                                                            <div className="bg-[#314359] flex justify-center h-[45px] w-[45px] items-center px-3 py-3 rounded-full" style={{ background: `${colorCodes[Math.floor(Math.random() * 10)]}` }}>
                                                                <p className="text-[#FFFFFF] text-lg font-bold">
                                                                    {item.user.username ? item?.user?.username?.charAt(0).toUpperCase() + item?.user?.username?.charAt(1).toUpperCase() : item.user.first_name?.charAt(0).toUpperCase()}
                                                            
                                                                </p>
                                                            </div>
                                                            <div className="pl-3">
                                                                <p className="text-[#FFFFFF] w-[79px] font-Rockwell">{capitalizeAllFirstLetters(item.user.username ? item.user.username : item.user.first_name)}</p>
                                                            </div>
                                                        </div>



                                                        <div className=" flex justify-end items-center">
                                                            <p className="text-[#A6A6A6] w-[80px] text-sm text-nowrap text-left font-Rockwell">+{`${item.pointsNo / 10}`?.toLocaleString()} $AIDOGS</p>


                                                        </div>
                                                    </div>
                                                ))
                                                : null}
                                        </div>
                                    </div> : <div className="text-[#A6A6A6] flex justify-center items-center"> Your referrals will appear here</div>
                                    }*/}
                                </div>
                        </BottomSheet>
                
                        {open ? (
                            <div className="header__curtain__black header__curtain flex flex-col justify-around z-[100]" > 
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-2xl">Invite frens</p>
                            <hr/> 
                            <button
                                    className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] w-full"
                                    onClick={copyToClipboard}

                                >
                                    Copy invite link
                                </button>
                            <button
                                    className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] w-full"

                                    onClick={shareToTg}
                                >
                                    Share invite link
                                </button>
                            </div>
                        ) : (
                            <div className="header__curtain slide__up" >
                            
                            </div>
                        )}
                
                </div>
            <Footer />
        </section>
    );
};

export default Referral;
