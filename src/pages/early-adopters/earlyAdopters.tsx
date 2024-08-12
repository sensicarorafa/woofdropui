import bgBlurImg from "../../assets/img/bg-blur.png";
import bgLayerBlur from "../../assets/img/layer-blur.png";
import star from "../../assets/img/star.png";
import telegram from "../../assets/img/telegram.png";
import telegramPremium from "../../assets/img/telegram-premium.png";
import notcoin from "../../assets/img/notcoin.png";
import hamsterFarmer from "../../assets/img/hamster-farmer.png";
import tapswapFarmer from "../../assets/img/tapswap.png";
import memeFi from "../../assets/img/memeFi.png";
import { addPoints, addReferee, createUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RewardsData {
    id: number;
    name: string;
    image: string;
    points: string;
}

const EarlyAdopters = () => {
    const rewardsData: RewardsData[] = [
        {
            id: 1,
            name: "Telegram OG",
            image: telegram,
            points: "+15,000 FITS",
        },
        {
            id: 2,
            name: "Telegram Premium",
            image: telegramPremium,
            points: "+15,000 FITS",
        },
        {
            id: 3,
            name: "Notcoin Farmer",
            image: notcoin,
            points: "+15,000 FITS",
        },
        {
            id: 4,
            name: "Hamster Farmer",
            image: hamsterFarmer,
            points: "+15,000 FITS",
        },
        {
            id: 5,
            name: "Tapswap Farmer",
            image: tapswapFarmer,
            points: "+15,000 FITS",
        },
        {
            id: 6,
            name: "MemeFi Farmer",
            image: memeFi,
            points: "+15,000 FITS",
        },
    ];

    const navigate = useNavigate();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const claimPoints = async (e: React.MouseEvent) => {
        e.preventDefault();
        const username = sessionStorage.getItem("username");
        const tId = sessionStorage.getItem("tid");
        const fullname = sessionStorage.getItem("fullname") as string;
        const referralCode = sessionStorage.getItem("referralCode") as string;

        setIsButtonDisabled(true);
        await createUser({ telegramId: Number(tId), username, fullname })
            .then(async (res) => {
                if (res.status == 201) {
                    sessionStorage.setItem("points", "90000");
                    await addPoints(Number(tId), 90000);
                    if (!!referralCode == false) {
                        if (fullname.includes("undefined")) {
                            const newFullname = fullname.replace("undefined", "");
                            await addReferee(Number(tId), referralCode, newFullname);
                        } else {
                            await addReferee(Number(tId), referralCode, fullname);
                        }
                    }
                    const referralLink = import.meta.env.VITE_BOT_LINK + `?start=${res.data.referralCode}`;
                    sessionStorage.setItem("referralLink", referralLink);
                    sessionStorage.setItem("level", res.data.level);
                    navigate("/congrats");
                } else {
                    console.log(res);
                }
                setIsButtonDisabled(false);
            })
            .catch((err) => {
                console.log(err);
                setIsButtonDisabled(false);
            });
    };

    return (
        <section className="h-screen w-full bg-[#1D2849] flex flex-col justify-center items-center gap-28 px-3 overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0">
                <img src={bgBlurImg} className="w-full h-full" alt="" />
            </div>
            <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-end">
                <div className="w-[94%] relative">
                    <img className="object-contain" src={bgLayerBlur} alt="" />
                    <p className="absolute bottom-[9%] left-[27%] text-xl text-[#6888af00]">Stay Fit, Earn Fit</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full bg-[#FFFFFF] bg-opacity-10 rounded-md gap-5 mt-10 mobile:mt-36 relative z-40">
                <div className="w-[55%] mt-[-3.5rem] small-mobile:mt-[-4.5rem]">
                    <img className="w-full" src={star} alt="" />
                </div>
                <div className="flex flex-col gap-1 items-center justify-center text-[#FFFFFF]">
                    <p className="text-xs small-mobile:text-base text-center">Congrats, you are eligible to claim our</p>
                    <p className="text-lg small-mobile:text-2xl text-center">Early Adopter Bonus</p>
                </div>
                <div className="border-t-[1px] border-[#FFFFFF] border-opacity-10 h-full w-full">
                    <div className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center px-3 py-2">
                        <p className="text-[#FEC95E] text-xl">Your Rewards</p>
                    </div>
                    {rewardsData.map((item) => (
                        <div key={item.id} className="border-b-[1px] border-[#FFFFFF] border-opacity-10 flex justify-between items-center px-3 py-2">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full w-[30px] border-[3px] border-[#FFFFFF] border-opacity-[22%] flex justify-center items-center">
                                    <img className="w-full" src={item.image} alt="" />
                                </div>
                                <p className="text-[#FFFFFF]">{item.name}</p>
                            </div>
                            <p className="text-[#FEC95E]">{item.points}</p>
                        </div>
                    ))}
                    <div className="flex justify-center items-center py-[20px]">
                        <button className="bg-gradient-to-b from-[#FFE2A7] to-[#FEC95E] text-[#B87C02] text-xl py-2 px-16 rounded-md" onClick={claimPoints} disabled={isButtonDisabled}>
                            {isButtonDisabled ? "loading" : "Claim now"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EarlyAdopters;
