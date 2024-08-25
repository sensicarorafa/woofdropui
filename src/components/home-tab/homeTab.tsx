import React, { useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { claimTask, claimTgReward, getRefereesPoints, getTasks, getUser  } from "../../api";
import logoBig from "../../assets/img/logobig.png";
import logoSm from "../../assets/img/logosm.svg";

import Footer from "../footer";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';


interface Task {
    taskId: number;
  
  }



const HomeTab = () => {
        // Cache sessionStorage values
        const tid = useMemo(() => Number(sessionStorage.getItem("tid")), []);
        const initialTotalPoints = useMemo(() => Number(sessionStorage.getItem("totalPoints")), []);
        const initialReferees = useMemo(() => JSON.parse(sessionStorage.getItem("referees") || "[]"), []);
        const initialClaimedTasks = useMemo(() => JSON.parse(sessionStorage.getItem("claimedTasks") || "[]"), []);
        const taskToClaimLocal = useMemo(() => JSON.parse(sessionStorage.getItem("taskToClaim") || "{}"), []);
        const referralLink = sessionStorage.getItem("referralLink");
    
        const [totalPoints, setTotalPoints] = useState(initialTotalPoints);
        const [activeReferral, setActiveReferral] = useState<number | undefined>();
        const [referees, setReferees] = useState<any[]>(initialReferees);
        const [taskList, setTasks] = useState<any[]>(initialClaimedTasks);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [tgIsLoading, setTgIsLoading] = useState<boolean>(false);
        const [tgTask, setTgTask] = useState<boolean>(false);
        const [open, setOpenModal] = useState<boolean>(false);
        const [isReferralCompleteId, setIsReferralCompleteId] = useState<number | undefined>();
        const isTaskIdPending = useMemo(() => Number(sessionStorage.getItem("isTaskIdPending")), []);
        const [isTaskIdPendingLocal,setIsTaskIdPendingLocal ] = useState(Number(sessionStorage.getItem("isTaskIdPending")));
        const [isTgPending, setIsTgPending] = useState<boolean>(sessionStorage.getItem("isTgPending") === "true");
    

        const encodedText = useMemo(() => {
            const text = `Got $DOGS??\r\n\nJoin me on AIDOGS and be a part of the dog revolution.\r\n\nEarn 2,500 $AIDOGS when you signup.\r\n\nStart here: ${referralLink} \r\n\n #DOGS #Crypto #AIDOGS`;
            return encodeURIComponent(text);
        }, [referralLink]);
    
        const url = `https://twitter.com/intent/tweet?text=${encodedText}`;
  


        const tasks = useMemo(() => [
            {
                id: 2,
                name: "Follow on X",
                reward: 150,
                to: "https://x.com/aidogscomm",
                btnText: "Follow",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
            },
            {
                id: 3,
                name: "Share on X",
                reward: 150,
                to: "https://x.com/aidogscomm",
                btnText: "Share",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
            }
        ], []);
    
        const referralTasks = useMemo(() => [
            {
                id: 4,
                name: "Invite 2 frens",
                reward: 2000,
                to: "https://twitter.com/FitcoinEarn",
                btnText: "Start",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
            }
        ], []);


        const handleFocus = useCallback(async () => {
            const taskToClaim = JSON.parse(sessionStorage.getItem("taskToClaim") || "{}");
            if (taskToClaim.taskId || taskToClaimLocal.taskId) {
                try {
                    await claimTask(tid, taskToClaimLocal.taskId, taskToClaimLocal.points);
                    const userResponse = await getUser(tid);
                    if (userResponse.status === 200) {
                        const { totalPoints, referees } = userResponse.data;
                        sessionStorage.setItem("totalPoints", totalPoints);
                        sessionStorage.setItem("referees", JSON.stringify(referees));
                        setTotalPoints(totalPoints);
                        setReferees(referees);
                        window.location.reload();
                    }
                    const tasksResponse = await getTasks(tid);
                    if (tasksResponse.status === 200) {
                        setTasks(tasksResponse.data);
                    }
                    sessionStorage.removeItem("taskToClaim");
                } catch (error) {
                    console.error("Error claiming task:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        }, [tid, taskToClaimLocal]);

        function isTask(task: any): task is Task {
            return 'taskId' in task;
          }
        useEffect(() => {
            const fetchInitialData = async () => {
                try {
                    const tasksResponse = await getTasks(tid);
                    if (tasksResponse.status === 200) {
                        const claimedTasks:Task[] = tasksResponse.data;
                        sessionStorage.setItem("claimedTasks", JSON.stringify(claimedTasks));
                        setTasks(claimedTasks);
                        // setTgTask(claimedTasks.some(task => task.taskId == 1));
                        setTgTask(claimedTasks.some(task => isTask(task) && task.taskId === 1));
                    }
    
                    await getRefereesPoints(String(sessionStorage.getItem("referralCode")));
                    const userResponse = await getUser(tid);
                    if (userResponse.status === 200) {
                        const { totalPoints, referees, tasksClaimed } = userResponse.data;
                        sessionStorage.setItem("totalPoints", totalPoints);
                        sessionStorage.setItem("referees", JSON.stringify(referees));
                        setTotalPoints(totalPoints);
                        setReferees(referees);
                        setTasks(tasksClaimed);
                    }
                } catch (error) {
                    console.error("Error fetching initial data:", error);
                }
            };
    
            fetchInitialData();
            window.addEventListener("focus", handleFocus);
    
            return () => {
                window.removeEventListener("focus", handleFocus);
            };
        }, [handleFocus]);
    

        const claim = useCallback(async (e: React.MouseEvent, taskId: number, points: number) => {
            e.preventDefault();
            setIsLoading(true);
            sessionStorage.setItem("taskToClaim", JSON.stringify({ taskId, points }));
       
    
            try {
                await claimTask(tid, taskId, points);
                const userResponse = await getUser(tid);
                if (userResponse.status === 200) {
                    const { totalPoints, referees, claimedTasks } = userResponse.data;
                    sessionStorage.setItem("totalPoints", totalPoints);
                    sessionStorage.setItem("referees", JSON.stringify(referees));
                    setTotalPoints(totalPoints);
                    setReferees(referees);
                    setTasks(claimedTasks);
                    window.location.reload();
                } else {
                    showToast("Server busy");
                  
                }
            } catch (error) {
                console.error("Error claiming task:", error);
            } finally {
                setIsLoading(false);
                sessionStorage.removeItem("taskToClaim");
            }
        }, [tid]);

        const checkReferralTask = useCallback((e: React.MouseEvent, taskId: number, points: number) => {
            e.preventDefault();
            sessionStorage.setItem("pendingTaskToClaim", JSON.stringify({ taskId, points }));
            const refereesCount = referees?.length || 0;
    
            if (taskId === 4 && refereesCount >= 2) {
                setIsReferralCompleteId(taskId);
            } else if (taskId === 5 && refereesCount >= 5) {
                setIsReferralCompleteId(taskId);
            } else {
                showToast("Complete Task and try again");
            }
        }, [referees]);
        
    const switchReferralState = (e: React.MouseEvent, taskId: number) => {
        e.preventDefault();
        setActiveReferral(taskId)



    };

    const pendingTask = useCallback((e: React.MouseEvent, taskId: number) => {
        e.preventDefault();
        const task = tasks.find(t => t.id === taskId);
        const taskLink = task ? task.to : "";

        if (taskLink) {
            if (taskId === 3) {
                window.open(url, "_blank");
            } else {
                window.open(taskLink, "_blank");
            }
        }
        sessionStorage.setItem("isTaskIdPending", JSON.stringify(taskId));
        setIsTaskIdPendingLocal(taskId)
    
    }, [tasks, url]);

    const openTg = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://t.me/aidogs_community", "_blank");
        setIsTgPending(true);
        sessionStorage.setItem("isTgPending", "true");
    }, []);
    
    const openTask = useCallback((taskId: number) => {
        if (taskId === 3) {
            window.open(url, "_blank");
        } else {
            window.open("https://twitter.com/aidogs_community", "_blank");
        }
        handleFocus();
    }, [handleFocus, url]);


    const openTwitter = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://x.com/aidogscomm", "_blank");

    };

    const claimTg = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await claimTgReward(tid);
            if (res.status === 200) {
                setTgTask(taskList.some(task => task.taskId === 1));
                window.location.reload();
            } else {
                showToast("Complete Task and try again!");
            }
        } catch (error) {
            console.error("Error claiming TG reward:", error);
        } finally {
            setTgIsLoading(false);
        }
    }, [tid, taskList]);



    const toggleModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);

    const closeModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);


    const showToast = useCallback((message: string) => {
        toast(message, {
            className: "",
            duration: 1000,
            style: {
                background: "#363636",
                color: "#fff",
            },
        });
    }, []);

   


console.log("isTaskIdPending", isTaskIdPending)

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
                                        onClick={(e) => openTg(e)}

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


                <div className="w-full  flex flex-col pt-7 px-4 relative z-10">
                    <p className='text-white text-xl pb-5'>Tasks</p>

                    <div className='flex justify-between py-2 w-full items-center'>
                        <div className='flex items-center'>
                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" /></svg>

                            </div>
                            <div className='flex flex-col pl-5'>
                                <p className='text-white text-bold taskTitle' onClick={openTg}>Join AIDOG Tg Channel</p>
                                <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                            </div>
                        </div>
                        <div className="">



                            <button
                                className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]  ${tgTask && "opacity-50"
                                    }`}
                                onClick={isTgPending ? claimTg : openTg}
                                disabled={tgTask}
                            >

                                {tgTask ? "Done" :
                                    <>
                                        {isTgPending ?
                                            <>{tgIsLoading ?
                                                <>
                                                    <span className="loader"></span>
                                                </> :
                                                <>Claim
                                                </>
                                            }
                                            </>
                                            :

                                            <>{tgIsLoading ?
                                                <>
                                                    <span className="loader"></span>
                                                </> :
                                                <>Join
                                                </>
                                            }
                                            </>
                                        }
                                    </>

                                }
                            </button>
                        </div>
                    </div>
                    {tasks.map((task) => {
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
                    })}





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
