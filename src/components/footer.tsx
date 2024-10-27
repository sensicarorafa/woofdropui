import { NavLink } from "react-router-dom";

import woofDrop from '../assets/img/woofdrop.svg'
import woofDropActive from '../assets/img/woofdropActive.svg'
import woofNomics from '../assets/img/woofnomics.svg'
import woofNomicsActive from '../assets/img/woofnomicsactive.svg'
import woofrens from '../assets/img/woofrens.svg'
import woofrensActive from '../assets/img/woofrensactive.svg'



const Footer = () => {
    return (
        <footer className="flex footer items-center justify-between h-[10vh] px-5 z-50 w-full bg-gradient-to-r from-[#ffffff75] from-4% via-black via-20% to-[#ffffff75] to-100%">
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
                            <img className="w-full" src={isActive ? woofDropActive : woofDrop} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Woofdrop</p>
                    </>
                )}
            </NavLink>
            <NavLink
                to="/woofnomics"
                className={({ isActive }) =>
                    isActive
                    ? "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#FFFFFF]"
                    : "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#A6A6A6]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? woofNomicsActive : woofNomics} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Woofnomics</p>
                    </>
                )}
            </NavLink>
            <NavLink
                to="/woofrens"
                className={({ isActive }) =>
                    isActive
                        ? "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#FFFFFF]"
                        : "flex flex-col gap-1 items-center justify-center py-3 px-2 text-[#A6A6A6]"
                }
            >
                {({ isActive }) => (
                    <>
                        <div className="w-[3vh]">
                            <img className="w-full" src={isActive ? woofrensActive : woofrens} alt="" />
                        </div>
                        <p className="text-[2.2vh]">Woofrens</p>
                    </>
                )}
            </NavLink>
       
        </footer>
    );
};

export default Footer;
