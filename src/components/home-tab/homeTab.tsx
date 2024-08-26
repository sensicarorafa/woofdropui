import React, { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import logoBig from "../../assets/img/logobig.png";
import logoSm from "../../assets/img/logosm.svg";

import Footer from "../footer";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';



const HomeTab = () => {
    // Cache sessionStorage values

    const [totalPoints, setTotalPoints] = useState(0);
    const [socialTasks, setSocialTasks] = useState<any>([]);

    const [engageTwoFrens, setEngageTwoFrens] = useState(false);
    const [engageRepost, setEngageRepost] = useState(false);
    const [engageTelegram, setEngageTelegram] = useState(false);
    const [engageFollow, setEngageFollow] = useState(false);

    const [referees, setReferees] = useState<any[]>();
    const [open, setOpenModal] = useState<boolean>(false);

    const openTg = () => {
        window.open("https://t.me/aidogs_community", "_blank");
    };

    const openTwitter = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://x.com/aidogscomm", "_blank");

    };

    const claimTg = async () => {
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'telegram',
            user
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success)  {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
            });
            setTotalPoints(updatePoints?.data?.userData?.pointsNo)
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
        }
    };
    
    const claimFollow = async () => {
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'follow',
            user
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success)  {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
            });
            setTotalPoints(updatePoints?.data?.userData?.pointsNo)
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
        }
    };

    const claimShare = async () => {
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'repost',
            user
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success)  {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
            });
            setTotalPoints(updatePoints?.data?.userData?.pointsNo)
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
        }
    };
  
    const claimTwoFrens = async () => {
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user});
        const referralPoints = getUserData?.data?.userData?.referralPoints

        if (referralPoints >= 2) {
            const points = 150;
            const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
                pointsNo: points,
                user
            })

            const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
                claimTreshold: 'repost',
                user
            })

            if (updatePoints?.data?.success && updateSocial?.data?.success)  {
                toast("Claimed successfully", {
                    className: "",
                    duration: 799,
                    style: {
                    background: "#363636",
                    color: "#fff",
                    },
                });
                setTotalPoints(updatePoints?.data?.userData?.pointsNo)
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
                setReferees(updatePoints?.data?.userData?.referralPoints);
            }
        } else {
            toast("You need at least two referrals to claim", {
                className: "",
                duration: 799,
                style: {
                background: "#363636",
                color: "#fff",
                },
            });
        }
    };

    const toggleModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);

    const closeModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);








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

    useEffect (() => {
        const fetchUserData = async () => {
          const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user})
          console.log(getUserData?.data)
          setTotalPoints(getUserData?.data?.userData?.pointsNo);
          setSocialTasks(getUserData?.data?.userData?.socialRewardDeets);
          setReferees(getUserData?.data?.userData?.referralPoints);
        }
        if (user) {
          fetchUserData();
        }
    }, [user])















    

    return (
        <div className="flex flex-col  items-center w-full justify-end  h-[100%] overflow-hidden">
           {open && 
           <div className='absolute m-auto bg-[#000000] bg-opacity-95 flex items-center h-[100%] w-full top-0  z-[100]'  onClick={closeModal}>
                <div className='flex relative m-auto flex-col justify-center bg-[#80808059] h-[370px] w-[90%] rounded-lg '>
                    <div className='absolute top-2 right-3 rounded-full px-2 py-1 bg-[#9ca3af54] z-[200]'>
                        <p className='text-white text-sm'>X</p>
                    </div>
                    <div className='flex items-center px-5'>
                        <p className='text-white text-center px-5'>
                            Every User can claim a base amount of 1,000 $AIDOGS
                        </p>

                    </div>
                    <div className='mt-6 py-2  flex justify-between bg-[#00000040]'>
                        <div className='flex items-center basis-1/3 justify-center '>
                            <p className='text-center text-white text-xs'>Eligible Users</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center '>
                            <p className='text-center text-white text-xs'>Bonus Reward</p>
                        </div>
                        <div className='flex items-center  basis-1/3  justify-center'>
                            <p className='text-center text-white text-xs'>Claim Amount</p>
                        </div>

                    </div>
                    <div className='mt-4 py-2   flex justify-between'>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>First 100k</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>150%</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>2,500 $AIDOGS</p>
                        </div>

                    </div>
                    <div className='mt-4 py-2   flex justify-between'>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>Next 500k</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>100%</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>2,000 $AIDOGS</p>
                        </div>

                    </div>
                    <div className='mt-4 py-2  flex justify-between'>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>Next 1.5M</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>50%</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>1,500 $AIDOGS</p>
                        </div>

                    </div>
                    <div className='mt-4 py-2   flex justify-between'>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>Next 5M</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>25%</p>
                        </div>
                        <div className='flex items-center basis-1/3 justify-center'>
                            <p className='text-center text-white text-xs'>1,250 $AIDOGS</p>
                        </div>

                    </div>
                </div>
            </div>}
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                <div className="flex flex-col items-center pt-5 px-10 w-full flex-1">

                    <div className=" w-[50%] small-mobile:w-[32%] mobile:w-[36%]">
                        <img className="w-full" src={logoBig} alt="" />
                    </div>
                </div>
                <div className="flex flex-col rounded-lg bg-white/20 py-5 my-4  justify-center align-center m-auto items-center w-80">
                    <p className="text-[#FFFFFF] text-4xl font-OpenSans font-bold">{totalPoints.toLocaleString()}</p>
                    <p className="text-[#A6A6A6] text-xl font-OpenSans font-light">$AIDOGS</p>
                </div>
                <div>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={25}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >

                        <SwiperSlide>
                            <div className='flex h-[180px] flex-col rounded-lg justify-between items-center text-white bg-white/15 py-3'>
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <img className="w-full" src={logoSm} alt="" />

                                </div>
                                <div className='flex flex-col justify-center align-center text-center items-center py-4 px-4'>
                                    <p className='text-sm'> 150% bonus for early claimers</p>

                                </div>

                                <div className="flex flex-col rounded-lg bg-white/20  justify-center align-center items-center" >


                                    <button
                                        className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]"
                                        onClick={toggleModal}

                                    >
                                        View Reward Structure
                                    </button>


                                </div>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex h-[180px] flex-col rounded-lg justify-center align-center items-center text-white bg-white/15 py-3'>
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <img className="w-full" src={logoSm} alt="" />

                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-4'>
                                    <p className='text-sm'> JOIN OUR TG</p>
                                    <p className='text-xs'> Stay updated</p>
                                </div>
                                <div className="flex flex-col rounded-lg bg-white/20  justify-center align-center m-auto items-center">


                                    <button
                                        className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]"
                                        onClick={() => {openTg()}}

                                    >
                                        Join
                                    </button>


                                </div>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex h-[180px] -col rounded-lg justify-center align-center items-center text-white bg-white/15 py-3'>
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <img className="w-full" src={logoSm} alt="" />

                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-4'>
                                    <p className='text-sm'> FOLLOW US ON X</p>
                                    <p className='text-xs'> Stay updated</p>
                                </div>
                                <div className="flex flex-col rounded-lg bg-white/20  justify-center align-center m-auto items-center">


                                    <button
                                        className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]"
                                        onClick={(e) => openTwitter(e)}

                                    >
                                        Follow
                                    </button>
                                </div>

                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>


                <div className="w-full flex flex-col pt-7 px-4 relative z-10">
                    <p className='text-white text-xl pb-5'>Tasks</p>

                    {
                        socialTasks.map((task: any) => (
                            <>
                                {
                                    task.claimTreshold === 'telegram' &&
                                    <div className='flex justify-between py-2 w-full items-center'>
                                        <div className='flex items-center'>
                                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" /></svg>

                                            </div>
                                            <div className='flex flex-col pl-5'>
                                                <p className='text-white text-bold taskTitle'>Join AIDOG Tg Channel</p>
                                                <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                !task.rewardClaimed && !engageTelegram &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    openTg()
                                                    setTimeout(() => {
                                                        setEngageTelegram(true)
                                                    }, 30000)
                                                }}>
                                                    Open
                                                </button>
                                            }
                                            {
                                                !task.rewardClaimed && engageTelegram &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    claimTg();
                                                }}>
                                                    Claim
                                                </button>
                                            }
                                            {
                                                task.rewardClaimed &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} disabled={true}>
                                                    Done
                                                </button>
                                            }
                                        </div>
                                    </div>
                                }
                                {
                                    task.claimTreshold === 'follow' &&
                                    <div className='flex justify-between py-2 w-full items-center'>
                                        <div className='flex items-center'>
                                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                            </div>
                                            <div className='flex flex-col pl-5'>
                                                <p className='text-white text-bold taskTitle' onClick={() => {}}>Follow on X</p>
                                                <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                !task.rewardClaimed && !engageFollow &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    window.open('https://x.com/aidogscomm', '_blank');
                                                    setTimeout(() => {
                                                        setEngageFollow(true)
                                                    }, 30000)
                                                }}>
                                                    Follow
                                                </button>
                                            }
                                            {
                                                !task.rewardClaimed && engageFollow &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    claimFollow();
                                                }}>
                                                    Claim
                                                </button>
                                            }
                                            {
                                                task.rewardClaimed &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} disabled={true}>
                                                    Done
                                                </button>
                                            }
                                        </div>
                                    </div>
                                }
                                {
                                    task.claimTreshold === 'repost' &&
                                    <div className='flex justify-between py-2 w-full items-center'>
                                        <div className='flex items-center'>
                                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                            </div>
                                            <div className='flex flex-col pl-5'>
                                                <p className='text-white text-bold taskTitle' onClick={() => {}}>Share on X</p>
                                                <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                !task.rewardClaimed && !engageRepost &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    window.open('https://x.com/aidogscomm', '_blank');
                                                    setTimeout(() => {
                                                        setEngageRepost(true)
                                                    }, 30000)
                                                }}>
                                                    Share
                                                </button>
                                            }
                                            {
                                                !task.rewardClaimed && engageRepost &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    claimShare();
                                                }}>
                                                    Claim
                                                </button>
                                            }
                                            {
                                                task.rewardClaimed &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} disabled={true}>
                                                    Done
                                                </button>
                                            }
                                        </div>
                                    </div>
                                }
                                {
                                    task.claimTreshold === 'two-frens' &&
                                    <div className='flex justify-between py-2 w-full items-center'>
                                        <div className='flex items-center'>
                                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoSm} alt="" />
                                            </div>
                                            <div className='flex flex-col pl-5'>
                                                <p className='text-white text-bold taskTitle' onClick={() => {}}>Invite 2 frens</p>
                                                <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                            </div>
                                        </div>
                                        
                                        <div className="">
                                            {
                                                !task.rewardClaimed && !engageTwoFrens &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    setEngageTwoFrens(true)
                                                }}>
                                                    Start
                                                </button>
                                            }
                                            {
                                                !task.rewardClaimed && engageTwoFrens &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                    claimTwoFrens();
                                                }}>
                                                    Claim
                                                </button>
                                            }
                                            {
                                                task.rewardClaimed &&
                                                <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} disabled={true}>
                                                    Done
                                                </button>
                                            }
                                        </div>
                                    </div>
                                }
                            </>
                        ))
                    }

                    
                    {/*tasks.map((task) => {
                        let isTaskClaimed: boolean = taskList.find((t) => t.taskId == task.id);
                
                        return (

                            <div key={task.id} className='flex justify-between py-2 w-full items-center'>
                                <div className='flex items-center'>
                                    <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">

                                        {task.icon}
                                    </div>
                                    <div className='flex flex-col pl-5'>
                                        <p className='text-white text-bold taskTitle' onClick={() => openTask(task.id)}>{task.name}</p>
                                        <span className='text-[#A6A6A6]'>+{task.reward.toLocaleString()} $AIDOGS</span>
                                    </div>
                                </div>
                                <div className="">



                                    <button
                                        className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]  ${isTaskClaimed && "opacity-50"
                                            }`}
                                        onClick={(isTaskIdPending == task.id || isTaskIdPendingLocal == task.id) ? (e) => claim(e, task.id, Number(task.reward)) : (e) => pendingTask(e, task.id)}
                                        disabled={isTaskClaimed}
                                    >

                                        {isTaskClaimed ? "Done" :
                                            <>
                                                {(isTaskIdPending == task.id || isTaskIdPendingLocal == task.id) ?
                                                    <>{isLoading ? <>
                                                      <span className="loader"></span>
                                                    </>:
                                                        <>Claim
                                                        </>
                                                    }
                                                    </>
                                                    :

                                                    <>{isLoading && (task.id == isTaskIdPending || isTaskIdPendingLocal == task.id) ?
                                                        <>
                                                            <span className="loader"></span>
                                                        </> :
                                                        <>{task.btnText}
                                                        </> 
                                                    }
                                                    </>
                                                }
                                            </>

                                        }
                                    </button>
                                </div>
                            </div>


                        );
                    })}
                    {referralTasks.map((task) => {
                        let isTaskClaimed: boolean = taskList.find((t) => t.taskId == task.id);

                        return (

                            <div key={task.id} className='flex justify-between py-2 w-full items-center'>
                                <div className='flex items-center'>
                                    <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">

                                        <img className="w-full" src={logoSm} alt="" />

                                    </div>
                                    <div className='flex flex-col pl-3'>
                                        <p className='text-white text-bold'>{task.name}</p>
                                        <span className='text-[#A6A6A6]'>+{task.reward.toLocaleString()} $AIDOGS</span>
                                    </div>
                                </div>
                                <div className="">

                                    {task.id == activeReferral ?

                                        <button
                                            className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]  ${isTaskClaimed && "opacity-50"
                                                }`}
                                            onClick={task.id == isReferralCompleteId ? (e) => claim(e, task.id, Number(task.reward)) : (e) => checkReferralTask(e, task.id, Number(task.reward))}
                                            disabled={isTaskClaimed}
                                        >

                                            {isTaskClaimed ? "Done" :
                                                <>
                                                    {task.id == isReferralCompleteId ?



                                                        <>{isLoading ?
                                                            <>
                                                                <span className="loader"></span>
                                                            </> :
                                                            <>Claim
                                                            </>
                                                        }
                                                        </>
                                                        :
                                                        <>
                                                        
                                                            <>Check
                                                            </>
                                                     
                                                        </>
                                                    }
                                                </>

                                            }
                                        </button> :
                                        <button
                                            className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]  ${isTaskClaimed && "opacity-50"
                                                }`}
                                            onClick={(e) => switchReferralState(e, task.id)}
                                            disabled={isTaskClaimed}
                                        >

                                            {isTaskClaimed ? "Done" :
                                                <>

                                                    {task.btnText}


                                                </>

                                            }
                                        </button>
                                    }


                                </div>
                            </div>


                        );
                    })*/}

                    <div className='flex justify-between py-2 w-full items-center'>
                        <div className='flex items-center'>
                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                <img className="w-full" src={logoSm} alt="" />

                            </div>
                            <div className='flex flex-col pl-3'>
                                <p className='text-white text-bold'>Your Referrals</p>
                                <span className='text-[#A6A6A6]'></span>
                            </div>
                        </div>
                        <div className="">
                            <p className='text-white pr-5'>
                                {referees?.length || 0}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeTab;
