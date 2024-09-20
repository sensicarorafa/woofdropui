import React, { useCallback, useMemo, /*useMemo*/ } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import logoBig from "../../assets/img/logobig.png";
import Schedule from "../../assets/img/schedule.png";
import lock from '../../assets/img/lock.png';
import Trophy from "../../assets/img/trophy.png";
import Game from "../../assets/img/game-controller.png";

import Twitter from "../../assets/img/twitter.png";
import TgLogo from "../../assets/img/telegram.png";

//import logoSm from "../../assets/img/logosm.svg";

import Footer from "../footer";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import BottomSheet from '../BottomSheet';
import Countdown from '../Countdown';
import { useNavigate } from 'react-router-dom';
import TaskComponent from '../Tasks';



const HomeTab = () => {
    // Cache sessionStorage values

    const getUserCookies = sessionStorage.getItem('authUserLoggedInAI');
    const getUserCookiesParsed = JSON.parse(getUserCookies as string);
    const getUserCookiesBoost = sessionStorage.getItem('authUserLoggedInBoost');
    const getUserCookiesBoostParsed = JSON.parse(getUserCookiesBoost as string);


    const [totalPoints, setTotalPoints] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.pointsNo : 0);
    const [socialTasks, setSocialTasks] = useState<any>(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.socialRewardDeets : []);
    const [dailyLoginTasks, setDailyLoginTasks] = useState<any>(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralRewardDeets : []);
    const [referralCode, setReferralCode] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralCode : '');
    const [pointsToday, setPointsToday] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.pointsToday : 0);
    const [referees, setReferees] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralPoints : 0);
    const [lastLogin, setLastLogin] = useState<any>(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.lastLogin : null)
    //const [engageTask, setEngageTask] = useState(false);
    const [open, setOpenModal] = useState<boolean>(false);
    const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);


    //Boost states
    const [openModal, setModal] = useState(false);
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [engageMissionRt, setEngageMissionRt] = useState(() => {

        const saved = sessionStorage.getItem('engageMissionRt')
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [engageMissionTweet, setEngageMissionTweet] = useState(
        () => {

            const saved = sessionStorage.getItem('engageMissionTweet')
            return saved !== null ? JSON.parse(saved) : false;
        });
    const [boostCode, setBoostCode] = useState(
        () => {

            return localStorage.getItem('boostCode') || '';
        });
    const [refBoostCode, setRefBoostCode] = useState(
        ''
    );
    const [totalBoostPoints, setTotalBoostPoints] = useState(getUserCookiesBoostParsed ? getUserCookiesBoostParsed?.data?.userData?.pointsNo : 0);
    const [boostReferralPoints, setBoostReferralPoints] = useState(getUserCookiesBoostParsed ? getUserCookiesBoostParsed?.data?.userData?.referralPoints : 0);
    const [boostActivated, setBoostActivated] = useState(getUserCookiesBoostParsed ? getUserCookiesBoostParsed?.data?.userData?.boostActivated : false);
    const [totalBoostParticipants, setTotalBoostParticipants] = useState(getUserCookiesBoostParsed ? getUserCookiesBoostParsed?.data?.userData?.boostActivated : 0);
    const [userRank, setUserRank] = useState(getUserCookiesBoostParsed ? getUserCookiesBoostParsed?.data?.userData?.boostActivated : false);

    useEffect(() => {
        sessionStorage.setItem('engageMissionRt', JSON.stringify(engageMissionRt));
    }, [engageMissionRt]);
    useEffect(() => {
        sessionStorage.setItem('engageMissionTweet', JSON.stringify(engageMissionTweet));
    }, [engageMissionTweet]);

    const encodedTextMission = useMemo(() => {
        const text = `Are you a Catizen??\r\n\nGain more on $AIDOGS by completing mission.\r\n\nUse my Boost key here: ${boostCode}.\r\n\n  \r\n\n #DOGS #Crypto #AIDOGS`;
        return encodeURIComponent(text);
    }, [boostCode]);

    const urlMissionTweet = `https://twitter.com/intent/tweet?text=${encodedTextMission}`;

    const navigate = useNavigate();

    const handleOpenBottomSheet = () => {
        setBottomSheetOpen(true);
    };

    const handleCloseBottomSheet = () => {
        setBottomSheetOpen(false);
    };

    const openTg = () => {
        window.open("https://t.me/aidogs_community", "_blank");
    };

    const openTwitter = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://x.com/aidogscomm", "_blank");

    };

    const openYoutube = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://www.youtube.com/@aidogscomm", "_blank");

    };

    const goToSpecialTasks = () => {
        navigate("/contest")
    }

    /*const claimTwoFrens = async () => {
        setTwoFrensDisabled(true)
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user});
        const referralPoints = getUserData?.data?.userData?.referralPoints

        if (referralPoints >= 2) {
            const points = 2000;
            const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
                pointsNo: points,
                user
            })

            const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
                claimTreshold: 'two-frens',
                user
            })

            if (updatePoints?.data?.success && updateSocial?.data?.success)  {
                sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(updateSocial))
                toast("Claimed successfully", {
                    className: "",
                    duration: 799,
                    style: {
                    background: "#363636",
                    color: "#fff",
                    },
                });
                setTotalPoints(updatePoints?.data?.userData?.pointsNo);
                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
                setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
                setReferees(updatePoints?.data?.userData?.referralPoints);
                setTwoFrensDisabled(false);
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

    const claimFiveFrens = async () => {
        setFiveFrensDisabled(true)
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user});
        const referralPoints = getUserData?.data?.userData?.referralPoints

        if (referralPoints >= 5) {
            const points = 5000;
            const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
                pointsNo: points,
                user
            })

            const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
                claimTreshold: 'five-frens',
                user
            })

            if (updatePoints?.data?.success && updateSocial?.data?.success)  {
                sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(updateSocial))
                toast("Claimed successfully", {
                    className: "",
                    duration: 799,
                    style: {
                    background: "#363636",
                    color: "#fff",
                    },
                });
                setTotalPoints(updatePoints?.data?.userData?.pointsNo);
                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
                setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
                setReferees(updatePoints?.data?.userData?.referralPoints);
                setFiveFrensDisabled(false);
            }
        } else {
            toast("You need at least five referrals to claim", {
                className: "",
                duration: 799,
                style: {
                background: "#363636",
                color: "#fff",
                },
            });
        }
    };

    const claimTenFrens = async () => {
        setTenFrensDisabled(true)
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user});
        const referralPoints = getUserData?.data?.userData?.referralPoints

        if (referralPoints >= 10) {
            const points = 10000;
            const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
                pointsNo: points,
                user
            })

            const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
                claimTreshold: 'ten-frens',
                user
            })

            if (updatePoints?.data?.success && updateSocial?.data?.success)  {
                sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(updateSocial))
                toast("Claimed successfully", {
                    className: "",
                    duration: 799,
                    style: {
                    background: "#363636",
                    color: "#fff",
                    },
                });
                setTotalPoints(updatePoints?.data?.userData?.pointsNo);
                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
                setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
                setReferees(updatePoints?.data?.userData?.referralPoints);
                setTenFrensDisabled(false);
            }
        } else {
            toast("You need at least ten referrals to claim", {
                className: "",
                duration: 799,
                style: {
                background: "#363636",
                color: "#fff",
                },
            });
        }
    };

    const claimTwentyFrens = async () => {
        setTwentyFrensDisabled(true)
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user});
        const referralPoints = getUserData?.data?.userData?.referralPoints

        if (referralPoints >= 20) {
            const points = 20000;
            const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
                pointsNo: points,
                user
            })

            const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
                claimTreshold: 'twenty-frens',
                user
            })

            if (updatePoints?.data?.success && updateSocial?.data?.success)  {
                sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(updateSocial))
                toast("Claimed successfully", {
                    className: "",
                    duration: 799,
                    style: {
                    background: "#363636",
                    color: "#fff",
                    },
                });
                setTotalPoints(updatePoints?.data?.userData?.pointsNo);
                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
                setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
                setReferees(updatePoints?.data?.userData?.referralPoints);
                setTwentyFrensDisabled(false);
            }
        } else {
            toast("You need at least twenty referrals to claim", {
                className: "",
                duration: 799,
                style: {
                background: "#363636",
                color: "#fff",
                },
            });
        }
    };

    const claimThirtyFrens = async () => {
        setThirtyFrensDisabled(true)
        const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user});
        const referralPoints = getUserData?.data?.userData?.referralPoints

        if (referralPoints >= 30) {
            const points = 30000;
            const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
                pointsNo: points,
                user
            })

            const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
                claimTreshold: 'thirty-frens',
                user
            })

            if (updatePoints?.data?.success && updateSocial?.data?.success)  {
                sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(updateSocial))
                toast("Claimed successfully", {
                    className: "",
                    duration: 799,
                    style: {
                    background: "#363636",
                    color: "#fff",
                    },
                });
                setTotalPoints(updatePoints?.data?.userData?.pointsNo);
                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
                setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
                setReferees(updatePoints?.data?.userData?.referralPoints);
                setThirtyFrensDisabled(false);
            }
        } else {
            toast("You need at least thirty referrals to claim", {
                className: "",
                duration: 799,
                style: {
                background: "#363636",
                color: "#fff",
                },
            });
        }
    };*/

    const claimTask = async (claimTreshold: any, taskPoints: any) => {
        const points = taskPoints;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold,
            user
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(updateSocial))
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
        }
    };

    const getPoints = async (idx: number) => {
        if (idx === 0) return 75;
        if (idx === 1) return 100;
        if (idx === 2) return 125;
        if (idx === 3) return 150;
        if (idx === 4) return 175;
        if (idx === 5) return 200;
        if (idx === 6) return 300;
    }

    const claimDailyTask = async (tasks: any, index: any) => {
        const taskToClaim = tasks[index];

        const points = await getPoints(index);
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-daily-reward`, {
            claimTreshold: taskToClaim.claimTreshold,
            user
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(updateSocial))
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });

            console.log(updatePoints, updateSocial)
            setTotalPoints(updateSocial?.data?.userData?.pointsNo);
            setPointsToday(updateSocial?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updateSocial?.data?.userData?.referralRewardDeets);
            setLastLogin(updateSocial?.data?.userData?.lastLogin);
            setReferees(updateSocial?.data?.userData?.referralPoints);
            handleCloseBottomSheet();
        }
    }

    const closeModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);

    /*const toggleModalBirds = useCallback(() => {
        setOpenModalBirds(prev => !prev);
    }, []);*/

    /*const closeModalBirds = useCallback(() => {
        setOpenModalBirds(prev => !prev);
    }, []);*/

    function rearrangeRewards(socialRewardDeets: any) {
        return socialRewardDeets?.sort((a: any, b: any) => {
            // Sort by rewardClaimed field; false comes before true
            if (a.rewardClaimed === b.rewardClaimed) {
                return 0;
            }
            return a.rewardClaimed ? 1 : -1;
        });
    }







    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);


    useEffect(() => {
        // Ensure the Telegram Web Apps SDK is ready
        Telegram.WebApp.ready();

        // Access the user information
        const userInfo = Telegram.WebApp.initDataUnsafe.user;
    // Ensure the Telegram WebApp SDK is available
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
      }
        // Check if the user information is available
        if (userInfo) {
            console.log({ userInfo, url: window.location.href });
            setUser(userInfo);
            function generateRandomCode() {
                // Function to generate random letters
                const generateRandomLetters = () => {
                    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                    let result = '';
                    for (let i = 0; i < 4; i++) {
                        result += letters.charAt(Math.floor(Math.random() * letters.length));
                    }
                    return result;
                };

                // Function to generate random numbers
                const generateRandomNumbers = () => {
                    let result = '';
                    for (let i = 0; i < 4; i++) {
                        result += Math.floor(Math.random() * 10); // Generates a number between 0 and 9
                    }
                    return result;
                };

                // Combine letters and numbers, then shuffle
                const shuffle = (string: any) => {
                    return string.split('').sort(() => Math.random() - 0.5).join('');
                };

                const letters = generateRandomLetters();
                const numbers = generateRandomNumbers();
                const combined = letters + numbers;
                const randomCode = shuffle(combined);

                return randomCode;
            }
            const randomCode = generateRandomCode();
            if (!boostCode || localStorage.getItem("boostCode") == null) {
                localStorage.setItem("boostCode", randomCode)
                setBoostCode(randomCode)
            }

            console.log("randomCode", randomCode)
        } else {
            console.log('No user information available.');
            setUser({
                allows_write_to_pm: true,
                first_name: "Qanda",
                id: 6489531324,
                language_code: "en",
                last_name: "Sensei",
                username: "qandasensei"
            })
            function generateRandomCode() {
                // Function to generate random letters
                const generateRandomLetters = () => {
                    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                    let result = '';
                    for (let i = 0; i < 4; i++) {
                        result += letters.charAt(Math.floor(Math.random() * letters.length));
                    }
                    return result;
                };

                // Function to generate random numbers
                const generateRandomNumbers = () => {
                    let result = '';
                    for (let i = 0; i < 4; i++) {
                        result += Math.floor(Math.random() * 10); // Generates a number between 0 and 9
                    }
                    return result;
                };

                // Combine letters and numbers, then shuffle
                const shuffle = (string: any) => {
                    return string.split('').sort(() => Math.random() - 0.5).join('');
                };

                const letters = generateRandomLetters();
                const numbers = generateRandomNumbers();
                const combined = letters + numbers;
                const randomCode = shuffle(combined);

                return randomCode;
            }
            const randomCode = generateRandomCode();
            if (!boostCode || localStorage.getItem("boostCode") == null) {
                localStorage.setItem("boostCode", randomCode)
                setBoostCode(randomCode)
            }
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, { user })
            console.log(getUserData?.data, pointsToday)
            setTotalPoints(getUserData?.data?.userData?.pointsNo);
            setPointsToday(getUserData?.data?.userData?.pointsToday);
            setSocialTasks(getUserData?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(getUserData?.data?.userData?.referralRewardDeets);
            setReferees(getUserData?.data?.userData?.referralPoints);
            setReferralCode(getUserData?.data?.userData?.referralCode);
            setLastLogin(getUserData?.data?.userData?.lastLogin);
            console.log(referralCode)
        }

        const fetchBoostUserData = async () => {
            const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data/boost-data`, { user })
            console.log(getUserData?.data)
            setTotalBoostPoints(getUserData?.data?.userData?.pointsNo);
            setBoostReferralPoints(getUserData?.data?.userData?.referralPoints);
            // if(getUserData?.data?.userData?.boostCode) {
            //     setBoostCode(getUserData?.data?.userData?.boostCode);
            // }

            setBoostActivated(getUserData?.data?.userData?.boostActivated);
            setUserRank(getUserData?.data?.userRank);

        }
        const fetchBoostData = async () => {
            const getBoostData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-boost-participants`, { user })
            console.log(getBoostData?.data)
            setTotalBoostParticipants(getBoostData?.data?.boostData?.count);

        }

        if (user) {
            fetchUserData();
            fetchBoostUserData()
            fetchBoostData()
        }
    }, [user])



    /*const referralLink = `${import.meta.env.VITE_TEST_BOT_URL}?start=${referralCode}`;
    const encodedText = useMemo(() => {
        const text = `Are you a Telegram OG??\r\n\nJoin me on AIDOGS and be a part of the dog revolution.\r\n\nEarn 2,500 $AIDOGS when you signup.\r\n\nStart here: ${referralLink} \r\n\n #DOGS #Crypto #AIDOGS`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;

    const encodedToMarketText = useMemo(() => {
        const text = `I just claimed my free 2000 $AIDOGS just for being a Tomarket user.\n\nSignup and claim yours now: ${referralLink}\n\n #AIDOGS #Tomarket`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const urlToMarketGift = `https://twitter.com/intent/tweet?text=${encodedToMarketText}`;*/

    type Reward = {
        claimTreshold: number;
        rewardClaimed: boolean;
    };

    const isFirstUnclaimedReward = (rewards: Reward[], index: number): boolean => {
        if (index < 0 || index >= rewards.length) {
            throw new Error("Index out of bounds");
        }

        for (let i = 0; i < index; i++) {
            if (rewards[i].rewardClaimed === false) {
                return false;
            }
        }

        return rewards[index].rewardClaimed === false;
    };

    function isTimeDifference24HoursOrMore(pastTime: any) {
        // Convert the past time from the argument to a Date object
        const pastDate: any = new Date(pastTime);

        // Get the current date and time
        const currentDate: any = new Date();

        // Calculate the difference in milliseconds between the two times
        const timeDifference = currentDate - pastDate;

        // Convert the time difference from milliseconds to hours
        const hoursDifference = timeDifference / (1000 * 60 * 60); // 1000 ms * 60 sec * 60 min = 1 hour

        // Return true if the difference is greater than or equal to 24 hours, else false
        return hoursDifference >= 24;
    }

    const dailyTasksClaimInit = (task: any, idx: number) => {
        if (task.rewardClaimed) {
            return toast(`You have claimed points for day ${idx + 1}`, {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
        }
        if (isFirstUnclaimedReward(dailyLoginTasks, idx) && isTimeDifference24HoursOrMore(lastLogin) && !task.rewardClaimed) {
            toast(`Claiming for day ${idx + 1}, please wait....`, {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            claimDailyTask(dailyLoginTasks, idx)
        }
        if (isFirstUnclaimedReward(dailyLoginTasks, idx) && !isTimeDifference24HoursOrMore(lastLogin) && !task.rewardClaimed) {
            toast(`You are not yet eligible to claim for day ${idx + 1}`, {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
        }
    }


    // boost functions


    const toggleBoostOverlay = useCallback(() => {
        if (boostActivated) {
            setModal((prevOpen) => !prevOpen);
        } else {
            if (!engageMissionRt || !engageMissionTweet) {
                toast("Complete all missions to proceed!", {
                    className: "",
                    duration: 799,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                });
            } else {
                setModal((prevOpen) => !prevOpen);

            }
        }

    }, [engageMissionRt, engageMissionTweet, boostActivated]);

    const copyToClipboard = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const text = `CATI-${boostCode}`;
        navigator.clipboard.writeText(text as string);
        toast("Copied to clipboard!", {
            className: "",
            duration: 799,
            style: {
                background: "#363636",
                color: "#fff",
            },
        });
    }, []);







    const handleReferrerBoostCode = (e: any) => {
        console.log("ref", e.target.value.split("-")[1])
        setRefBoostCode(e.target.value.split("-")[1])


    }
    useEffect(() => {
        console.log("tro", refBoostCode, boostCode)

        if (boostCode == refBoostCode) {
            console.log("tro", refBoostCode, boostCode)
            toast("You cannot use your boost code", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
        }

    }, [refBoostCode, boostCode])

    const claimBoost = async () => {

        if (boostCode == refBoostCode) {
            console.log("tro", refBoostCode, boostCode)
            toast("You cannot use your boost key", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
        } else {
            if (refBoostCode.length != 8) {
                toast("Referrer's Boost key must be 8 character", {
                    className: "",
                    duration: 799,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                });
            } else {

                const updateBoostLeaderboard = await axios.post(`${import.meta.env.VITE_APP_URL}/activate-boost`, {
                    user,
                    boostCode,
                    refBoostCode
                })

                const getBoostData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-boost-participants`, { user })
                console.log(getBoostData?.data)
                setTotalBoostParticipants(getBoostData?.data?.boostData?.count);




                if (updateBoostLeaderboard?.data?.success) {

                    sessionStorage.setItem('authUserLoggedInBoost', JSON.stringify(updateBoostLeaderboard))

                    toast(`${updateBoostLeaderboard?.data?.message}`, {
                        className: "",
                        duration: 799,
                        style: {
                            background: "#363636",
                            color: "#fff",
                        },
                    });
                    setTotalBoostPoints(updateBoostLeaderboard?.data?.userData?.pointsNo);
                    setBoostReferralPoints(updateBoostLeaderboard?.data?.userData?.referralPoints);
                    setBoostCode(updateBoostLeaderboard?.data?.userData?.boostCode);
                    setBoostActivated(updateBoostLeaderboard?.data?.userData?.boostActivated);
                    setUserRank(updateBoostLeaderboard?.data?.userRank);
                    setModal(false)
                    console.log("updateBoostLeaderboard", updateBoostLeaderboard)



                }

                if (updateBoostLeaderboard?.data?.error) {

                    toast(`${updateBoostLeaderboard?.data?.message}`, {
                        className: "",
                        duration: 799,
                        style: {
                            background: "#363636",
                            color: "#fff",
                        },
                    });
                }
            }
        }
    }
    const cantClaimBoost = async () => {

        toast("Boost already activated", {
            className: "",
            duration: 799,
            style: {
                background: "#363636",
                color: "#fff",
            },
        });
    }


    const toggleTgStatusModal = () => {
        setOpenStatusModal((prevOpen) => !prevOpen);

    }


  
  

  
    const handleShareToStory = () => {
        if (window.Telegram && window.Telegram.WebApp) {
          try {
            const storyData = {
              media: {
                type: 'photo',
                file: 'https://example.com/image.png',
              },
              caption: 'Check out this cool image!',
              link: 'https://example.com',
            };
        
            window.Telegram.WebApp.postEvent('web_app_share_to_story', storyData);
          } catch (error) {
            console.error('Error sharing story:', error);
          }
        } else {
          console.error('Telegram WebApp is not initialized');
        }
      };
      





    return (
        <div className="flex flex-col  items-center w-full justify-end  h-[100%] overflow-hidden">
            {/* boost */}

            {openModal &&

                <div className=" modal_css   flex flex-col justify-around z-[100] overflow-scroll" >
                    <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleBoostOverlay}>Close</p>
                    <p className=" flex justify-center items-center  text-xl text-[#FEC95E] ">You're ranked #{userRank || "0"}</p>
                    <p className=" flex justify-center items-center text-white text-md">Keep boosting your rank</p>
                    <div className='flex items-center align-center my-4'>
                        <div className='w-1/2 rounded-lg border-[#FEC95E] text-[#FEC95E] py-2 text-center border-[1px]'>
                            <p className='font-thin text-sm'>keyHolders</p>
                            <p className='text-md leading-5'>{boostReferralPoints || 0} People</p>
                        </div>
                        &nbsp;
                        &nbsp;
                        <div
                            className="w-1/2 flex flex-col py-2 bg-gradient-to-r mx-auto items-center justify-center from-[#F19D5C] to-[#F0E580] text-lg text-black rounded-lg  rounded-[1px]"


                        >
                            <p className='font-thin text-sm'>Boost Vault</p>
                            <p className='text-md leading-5'>{totalBoostPoints?.toLocaleString() || 0} $AIDOGS</p>

                        </div>
                    </div>
                    <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">

                        <div className="bg-[#210133] p-5 rounded-lg">
                            <p className="text-lg text-white py-3 px-3 ">Enter Referrers Boost Key to Claim 7,000 $AIDOGS</p>

                            <input type="text" className="form-input px-4 py-2 my-3 border-[1px] border-white text-center w-full bg-transparent rounded-lg" placeholder={`Paste referrer's boost key here`} onChange={(e) => handleReferrerBoostCode(e)} />
                            {boostActivated && <button
                                className="w-full flex bg-gradient-to-r my-4 mx-auto items-center justify-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-lg text-black rounded-lg  py-2 rounded-[1px]"
                                disabled={true}
                                onClick={cantClaimBoost}

                            >
                                Claim
                            </button>}
                            {!boostActivated && <button
                                className="w-full flex bg-gradient-to-r my-4 mx-auto items-center justify-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-lg text-black rounded-lg  py-2 rounded-[1px]"

                                onClick={claimBoost}

                            >
                                Claim
                            </button>}


                        </div>
                        <form>
                            <div className='px-2'>
                                <div
                                    className="bg-transparent relative w-full  border-white border-[1px] my-4 mx-auto py-2 flex items-center font-OpenSans text-md text-white rounded-lg px-2  rounded-[1px]"


                                >
                                    CATI-{boostCode}
                                    <div className='absolute flex items-center py-1 right-0 w-1/2 pl-2 px-1 bg-white text-black rounded-lg'>
                                        <span className='text-sm whitespace-nowrap' onClick={copyToClipboard}>
                                            Copy my key
                                        </span>
                                        <svg width="50px" viewBox="-6.96 -6.96 37.92 37.92" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#32dc7c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#000000" stroke-width="0.144"></path> <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#000000" stroke-width="0.144"></path> </g></svg>

                                    </div>
                                </div>
                            </div>



                        </form>
                        <p className="text-white text-sm text-center leading-[12px] italic">
                            You get 2800 $AIDOGS every time your key is used
                        </p>
                    </div>



                </div>
            }
            {openStatusModal &&

                <div className=" modal_css   flex flex-col justify-around z-[100] overflow-scroll" >
                    <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleTgStatusModal}>Close</p>


                    <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">

                        <div className="bg-[#210133] p-1 rounded-lg">
                            <p className="text-lg text-white py-3 px-3 ">Share to your Tekegram Story</p>
                            <div>
                           
                            </div>
                            <button
                                className="w-full flex bg-gradient-to-r my-4 mx-auto items-center justify-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-lg text-black rounded-lg  py-2 rounded-[1px]"

                                onClick={handleShareToStory}

                            >
                                Share
                            </button>



                        </div>


                    </div>



                </div>
            }
            {/* boost */}
            {open &&
                <div className='absolute m-auto bg-[#210133] bg-opacity-95 flex items-center h-[100%] w-full top-0  z-[100]' onClick={closeModal}>
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
                </div>
            }
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                <div className="flex flex-col py-5 my-4  justify-center align-center m-auto items-center w-80">
                    <p className="text-[#FFFFFF] text-4xl font-OpenSans font-bold">{totalPoints.toLocaleString()}</p>
                    <p className="text-[#A6A6A6] text-xl font-OpenSans font-semibold">$AIDOGS</p>
                </div>
                <div className='bg-[#180026] rounded-md py-4'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={5}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="flex w-[100px] overflow-hidden pt-5 relative h-[150px] flex-col rounded-lg justify-top align-center items-center text-white border-[#FFE2A7] border-[1px]">
                                <div className=" w-[50%] small-mobile:w-[40%] mobile:w-[45%]">
                                    <img className="w-full" src={Schedule} alt="" />
                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-2'>
                                    <p className='text-sm small-mobile:text-[12px]'>Daily Check-in</p>
                                    <p className='text-[10px] text-[#FEC95E]'>+15000 $AIDOGS</p>
                                </div>

                                <div className="flex flex-col absolute bottom-0  rounded-lg bg-white/20 justify-center align-center m-auto items-center w-full">
                                    {lastLogin &&
                                        <>{
                                            isTimeDifference24HoursOrMore(lastLogin) ?
                                                <button className="bg-white w-full text-xs font-OpenSans text-[rgba(0,0,0)] px-4 py-2 rounded-[1px]" onClick={handleOpenBottomSheet}>Claim</button> : <Countdown targetTime={lastLogin} />
                                        }</>
                                    }
                                    {/* 
                                    <button className="bg-white bg-gradient-to-b from-[#F0D377] to-[#F1A35F] w-full text-xs font-OpenSans text-[rgba(0,0,0)] px-4 py-2 rounded-[1px]" onClick={handleOpenBottomSheet}>
                                        Claim
                                    </button> */}
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='flex w-[100px] overflow-hidden relative  h-[150px] pt-5 flex-col rounded-lg justify-top align-center items-center text-white border-[#FFE2A7] border-[1px] '>
                                <div className=" w-[50%] small-mobile:w-[40%] mobile:w-[45%]">
                                    <img className="w-full" src={Trophy} alt="" />
                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-2'>
                                    <p className='text-sm small-mobile:text-[12px]'>Special Tasks</p>
                                    <p className='text-[10px] text-[#FEC95E]'>+21000 $AIDOGS</p>

                                </div>
                                <div className="flex flex-col absolute bottom-0  rounded-lg bg-white/20 justify-center align-center m-auto items-center w-full">
                                    <button className="bg-white bg-gradient-to-b from-[#F0D377] to-[#F1A35F] w-full text-xs font-OpenSans text-[rgba(0,0,0)] px-4 py-2 rounded-[1px]" onClick={() => { goToSpecialTasks() }}>
                                        Start
                                    </button>
                                </div>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex w-[100px] overflow-hidden relative h-[150px] pt-5 flex-col rounded-lg justify-top align-center items-center text-white border-[#FFE2A7] border-[1px]'>
                                <div className=" w-[50%] small-mobile:w-[40%] mobile:w-[45%]">
                                    <img className="w-full" src={Game} alt="" />
                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-2'>
                                    <p className='text-sm small-mobile:text-[12px]'> Play Mini Games</p>
                                </div>


                                <div className="flex absolute bottom-0 flex-col rounded-lg bg-white/20 justify-center align-center m-auto items-center w-full">
                                    <button className="bg-white bg-gradient-to-b from-[#F0D377] to-[#F1A35F] w-full text-xs font-OpenSans text-[rgba(0,0,0)] px-4 py-2 rounded-[1px]">
                                        Play
                                    </button>
                                </div>


                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>


                <div className='flex py-3 w-full justify-around'>
                    <div className="flex bg-white w-[100px] overflow-hidden relative flex-col rounded-lg justify-top align-center items-center text-white border-[#FFE2A7] ">
                        <button className="bg-white flex items-center text-[8px] font-OpenSans text-[rgba(0,0,0)] rounded-lg py-1 rounded-[1px]" onClick={() => { openTg() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                <linearGradient id="BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"></stop><stop offset="1" stop-color="#0a85d9"></stop></linearGradient><path fill="url(#BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M10.119,23.466c8.155-3.695,17.733-7.704,19.208-8.284c3.252-1.279,4.67,0.028,4.448,2.113	c-0.273,2.555-1.567,9.99-2.363,15.317c-0.466,3.117-2.154,4.072-4.059,2.863c-1.445-0.917-6.413-4.17-7.72-5.282	c-0.891-0.758-1.512-1.608-0.88-2.474c0.185-0.253,0.658-0.763,0.921-1.017c1.319-1.278,1.141-1.553-0.454-0.412	c-0.19,0.136-1.292,0.935-1.745,1.237c-1.11,0.74-2.131,0.78-3.862,0.192c-1.416-0.481-2.776-0.852-3.634-1.223	C8.794,25.983,8.34,24.272,10.119,23.466z" opacity=".05"></path><path d="M10.836,23.591c7.572-3.385,16.884-7.264,18.246-7.813c3.264-1.318,4.465-0.536,4.114,2.011	c-0.326,2.358-1.483,9.654-2.294,14.545c-0.478,2.879-1.874,3.513-3.692,2.337c-1.139-0.734-5.723-3.754-6.835-4.633	c-0.86-0.679-1.751-1.463-0.71-2.598c0.348-0.379,2.27-2.234,3.707-3.614c0.833-0.801,0.536-1.196-0.469-0.508	c-1.843,1.263-4.858,3.262-5.396,3.625c-1.025,0.69-1.988,0.856-3.664,0.329c-1.321-0.416-2.597-0.819-3.262-1.078	C9.095,25.618,9.075,24.378,10.836,23.591z" opacity=".07"></path><path fill="#fff" d="M11.553,23.717c6.99-3.075,16.035-6.824,17.284-7.343c3.275-1.358,4.28-1.098,3.779,1.91	c-0.36,2.162-1.398,9.319-2.226,13.774c-0.491,2.642-1.593,2.955-3.325,1.812c-0.833-0.55-5.038-3.331-5.951-3.984	c-0.833-0.595-1.982-1.311-0.541-2.721c0.513-0.502,3.874-3.712,6.493-6.21c0.343-0.328-0.088-0.867-0.484-0.604	c-3.53,2.341-8.424,5.59-9.047,6.013c-0.941,0.639-1.845,0.932-3.467,0.466c-1.226-0.352-2.423-0.772-2.889-0.932	C9.384,25.282,9.81,24.484,11.553,23.717z"></path>
                            </svg>
                            &nbsp;

                            Join Telegram
                        </button>
                    </div>
                    <div className="flex bg-white w-[100px] overflow-hidden relative flex-col rounded-lg justify-top align-center items-center text-white border-[#FFE2A7] ">
                        <button className="bg-white flex items-center text-[8px] font-OpenSans text-[rgba(0,0,0)] rounded-lg py-1 rounded-[1px]" onClick={(e) => openTwitter(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 50 50">
                                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                            </svg>
                            &nbsp;

                            Follow X
                        </button>
                    </div>
                    <div className="flex bg-white w-[100px] overflow-hidden relative flex-col rounded-lg justify-top align-center items-center text-white border-[#FFE2A7] ">
                        <button className="bg-white flex items-center text-[8px] font-OpenSans text-[rgba(0,0,0)] rounded-lg py-1 rounded-[1px]" onClick={(e) => openYoutube(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                            </svg>
                            &nbsp;

                            Follow  Youtube
                        </button>
                    </div>

                </div>
                {/* boost */}
                <div className='flex flex-col py-3 w-[90%] m-auto justify-around'>
                    <div className="bg-cover relative bg-center h-[200px] w-full mb-3 campaign_banner rounded-lg">
                        <div className='absolute bottom-0 text-white text-[12px] bg-opacity-20 px-3 py-2 left-0 w-full bg-black'>
                            <p className='leading-4'>$AIDOG Mission</p>
                            <p className='leading-4'>Complete the tasks to claim 7k $AIDOGS </p>
                            <p className='leading-4'>Earn 2.8k $AIDOGS whenever your key is used</p>
                        </div>

                    </div>
                    <div>
                        <div className='flex justify-between py-3 w-full items-center  rounded-md '>
                            <div className='flex items-center'>
                                <div className=" w-[50%] bg-white p-[3px] small-mobile:w-[9%] rounded-full mobile:w-[12%]">
                                    <img src={Twitter} />

                                </div>
                                <div className='flex flex-col pl-5'>
                                    <p className='text-white text-bold taskTitle'>RT & Tag 3 Frens</p>

                                </div>
                            </div>
                            <div className="">

                                {!engageMissionRt &&

                                    <button className={`bg-[#F0D377] text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-8 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open('https://x.com/aidogscomm', '_blank');
                                            setTimeout(() => {
                                                setEngageMissionRt(true)
                                            }, 5000)
                                        }}
                                    >
                                        Do
                                    </button>
                                }
                                {engageMissionRt &&

                                    <button className={`bg-[#F0D377] text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-8 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open('https://x.com/aidogscomm', '_blank');
                                            setTimeout(() => {
                                                setEngageMissionRt(true)
                                            }, 5000)
                                        }}
                                    >
                                        Done
                                    </button>
                                }



                            </div>
                        </div>
                        <div className='flex justify-between py-3 w-full items-center  rounded-md '>
                            <div className='flex items-center'>
                                <div className=" w-[50%] bg-white p-[3px] small-mobile:w-[8%] rounded-full mobile:w-[11%]">
                                    <img src={Twitter} />

                                </div>
                                <div className='flex flex-col pl-5'>
                                    <p className='text-white text-bold taskTitle'>Tweet your Boost Key</p>

                                </div>
                            </div>
                            <div className="">

                                {
                                    !engageMissionTweet &&

                                    <button className={`bg-[#F0D377] text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-8 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open(urlMissionTweet, '_blank');
                                            setTimeout(() => {
                                                setEngageMissionTweet(true)
                                            }, 5000)
                                        }}
                                    >
                                        Do
                                    </button>
                                }

                                {
                                    engageMissionTweet &&

                                    <button className={`bg-[#F0D377] text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-8 py-2 rounded-[1px]`}
                                        onClick={() => {
                                            window.open('https://x.com/aidogscomm', '_blank');
                                            setTimeout(() => {
                                                setEngageMissionTweet(true)
                                            }, 5000)
                                        }}
                                    >
                                        Done
                                    </button>
                                }

                            </div>
                        </div>
                        <div className='flex justify-between py-3 w-full items-center  rounded-md'>
                            <div className='flex items-center'>
                                <div className=" w-[50%] bg-white p-[3px] small-mobile:w-[8%] rounded-full mobile:w-[11%]">
                                    <img src={TgLogo} />

                                </div>
                                <div className='flex flex-col pl-5'>
                                    <p className='text-white text-bold taskTitle'

                                    >Post an Telegram Story</p>

                                </div>
                            </div>
                            <div className="">

                                {

                                    <button className={`bg-[#F0D377] text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-8 py-2 rounded-[1px]`}
                                        onClick={toggleTgStatusModal}
                                    >
                                        Do
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                    <div className='flex w-full py-1 '>
                        <button className={`bg-transparent text-white border-white border-[1px] w-1/3 text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg py-1 rounded-[1px]`}>
                            <span className='text-[8px]'>Participants</span>
                            <span className='text-[12] block'>{Number(totalBoostParticipants)?.toLocaleString() || 0}</span>
                        </button>&nbsp;
                        <button className={`bg-white w-2/3 text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-8 py-2 rounded-[1px]`}
                            onClick={toggleBoostOverlay}
                        // disabled={!engageMissionRt || !engageMissionTweet}

                        >
                            Participate
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-col pt-7 px-4 relative z-10 gap-5">
                    <p className='text-white text-xl pb-5'>Tasks</p>

                    <TaskComponent tasks={rearrangeRewards(socialTasks)} updateTaskStatus={claimTask} />

                    <div className='flex justify-between py-2 w-full items-center'>
                        <div className='flex items-center'>
                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                <img className="w-full" src={logoBig} alt="" />

                            </div>
                            <div className='flex flex-col pl-3'>
                                <p className='text-white text-bold'>Your Referrals</p>
                                <span className='text-[#A6A6A6]'></span>
                            </div>
                        </div>
                        <div className="">
                            <p className='text-white pr-5'>
                                {referees}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
            <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet} bgColor='#180026'>
                <h2 className="text-xl font-bold text-white text-center">Claim Daily Reward</h2>
                <p className="text-xs font-bold text-white text-center">Click on any day to claim, if you are eligible for that day you will recieve your rewards</p>

                <div className="my-4 grid grid-cols-4">
                    {
                        dailyLoginTasks?.map((task: any, idx: any) => (
                            idx !== 7 && idx !== 8 && idx !== 9 &&
                            <div className={`relative flex flex-col gap-1 rounded-lg ${isFirstUnclaimedReward(dailyLoginTasks, idx) && !task.rewardClaimed ? 'border border-white bg-[#C8D5ED]' : 'bg-[#C8D5ED]'} text-white mx-1 my-3 p-1 cursor-pointer`} onClick={() => dailyTasksClaimInit(task, idx)}>
                                <p className={`text-center text-white text-xs absolute top-[-2vh] left-1/2 transform ${isFirstUnclaimedReward(dailyLoginTasks, idx) && !task.rewardClaimed ? 'bg-[#3F015F] bg-opacity-85' : 'bg-[#3F015F]'} -translate-x-1/2 w-[80%] mx-auto px-2 py-1 rounded-md`}>Day {idx + 1}</p>
                                <div className="flex justify-center items-center w-[40%] mx-auto mt-4">
                                    {
                                        task.rewardClaimed &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34.151" height="35.176" viewBox="0 0 49.914 45.791">
                                            <g id="Group_2130" data-name="Group 2130" transform="translate(-40.356 -168.605)">
                                                <path id="Path_621" data-name="Path 621" d="M5.888,168.115a3.092,3.092,0,0,0,1.129.412,3.856,3.856,0,0,0,1.317-.017,3.25,3.25,0,0,0,.97-.331,2.846,2.846,0,0,0,.724-.529,3.337,3.337,0,0,0,.468-.613,2.228,2.228,0,0,0,.256-.588,1.1,1.1,0,0,0,.033-.453.49.49,0,0,0-.2-.3.446.446,0,0,0-.364-.1.683.683,0,0,0-.328.191,4.025,4.025,0,0,0-.335.351,1.96,1.96,0,0,1-.438.37,1.6,1.6,0,0,1-.606.239,1.406,1.406,0,0,1-.819-.084,1.442,1.442,0,0,1-.619-.507,1.981,1.981,0,0,1-.326-.814,2.212,2.212,0,0,1,.082-1.143.813.813,0,0,1,.615-.606.554.554,0,0,1,.392.068.41.41,0,0,1,.211.291,1.142,1.142,0,0,1-.089.454,1.117,1.117,0,0,0-.082.5.647.647,0,0,0,.382.508,1.117,1.117,0,0,0,.673.082,1.266,1.266,0,0,0,.926-.653,1.652,1.652,0,0,0,.2-1.127,1.451,1.451,0,0,0-.519-.868,2.384,2.384,0,0,0-1.075-.5,3.575,3.575,0,0,0-1.353-.009,3.144,3.144,0,0,0-2.1,1.229A3.063,3.063,0,0,0,4.555,166a3.368,3.368,0,0,0,.479,1.267,2.717,2.717,0,0,0,.853.851Z" transform="translate(36.521 29.953)" fill="#e2e2e2" />
                                                <path id="Path_622" data-name="Path 622" d="M52.571,155.963a1.849,1.849,0,0,1,.435.631,3.855,3.855,0,0,1,.3,1.687,1.632,1.632,0,0,1-.2.711.66.66,0,0,1-.472.357.646.646,0,0,1-.548-.178,1.718,1.718,0,0,1-.434-.6,3.354,3.354,0,0,1-.249-.816,3.446,3.446,0,0,1-.044-.87,2.015,2.015,0,0,1,.2-.747.621.621,0,0,1,.446-.371.64.64,0,0,1,.559.194Zm-2.878-.256a3.094,3.094,0,0,0-.462,2.434,3.207,3.207,0,0,0,.706,1.574,2.726,2.726,0,0,0,1.3.855,3.755,3.755,0,0,0,3.14-.555,2.755,2.755,0,0,0,.937-1.247,3.179,3.179,0,0,0,.13-1.722,3.091,3.091,0,0,0-1.272-2.129,3.441,3.441,0,0,0-4.48.788Z" transform="translate(-1.647 36.688)" fill="#e2e2e2" />
                                                <path id="Path_623" data-name="Path 623" d="M100.395,149.192a.981.981,0,0,0,.69.1q1.1-.194.953-1.073l-.679-3.854a1.641,1.641,0,0,0-.3-.737,1.021,1.021,0,0,0-.526-.364,1.58,1.58,0,0,0-.706-.017,1.225,1.225,0,0,0-1.066.846l-.808,2.773-1.646-2.387a1.81,1.81,0,0,0-.252-.261.871.871,0,0,0-.342-.159,1.169,1.169,0,0,0-.5-.009,1.373,1.373,0,0,0-.985.53,1.511,1.511,0,0,0-.128,1.082l.682,3.863a.969.969,0,0,0,.3.647.8.8,0,0,0,.6.073.7.7,0,0,0,.486-.268.784.784,0,0,0,.074-.588l-.443-2.508,1.357,1.688a4.27,4.27,0,0,0,.632.634.652.652,0,0,0,.514.115.632.632,0,0,0,.36-.186,1.154,1.154,0,0,0,.23-.456l.708-2.464.409,2.322a.917.917,0,0,0,.386.658Z" transform="translate(-40.009 46.246)" fill="#e2e2e2" />
                                                <path id="Path_624" data-name="Path 624" d="M151.643,140.065a.683.683,0,0,1-.189.348,1.057,1.057,0,0,1-.323.213,2.033,2.033,0,0,1-.431.121l-.344-1.949a3.06,3.06,0,0,1,.505-.057.912.912,0,0,1,.358.068.523.523,0,0,1,.268.249,1.724,1.724,0,0,1,.153.507,1.271,1.271,0,0,1,0,.5Zm1.021-2.236a2.7,2.7,0,0,0-.922-.284,3.553,3.553,0,0,0-1.091.032l-1.577.278a1.137,1.137,0,0,0-.725.4,1.04,1.04,0,0,0-.151.854l.66,3.74a1.483,1.483,0,0,0,.431.942,1.057,1.057,0,0,0,.855.137,1.041,1.041,0,0,0,.762-.449,1.581,1.581,0,0,0,.086-1.07l-.087-.5.505-.089a3.748,3.748,0,0,0,1.3-.466,2.23,2.23,0,0,0,.835-.865,1.746,1.746,0,0,0,.17-1.158,2.192,2.192,0,0,0-.364-.9,1.942,1.942,0,0,0-.682-.6Z" transform="translate(-86.232 51.116)" fill="#e2e2e2" />
                                                <path id="Path_625" data-name="Path 625" d="M189.464,132.775a1.3,1.3,0,0,0-.819-.057.956.956,0,0,0-.674.425,1.1,1.1,0,0,0-.14.814l.661,3.748a1.829,1.829,0,0,0,.253.714.785.785,0,0,0,.441.329,1.611,1.611,0,0,0,.677.013l2.313-.408a1.622,1.622,0,0,0,.754-.278.678.678,0,0,0,.13-.663.749.749,0,0,0-.318-.584,1.309,1.309,0,0,0-.749-.023l-1.515.267-.626-3.552a.98.98,0,0,0-.392-.744Z" transform="translate(-120.099 55.246)" fill="#e2e2e2" />
                                                <path id="Path_626" data-name="Path 626" d="M226.194,124.57a1.272,1.272,0,0,0,.686-.281.8.8,0,0,0-.233-1.114,1.5,1.5,0,0,0-.8-.025l-2.871.507a.932.932,0,0,0-.823,1.241l.66,3.739a1.547,1.547,0,0,0,.418.945.982.982,0,0,0,.816.144l2.871-.507a1.433,1.433,0,0,0,.737-.3.669.669,0,0,0,.147-.638.59.59,0,0,0-.309-.481,1.344,1.344,0,0,0-.738-.02l-1.924.331-.166-.939,1.435-.253a1.508,1.508,0,0,0,.682-.252.46.46,0,0,0,.15-.469.632.632,0,0,0-.281-.481,1.112,1.112,0,0,0-.686-.033l-1.523.269-.184-1.037,1.931-.341Z" transform="translate(-149.419 63.423)" fill="#e2e2e2" />
                                                <path id="Path_627" data-name="Path 627" d="M259.345,116.251a2.166,2.166,0,0,0-.581.17.617.617,0,0,0-.293.284.759.759,0,0,0-.035.453.694.694,0,0,0,.39.58,1.6,1.6,0,0,0,.868.029l.753-.133.594,3.267a1.621,1.621,0,0,0,.418.945.952.952,0,0,0,.807.146,1.248,1.248,0,0,0,.551-.216.794.794,0,0,0,.268-.472,2.141,2.141,0,0,0-.018-.823l-.565-3.207.824-.146a2,2,0,0,0,.537-.159.66.66,0,0,0,.3-.285.735.735,0,0,0,.048-.479.759.759,0,0,0-.329-.572,1.173,1.173,0,0,0-.749-.051l-3.793.669Z" transform="translate(-180.424 69.884)" fill="#e2e2e2" />
                                                <path id="Path_628" data-name="Path 628" d="M307.127,113.766a1.343,1.343,0,0,0-.738-.02l-1.924.331-.166-.939,1.436-.253a1.508,1.508,0,0,0,.682-.252.46.46,0,0,0,.15-.469.631.631,0,0,0-.281-.481,1.112,1.112,0,0,0-.686-.034l-1.523.269-.183-1.037,1.931-.341a1.272,1.272,0,0,0,.686-.281.8.8,0,0,0-.233-1.114,1.5,1.5,0,0,0-.8-.025l-2.871.507a.931.931,0,0,0-.823,1.241l.66,3.739a1.547,1.547,0,0,0,.418.945.982.982,0,0,0,.816.144l2.871-.507a1.409,1.409,0,0,0,.737-.3.667.667,0,0,0,.147-.638.592.592,0,0,0-.309-.481Z" transform="translate(-217.451 75.41)" fill="#e2e2e2" />
                                                <path id="Path_629" data-name="Path 629" d="M75.678,190.745q.677.044,1.363.038a18.46,18.46,0,0,0,3.009-.278l.214-.042q.507-.1,1-.218a18.37,18.37,0,0,0,2.032-.629c.218-.082.437-.167.651-.258s.4-.17.594-.261q.4-.181.778-.383c.144-.076.288-.151.43-.232a18.22,18.22,0,0,0,1.777-1.127c.389-.28.76-.578,1.126-.886.433-.366.852-.746,1.248-1.148a18.031,18.031,0,0,0,1.369-1.558,18.369,18.369,0,0,0,3.7-8.513l-.724.128a17.616,17.616,0,0,1-1.522,4.745c-.2.414-.414.821-.645,1.218-.134.229-.271.453-.415.674q-.43.664-.918,1.29a17.733,17.733,0,0,1-2.769,2.831l-.033.026c-.313.255-.636.5-.967.731l-.184.127c-.287.2-.58.383-.878.562q-.336.2-.683.39-.693.376-1.426.69a17.566,17.566,0,0,1-2.2.772q-.441.125-.894.226c-.261.058-.524.112-.791.159a17.464,17.464,0,0,1-1.981.233c-.218.013-.437.022-.655.028l-.277.006A17.813,17.813,0,0,1,75.06,190h0a17.7,17.7,0,0,1-13.525-8.847l-.724.128a18.439,18.439,0,0,0,10.854,8.751,18.2,18.2,0,0,0,3.268.657c.248.026.5.048.747.064Z" transform="translate(-11.597 18.878)" fill="#e2e2e2" />
                                                <path id="Path_630" data-name="Path 630" d="M75.69,35.783c-.418-.29-.849-.561-1.289-.817q-.478-.277-.974-.524c-.112-.057-.227-.112-.341-.166-.36-.17-.724-.334-1.094-.481-.218-.087-.437-.17-.66-.248a18.263,18.263,0,0,0-12.2.006c-.218.077-.437.157-.651.243q-.568.227-1.114.486c-.147.07-.293.143-.438.216q-.247.125-.489.258a18.364,18.364,0,0,0-1.588.982l-.15.1a18.236,18.236,0,0,0-2.776,2.413q-.629.669-1.188,1.4a18.085,18.085,0,0,0-1.043,1.5,18.324,18.324,0,0,0-2.555,6.875l.724-.128A17.659,17.659,0,0,1,62.185,33.462h0c.548-.1,1.1-.163,1.639-.208q.5-.042,1-.054c.523-.013,1.043,0,1.558.029a17.443,17.443,0,0,1,3.268.526,17.72,17.72,0,0,1,10.932,8.376L81.306,42A18.382,18.382,0,0,0,75.69,35.78Z" transform="translate(0.083 140.837)" fill="#e2e2e2" />
                                                <path id="Path_631" data-name="Path 631" d="M51.844,186.916a19.784,19.784,0,0,1-21-10.389l-3.34.588c.513.615,1.512.974,1.908,1.64.468.786.17,2.091.727,2.808s1.9.762,2.536,1.407.664,1.987,1.376,2.552,2.023.285,2.8.762,1.117,1.771,1.946,2.151,2.029-.205,2.9.073,1.5,1.452,2.4,1.623,1.917-.687,2.831-.626,1.806,1.047,2.724,1c.9-.049,1.691-1.127,2.6-1.288s2.022.581,2.882.32c.88-.267,1.394-1.5,2.22-1.867s2.1.083,2.875-.38.987-1.793,1.7-2.346,2.054-.422,2.7-1.06.527-1.975,1.092-2.687,1.892-.9,2.368-1.673.041-2.041.421-2.869,1.624-1.32,1.9-2.189-.449-1.988-.278-2.887c.144-.76.961-1.44,1.232-2.193l-3.34.588a19.782,19.782,0,0,1-16.183,16.946Z" transform="translate(16.862 23.893)" fill="#e2e2e2" />
                                                <path id="Path_632" data-name="Path 632" d="M33.373,3.594h0a19.872,19.872,0,0,1,4.253-.287c.2.007.4.019.6.033a19.644,19.644,0,0,1,3.159.485A19.8,19.8,0,0,1,54.374,13.98l3.338-.588c-.514-.613-1.51-.973-1.907-1.637-.468-.786-.17-2.091-.725-2.808s-1.9-.76-2.536-1.407-.664-1.987-1.376-2.552-2.023-.285-2.8-.762-1.117-1.771-1.944-2.151S44.4,2.28,43.526,2,42.021.55,41.121.379s-1.917.687-2.831.626-1.806-1.046-2.724-1c-.9.05-1.691,1.127-2.6,1.288S30.945.716,30.084.977c-.88.267-1.394,1.5-2.22,1.867s-2.1-.083-2.875.379S24,5.015,23.287,5.569s-2.054.422-2.7,1.06S20.06,8.6,19.5,9.316s-1.893.9-2.37,1.673-.041,2.041-.421,2.869-1.623,1.32-1.9,2.189.45,1.988.278,2.887c-.144.759-.958,1.439-1.231,2.191l3.34-.588A19.783,19.783,0,0,1,33.373,3.594Z" transform="translate(28.524 168.597)" fill="#e2e2e2" />
                                                <path id="Path_633" data-name="Path 633" d="M12.84,170.713l47.9-8.445-.17-.969-47.9,8.446Z" transform="translate(29.532 30.797)" fill="#e2e2e2" />
                                                <path id="Path_634" data-name="Path 634" d="M47.9,89.47l-2.017.355h0l-3.34.59v0h0v0l-1.509.265-.724.128v0h0v0L7.59,96.579h0l-.724.128v0h0v0l-1.509.265h0l-3.341.59v0L0,97.915l.17.967,47.9-8.445Z" transform="translate(40.356 92.165)" fill="#e2e2e2" />
                                                <path id="Path_635" data-name="Path 635" d="M146.146,71.5l-1.006-.211a.624.624,0,0,1-.415-.316l-.527-.958a.584.584,0,0,0-1.105.2l-.168,1.081a.624.624,0,0,1-.281.438l-.874.543a.669.669,0,0,0,.211,1.2l1.006.211A.624.624,0,0,1,143.4,74l.529.958a.584.584,0,0,0,1.105-.2l.167-1.081a.62.62,0,0,1,.283-.438l.874-.543a.67.67,0,0,0-.211-1.2Z" transform="translate(-80.517 109.068)" fill="#e2e2e2" />
                                                <path id="Path_636" data-name="Path 636" d="M104.989,92.164l-.692-.146a.425.425,0,0,1-.284-.217l-.363-.658a.4.4,0,0,0-.76.134l-.115.743a.429.429,0,0,1-.194.3l-.6.373a.461.461,0,0,0,.146.824l.692.146a.432.432,0,0,1,.285.217l.363.658a.4.4,0,0,0,.76-.134l.115-.743a.432.432,0,0,1,.194-.3l.6-.374a.46.46,0,0,0-.146-.824Z" transform="translate(-46.602 90.929)" fill="#e2e2e2" />
                                                <path id="Path_637" data-name="Path 637" d="M197.778,74.7l-.692-.146a.432.432,0,0,1-.285-.217l-.363-.66a.4.4,0,0,0-.76.134l-.115.743a.429.429,0,0,1-.194.3l-.6.373a.46.46,0,0,0,.146.824l.692.146a.432.432,0,0,1,.285.217l.363.66a.4.4,0,0,0,.76-.134l.115-.743a.429.429,0,0,1,.194-.3l.6-.374a.46.46,0,0,0-.146-.824Z" transform="translate(-125.874 105.852)" fill="#e2e2e2" />
                                                <path id="Path_638" data-name="Path 638" d="M175.988,222.988l-.692-.146a.432.432,0,0,1-.285-.217l-.363-.66a.4.4,0,0,0-.76.134l-.115.743a.425.425,0,0,1-.194.3l-.6.373a.46.46,0,0,0,.146.824l.692.146a.429.429,0,0,1,.284.217l.363.66a.4.4,0,0,0,.76-.134l.115-.744a.428.428,0,0,1,.194-.3l.6-.373a.46.46,0,0,0-.146-.824Z" transform="translate(-107.258 -20.84)" fill="#e2e2e2" />
                                            </g>
                                        </svg>
                                    }
                                    {
                                        isFirstUnclaimedReward(dailyLoginTasks, idx) && !task.rewardClaimed &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34.151" height="35.176" viewBox="0 0 34.151 35.176">
                                            <g id="Group_2132" data-name="Group 2132" transform="translate(-148.237 -172.082)">
                                                <path id="Path_611" data-name="Path 611" d="M279.436,263.05a17.076,17.076,0,1,0,17.076,17.076A17.094,17.094,0,0,0,279.436,263.05Z" transform="translate(-114.123 -89.943)" fill="#d4923a" />
                                                <path id="Path_612" data-name="Path 612" d="M304.7,279.1a16.051,16.051,0,1,1-16.051-16.051A16.052,16.052,0,0,1,304.7,279.1Z" transform="translate(-123.339 -89.943)" fill="#f8e75d" />
                                                <path id="Path_613" data-name="Path 613" d="M318,295.789a3.01,3.01,0,0,1-6.02,0,2.971,2.971,0,0,1,.044-.512,16.1,16.1,0,0,1,2.751-2.489c.071,0,.143-.008.215-.008A3.01,3.01,0,0,1,318,295.79Z" transform="translate(-158.78 -116.699)" fill="#fbfadf" />
                                                <path id="Path_614" data-name="Path 614" d="M304.7,423.55a16.051,16.051,0,0,1-32.1,0Z" transform="translate(-123.339 -234.391)" fill="#f6c22e" />
                                                <path id="Path_615" data-name="Path 615" d="M340.214,319.052A11.612,11.612,0,1,1,328.6,307.44,11.613,11.613,0,0,1,340.214,319.052Z" transform="translate(-163.289 -129.893)" fill="#f47d35" />
                                                <path id="Path_616" data-name="Path 616" d="M317.3,335.135A11.612,11.612,0,1,1,328.881,345.9,11.612,11.612,0,0,1,317.3,335.135Z" transform="translate(-163.568 -145.13)" fill="#f89f32" />
                                                <path id="Path_617" data-name="Path 617" d="M370.09,350.366a1.351,1.351,0,0,0-1.066-.87q-1.931-.309-3.854-.606c-.586-1.15-1.171-2.305-1.742-3.459a1.254,1.254,0,0,0-2.269,0c-.571,1.154-1.155,2.309-1.742,3.459q-1.923.3-3.854.606a1.351,1.351,0,0,0-1.066.87,1.172,1.172,0,0,0,.316,1.27c.927.863,1.868,1.747,2.808,2.641-.2,1.245-.392,2.486-.558,3.721a1.359,1.359,0,0,0,.552,1.255,1.252,1.252,0,0,0,1.332.144c1.1-.561,2.215-1.146,3.346-1.743,1.132.6,2.249,1.181,3.346,1.742a1.177,1.177,0,0,0,.581.13,1.332,1.332,0,0,0,.752-.274,1.362,1.362,0,0,0,.553-1.255q-.251-1.854-.559-3.721c.941-.894,1.881-1.778,2.808-2.641a1.172,1.172,0,0,0,.316-1.27Z" transform="translate(-196.98 -163.436)" fill="#fcf054" />
                                                <path id="Path_618" data-name="Path 618" d="M279.436,252.8a17.076,17.076,0,1,0,17.076,17.077A17.1,17.1,0,0,0,279.436,252.8Zm0,1.025a16.051,16.051,0,1,1-16.051,16.051A16.051,16.051,0,0,1,279.436,253.825Z" transform="translate(-114.123 -80.718)" fill="#d4923a" />
                                            </g>
                                        </svg>
                                    }
                                    {
                                        !isFirstUnclaimedReward(dailyLoginTasks, idx) && !task.rewardClaimed &&
                                        <img src={lock} alt="" />
                                    }
                                </div>
                                <p className={`text-white text-sm text-center font-semibold rounded-full px-4 ${task.rewardClaimed && 'bg-[#E2E2E2]'} ${!task.rewardClaimed && 'bg-[#3F015F] bg-opacity-50'}`}>{
                                    <>
                                        {idx === 0 && 75}
                                        {idx === 1 && 100}
                                        {idx === 2 && 125}
                                        {idx === 3 && 150}
                                        {idx === 4 && 175}
                                        {idx === 5 && 200}
                                        {idx === 6 && 300}
                                    </>
                                }</p>
                            </div>
                        ))
                    }
                </div>
            </BottomSheet>
        </div>
    );
};

export default HomeTab;