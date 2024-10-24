import HomeTab from "../../components/home-tab/homeTab";

import Footer from "../../components/footer";
import Header from "../../components/header";
import WoofNomicsBoard from "../../assets/img/woofnomicsboard.png"


const Woofnomics = () => {
    return (
        <section className="h-screen woofnomics w-full bg-[#000000] flex flex-col items-center gap-0 relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col w-full h-[100%] overflow-x-hidden">
                <div className="flex justify-between items-center border-opacity-20 border-b-[#FFFFFF] w-full  relative z-30 h-auto">
                    <Header />

                </div>
                <div className="text-white text-left py-5 pl-5 text-2xl">
                        Woofnomics
                    </div>
                <div className="flex flex-col py-5 my-4 justify-center align-center m-auto items-center w-[80%]">
                   
                    <div className="relative w-[100%] small-mobile:w-[100%] mobile:w-[100%]">
                        <img className="w-full" src={WoofNomicsBoard} alt="" />

                        <div
                            className='absolute flex items-center top-[110px] left-12 text-white justify-between w-[70%]'
                        >
                            <div className='flex flex-col'>
                                <div className='flex text-xl py-2'>
                                    <p className="w-[140px]">
                                    Max Supply
                                    </p>&nbsp;
                                    <p>
                                     1 Billion
                                    </p>
                                </div>
                                <div className='flex text-xl py-2'>
                                    <p className="w-[140px]">
                                    Community
                                    </p>&nbsp; 
                                    <p>
                                     90% 
                                    </p>
                                </div>
                                <div className='flex text-xl py-2'>
                                    <p className="w-[140px]">
                                    Liquidity/CEX
                                    </p>&nbsp; 
                                    <p>
                                      7% 
                                    </p>
                                </div>
                                <div className='flex text-xl py-2'>
                                    <p className="w-[140px]">
                                    Ecosystem
                                    </p>&nbsp; 
                                    <p>
                                    2%
                                    </p>
                                </div>
                               
                                <div className='flex text-xl py-2'>
                                    <p className="w-[140px]">
                                    Partners
                                    </p>&nbsp; 
                                    <p>
                                     1%
                                    </p>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Woofnomics;
