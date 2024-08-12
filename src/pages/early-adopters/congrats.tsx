import bgBlurImg from "../../assets/img/bg-blur.png";
import bgRibbon from "../../assets/img/ribboooon@3x.png";
import link from "../../assets/img/copy.png";
import fingerSwipe from "../../assets/img/finger-swipe.png";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

const Congrats = () => {
    const navigate = useNavigate();

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === "Left") {
                navigate("/character");
            }
        },
    });

    const shareToTwitter = async (e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        const text = encodeURIComponent("Join me on FitCoin and earn rewards for walking. Get 15,000 $FIT as an early bonus reward. Use my referral link to get started: " + referralLink);
        const url = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(url, "_blank");
    };

    const copyLink = async (e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        navigator.clipboard.writeText(referralLink as string);
    };

    return (
        <section {...handlers} className="h-screen w-full bg-[#1D2849] flex flex-col items-center overflow-hidden relative font-ZillaSlab md:hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0">
                <img src={bgBlurImg} className="w-full h-full" alt="" />
            </div>
            <div className="flex flex-col items-center relative z-20 w-full h-full">
                <div className="h-[45%] w-full bg-bgWinner bg-no-repeat  bg-contain bg-bottom flex flex-col justify-center overflow-hidden">
                    <div className="w-[130%] -ms-16 mt-16">
                        <img className="w-full" src={bgRibbon} alt="" />
                    </div>
                </div>
                <div className="h-[55%] w-full flex items-center justify-center pb-10">
                    <div className="w-[90%] flex flex-col justify-center gap-7 items-center">
                        <div className="flex flex-col items-center">
                            <p className="text-[#FEC95E] text-lg">You've successfully claimed</p>
                            <h1 className="text-[#FEC95E] text-4xl font-bold">15,000 $FIT</h1>
                            <p className="text-[#FEC95E] text-lg">Early Bonus Airdrop</p>
                        </div>
                        <div className="flex flex-col items-center text-[#FFFFFF] bg-[#FFFFFF] bg-opacity-10 py-3 rounded-lg text-base w-full">
                            <p className="text-center">Invite your friends and earn 10% of</p>
                            <p className="text-center">their Early Bonus Rewards</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button className="bg-gradient-to-b from-[#FFE2A7] to-[#FEC95E] text-[#B87C02] text-lg py-2 px-16 rounded-md" onClick={(e) => shareToTwitter(e)}>
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
