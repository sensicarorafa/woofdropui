import bgBlurImg2 from "../../assets/img/bg-blur-2.png";
import { NavLink } from "react-router-dom";
import gift from "../../assets/img/gift.png";
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
        <section className="flex flex-col h-screen w-full bg-[#060c1d] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                <div className="absolute top-0 bottom-0 left-0 right-0 z-[-10]">
                    <img src={bgBlurImg2} className="w-full h-full" alt="" />
                </div>
                <div className="w-full overflow-y-scroll">
                    <div className="flex flex-col items-center justify-start px-5 py-5 h-full relative z-40">
                        <div className="relative w-full flex flex-col items-center z-40">
                            <div className="flex justify-start w-full">
                                <NavLink className="text-[#FEC95E] flex items-center gap-2 text-xl" to="/">
                                    <i className="bx bx-arrow-back"></i> Referral
                                </NavLink>
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="bg-[#FFFFFF] bg-opacity-10 w-full px-3 py-5 rounded-lg flex flex-col gap-2 mt-10">
                                    <h2 className="text-[#FFFFFF] font-Rockwell text-2xl">{referrals.length} Referrals</h2>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[#FFFFFF] text-base font-light flex items-center font-OpenSans">My invite link</p>
                                        <div className="flex justify-center items-center">
                                            <button className="bg-gradient-to-r from-[#FFE2A7] to-[#FEC95E] text-[#B87C02] text-sm py-1 px-10 rounded-md" onClick={copyToClipboard}>
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2">
                                    <div className="py-3 px-2 flex gap-1 rounded-md bg-[#FFFFFF] bg-opacity-30">
                                        <div className="w-[20px]">
                                            <img src={gift} className="w-full" alt="" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col text-[#FFFFFF]">
                                                <p className="text-sm">Invite a friend</p>
                                                <p className="text-[10px] mt-[-7px]">to join fitcoin</p>
                                            </div>
                                            <div className="flex flex-col mt-[-5px] text-[#FFFFFF]">
                                                <p className="text-[9px]">
                                                    <span className="text-[#FEC95E]">+50,000</span> for you and your friend
                                                </p>
                                                <p className="text-[8px] mt-[-10px]">10% of all your friends earnings</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-3 px-2 flex gap-1 rounded-md bg-[#FFFFFF] bg-opacity-30">
                                        <div className="w-[20px]">
                                            <img src={gift} className="w-full" alt="" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col text-[#FFFFFF]">
                                                <p className="text-sm">Invite a friend</p>
                                                <p className="text-[10px] mt-[-7px]">with Telegram Premium</p>
                                            </div>
                                            <div className="flex flex-col mt-[-5px] text-[#FFFFFF]">
                                                <p className="text-[9px]">
                                                    <span className="text-[#FEC95E]">+250,000</span> for you and your friend
                                                </p>
                                                <p className="text-[8px] mt-[-10px]">10% of all your friends earnings</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-[#FFFFFF]">Referral Rewards</h2>
                                <div className="w-full flex flex-col gap-5 pb-5">
                                    {referrals.length > 0
                                        ? referrals.map((data) => (
                                              <div key={data.id} className="flex flex-row items-center justify-between bg-[#FFFFFF] bg-opacity-10 w-full px-3 py-5 rounded-lg">
                                                  <div className="flex flex-row items-center gap-3">
                                                      <div className="">
                                                          <div className="bg-[#314359] flex justify-center w-[50px] h-[50px] items-center rounded-full">
                                                              <p className="text-[#FFFFFF] text-lg font-bold">{data.nameAbbr}</p>
                                                          </div>
                                                      </div>
                                                      <div className="col-span-2">
                                                          <p className="text-[#FFFFFF] font-bold text-xl">{data.name}</p>
                                                      </div>
                                                  </div>
                                                  <div className="">
                                                      <p className="text-[#00C320]">+{data.reward.toLocaleString()}</p>
                                                  </div>
                                              </div>
                                          ))
                                        : null}
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
