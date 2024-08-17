import { useEffect, useState } from "react";
import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
import { getReferralLeaderBoard } from "../../api";




const Referral = () => {
    const [referraLLeaderboard, setReferraLLeaderboard] = useState<any[]>([]);


    useEffect(() => {
        getReferralLeaderBoard(String(sessionStorage.getItem("referralCode"))).then((res) => {
            if (res.status == 200) {
                setReferraLLeaderboard(res.data);
            }
            console.log("referallleaderboard", res.data)
        });
    }, []);


    const copyToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        navigator.clipboard.writeText(referralLink as string);
    };

    return (
        <section className="flex flex-col h-screen w-full bg-[#000000] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">

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
                                            onClick={copyToClipboard}

                                        >
                                            Invite friends
                                        </button>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="flex px-10 py-5 justify-between">
                       {referraLLeaderboard[0]?.users.length > 0 && <p className="text-white font-bold text-lg">{referraLLeaderboard[0]?.totalUsers[0].count} frens</p>}
                       {referraLLeaderboard[0]?.users.length > 0 && <p className="text-white">(Top 100)</p>}
                      
                    </div>
                    <div className="flex flex-col items-center pb-10 px-5 justify-start w-full bg-[#FFFFFF] bg-opacity-10 rounded-md gap-5 relative">
                        <div className="h-full w-full">
                            {referraLLeaderboard[0]?.users.length > 0
                                ? referraLLeaderboard[0].users.slice(0, 100).map((item, idx) => (
                                    <div key={idx.toString()} className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center ps-3 pe-10 py-3">
                                        <div className="flex items-center">
                                            <div className="bg-[#314359] flex justify-center h-[45px] w-[45px] items-center px-3 py-3 rounded-full">
                                                <p className="text-[#FFFFFF] text-lg font-bold">
                                                    {item?.firstName.charAt(0).toUpperCase() + item?.firstName.charAt(1).toUpperCase()}
                                                    {/* {item.firstName.charAt(1).toUpperCase() + item?.lastName.charAt(0).toUpperCase()}{" "} */}
                                                </p>
                                            </div>
                                            <div className="pl-3">
                                                <p className="text-[#FFFFFF] w-[79px] font-Rockwell">{item?.firstName.charAt(0).toUpperCase() + item?.firstName.slice(1)}</p>
                                            </div>
                                        </div>



                                        <div className=" flex justify-end items-center">
                                        <p className="text-[#A6A6A6] w-[80px] text-sm text-nowrap text-left font-Rockwell">+{`${item.totalPoints * 0.1}`?.toLocaleString() } $AIDOGS</p>
                                            

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

export default Referral;
