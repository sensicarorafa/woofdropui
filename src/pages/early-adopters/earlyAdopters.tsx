
import aiDog from "../../assets/img/doggy.png";
import { addPoints, addReferee, createUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const EarlyAdopters = () => {
 

    const navigate = useNavigate();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const claimPoints = async (e: React.MouseEvent) => {
        e.preventDefault();
        // const username = "oscar";
        // const tId = 66666;
        // const fullname = "oscar"as string;
        // const referralCode = "vuwnu"

        // 185766
        const username = sessionStorage.getItem("username");
        const tId = sessionStorage.getItem("tid");
        const fullname = sessionStorage.getItem("fullname") as string;
        const referralCode = sessionStorage.getItem("referralCode") as string;

        console.log("referralCode Early Adopter", referralCode)

        setIsButtonDisabled(true);
        await createUser({ telegramId: Number(tId), username, fullname })
            .then(async (res) => {
                if (res.status == 201) {
                    sessionStorage.setItem("points", "1000");
                    await addPoints(Number(tId), 1000);
                    if (!!referralCode == true) {
                        if (fullname.includes("undefined")) {
                            const newFullname = fullname.replace("undefined", "");
                            await addReferee(Number(tId), referralCode, newFullname);
                        } else {
                            await addReferee(Number(tId), referralCode, fullname);
                        }
                    }
                    const referralLink = import.meta.env.VITE_BOT_LINK + `?start=${res.data.referralCode}`;
                    sessionStorage.setItem("referralLink", referralLink);
                    // sessionStorage.setItem("level", res.data.level);
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
        <section className="h-screen w-full bg-[#000000] flex flex-col justify-center items-center gap-28 px-3 overflow-hidden  font-ZillaSlab text-xs small-mobile:text-base md:hidden">


            <div className="flex flex-col justify-between py-10 gap-5 h-[100%]">
                <div className="flex flex-col  items-center w-full">

                    <div className=" w-[90%] pt-10 small-mobile:w-[52%] relative mobile:w-[80%]">
                        <img className="w-full" src={aiDog} alt="" />
                        <p className="text-[#A6A6A6] absolute right-[40%] top-[80%] text-center text-bold mt-[-15px] text-3xl font-Rockwell">
                        Hey!
                    </p>
                    </div>
                  
                    <p className="text-[#FFFFFF] pt-10 text-center text-bold mt-[-15px] text-lg font-Rockwell">
                        We heard you qualified for the $DOGS Airdrop,<br /> It's time to claim your $AIDOGS 
                    </p>
                </div>

                <div className="flex flex-col pb-20 items-center w-full">

                    <div className="flex justify-end items-end pt-6 border-opacity-20 border-b-[#FFFFFF] w-full px-2 mt-3 ">
                        <button
                            className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2   rounded-[1px] w-full"
                            onClick={claimPoints} disabled={isButtonDisabled}


                        >
                            {isButtonDisabled ? "loading" : "Claim now"}
                        </button>


                    </div>
                </div>
            </div>


          
        </section>
    );
};

export default EarlyAdopters;
