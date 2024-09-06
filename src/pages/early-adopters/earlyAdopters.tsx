
import aiDog from "../../assets/img/doggy.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const EarlyAdopters = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);

    useEffect(() => {
        // Ensure the Telegram Web Apps SDK is ready
        Telegram.WebApp.ready();
    
        // Access the user information
        const userInfo = Telegram.WebApp.initDataUnsafe.user;
    
        // Check if the user information is available
        if (userInfo) {
          console.log({userInfo, url: window.location.href});
          setUser(userInfo);
        } else {
          console.log('No user information available.');
          setUser({
            allows_write_to_pm: true,
            first_name: "Qanda",
            id: 1354055384,
            language_code: "en",
            last_name: "Sensei",
            username: "qandasensei"
          })
        }
    }, []);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const claimPoints = async (e: React.MouseEvent) => {
        e.preventDefault();
        const points = 2500;
        setIsButtonDisabled(true)
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-early-adopter`, {
            pointsNo: points,
            user
        })

        if (updatePoints?.data?.success)  {
            navigate('/congrats')
        }

        if (!updatePoints?.data?.success)  {
            toast('Error claiming bonus', {
                className: "",
                duration: 799,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
            });
        }
    };

    return (
        <section className="h-screen w-full bg-[#210133] flex flex-col justify-center items-center gap-28 px-3 overflow-hidden  font-ZillaSlab text-xs small-mobile:text-base md:hidden">


            <div className="flex flex-col justify-between py-10 gap-5 h-[100%]">
                <div className="flex flex-col  items-center w-full">

                    <div className=" w-[90%] pt-10 small-mobile:w-[52%] relative mobile:w-[80%]">
                        <img className="w-full" src={aiDog} alt="" />
                        <p className="text-[#A6A6A6] absolute right-[40%] top-[80%] text-center text-bold mt-[-15px] text-3xl font-Rockwell">
                        Hey!
                    </p>
                    </div>
                  
                    <p className="text-[#FFFFFF] pt-10 text-center text-bold mt-[-15px] text-lg font-Rockwell">
                        We heard you qualified for the $DOGS Airdrop,<br /> It's time to claim your $AIDOGS 
                    </p>
                </div>

                <div className="flex flex-col pb-20 items-center w-full">

                    <div className="flex justify-end items-end pt-6 border-opacity-20 border-b-[#FFFFFF] w-full px-2 mt-3 ">
                        <button
                            className="bg-white font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2   rounded-[1px] w-full"
                            onClick={claimPoints} disabled={isButtonDisabled}


                        >
                            {isButtonDisabled ? "loading" : "Claim now"}
                        </button>


                    </div>
                </div>
            </div>


          
        </section>
    );
};

export default EarlyAdopters;
