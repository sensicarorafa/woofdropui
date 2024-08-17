import logoBig from "../../assets/img/logobig.png";
// import link from "../../assets/img/copy.png";
import fingerSwipe from "../../assets/img/finger-swipe.png";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from '../../utils/useWindowSize'
import Confetti from 'react-confetti'

const Congrats = () => {
    const navigate = useNavigate();
    const { width, height } = useWindowDimensions()
    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === "Left") {
                navigate("/");
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

    const copyLink = async (e: React.MouseEvent) => {
        e.preventDefault();
        const referralLink = sessionStorage.getItem("referralLink");
        navigator.clipboard.writeText(referralLink as string);
    };

    const goHome = () => {
        navigate("/")
    }

    return (
        <section {...handlers} className="h-screen w-full bg-[#000000] flex flex-col items-center overflow-hidden relative font-ZillaSlab md:hidden">
 <Confetti
      width={width}
      height={height}
    />
            <div className="flex h-full flex-col items-center pt-20 justify-between  ">
                <div className="flex flex-col items-center">
                <div className="w-[40%]">
                    <img className="w-full" src={logoBig} alt="" />
                   
                </div>
                <div className="flex pt-10 flex-col items-center">
                            <p className="text-[#A6A6A6] text-lg">You've successfully claimed</p>
                            <h1 className="text-[#FFFFFF] text-4xl font-bold">1,000 $AIDOGS</h1>
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
                            &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="#A6A6A6" width='20px' height='20px' viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>
                           
                            </span>
                            {/* <button className="w-[50px] py-2 flex justify-center items-center border-[2px] border-[#B87C02] rounded-md" onClick={(e) => copyLink(e)}>
                                <img className="w-1/2" src={link} alt="" />
                            </button> */}
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
