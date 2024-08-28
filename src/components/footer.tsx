import { NavLink } from "react-router-dom";

import home from "../assets/img/home.png";
import homeActive from "../assets/img/home-active.png";
import handShakeActive from "../assets/img/handshake-active.png";
import handShake from "../assets/img/handshake.png";
import podium from "../assets/img/podium.png";
import podiumActive from "../assets/img/podium-active.png";

const Footer = () => {
    return (
        <footer className="flex items-center justify-between h-[10vh] px-5  w-full">
            <NavLink
                to="/home"
                className={({ isActive }) =>
                    isActive
                        ? "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#FFFFFF]"
                        : "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#A6A6A6]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? homeActive : home} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Home</p>
                    </>
                )}
            </NavLink>
            {/*<NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                    isActive
                    ? "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#FFFFFF]"
                    : "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#A6A6A6]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? handShakeActive : handShake} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Leaderboard</p>
                    </>
                )}
            </NavLink>*/}
            <NavLink
                to="/invites"
                className={({ isActive }) =>
                    isActive
                        ? "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#FFFFFF]"
                        : "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#A6A6A6]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? podiumActive : podium} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Frends</p>
                    </>
                )}
            </NavLink>
          
        </footer>
    );
};

export default Footer;
