import { useState } from "react";
import bgBlurImg from "../../assets/img/bg-blur.png";
import bgFaded from "../../assets/img/faded-bg.png";
import girlPlatform from "../../assets/img/girl-walk.png";
import boyPlatform from "../../assets/img/boy-walk.png";
import { useNavigate } from "react-router-dom";
import { addGender } from "../../api";

const Character = () => {
    const [activeBtn, setActiveBtn] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false);
    const navigate = useNavigate();

    const handleActiveBtn = (character: string) => {
        if (activeBtn !== character) {
            setActiveBtn(character);
        }
    };

    const proceed = async (e: React.MouseEvent) => {
        e.preventDefault();
        setBtnDisabled(true);
        sessionStorage.setItem("gender", activeBtn);
        await addGender(Number(sessionStorage.getItem("tid")), activeBtn)
            .then((res) => {
                navigate("/");
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <section className="h-screen w-full bg-[#1D2849] flex flex-col items-center py-5 gap-10 overflow-hidden relative font-ZillaSlab md:hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0">
                <img src={bgBlurImg} className="w-full h-full" alt="" />
            </div>
            <div className="absolute top-0 bottom-0">
                <img src={bgFaded} className="w-full" alt="" />
            </div>
            <div className="flex flex-col items-center gap-20 pt-20 relative z-20 w-full h-full">
                <h2 className="text-lg text-[#FEC95E]">Choose your character</h2>
                <div className="w-[90%] grid grid-cols-2 gap-x-5">
                    <div className="flex flex-col gap-5 items-center justify-center">
                        <div className="w-[100%]">
                            <img className="w-full" src={boyPlatform} alt="" onClick={() => handleActiveBtn("male")} />
                        </div>
                        <button onClick={() => handleActiveBtn("male")} className={`flex items-center justify-center gap-2 choose-charact-btn ${activeBtn === "male" ? "active" : ""}`}>
                            <div className="w-5 h-5 p-1 rounded-full border-[1px] border-[#979797] radio-btn-wrapper">
                                <div className={`w-full h-full rounded-full ${activeBtn === "male" ? "bg-[#FEC95E]" : "bg-[#979797]"}`}></div>
                            </div>
                            <p className={`text-lg ${activeBtn === "male" ? "text-[#FEC95E]" : "text-[#979797]"}`}>Rodney</p>
                        </button>
                    </div>
                    <div className="flex flex-col gap-5 items-center justify-center">
                        <div className="w-[100%]">
                            <img className="w-full" src={girlPlatform} alt="" onClick={() => handleActiveBtn("female")} />
                        </div>
                        <button onClick={() => handleActiveBtn("female")} className={`flex items-center justify-center gap-2 choose-charact-btn ${activeBtn === "female" ? "active" : ""}`}>
                            <div className="w-5 h-5 p-1 rounded-full border-[1px] border-[#979797] radio-btn-wrapper">
                                <div className={`w-full h-full rounded-full ${activeBtn === "female" ? "bg-[#FEC95E]" : "bg-[#979797]"}`}></div>
                            </div>
                            <p className={`text-lg ${activeBtn === "female" ? "text-[#FEC95E]" : "text-[#979797]"}`}>Sharon</p>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    {activeBtn && (
                        <button disabled={btnDisabled} className="bg-gradient-to-b from-[#FFE2A7] to-[#FEC95E] text-[#B87C02] text-xl py-2 px-16 rounded-md" onClick={proceed}>
                            {btnDisabled ? "Loading..." : "Proceed"}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Character;
