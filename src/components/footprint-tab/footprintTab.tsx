import { useState } from "react";
import trash from "../../assets/img/Trash.png";
import Footer from "../footer";
import { logFootPrint } from "../../api";

const FootprintTab = () => {
    const footPrintData = JSON.parse(localStorage.getItem("footPrint") as string);
    const point = footPrintData?.point || 0;
    const isLogged = footPrintData?.logged;

    const [canClaim, setCanClaim] = useState(isLogged == false || point >= 1500);

    const handleClaim = (e: React.MouseEvent) => {
        e.preventDefault();
        if (canClaim) {
            localStorage.setItem("footPrint", JSON.stringify({ logged: true, date: new Date().toDateString(), point: 0 }));
            setCanClaim(false);
            logFootPrint(Number(sessionStorage.getItem("tid")), 1500).then(() => {
                localStorage.setItem("footPrint", JSON.stringify({ logged: true, date: new Date().toDateString(), point: 0 }));
            });
        }
    };

    const percentage = `w-[${(point / 1500) * 100}%]`;

    return (
        <div className="flex flex-col w-full h-[100%] relative">
            <div className="flex flex-col w-full overflow-y-scroll h-[100%]">
                <div className="flex flex-col items-center gap-[30px]">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-[#FEC95E] font-bold text-5xl">{point}/1,500</h1>
                        <p className="text-[#FFE2A7] text-sm">Steps</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-[40%]">
                            <img src={trash} alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start text-sm text-[#FFFFFF] ">
                        <p className="">Reduce carbon footprints by filling up</p>
                        <p className="">the trash can while walking the earth</p>
                    </div>
                    <div className="w-full flex items-center justify-center mt-[-1rem]">
                        <div className="w-[70%] h-2 bg-[#F30FFF] bg-opacity-40 rounded-full shadow-button-shadow">
                            <div className={`${percentage} h-full bg-gradient-to-r from-[#008000] to-[#FEC95E] rounded-full`}></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full flex-1">
                    <button
                        className={`bg-gradient-to-r from-[#FF8800] to-[#FEC95E] text-[#FFFFFF] text-xl py-2 w-[60%] rounded-lg font-OpenSans shadow-button-shadow ${!canClaim && "filter grayscale"}`}
                        disabled={!canClaim}
                        onClick={handleClaim}
                    >
                        Claim
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FootprintTab;
