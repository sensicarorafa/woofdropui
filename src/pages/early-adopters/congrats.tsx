import logoBig from "../../assets/img/logobig.png";
import link from "../../assets/img/copy.png";
import fingerSwipe from "../../assets/img/finger-swipe.png";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

const Congrats = () => {
    const navigate = useNavigate();

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === "Left") {
                navigate("/");
            }
        },
    });

    const shareToTwitter = async (e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        const text = encodeURIComponent("Join me on AiDog and be a part of the dog revolution.. Earn 75.000 $AiDog when you join via this link " + referralLink);
        const url = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(url, "_blank");
    };

    const copyLink = async (e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        navigator.clipboard.writeText(referralLink as string);
    };

    return (
        <section {...handlers} className="h-screen w-full bg-[#000000bd] flex flex-col items-center overflow-hidden relative font-ZillaSlab md:hidden">

            <div className="flex h-full flex-col items-center pt-20 justify-between  ">
                <div className="flex flex-col items-center">
                <div className="w-[40%]">
                    <img className="w-full" src={logoBig} alt="" />
                   
                </div>
                <div className="flex pt-10 flex-col items-center">
                            <p className="text-[#A6A6A6] text-lg">You've successfully claimed</p>
                            <h1 className="text-[#FFFFFF] text-4xl font-bold">75,000 $AiDogs</h1>
                            <p className="text-[#A6A6A6] text-lg">Welcome Bonus </p>
                        </div>
                </div>
                

                <div className=" w-full flex items-center justify-center pb-10">
                    <div className="flex flex-col justify-center gap-7 items-center">
                       
                        <div className="flex flex-col items-center text-[#FFFFFF] bg-[#FFFFFF] bg-opacity-10 py-3 rounded-lg text-base w-full">
                            <p className="text-center">Invite your friends and earn 10% of</p>
                            <p className="text-center">their Early Bonus Rewards</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button className="bg-[#FFFFFF] text-[#A6A6A6] text-lg py-2 px-16 rounded-md" onClick={(e) => shareToTwitter(e)}>
                                Invite Friends
                            </button>
                            <button className="w-[50px] py-2 flex justify-center items-center border-[2px] border-[#B87C02] rounded-md" onClick={(e) => copyLink(e)}>
                                <img className="w-1/2" src={link} alt="" />
                            </button>
                        </div>
                        <div className="flex justify-center gap-2">
                            <button className="w-[25px]">
                                <img className="w-full" src={fingerSwipe} alt="" />
                            </button>
                            <p className="text-base text-[#FFFFFF]">Swipe left to start walking</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Congrats;
