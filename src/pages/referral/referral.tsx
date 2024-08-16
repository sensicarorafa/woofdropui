
import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";

interface ReferralData {
    id: number;
    nameAbbr: string;
    name: string;
    reward: string;
}

function formatName(fullname: string) {
    const parts = fullname.split(" ");
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

const Referral = () => {
    const [referrals, setReferrals] = useState<ReferralData[]>([]);

    useEffect(() => {
        const refereeData = JSON.parse(sessionStorage.getItem("referees") as string);
        if (!!refereeData) {
            const refData = refereeData.map((data: any) => {
                return {
                    id: data.username,
                    nameAbbr:
                        data.fullname.split(" ").length > 1 ? (data.fullname.split(" ")[0].charAt(0) + data.fullname.split(" ")[1].charAt(0)).toUpperCase() : data.fullname.charAt(0).toUpperCase(),
                    name: formatName(data.fullname),
                    reward: data.points,
                };
            });
            setReferrals(refData);
        }
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
                    <div className="flex flex-col items-center justify-start px-5 py-5 h-full relative z-40">
                        <div className="relative w-full flex flex-col items-center z-40 h-[100%]">

                            <div className="flex flex-col justify-between py-10 gap-5 h-[100%]">
                                <div className="flex flex-col items-center w-full">
                                    <p className="text-[#FFFFFF] text-center text-bold mt-[-15px] text-3xl font-Rockwell">
                                        Invite friends and get more AiDogs
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
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Referral;
