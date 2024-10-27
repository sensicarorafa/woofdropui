import Footer from "../../components/footer";
import Header from "../../components/header";
import WoofInvite from "../../assets/img/woofinvite.png"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import axios from "axios";


const Woofrens = () => {
    const { theUser } = useUser();
    const getUserCookiesParsed = theUser;

    const [referrals, setReferrals] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralPoints : 0);

    const [referralScore, setReferralScore] = useState<Number>(0)


    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);



    useEffect(() => {
        // Ensure the Telegram Web Apps SDK is ready
        Telegram.WebApp.ready();

        // Access the user information
        const userInfo = Telegram.WebApp.initDataUnsafe.user;


        // Check if the user information is available
        if (userInfo) {
            console.log({ userInfo, url: window.location.href });
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


    const copyToClipboard = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        const referralLink = `${import.meta.env.VITE_TEST_BOT_URL}?start=${getUserCookiesParsed?.data?.userData?.referralCode}`;
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

    useEffect(() => {

        if (referrals) {
            const referralScore = (referrals) * 500
            setReferralScore(referralScore)
        }

    }, [referrals])
    useEffect(() => {
        const fetchUserData = async () => {
            const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, { user })
            if (getUserData?.data?.userData) {
                setReferrals(getUserData?.data?.userData?.referralPoints);
                sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(getUserData))
            }

            console.log("ref",getUserData?.data?.userData?.referralPoints)
        }





        if (user) {
            fetchUserData();
        }
    }, [user])



    return (
        <section className="h-screen woofnomics w-full bg-[#000000] flex flex-col items-center gap-0 relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col w-full h-[100%] overflow-x-hidden">
                <div className="flex justify-between items-center border-opacity-20 border-b-[#FFFFFF] w-full  relative z-30 h-auto">
                    <Header />

                </div>
                <div className="text-white text-left py-5 pl-5 text-2xl">
                    Woofrens
                </div>
                <div className="flex flex-col py-5 my-4 justify-center align-center m-auto items-center w-[80%]">

                    <div className="bg-white brightness-3 blur-50 mb-3 bg-opacity-10 flex justify-between items-center w-full py-6 px-3 rounded-lg">
                        <div className="flex items-center justify-center">
                            <div className=" w-[25%] small-mobile:w-[15%] mobile:w-[20%]">
                                <img className="w-full" src={WoofInvite} alt="" />
                            </div> &nbsp; &nbsp;
                            <p className="text-white text-xl">Total Invites</p>
                        </div>
                        <div>
                            <p className="text-white text-xl">{referrals}</p>

                        </div>
                    </div>
                    <div className="bg-white brightness-3 blur-50 bg-opacity-10 flex justify-between items-center w-full py-6 px-3 rounded-lg">
                        <div className="flex items-center justify-center">
                            <div className=" w-[25%] small-mobile:w-[15%] mobile:w-[20%]">
                                <img className="w-full" src={WoofInvite} alt="" />
                            </div> &nbsp; &nbsp;
                            <p className="text-white text-xl">Invite Rewards</p>
                        </div>
                        <div>
                            <p className="text-white text-xl">{referralScore?.toLocaleString()}</p>

                        </div>

                    </div>
                    <div className="flex flex-col items-center w-full pt-6">
                        <p className="text-[#FFFFFF] text-center text-bold text-md">
                            Invite friends and get more points
                        </p>
                        <div className="flex justify-end items-end pt-2 border-opacity-20 border-b-[#FFFFFF] w-full px-2 ">
                            <button
                                className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2   rounded-[1px] w-full"
                                onClick={copyToClipboard}

                            >
                                Copy invite link
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Woofrens
