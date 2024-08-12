import { useState } from "react";
import bgBlurImg2 from "../../assets/img/bg-blur-2.png";
import HomeTab from "../../components/home-tab/homeTab";
import FootprintTab from "../../components/footprint-tab/footprintTab";

const Home = () => {
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState("home");

    return (
        <section className="h-screen w-full bg-[#060c1d] flex flex-col items-center gap-0 relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0">
                <img src={bgBlurImg2} className="w-full h-full" alt="" />
            </div>
            <div className="flex flex-col w-full h-[100%] overflow-x-hidden">
                <div className="flex justify-between items-end border-b-[2px] border-opacity-20 border-b-[#FFFFFF] w-full px-10 relative z-30 h-[8%]">
                    <button
                        className={`text-xl font-OpenSans text-[rgba(255,255,255,0.5)] px-4 border-b-4 transition-all duration-200 rounded-[1px] ${
                            activeTab === "home" ? "border-[#FFFFFF] text-[rgba(255,255,255,1)]" : "border-transparent hover:border-[#FFFFFF] hover:text-[#FFFFFF]"
                        }`}
                        onClick={() => setActiveTab("home")}
                    >
                        Home
                    </button>
                    <button
                        className={`text-xl font-OpenSans text-[rgba(255,255,255,0.5)] px-4 border-b-4 transition-all duration-200 rounded-[1px] ${
                            activeTab === "footprint" ? "border-[#FFFFFF] text-[rgba(255,255,255,1)]" : "border-transparent hover:border-[#FFFFFF] hover:text-[#FFFFFF]"
                        }`}
                        onClick={() => setActiveTab("footprint")}
                    >
                        Footprint
                    </button>
                </div>
                <div className="relative z-30 w-full pt-5 h-[100%]">
                    {activeTab === "home" && <HomeTab />}
                    {activeTab === "footprint" && <FootprintTab />}
                </div>
            </div>
        </section>
    );
};

export default Home;
