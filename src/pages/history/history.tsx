import bgBlurImg2 from "../../assets/img/bg-blur-2.png";
import { NavLink } from "react-router-dom";
import feet from "../../assets/img/feet.png";
import flame from "../../assets/img/flame.png";
import circleStar from "../../assets/img/circle-star.png";
import distIcon from "../../assets/img/dist-icon.png";
import DateCarousel from "../../components/history/calendar";
import Footer from "../../components/footer";

const History = () => {
    return (
        <section className="h-screen w-full bg-[#060c1d] flex flex-col items-center gap-28 overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0">
                <img src={bgBlurImg2} className="w-full h-full" alt="" />
            </div>
            <div className="relative w-full h-full flex flex-col items-center z-40">
                <div className="flex justify-start w-full h-[10%] px-5">
                    <NavLink className="text-[#FEC95E] flex items-center gap-2 text-xl" to="/">
                        <i className="bx bx-arrow-back"></i> History
                    </NavLink>
                </div>
                <div className="h-[25%] w-full flex flex-col relative mt-[20px]">
                    <div className="flex">
                        <DateCarousel title={<p className="text-sm text-[#FFFFFF] font-Poppins">Walk History</p>} />
                    </div>
                </div>
                <div className="w-full h-[65%] rounded-tr-[40px] rounded-tl-[40px] bg-[#1D2849] bg-opacity-[69%] flex flex-col relative z-10">
                    <div className="flex justify-end items-center px-10 py-3">
                        <button className="flex flex-col items-center">
                            <i className="bx bx-dots-horizontal-rounded font-bold text-2xl text-[#FFE2A7]"></i>
                            <p className="text-lg text-[#FFE2A7] -mt-2">Share</p>
                        </button>
                    </div>
                    <div className="flex items-center justify-around border-b-[1px] border-opacity-20 border-b-[#FFFFFF] py-5">
                        <div className="flex gap-2">
                            <div className="w-[30px]">
                                <img className="scale-95" src={flame} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-Rockwell text-[#FEC95E] text-3xl leading-[24px]">68</p>
                                <p className="text-[#FFE2A7] font-bold text-xs">Calories Burnt</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-[30px]">
                                <img className="scale-125 mt-[4px]" src={distIcon} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-Rockwell text-[#FEC95E] text-3xl leading-[24px]">12.4</p>
                                <p className="text-[#FFE2A7] font-bold text-xs">Distance Covered</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-around border-b-[1px] border-opacity-20 border-b-[#FFFFFF] py-5">
                        <div className="flex gap-2">
                            <div className="w-[30px]">
                                <img className="" src={feet} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-Rockwell text-[#FEC95E] text-3xl leading-[24px]">976</p>
                                <p className="text-[#FFE2A7] font-bold text-xs">Steps</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-[30px]">
                                <img className="" src={circleStar} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-Rockwell text-[#FEC95E] text-3xl leading-[24px]">5,470</p>
                                <p className="text-[#FFE2A7] font-bold text-xs">Points Earned</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-center items-center w-full">
                        <button className="bg-gradient-to-r from-[#FF8800] to-[#FEC95E] text-[#FFFFFF] text-xl py-2 w-[60%] rounded-lg font-OpenSans shadow-button-shadow">View tracks on map</button>
                    </div>
                    <Footer />
                </div>
            </div>
        </section>
    );
};

export default History;
