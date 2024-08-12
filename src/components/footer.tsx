import { NavLink } from "react-router-dom";
import earn from "../assets/img/earn.png";
import earnActive from "../assets/img/earn-active.png";
import referralActive from "../assets/img/referral-active.png";
import referral from "../assets/img/referral.png";
import powerup from "../assets/img/power-up.png";
import powerupActive from "../assets/img/power-up-active.png";
import stats from "../assets/img/stats.png";
import statsActive from "../assets/img/stats-active.png";

const Footer = () => {
    return (
        <footer className="flex items-center justify-between h-[10vh] px-5 border-t-[1px] border-t-[#FFFFFF] w-full">
            <NavLink
                to="/earn"
                className={({ isActive }) =>
                    isActive
                        ? "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-[#FEC95E] text-[#FEC95E]"
                        : "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-transparent text-[#FFFFFF]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? earnActive : earn} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Earn</p>
                    </>
                )}
            </NavLink>
            <NavLink
                to="/referral"
                className={({ isActive }) =>
                    isActive
                        ? "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-[#FEC95E] text-[#FEC95E]"
                        : "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-transparent text-[#FFFFFF]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? referralActive : referral} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Referral</p>
                    </>
                )}
            </NavLink>
            <NavLink
                to="/power-up"
                className={({ isActive }) =>
                    isActive
                        ? "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-[#FEC95E] text-[#FEC95E]"
                        : "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-transparent text-[#FFFFFF]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? powerupActive : powerup} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Power up</p>
                    </>
                )}
            </NavLink>
            <NavLink
                to="/stats"
                className={({ isActive }) =>
                    isActive
                        ? "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-[#FEC95E] text-[#FEC95E]"
                        : "flex flex-col gap-1 items-center justify-center py-3 px-2 border-t-4 border-t-transparent text-[#FFFFFF]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? statsActive : stats} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Stats</p>
                    </>
                )}
            </NavLink>
        </footer>
    );
};

export default Footer;
