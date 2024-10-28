import CountdownTimer from "./CountdownTimer";




const Header = () => {
    return (
        <header className="flex header py-4 flex-col items-center justify-between w-full bg-gradient-to-r from-[#ffffff75] from-4% via-black via-30% to-[#ffffff75] to-100%">
          <h1 className=" text-white text-md">$WOOFDROP ENDS IN</h1>
          <CountdownTimer/>
        </header>
    );
};

export default Header;
