


import HomeTab from "../../components/home-tab/homeTab";




const Home = () => {
  

     
    

    return (
        <section className="h-screen w-full bg-[#000000] flex flex-col items-center gap-0 relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">

            <div className="flex flex-col w-full h-[100%] overflow-x-hidden">
                <div className="flex justify-end items-end border-opacity-20 border-b-[#FFFFFF] w-full px-2 mt-3 relative z-30 h-[8%]">
                    <button
                        className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  transition-all duration-200 rounded-[1px] opacity-50 cursor-not-allowed"
                        disabled
                    >
                        Connect wallet
                    </button>
                </div>
            
                <HomeTab/>
            </div>
        </section>
    );
};

export default Home;
