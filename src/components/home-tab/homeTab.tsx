import React, { useCallback, useMemo, /*useMemo*/ } from 'react';


import WoofCoin from "../../assets/img/woofcoin.png";
import WoofBoard from "../../assets/img/woofboard.png";
import TonWeb from 'tonweb';

import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';




const HomeTab = () => {
    // Cache sessionStorage values

    const getUserCookies = sessionStorage.getItem('authUserLoggedInAI');
    const getUserCookiesParsed = JSON.parse(getUserCookies as string);

    const [totalPoints, setTotalPoints] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.pointsNo : 200000);
    const [referralCode, setReferralCode] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralCode : '');


    const [engageMissionTwitter, setEngageMissionTwitter] = useState(
        () => {

            const saved = sessionStorage.getItem('engageMissionTwitter')
            return saved !== null ? JSON.parse(saved) : false;
        });
    const [engageMissionTg, setEngageMissionTg] = useState(
        () => {

            const saved = sessionStorage.getItem('engageMissionTg')
            return saved !== null ? JSON.parse(saved) : false;
        });






    useEffect(() => {
        sessionStorage.setItem('engageMissionTwitter', JSON.stringify(engageMissionTwitter));
    }, [engageMissionTwitter]);

    useEffect(() => {
        sessionStorage.setItem('engageMissionTg', JSON.stringify(engageMissionTg));
    }, [engageMissionTg]);

    function getDeviceType() {
        // @ts-ignore
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Check for iOS devices
        // @ts-ignore
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        }

        // Check for Android devices
        if (/android/i.test(userAgent)) {
            return 'Android';
        }

        // Other devices (including desktops)
        return 'Other';
    }


    const encodedTextMission = useMemo(() => {
        const deviceType = getDeviceType();
        const referralLink = sessionStorage.getItem("referralLink");
        console.log("referralLinkhome", referralLink)
        let text
        if (deviceType === 'iOS') {
            text = `Claimed 7,000 $AIDOGS as a CEO on Hamster Kombat!🐹\n\nIf you're a Hamster CEO, grab your free 7k $AIDOGS bonus using my Boost Key "HMSTR"\n\nNew to AiDogs? join and start earning👇\n\n${referralLink}\n\n#Hamster_Kombat #hamster $HMSTR`;

        } else {
            text = `Claimed 7,000 $AIDOGS as a CEO on Hamster Kombat!🐹%0D%0A%0D%0AIf you're a Hamster CEO, grab your free 7k $AIDOGS bonus using my Boost Key "HMSTR-"%0D%0A%0D%0ANew to AiDogs? join and start earning👇%0D%0A%0D%0A${referralLink}%0D%0A%0D%0A%23Hamster_Kombat %23hamster $HMSTR`;

        }
        return encodeURIComponent(text);
    }, [referralCode]);

    console.log("encodedTextMission", encodedTextMission)

    const urlMissionTweet = `https://twitter.com/intent/tweet?text=${encodedTextMission}`;







    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);



    useEffect(() => {
        // Ensure the Telegram Web Apps SDK is ready
        Telegram.WebApp.ready();

        // Access the user information
        const userInfo = Telegram.WebApp.initDataUnsafe.user;


        // Check if the user information is available
        if (userInfo) {
            console.log({ userInfo, url: window.location.href });
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

    useEffect(() => {
        const fetchUserData = async () => {
            const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, { user })
            if (getUserData?.data?.userData) {
                setTotalPoints(getUserData?.data?.userData?.pointsNo);
                sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(getUserData))
            }
        
            console.log(referralCode)
        }





        if (user) {
            fetchUserData();
        }
    }, [user])




    // functions starts here

    const [wallet, setWallet] = useState(
        ''
    );
    let [isWalletValid, setIsWalletValid] = useState<boolean>(
        false
    );
    const [taskCompleted, setTaskCompleted] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.taskCompleted : false);




    const handleWallet = (e: any) => {
        console.log("ref", e.target.value)
        setWallet(e.target.value)

    }



    // Function to verify a TON wallet address
    function isValidTonAddress(address: any) {
        try {
            // Convert and validate the address
            const validAddress = TonWeb.utils.Address.isValid(address);
            return validAddress;
        } catch (error) {
            console.error('Invalid address:', error);
            return false;
        }
    }

    useEffect(() => {
        if (wallet) {
            let isValid = isValidTonAddress(wallet)
            setIsWalletValid(isValid)
            console.log('Is valid TON address:', wallet, isValid);

        }
    }, [wallet])



    const handleSubmitWallet = useCallback(() => {
        if (taskCompleted) {

        } else {
            if (!engageMissionTwitter || !engageMissionTg || !isWalletValid) {
                toast("Complete all task to proceed!", {
                    className: "",
                    duration: 799,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                });
            } else {


            }
        }

    }, [engageMissionTwitter, engageMissionTg, isWalletValid, taskCompleted]);




    return (
        <div className="flex flex-col homeTab   items-center w-full justify-end  h-[100%] overflow-hidden">

            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                <div className="flex py-5 my-4  justify-center align-center m-auto items-center w-80">

                    <div className=" w-[20%] small-mobile:w-[10%] mobile:w-[15%]">
                        <img className="w-full" src={WoofCoin} alt="" />
                    </div>
                    <p className="text-[#FFFFFF] pl-2 text-4xl totalPoint font-bold">{totalPoints.toLocaleString()}</p>
                </div>

                <div className="flex flex-col py-5 my-4  justify-center align-center m-auto items-center w-[80%]">

                    <div className="relative w-[100%] small-mobile:w-[100%] mobile:w-[100%]">
                        <img className="w-full" src={WoofBoard} alt="" />

                        <div
                            className='absolute flex items-center top-[60px] left-20 text-white justify-between w-[60%] md:top-[45px]'
                        >
                            <div className='flex flex-col'>
                                <div>Follow X Account</div>
                                {!engageMissionTwitter &&

                                    <button className={`bg-transparent border-white border-[1px] text-white  text-xs font-OpenSans  rounded-lg px-8 mt-7 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open('https://x.com/aidogscomm', '_blank');
                                            setTimeout(() => {
                                                setEngageMissionTwitter(true)
                                            }, 5000)
                                        }}
                                    >
                                        {taskCompleted ? <>Done</> : <>Follow</>}
                                    </button>
                                }
                                {engageMissionTwitter &&

                                    <button className={`bg-transparent border-white border-[1px] text-white  text-xs font-OpenSans rounded-lg px-8 mt-7 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open('https://x.com/aidogscomm', '_blank');

                                            setTimeout(() => {

                                                setEngageMissionTwitter(true)
                                            }, 5000)
                                        }}
                                    >
                                        Done
                                    </button>
                                }

                            </div>
                            <div className='bg-white  rounded-full p-2 mb-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                    <path d="M 2.8671875 3 L 9.7363281 12.818359 L 2.734375 21 L 5.3808594 21 L 10.919922 14.509766 L 15.460938 21 L 21.371094 21 L 14.173828 10.697266 L 20.744141 3 L 18.138672 3 L 12.996094 9.0097656 L 8.7988281 3 L 2.8671875 3 z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[100%] small-mobile:w-[100%] mobile:w-[100%] mt-5 ">
                        <img className="w-full" src={WoofBoard} alt="" />

                        <div
                            className='absolute flex items-center top-[70px] left-20 text-white justify-between w-[60%]'
                        >
                            <div className='flex flex-col'>
                                <div>Join Telegram</div>

                                {
                                    !engageMissionTg &&

                                    <button className={`bg-transparent border-white border-[1px] text-white  text-xs font-OpenSans rounded-lg px-8 mt-7 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open('https://t.me/aidogs_community', '_blank');
                                            setTimeout(() => {
                                                setEngageMissionTg(true)
                                            }, 5000)
                                        }}
                                    >

                                        {taskCompleted ? <>Done</> : <>Join</>}
                                    </button>
                                }

                                {
                                    engageMissionTg &&

                                    <button className={`bg-transparent border-white border-[1px] text-white  text-xs font-OpenSans rounded-lg mt-7 px-8 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open('https://t.me/aidogs_community', '_blank');
                                            setTimeout(() => {
                                                setEngageMissionTg(true)
                                            }, 5000)
                                        }}
                                    >
                                        Done
                                    </button>
                                }


                            </div>
                            <div className='bg-white  rounded-full p-2 mb-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 50 50">
                                    <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='py-5 w-full'>
                        <input type="text" className=" px-4 bg-[#8080802e] outline-none py-2 my-3 border-[1px] border-r-transparent border-t-transparent border-white text-center w-full bg-transparent " placeholder={`Submit Ton wallet for WOOF Airdrop`} onChange={(e) => handleWallet(e)} />

                    </div>

                    <button className={`bg-[#05F84E] w-2/3 text-md font-OpenSans text-white w-full rounded-lg px-10 py-4 rounded-[1px]`}
                        onClick={handleSubmitWallet}

                    >
                        {taskCompleted ? <>Done</> : <>Submit</>}
                    </button>
                </div>




            </div>


        </div>
    );
};

export default HomeTab;