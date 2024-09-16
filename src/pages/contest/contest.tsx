import { useCallback, useEffect, /*useMemo,*/ useState } from "react";
//import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
//import { toast } from "react-hot-toast";
import axios from "axios";
//import { capitalizeAllFirstLetters } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import medal from "../../assets/img/medal.png";
import BottomSheet from "../../components/BottomSheet";
import { toast } from 'react-hot-toast';
import CountdownTimer from "../../components/CountdownTimerTask"
import TaskCategorized from "../../components/TasksCategorized";


const Contest = () => {
    //const colorCodes = useMemo(() => ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF", "#000000", "#A6A6A6"], []);
    const getUserCookies = sessionStorage.getItem('authUserLoggedInAI');
    const getUserCookiesParsed = JSON.parse(getUserCookies as string);

    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
    //const [referralLeaderboard, setReferralLeaderboard] = useState<any>([]);
    const [totalPoints, setTotalPoints] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralContest : 0);
    const [referralCode, setReferralCode] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralCode : '');
    const [socialTasks, setSocialTasks] = useState<any>(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.socialRewardDeets : []);
    const [username, setUserName] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.username ? getUserCookiesParsed?.data?.userData?.user?.username : `${getUserCookiesParsed?.data?.userData?.user?.first_name ?  getUserCookiesParsed?.data?.userData?.user?.first_name : ''} ${getUserCookiesParsed?.data?.userData?.user?.last_name ? getUserCookiesParsed?.data?.userData?.user?.last_name : ''}` : '');
    const [open, setOpenModal] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState('AIDOGS');
    const [pointsToday, setPointsToday] = useState(0);

    const [referees, setReferees] = useState(0);
    const navigate = useNavigate();
    

    // State updates Starts Here
    const [openWhatsappStatusToggle, setOpenWhatsappStatusToggle] = useState<Boolean>()
    const [openWhatsappGroupToggle, setOpenWhatsappGroupToggle] = useState<Boolean>()
    const [openInstagramToggle, setOpenInstagramToggle] = useState<Boolean>()
    const [openFacebookToggle, setOpenFacebookToggle] = useState<Boolean>()
    const [openTiktokToggle, setOpenTiktokToggle] = useState<Boolean>()
    const [openSnapchatToggle, setOpenSnapchatToggle] = useState<Boolean>()
    const [openTelegramGroupToggle, setOpenTelegramGroupToggle] = useState<Boolean>()
    const [openFacebookPostToggle, setOpenFacebookPostToggle] = useState<Boolean>()



    const [whatsappStatusDisabled, setWhatsappStatusDisabled] = useState(false);
    const [whatsappGroupDisabled, setWhatsappGroupDisabled] = useState(false);
    const [instagramPostDisabled, setInstagramPostDisabled] = useState(false);
    const [facebookDisabled, setFacebookDisabled] = useState(false);
    const [tiktokDisabled, setTiktokDisabled] = useState(false);
    const [snapchatDisabled, setSnapchatDisabled] = useState(false);
    const [telegramGroupDisabled, setTelegramGroupDisabled] = useState(false);
    const [facebookPostDisabled, setFacebookPostDisabled] = useState(false);




    const toggleWhatsappStatusOverlay = useCallback(() => {
        console.log(whatsappStatusDisabled)
        setOpenWhatsappStatusToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);
    const toggleWhatsappGroupOverlay = useCallback(() => {
        console.log(whatsappGroupDisabled)
        setOpenWhatsappGroupToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);
    const toggleInstagramOverlay = useCallback(() => {
        console.log(instagramPostDisabled)
        setOpenInstagramToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);
    const toggleFacebookOverlay = useCallback(() => {
        console.log(facebookDisabled)
        setOpenFacebookToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);
    const toggleTiktokOverlay = useCallback(() => {
        console.log(tiktokDisabled)
        setOpenTiktokToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);
    const toggleSnapchatOverlay = useCallback(() => {
        console.log(snapchatDisabled)
        setOpenSnapchatToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);
    const toggleTelegramGroupOverlay = useCallback(() => {
        console.log(telegramGroupDisabled)
        setOpenTelegramGroupToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);
    const toggleFacebookPostOverlay = useCallback(() => {
        console.log(facebookPostDisabled)
        setOpenFacebookPostToggle((prevOpen) => !prevOpen);
        setFile(null);
    }, []);


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
        const fetchUserReferrals = async () => {
            const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user})
            console.log(getUserData?.data)
            setTotalPoints(getUserData?.data?.userData?.referralContest);
            setReferralCode(getUserData?.data?.userData?.referralCode);
            setSocialTasks(getUserData?.data?.userData?.socialRewardDeets);
            setUserName(getUserData?.data?.userData?.username ? getUserData?.data?.userData?.user?.username : `${getUserData?.data?.userData?.user?.first_name ?  getUserData?.data?.userData?.user?.first_name : ''} ${getUserData?.data?.userData?.user?.last_name ? getUserData?.data?.userData?.user?.last_name : ''}`);
            console.log(totalPoints, username, referralCode)

            /*const getReferralsLeaderboard = await axios.post(`${import.meta.env.VITE_APP_URL}/referral-leaderboard-data`, {user})
            console.log(getReferralsLeaderboard?.data)
            const sortedData = getReferralsLeaderboard.data.leaderboardData.map((board: any, index: number) => {
                return {
                    id: board.userId, 
                    name: board.firstName.length > 10 ? board.firstName.slice(0, -2) : board.firstName, 
                    points: board.referralPoints, 
                    position: index + 1
                }
                })
            setReferralLeaderboard(sortedData);*/
        }

        if (user) {
          fetchUserReferrals();
          console.log(pointsToday, referees)
        }
    }, [user])

    /*const toggleModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);*/

    const closeModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);

    /*function sortArrayByPointsDescending(arr: any) {
        return arr.sort((a: any, b: any) => b.points - a.points);
    }*/
  
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

                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);

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

                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);

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

                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);

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

                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);

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

                setPointsToday(updatePoints?.data?.userData?.pointsToday);
                setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);

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


    //file upload

    const [file, setFile] = useState<any>(null);
    const [isSpecialTaskClaimable, setIsSpecialTaskClaimable] = useState<boolean>(false);


    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
        console.log("file", e.target.files[0], Date.now(), Date.now() - e.target.files[0].lastModified)
        //3days = 259200000
        //
        if (Date.now() - e.target.files[0].lastModified > 3600000) {
            setIsSpecialTaskClaimable(false)
        } else {
            setIsSpecialTaskClaimable(true)

        }
    };


    //special task claim

    const claimWhatsappStatus = async (e: any) => {
        e.preventDefault()
        setWhatsappStatusDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })
        const time = Date.now()
        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'whatsapp-status',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setWhatsappStatusDisabled(false);
            setOpenWhatsappStatusToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };
    const claimWhatsappGroup = async (e: any) => {
        e.preventDefault()
        setWhatsappGroupDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        // const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
        //     claimTreshold: 'whatsapp-group',
        //     user
        // })
        const time = Date.now()
        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'whatsapp-group',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setWhatsappGroupDisabled(false);
            setOpenWhatsappGroupToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };
    const claimInstagram = async (e: any) => {
        e.preventDefault()
        setInstagramPostDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })
        const time = Date.now()
     

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'instagram-reels',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setInstagramPostDisabled(false);
            setOpenInstagramToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };
    const claimFacebook = async (e: any) => {
        e.preventDefault()
        setFacebookDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })
        const time = Date.now()
        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'facebook',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setFacebookDisabled(false);
            setOpenFacebookToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };
    const claimTiktok = async (e: any) => {
        e.preventDefault()
        setTiktokDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })
        const time = Date.now()
        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'tiktok',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setTiktokDisabled(false);
            setOpenTiktokToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };
    const claimSnapchat = async (e: any) => {
        e.preventDefault()
        setSnapchatDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })
        const time = Date.now()
        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'snapchat',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setSnapchatDisabled(false);
            setOpenSnapchatToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };
    const claimTelegramGroup = async (e: any) => {
        e.preventDefault()
        setTelegramGroupDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })
        const time = Date.now()
        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'telegram-group',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setTelegramGroupDisabled(false);
            setOpenTelegramGroupToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };
    const claimFacebookPost = async (e: any) => {
        e.preventDefault()
        setFacebookPostDisabled(true);
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })
        const time = Date.now()
        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-timer`, {
            claimTreshold: 'facebook-post',
            user,
            time
        })

        if (updatePoints?.data?.success && updateSocial?.data?.success) {
            toast("Claimed successfully", {
                className: "",
                duration: 799,
                style: {
                    background: "#363636",
                    color: "#fff",
                },
            });
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setFacebookPostDisabled(false);
            setOpenFacebookPostToggle((prevOpen) => !prevOpen);
            setFile(null);
        }
    };


    const alertTask = (e: any) => {
        e.preventDefault()
        toast("Complete Task to continue", {
            className: "",

            style: {
                background: "#363636",
                color: "#fff",
            }
        }
        )
    }


    function rearrangeRewards(socialRewardDeets: any) {
        return socialRewardDeets.sort((a: any, b: any) => {
            // Sort by rewardClaimed field; false comes before true
            if (a.rewardClaimed === b.rewardClaimed) {
                return 0;
            }
            return a.rewardClaimed ? 1 : -1;
        });
    }

    /*const referralLink = `${import.meta.env.VITE_TEST_BOT_URL}?start=${referralCode}`;
    const encodedText = useMemo(() => {
        const text = `Are you a Telegram OG?\r\n\nJoin me on AIDOGS and be a part of the dog revolution.\r\n\nEarn 2,500 $AIDOGS when you signup.\r\n\nStart here: ${referralLink} \r\n\n #DOGS #Crypto #AIDOGS`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;

    const encodedToMarketText = useMemo(() => {
        const text = `I just claimed my free 2000 $AIDOGS just for being a Tomarket user.\n\nSignup and claim yours now: ${referralLink}\n\n #AIDOGS #Tomarket`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const urlToMarketGift = `https://twitter.com/intent/tweet?text=${encodedToMarketText}`;*/

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
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
        }
    };

    return (
        <section className="flex flex-col h-screen w-full bg-[#210133] overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
            <>
                    {openWhatsappStatusToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleWhatsappStatusOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share your AiDogs referral link on your WhatsApp status
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on WhatsApp Status
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimWhatsappStatus(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>
                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}
                    {openWhatsappGroupToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleWhatsappGroupOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share an AiDogs post with your referral link to at least one WhatsApp group.

                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on WhatsApp Group
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimWhatsappGroup(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>

                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}
                    {openInstagramToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleInstagramOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share an AiDogs post with your referral link to at least one WhatsApp group.

                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on Instagram Reels
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimInstagram(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>
                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}
                    {openFacebookToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleFacebookOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share an AiDogs post with your referral link to your Facebook status.

                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on Facebook Status
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimFacebook(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>
                                {/* <input type="text" className="mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />
                                <button
                                    className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"


                                >
                                    Submit
                                </button> */}
                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}
                    {openTiktokToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleTiktokOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share an AiDogs video with your referral link to your Tiktok page.

                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on Tiktok
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimTiktok(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>
                                {/* <input type="text" className="mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />
                                <button
                                    className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"


                                >
                                    Submit
                                </button> */}
                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}
                    {openSnapchatToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleSnapchatOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share an AiDogs post with your referral link to your Snapshot status.

                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on Snapchat
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimSnapchat(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>
                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}
                    {openTelegramGroupToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleTelegramGroupOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share an AiDogs post with your referral link to at least one Telegram Group.

                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on Telegram Group
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimTelegramGroup(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>
                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}
                    {openFacebookPostToggle && (
                        <div className=" modal_css   flex flex-col justify-around z-[100]" >
                            <p className="text-xs flex justify-end cursor-pointer w-auto text-white" onClick={toggleFacebookPostOverlay}>Close</p>
                            <p className=" flex justify-center items-center text-white text-xl">Complete this simple task to earn</p>
                            <div className="bg-gradient-to-b relative border-4 border-[#CFA2CA] from-[#883E92] to-[#210133] p-7 pt-14 rounded-lg">
                                <div className="absolute top-0 left-0 -translate-y-6 flex items-center w-full justify-center">
                                    <div className=" bg-[#210133] border-[#F19D5C] border-4 p-2 px-5 rounded-full ">
                                        <p className="text-white text-xl">
                                            1,000 AIDOGS
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#210133] p-5 rounded-lg">
                                    <p className="text-md text-white py-3 px-3 ">Rule</p>
                                    <ul className="px-3">
                                        <li className="text-xs text-white py-2 leading-[1.2rem] list-row">
                                            Share an AiDogs post with your referral link on your Facebook page.

                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Take a screenshot as proof
                                        </li>
                                        <li className="text-xs text-white py-2 list-row">
                                            Submit
                                        </li>
                                    </ul>
                                    <div className="text-white flex items-center text-xs pt-5 italic justify-center">
                                        Share on Facebook Page
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 24 24">
                                            <path d="M18,21H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12c1.657,0,3,1.343,3,3v12	C21,19.657,19.657,21,18,21z" opacity=".35"></path><path d="M7,18c-0.553,0-1-0.447-1-1v-1.669C6,11.289,9.289,8,13.331,8H16c0.553,0,1,0.447,1,1s-0.447,1-1,1h-2.669	C10.392,10,8,12.392,8,15.331V17C8,17.553,7.553,18,7,18z"></path><path d="M14,12.305c0,0.617,0.744,0.927,1.182,0.493l3.114-3.085c0.396-0.393,0.396-1.033,0-1.426l-3.114-3.085	C14.744,4.768,14,5.079,14,5.695V12.305z"></path>
                                        </svg>
                                    </div>

                                </div>
                                <form>


                                    <label htmlFor="file-upload" className={`custom-file-upload overflow-hidden relative mt-5 w-full text-white text-center  py-1 px-2  border-white rounded-lg ${!file ? "bg-black" : "bg-transparent"}`} style={{ borderWidth: "1px" }}>
                                        {file ? <>{file?.name}</> : <>Send Proof</>

                                        }

                                        {file && <div className="absolute top-[-4px] right-[-4px] text-white">
                                            {isSpecialTaskClaimable ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                    <linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                                                </svg>
                                            </> : <>
                                                <div className="rounded-full bg-[#ff0000]" style={{ padding: "0px 5px" }}>
                                                    x
                                                </div>
                                            </>

                                            }
                                        </div>

                                        }

                                    </label>


                                    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e)} className="file-input mt-5 w-full text-white text-center bg-transparent py-1 px-2  border-white rounded-lg" style={{ borderWidth: "1px" }} placeholder="Place your link here" />


                                    <button
                                        className="bg-gradient-to-r my-4 mx-auto flex items-center from-[#F19D5C] to-[#F0E580] font-OpenSans text-sm text-white rounded-lg px-8 py-2 rounded-[1px]"
                                        onClick={isSpecialTaskClaimable ? (e) => {
                                            claimFacebookPost(e)
                                        } : (e) => alertTask(e)

                                        }

                                    >
                                        Submit
                                    </button>
                                </form>
                                <p className="text-white text-[8px] leading-[12px] italic">
                                    WARNING: IF YOU SUBMIT A WRONG PROOF OR FAKE PROOF, YOUR TOTAL $AIDOGS BALANCE WILL BECOME ZERO.
                                </p>
                            </div>



                        </div>
                    )}


                </>
                <BottomSheet isOpen={true} onClose={() => {
                    navigate('/home')
                }} bgColor="#180026" title="Missions">
                <div className="w-full overflow-y-scroll h-[100%]">
                    <div className="w-full rounded-full flex justify-between items-center bg-white/20 px-4 py-2">
                        <div className={`text-white px-3 py-1 w-auto ${currentView === 'AIDOGS' ? 'bg-[#210133] rounded-full' : ''}`} onClick={() => {setCurrentView('AIDOGS')}}>AIDOGS</div>
                        <div className={`text-white px-3 py-1 w-auto ${currentView === 'Partners' ? 'bg-[#210133] rounded-full' : ''}`} onClick={() => {setCurrentView('Partners')}}>Partners</div>
                        <div className={`text-white px-3 py-1 w-auto ${currentView === 'Contest' ? 'bg-[#210133] rounded-full' : ''}`} onClick={() => {setCurrentView('Contest')}}>Contest</div>
                    </div>
                    
                    {
                        currentView === 'AIDOGS' &&
                        <>
                            <div className="flex flex-col gap-3 my-3">
                                <div><p className="text-white text-lg py-3">Special Tasks</p></div>
                                {
                                    rearrangeRewards(socialTasks).map((task: any) => (
                                        <>


                                            {

                                                task.claimTreshold === 'whatsapp-status' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">

                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to whatsapp status</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                onClick={toggleWhatsappStatusOverlay}

                                                            >
                                                                Start
                                                            </button>
                                                                :
                                                                <CountdownTimer taskTime={task.taskPoints} />
                                                        }

                                                        </>
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

                                                task.claimTreshold === 'whatsapp-group' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">

                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to whatsapp Group</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?

                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleWhatsappGroupOverlay}

                                                                    >
                                                                        Start
                                                                    </button> :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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

                                                task.claimTreshold === 'instagram-reels' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">


                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 64 64">
                                                                <radialGradient id="TGwjmZMm2W~B4yrgup6jda_119026_gr1" cx="32" cy="32.5" r="31.259" gradientTransform="matrix(1 0 0 -1 0 64)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#efdcb1"></stop><stop offset="0" stop-color="#f2e0bb"></stop><stop offset=".011" stop-color="#f2e0bc"></stop><stop offset=".362" stop-color="#f9edd2"></stop><stop offset=".699" stop-color="#fef4df"></stop><stop offset="1" stop-color="#fff7e4"></stop></radialGradient><path fill="url(#TGwjmZMm2W~B4yrgup6jda_119026_gr1)" d="M58,54c-1.1,0-2-0.9-2-2s0.9-2,2-2h2.5c1.9,0,3.5-1.6,3.5-3.5S62.4,43,60.5,43H50c-1.4,0-2.5-1.1-2.5-2.5	S48.6,38,50,38h8c1.7,0,3-1.3,3-3s-1.3-3-3-3H42v-6h18c2.3,0,4.2-2,4-4.4c-0.2-2.1-2.1-3.6-4.2-3.6H58c-1.1,0-2-0.9-2-2s0.9-2,2-2	h0.4c1.3,0,2.5-0.9,2.6-2.2c0.2-1.5-1-2.8-2.5-2.8h-14C43.7,9,43,8.3,43,7.5S43.7,6,44.5,6h3.9c1.3,0,2.5-0.9,2.6-2.2	C51.1,2.3,50,1,48.5,1H15.6c-1.3,0-2.5,0.9-2.6,2.2C12.9,4.7,14,6,15.5,6H19c1.1,0,2,0.9,2,2s-0.9,2-2,2H6.2c-2.1,0-4,1.5-4.2,3.6	C1.8,16,3.7,18,6,18h2.5c1.9,0,3.5,1.6,3.5,3.5S10.4,25,8.5,25H5.2c-2.1,0-4,1.5-4.2,3.6C0.8,31,2.7,33,5,33h17v11H6	c-1.7,0-3,1.3-3,3s1.3,3,3,3l0,0c1.1,0,2,0.9,2,2s-0.9,2-2,2H4.2c-2.1,0-4,1.5-4.2,3.6C-0.2,60,1.7,62,4,62h53.8	c2.1,0,4-1.5,4.2-3.6C62.2,56,60.3,54,58,54z"></path><radialGradient id="TGwjmZMm2W~B4yrgup6jdb_119026_gr2" cx="18.51" cy="66.293" r="69.648" gradientTransform="matrix(.6435 -.7654 .5056 .4251 -26.92 52.282)" gradientUnits="userSpaceOnUse"><stop offset=".073" stop-color="#eacc7b"></stop><stop offset=".184" stop-color="#ecaa59"></stop><stop offset=".307" stop-color="#ef802e"></stop><stop offset=".358" stop-color="#ef6d3a"></stop><stop offset=".46" stop-color="#f04b50"></stop><stop offset=".516" stop-color="#f03e58"></stop><stop offset=".689" stop-color="#db359e"></stop><stop offset=".724" stop-color="#ce37a4"></stop><stop offset=".789" stop-color="#ac3cb4"></stop><stop offset=".877" stop-color="#7544cf"></stop><stop offset=".98" stop-color="#2b4ff2"></stop></radialGradient><path fill="url(#TGwjmZMm2W~B4yrgup6jdb_119026_gr2)" d="M45,57H19c-5.5,0-10-4.5-10-10V21c0-5.5,4.5-10,10-10h26c5.5,0,10,4.5,10,10v26C55,52.5,50.5,57,45,57z"></path><path fill="#fff" d="M32,20c4.6,0,5.1,0,6.9,0.1c1.7,0.1,2.6,0.4,3.2,0.6c0.8,0.3,1.4,0.7,2,1.3c0.6,0.6,1,1.2,1.3,2 c0.2,0.6,0.5,1.5,0.6,3.2C46,28.9,46,29.4,46,34s0,5.1-0.1,6.9c-0.1,1.7-0.4,2.6-0.6,3.2c-0.3,0.8-0.7,1.4-1.3,2 c-0.6,0.6-1.2,1-2,1.3c-0.6,0.2-1.5,0.5-3.2,0.6C37.1,48,36.6,48,32,48s-5.1,0-6.9-0.1c-1.7-0.1-2.6-0.4-3.2-0.6 c-0.8-0.3-1.4-0.7-2-1.3c-0.6-0.6-1-1.2-1.3-2c-0.2-0.6-0.5-1.5-0.6-3.2C18,39.1,18,38.6,18,34s0-5.1,0.1-6.9 c0.1-1.7,0.4-2.6,0.6-3.2c0.3-0.8,0.7-1.4,1.3-2c0.6-0.6,1.2-1,2-1.3c0.6-0.2,1.5-0.5,3.2-0.6C26.9,20,27.4,20,32,20 M32,17 c-4.6,0-5.2,0-7,0.1c-1.8,0.1-3,0.4-4.1,0.8c-1.1,0.4-2.1,1-3,2s-1.5,1.9-2,3c-0.4,1.1-0.7,2.3-0.8,4.1C15,28.8,15,29.4,15,34 s0,5.2,0.1,7c0.1,1.8,0.4,3,0.8,4.1c0.4,1.1,1,2.1,2,3c0.9,0.9,1.9,1.5,3,2c1.1,0.4,2.3,0.7,4.1,0.8c1.8,0.1,2.4,0.1,7,0.1 s5.2,0,7-0.1c1.8-0.1,3-0.4,4.1-0.8c1.1-0.4,2.1-1,3-2c0.9-0.9,1.5-1.9,2-3c0.4-1.1,0.7-2.3,0.8-4.1c0.1-1.8,0.1-2.4,0.1-7 s0-5.2-0.1-7c-0.1-1.8-0.4-3-0.8-4.1c-0.4-1.1-1-2.1-2-3s-1.9-1.5-3-2c-1.1-0.4-2.3-0.7-4.1-0.8C37.2,17,36.6,17,32,17L32,17z"></path><path fill="#fff" d="M32,25c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S37,25,32,25z M32,40c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S35.3,40,32,40 z"></path><circle cx="41" cy="25" r="2" fill="#fff"></circle>
                                                            </svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to Instagram Reels </p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleInstagramOverlay}

                                                                    >
                                                                        Start
                                                                    </button>
                                                                    :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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

                                                task.claimTreshold === 'facebook' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">



                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to facebook status</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleFacebookOverlay}

                                                                    >
                                                                        Start
                                                                    </button>
                                                                    :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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

                                                task.claimTreshold === 'tiktok' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">



                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                                <path fill="#212121" fill-rule="evenodd" d="M10.904,6h26.191C39.804,6,42,8.196,42,10.904v26.191 C42,39.804,39.804,42,37.096,42H10.904C8.196,42,6,39.804,6,37.096V10.904C6,8.196,8.196,6,10.904,6z" clip-rule="evenodd"></path><path fill="#ec407a" fill-rule="evenodd" d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011 c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413 c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413L29.208,20.607L29.208,20.607 z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1 c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391 C17.213,29.127,17.972,30.274,19.079,30.832z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157 c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923v16.018c-0.007,1.867-1.523,3.379-3.393,3.379 c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391 c0.359,0,0.705,0.056,1.03,0.159V21.38c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183 c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z" clip-rule="evenodd"></path><path fill="#81d4fa" fill-rule="evenodd" d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848 C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019 c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338 c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069 c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183 C14.374,24.749,17.611,21.463,21.635,21.38z" clip-rule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to Tiktok</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleTiktokOverlay}

                                                                    >
                                                                        Start
                                                                    </button>
                                                                    :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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

                                                task.claimTreshold === 'snapchat' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                                <path fill="#fff" d="M24.2,41.8c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-2.3,0-3.7-1-5.1-2c-1-0.7-1.9-1.3-2.9-1.5 c-0.5-0.1-1-0.1-1.6-0.1c-0.9,0-1.6,0.1-2.1,0.2c-0.3,0.1-0.6,0.1-0.8,0.1c-0.2,0-0.5,0-0.6-0.4c-0.1-0.3-0.2-0.6-0.2-0.9 c-0.2-0.7-0.3-1.2-0.6-1.2c-3.6-0.6-4.6-1.3-4.8-1.8C5,34.1,5,34.1,5,34c0-0.2,0.1-0.4,0.3-0.4c5.5-0.9,7.9-6.5,8.1-6.8 c0,0,0,0,0,0c0.3-0.7,0.4-1.3,0.2-1.8c-0.4-0.9-1.6-1.3-2.4-1.5c-0.2-0.1-0.4-0.1-0.5-0.2C9,22.7,8.9,22,8.9,21.7 c0.1-0.6,0.9-1,1.5-1c0.2,0,0.3,0,0.4,0.1c0.7,0.3,1.4,0.5,2,0.5c0.8,0,1.1-0.3,1.2-0.4c0-0.4,0-0.8-0.1-1.2 c-0.2-2.6-0.4-5.8,0.5-7.7c2.5-5.5,7.7-5.9,9.2-5.9c0,0,0.7,0,0.7,0h0.1c1.5,0,6.8,0.4,9.2,5.9c0.8,1.8,0.6,5.1,0.5,7.7l0,0.1 c0,0.4,0,0.7-0.1,1c0,0,0.4,0.3,1.1,0.4c0.5,0,1.2-0.2,1.8-0.5c0.2-0.1,0.4-0.1,0.6-0.1c0.2,0,0.5,0,0.7,0.1l0,0 c0.6,0.2,0.9,0.6,0.9,1c0,0.4-0.3,1-1.7,1.5c-0.1,0.1-0.3,0.1-0.5,0.2c-0.8,0.3-2,0.6-2.4,1.5c-0.2,0.5-0.1,1.1,0.2,1.8 c0,0,0,0,0,0c0.1,0.2,2.6,5.8,8.1,6.8c0.2,0,0.4,0.2,0.3,0.4c0,0.1,0,0.2-0.1,0.2c-0.2,0.5-1.2,1.3-4.8,1.8 c-0.3,0-0.4,0.4-0.6,1.2c-0.1,0.3-0.1,0.6-0.2,0.9c-0.1,0.3-0.2,0.4-0.5,0.4h0c-0.2,0-0.5,0-0.8-0.1c-0.6-0.1-1.3-0.2-2.1-0.2 c-0.5,0-1,0-1.5,0.1c-1.1,0.2-2,0.8-2.9,1.5C27.9,40.8,26.5,41.8,24.2,41.8z"></path><path fill="#607d8b" d="M24.2,42.8c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-2.6,0-4.2-1.2-5.7-2.2 c-0.9-0.6-1.7-1.2-2.5-1.3c-1.4-0.2-2.5-0.1-3.3,0.1c-0.4,0.1-0.7,0.1-1,0.1c-1.1,0-1.4-0.8-1.5-1.1c-0.1-0.3-0.2-0.6-0.2-1 c0-0.1-0.1-0.3-0.1-0.5c-3.1-0.5-4.7-1.3-5.2-2.4C4.1,34.4,4,34.2,4,34c0-0.7,0.5-1.3,1.2-1.5c4.8-0.8,7-5.5,7.3-6.2 c0,0,0-0.1,0-0.1c0.1-0.2,0.3-0.6,0.2-0.9c-0.2-0.5-1.2-0.8-1.8-1c-0.3-0.1-0.5-0.1-0.6-0.2C8,23.3,7.8,22.1,8,21.5 c0.3-1.5,2.2-2.1,3.3-1.6c0.7,0.3,1.3,0.4,1.7,0.4c0-0.2,0-0.3,0-0.5c-0.2-2.7-0.4-6.1,0.5-8.1c2.7-6.1,8.4-6.5,10.1-6.5l0.7,0 c0,0,0.1,0,0.1,0c1.7,0,7.4,0.5,10.1,6.5c0.9,2.1,0.7,5.4,0.5,8.1l0,0.5c0,0,0,0,0.1,0c0.3,0,0.8-0.2,1.4-0.4 c0.4-0.2,0.7-0.2,1-0.2c0.4,0,0.7,0.1,1,0.2c0.9,0.3,1.5,1.1,1.5,1.9c0,1-0.8,1.8-2.3,2.5c-0.2,0.1-0.4,0.1-0.6,0.2 c-0.6,0.2-1.6,0.5-1.8,1c-0.1,0.2,0,0.5,0.2,0.9c0,0,0,0.1,0,0.1c0.3,0.7,2.6,5.4,7.3,6.1c0.7,0.1,1.2,0.8,1.2,1.5 c0,0.3-0.1,0.4-0.2,0.6c-0.5,1.1-2.1,1.8-5.2,2.3c0,0.2-0.1,0.4-0.1,0.5c-0.1,0.3-0.1,0.6-0.2,0.9c-0.2,0.7-0.7,1.1-1.5,1.1 c-0.3,0-0.6,0-1-0.1c-0.8-0.2-1.9-0.3-3.3-0.1c-0.8,0.1-1.6,0.7-2.5,1.3C28.5,41.7,26.8,42.8,24.2,42.8z M23.9,40.8 C24,40.8,24,40.8,23.9,40.8c0.1,0,0.2,0,0.3,0c1.9,0,3.2-0.9,4.5-1.8c1-0.7,2.1-1.5,3.4-1.7c0.6-0.1,1.2-0.1,1.7-0.1 c0.9,0,1.7,0.1,2.3,0.2c0.1,0,0.2,0,0.3,0.1c0-0.1,0.1-0.3,0.1-0.4c0.2-0.9,0.4-1.9,1.4-2c1.7-0.3,2.7-0.6,3.3-0.8 c-5.2-1.5-7.5-6.8-7.6-7.1c-0.6-1.2-0.4-2-0.2-2.6c0.6-1.3,2.1-1.8,3-2.1c0.2-0.1,0.3-0.1,0.5-0.2c0.6-0.2,0.9-0.4,1-0.5 c0,0-0.1-0.1-0.2-0.1c-0.2-0.1-0.5-0.1-0.5-0.1c-0.8,0.4-1.5,0.6-2.2,0.6c-1.1,0-1.6-0.5-1.8-0.7c-0.2-0.2-0.3-0.5-0.3-0.8 l0.1-1.1c0.1-2.4,0.4-5.6-0.4-7.2c-2.2-5-6.9-5.4-8.3-5.4l-0.8,0c-1.4,0-6.1,0.4-8.3,5.4c-0.7,1.6-0.5,4.7-0.4,7.2 c0,0.4,0.1,0.8,0.1,1.2c0,0.3-0.1,0.5-0.3,0.7c-0.1,0.2-0.7,0.7-1.9,0.7c-0.7,0-1.5-0.2-2.4-0.6c-0.2,0-0.3,0.1-0.4,0.1 c0.1,0.1,0.4,0.3,1,0.5c0.1,0.1,0.3,0.1,0.5,0.2c1,0.3,2.5,0.8,3.1,2.1c0.3,0.8,0.3,1.6-0.2,2.6c0,0,0,0,0,0 c-0.3,0.6-2.6,5.6-7.6,7c0.6,0.2,1.6,0.5,3.3,0.8c1,0.2,1.2,1.2,1.4,2c0,0.2,0.1,0.3,0.1,0.5c0.1,0,0.2,0,0.3-0.1 c0.6-0.1,1.4-0.3,2.4-0.3c0.5,0,1.1,0,1.7,0.1c1.3,0.2,2.4,1,3.4,1.7c1.3,0.9,2.6,1.8,4.5,1.8C23.8,40.8,23.9,40.8,23.9,40.8z M11.6,37.9C11.6,37.9,11.6,37.9,11.6,37.9C11.6,37.9,11.6,37.9,11.6,37.9z M36.4,37.9C36.4,37.9,36.4,37.9,36.4,37.9 C36.4,37.9,36.4,37.9,36.4,37.9z M9.7,37C9.7,37,9.7,37,9.7,37C9.7,37,9.7,37,9.7,37z M38.3,37C38.3,37,38.3,37,38.3,37 C38.3,37,38.3,37,38.3,37z M5.5,34.5C5.5,34.5,5.5,34.5,5.5,34.5C5.5,34.5,5.5,34.5,5.5,34.5z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to snapchat status</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleSnapchatOverlay}

                                                                    >
                                                                        Start
                                                                    </button>
                                                                    :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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

                                                task.claimTreshold === 'telegram-group' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" /></svg>

                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to telegram Group</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleTelegramGroupOverlay}

                                                                    >
                                                                        Start
                                                                    </button>
                                                                    :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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

                                                task.claimTreshold === 'facebook-post' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">


                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 48 48">
                                                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to facebook Post</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleFacebookPostOverlay}

                                                                    >
                                                                        Start
                                                                    </button>
                                                                    :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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

                                                task.claimTreshold === 'telegram-status' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" /></svg>

                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => { }}>Share to telegram status</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed &&
                                                            <>{
                                                                (Date.now() - Number((Number(task.taskPoints || 0) + 259200000))) > 0 ?
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`}
                                                                        onClick={toggleTelegramGroupOverlay}

                                                                    >
                                                                        Start
                                                                    </button>
                                                                    :
                                                                    <CountdownTimer taskTime={task.taskPoints} />
                                                            }

                                                            </>
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
                            </div>
                            <div className="flex flex-col gap-3 my-3">
                                <div><p className="text-white text-lg">Tasks</p></div>
                                
                                <TaskCategorized tasks={rearrangeRewards(socialTasks)} updateTaskStatus={claimTask} category={'AIDOGS'} />
                            </div>
                        </>
                    }
                    
                    {
                        currentView === 'Partners' &&
                        <div className="flex flex-col gap-3 my-3">
                            <TaskCategorized tasks={rearrangeRewards(socialTasks)} updateTaskStatus={claimTask} category={'Partners'} />
                        </div>
                    }

                    {
                        currentView === 'Contest' &&
                        <>
                            
                            <div className="flex items-center justify-center text-center text-xl text-white my-auto">
                                CURRENTLY UNDER MAINTENANCE......
                            </div>
                            {/*<div className=" flex justify-between items-center px-3 py-3 w-full gap-5 mt-2 border-b-[1px]">
                                <div className="flex gap-3 py-4 items-center">
                                    {username && username.length > 0 ? (
                                        <>
                                            <div className="bg-[#314359] flex justify-center h-[45px] w-[45px] items-center px-3 py-3 rounded-full">
                                                <p className="text-[#FFFFFF] text-lg font-bold">
                                                    {username?.charAt(0).toUpperCase() + username?.charAt(1).toUpperCase() }
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p className="text-[#FFFFFF] leading-none font-bold text-sm">
                                                    {'You'}
                                                </p>
                                                <div className="flex gap-2 items-center mt-[-2px]">
                                                    <p className="text-[#A6A6A6] pt-1 leading-none text-xl font-bold">{parseInt(totalPoints.toLocaleString())} <span className="text-[#A6A6A6] text-sm">FRENS</span> </p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-[#FFFFFF]">Loading</span>
                                    )}
                                </div>
                                <div className="flex-col gap-1">
                                    <>
                                        <img className="w-[10vw]" src={medal} alt="" />
                                    </>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-start w-full gap-5 relative">
                                <div className="h-full w-full">
                                    {referralLeaderboard.length > 0
                                        ? sortArrayByPointsDescending(referralLeaderboard).slice(0, 100).map((item: any, idx: any) => (
                                            <div key={idx.toString()} className="border-b-[1px] flex justify-between items-center ps-3 pe-10 py-3">
                                                <div className="flex">
                                                    <div className={`flex justify-center h-[45px] w-[45px]  items-center px-3 py-3 rounded-full`} style={{background:`${colorCodes[Math.floor(Math.random() * 10)]}`}}>
                                                        <p className="text-[#FFFFFF] text-lg font-bold]">
                                                            {item?.name.charAt(0).toUpperCase() + item?.name.charAt(1).toUpperCase()}
                                                        </p>
                                                    </div>
                                                    <div className="pl-3">
                                                        <p className="text-[#FFFFFF] w-[79px] font-Rockwell">{capitalizeAllFirstLetters(item?.name)}</p>
                                                        <p className="text-[#A6A6A6] text-nowrap text-left font-Rockwell">{`${parseInt(item.points)}`?.toLocaleString() } <span className="text-[#A6A6A6] text-sm">FRENS</span></p>
                                                        {
                                                            idx === 0 &&
                                                            <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $1000</p>
                                                        }
                                                        {
                                                            idx >= 1 && idx <= 9 &&
                                                            <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $500</p>
                                                        }
                                                        {
                                                            idx >= 10 && idx <= 29 &&
                                                            <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $125</p>
                                                        }
                                                        {
                                                            idx >= 30 && idx <= 49 &&
                                                            <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $50</p>
                                                        }
                                                        {
                                                            idx >= 49 &&
                                                            <p className="text-[#FFFFFF] text-xs font-Rockwell">Reward: $10</p>
                                                        }
                                                    </div>
                                                </div>



                                                <div className=" flex justify-end items-center">
                                                    <>
                                                        <div className=" flex w-full justify-end items-center small-mobile:w-[26%] translate-x-[10px] mobile:w-[36%]">
                                                            <img className="" src={medal} alt="" />
                                                            <p className="text-[#FEC95E] font-OpenSans">#{idx + 1}</p>
                                                        </div>
                                                    </>                                           
                                                </div>
                                            </div>
                                        ))
                                        : null}
                                </div>
                            </div>*/}
                        </>
                    }
                </div>
                </BottomSheet>
            </div>
            <Footer />
            {open && 
           <div className='absolute m-auto bg-[#000000] bg-opacity-95 flex items-center h-[100%] w-full top-0  z-[100]'  onClick={closeModal}>
                <div className='flex relative m-auto flex-col justify-center bg-[#80808059] h-auto w-[90%] rounded-lg gap-4'>
                    <div className='flex justify-end rounded-full px-2 py-1'>
                        <p className='text-white text-sm bg-[#9ca3af54] z-[200] px-2 py-1 rounded-full'>X</p>
                    </div>
                    <div className='flex items-center w-full'>
                        <p className='text-white text-center w-full'>
                            How It Works
                        </p>
                    </div>
                    <div className='flex items-center w-full px-3'>
                        <p className='text-white w-full'>
                            Invite your frens, climb the rank and earn $10000 USDT Prize Pool
                        </p>
                    </div>
                    <div className='flex items-center w-full px-3'>
                        <p className='text-white w-full'>
                            The top inviters by September 10th(5PM UTC) will split the prize pool as follows
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 w-full px-2 mb-5">
                        <div className="flex gap-2 w-full">
                            <div className="w-auto">
                                <img className="w-[10vw]" src={medal} alt="" />
                            </div>
                            <div className="w-auto">
                                <p className="text-white font-semibold">1 winner: $1000 USDT</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="w-auto">
                                <img className="w-[10vw]" src={medal} alt="" />
                            </div>
                            <div className="w-auto">
                                <p className="text-white font-semibold">10 winners: $500 USDT</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="w-auto">
                                <img className="w-[10vw]" src={medal} alt="" />
                            </div>
                            <div className="w-auto">
                                <p className="text-white font-semibold">20 winners: $125 USDT</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="w-auto">
                                <img className="w-[10vw]" src={medal} alt="" />
                            </div>
                            <div className="w-auto">
                                <p className="text-white font-semibold">20 winners: $50 USDT</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="w-auto">
                                <img className="w-[10vw]" src={medal} alt="" />
                            </div>
                            <div className="w-auto">
                                <p className="text-white font-semibold">50 winners: $10 USDT</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>}
        </section>
    );
};

export default Contest;
