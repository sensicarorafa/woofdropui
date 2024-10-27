import HomeTab from "../../components/home-tab/homeTab";
import Footer from "../../components/footer";
import Header from "../../components/header";


const Woofdrop = () => {
    return (
        <section className="h-screen w-full bg-[#000000] flex flex-col items-center gap-0 relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col w-full h-[100%] overflow-x-hidden">
                <div className="flex justify-between items-center border-opacity-20 border-b-[#FFFFFF] w-full  relative z-30 h-auto">
                    <Header />

                </div>
                <HomeTab/>

            </div>
            <Footer />
        </section>
    );
};

export default Woofdrop;
