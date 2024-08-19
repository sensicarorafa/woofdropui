import { useEffect, useState } from "react";
import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
import { getReferees,  } from "../../api";
import { toast } from "react-hot-toast";




const Referral = () => {
    const [referralLeaderboard, setReferralLeaderboard] = useState<any[]>([]);


    useEffect(() => {
     
        getReferees(Number(sessionStorage.getItem("tid"))).then( async(res) => {
                    
                if (res.status == 200) {
                    setReferralLeaderboard(res.data);
                }
                // console.log("referallleaderboard", res.data)
        
          
        });
    }, []);


    const copyToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
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
                    {referralLeaderboard?.length > 0 && <p className="text-white font-bold text-lg">{referralLeaderboard?.length || 0} frens</p>}
                    {referralLeaderboard?.length > 0 && <p className="text-white">(Top 100)</p>}
                      
                    </div>
                    {referralLeaderboard?.length > 0 ? <div className="flex flex-col items-center pb-10 px-5 justify-start w-full bg-[#FFFFFF] bg-opacity-10 rounded-md gap-5 relative">
                        <div className="h-full w-full">
                            {referralLeaderboard?.length > 0
                                ? referralLeaderboard.slice(0, 100).map((item:any, idx:any) => (
                                    <div key={idx.toString()} className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center ps-3 pe-10 py-3">
                                        <div className="flex items-center">
                                            <div className="bg-[#314359] flex justify-center h-[45px] w-[45px] items-center px-3 py-3 rounded-full">
                                                <p className="text-[#FFFFFF] text-lg font-bold">
                                                    {item?.fullname.charAt(0).toUpperCase() + item?.fullname.charAt(1).toUpperCase()}
                                                    {/* {item.fullname.charAt(1).toUpperCase() + item?.lastName.charAt(0).toUpperCase()}{" "} */}
                                                </p>
                                            </div>
                                            <div className="pl-3">
                                                <p className="text-[#FFFFFF] w-[79px] font-Rockwell">{item?.fullname.charAt(0).toUpperCase() + item?.fullname.slice(1)}</p>
                                            </div>
                                        </div>



                                        <div className=" flex justify-end items-center">
                                        <p className="text-[#A6A6A6] w-[80px] text-sm text-nowrap text-left font-Rockwell">+{`${item.points}`?.toLocaleString() } $AIDOGS</p>
                                            

                                        </div>
                                    </div>
                                ))
                                : null}
                        </div>
                    </div> : <div className="text-[#A6A6A6] flex justify-center items-center"> Your referrals will appear here</div>
                        }
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Referral;
