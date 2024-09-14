import { useCallback, useEffect, useMemo, useState } from "react";
import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
//import { toast } from "react-hot-toast";
import axios from "axios";
//import { capitalizeAllFirstLetters } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import medal from "../../assets/img/medal.png";
import BottomSheet from "../../components/BottomSheet";
import { toast } from 'react-hot-toast';
import CountdownTimer from "../../components/CountdownTimerTask"


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
    const [engageTwoFrens, setEngageTwoFrens] = useState(false);
    const [engageFiveFrens, setEngageFiveFrens] = useState(false);
    const [engageTenFrens, setEngageTenFrens] = useState(false);
    const [engageTwentyFrens, setEngageTwentyFrens] = useState(false);
    const [engageThirtyFrens, setEngageThirtyFrens] = useState(false);
    const [engageRepost, setEngageRepost] = useState(false);
    const [engageTelegram, setEngageTelegram] = useState(false);
    const [engageFollow, setEngageFollow] = useState(false);
    const [engageFollowBirds, setEngageFollowBirds] = useState(false);
    const [engageYoutube, setEngageYoutube] = useState(false);
    const [engageYoutubeBirds, setEngageYoutubeBirds] = useState(false);
    const [engagePlayBirds, setEngagePlayBirds] = useState(false);
    const [engageInstagram, setEngageInstagram] = useState(false);
    const [engageYtVidOne, setEngageYtVidOne] = useState(false);
    const [engageRtTagThreeFrensFive, setEngageRtTagThreeFrensFive] = useState(false);
    const [engageInviteTomarket, setEngageInviteToMarket] = useState(false);
    const [engageToMarketGift, setEngageToMarketGift] = useState(false);
    const [engageJoinGoats, setEngageJoinGoats] = useState(false);
    //const [engageJoinTonAi, setEngageJoinTonAi] = useState(false);
    const [engageYtVidTwo, setEngageYtVidTwo] = useState(false);
    const [engageHoldCoin, setEngageHoldCoin] = useState(false);
    const [engageHoldCoinChannel, setEngageHoldCoinChannel] = useState(false);
    //const [engageFishCoin, setEngageFishCoin] = useState(false);
    //const [engageFishCoinChannel, setEngageFishCoinChannel] = useState(false);
    const [engageYtVidThree, setEngageYtVidThree] = useState(false);
    const [engageYtVidFour, setEngageYtVidFour] = useState(false);
    const [engageYtVidFive, setEngageYtVidFive] = useState(false);
    const [engageYtVidSix, setEngageYtVidSix] = useState(false);
    const [engageTikTokAiDogs, setEngageTiktokAiDogs] = useState(false);
    const [engageAiDogsUgc, setEngageAiDogsUgc] = useState(false);
    const [engageSendToBinance, setEngageSendToBinance] = useState(false);
    const [engageSendToHamster, setEngageSendToHamster] = useState(false);
    const [engagePiggy, setEngagePiggy] = useState(false);
    const [engageDlCoin, setEngageDlCoin] = useState(false);
    const [engageDlCoinChannel, setEngageDlCoinChannel] = useState(false);
    const [engageGhostDrive, setEngageGhostDrive] = useState(false);
    const [engageGhostDriveChannel, setEngageGhostDriveChannel] = useState(false);
    //const [engagePokemonBall, setEngagePokemonBall] = useState(false);
    //const [engagePokemonBallChannel, setEngagePokemonBallChannel] = useState(false);
    //const [engagePigsBot, setEngagePigsBot] = useState(false);
    //const [engagePigsChannel, setEngagePigsChannel] = useState(false);
    //const [engageTonPartyBot, setEngageTonPartyBot] = useState(false);
    //const [engageTonPartyChannel, setEngageTonPartyChannel] = useState(false);
    const [tgDisabled, setTgDisabled] = useState(false);
    const [repostDisabled, setRepostDisabled] = useState(false);
    const [twoFrensDisabled, setTwoFrensDisabled] = useState(false);
    const [fiveFrensDisabled, setFiveFrensDisabled] = useState(false);
    const [tenFrensDisabled, setTenFrensDisabled] = useState(false);
    const [twentyFrensDisabled, setTwentyFrensDisabled] = useState(false);
    const [thirtyFrensDisabled, setThirtyFrensDisabled] = useState(false);
    const [rtTagThreeFrensFiveDisabled, setRtTagThreeFrensFiveDisabled] = useState(false);
    const [toMarketGiftDisabled, setToMarketGiftDisabled] = useState(false);
    const [inviteTomarketDisabled, setInviteTomarketDisabled] = useState(false);
    const [followDisabled, setFollowDisabled] = useState(false);
    const [followBirdsDisabled, setFollowBirdsDisabled] = useState(false);
    const [youtubeDisabled, setYoutubeDisabled] = useState(false);
    const [youtubeBirdsDisabled, setYoutubeBirdsDisabled] = useState(false);
    const [playBirdsDisabled, setPlayBirdsDisabled] = useState(false);
    const [instagramDisabled, setInstagramDisabled] = useState(false);
    const [ytVidOneDisabled, setYtVidOneDisabled] = useState(false);
    const [ytVidTwoDisabled, setYtVidTwoDisabled] = useState(false);
    const [ytVidThreeDisabled, setYtVidThreeDisabled] = useState(false);
    const [joinGoatsDisabled, setJoinGoatsDisabled] = useState(false);
    //const [joinTonAiDisabled, setJoinTonAiDisabled] = useState(false);
    const [holdCoinDisabled, setHoldCoinDisabled] = useState(false);
    const [holdCoinChannelDisabled, setHoldCoinChannelDisabled] = useState(false);
    const [ytVidFourDisabled, setYtVidFourDisabled] = useState(false);
    const [ytVidFiveDisabled, setYtVidFiveDisabled] = useState(false);
    //const [pigsBotDisabled, setPigsBotDisabled] = useState(false);
    //const [pigsChannelDisabled, setPigsChannelDisabled] = useState(false);
    //const [tonPartyBotDisabled, setTonPartyBotDisabled] = useState(false);
    //const [tonPartyChannelDisabled, setTonPartyChannelDisabled] = useState(false);
    //const [fishCoinDisabled, setFishCoinDisabled] = useState(false);
    //const [fishChannelDisabled, setFishChannelDisabled] = useState(false);
    const [ytVidSixDisabled, setYtVidSixDisabled] = useState(false);
    const [tikTokAiDogsDisabled, setTikTokAiDogsDisabled] = useState(false);
    const [aiDogsUgcDisabled, setAiDogsUgcDisabled] = useState(false);
    const [sendToBinanceDisabled, setSendToBinanceDisabled] = useState(false);
    const [sendToHamsterDisabled, setSendToHamsterDisabled] = useState(false);
    const [piggyDisabled, setPiggyDisabled] = useState(false);
    const [dlCoinDisabled, setDlCoinDisabled] = useState(false);
    const [dlCoinChannelDisabled, setDlCoinChannelDisabled] = useState(false);
    const [ghostDriveDisabled, setGhostDriveDisabled] = useState(false);
    const [ghostDriveChannelDisabled, setGhostDriveChannelDisabled] = useState(false);
    //const [pokemonBallDisabled, setPokemonBallDisabled] = useState(false);
    //const [pokemonBallChannelDisabled, setPokemonBallChannelDisabled] = useState(false);
    const [tgStart, setTgStart] = useState(true);
    const [tgClaim, setTgClaim] = useState(false);
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
    }, []);
    const toggleWhatsappGroupOverlay = useCallback(() => {
        console.log(whatsappGroupDisabled)
        setOpenWhatsappGroupToggle((prevOpen) => !prevOpen);
    }, []);
    const toggleInstagramOverlay = useCallback(() => {
        console.log(instagramPostDisabled)
        setOpenInstagramToggle((prevOpen) => !prevOpen);
    }, []);
    const toggleFacebookOverlay = useCallback(() => {
        console.log(facebookDisabled)
        setOpenFacebookToggle((prevOpen) => !prevOpen);
    }, []);
    const toggleTiktokOverlay = useCallback(() => {
        console.log(tiktokDisabled)
        setOpenTiktokToggle((prevOpen) => !prevOpen);
    }, []);
    const toggleSnapchatOverlay = useCallback(() => {
        console.log(snapchatDisabled)
        setOpenSnapchatToggle((prevOpen) => !prevOpen);
    }, []);
    const toggleTelegramGroupOverlay = useCallback(() => {
        console.log(telegramGroupDisabled)
        setOpenTelegramGroupToggle((prevOpen) => !prevOpen);
    }, []);
    const toggleFacebookPostOverlay = useCallback(() => {
        console.log(facebookPostDisabled)
        setOpenFacebookPostToggle((prevOpen) => !prevOpen);
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
            console.log(totalPoints, username)

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

    const claimTg = async () => {
        setTgDisabled(true)
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
            setTgDisabled(false);
        }
    };
    
    const claimFollow = async () => {
        setFollowDisabled(true)
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
            setFollowDisabled(false);
        }
    };

    const claimShare = async () => {
        setRepostDisabled(true);
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
            setRepostDisabled(false);
        }
    };


    const claimInsta = async () => {
        setInstagramDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'instagram',
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
            setInstagramDisabled(false);
        }        
    }

    const claimYoutube = async () => {
        setYoutubeDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'youtube',
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
            setYoutubeDisabled(false)
        }
    }
  
    const claimTwoFrens = async () => {
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
    };

    const claimYtVidOne = async () => {
        setYtVidOneDisabled(true)
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'yt-vid-one',
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
            setYtVidOneDisabled(false)
        }
    }

    const claimRtTagThreeFrensFive = async () => {
        setRtTagThreeFrensFiveDisabled(true);
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'rt-tag-three-frens-five',
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
            setRtTagThreeFrensFiveDisabled(false);
        }
    };

    const claimToMarket = async () => {
        setToMarketGiftDisabled(true);
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'gift-for-tomarket',
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
            setToMarketGiftDisabled(false);
        }
    };

    const claimInviteToMarket = async () => {
        setInviteTomarketDisabled(true);
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'invite-url-tomarket',
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
            setInviteTomarketDisabled(false);
        }
    };
    
    const claimJoinGoats = async () => {
        setJoinGoatsDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'join-goats',
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
            setJoinGoatsDisabled(false);
        }
    };

    const claimHoldCoin = async () => {
        setHoldCoinDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'hold-coin-bot',
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
            setHoldCoinDisabled(false);
        }
    };

    const claimHoldCoinChannel = async () => {
        setHoldCoinChannelDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'hold-coin-channel',
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
            setHoldCoinChannelDisabled(false);
        }
    };

    /*const claimFishCoin = async () => {
        setFishCoinDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'fish-coin-bot',
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
            setFishCoinDisabled(false);
        }
    };

    const claimFishCoinChannel = async () => {
        setFishChannelDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'fish-coin-channel',
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
            setFishChannelDisabled(false);
        }
    };*/

    const claimYtVidTwo = async () => {
        setYtVidTwoDisabled(true)
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'yt-vid-two',
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
            setYtVidTwoDisabled(false)
        }
    }

    const claimYtVidThree = async () => {
        setYtVidThreeDisabled(true)
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'yt-vid-three',
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
            setYtVidThreeDisabled(false)
        }
    }

    const claimYtVidFour = async () => {
        setYtVidFourDisabled(true)
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'yt-vid-four',
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
            setYtVidFourDisabled(false)
        }
    }

    const claimYtVidFive = async () => {
        setYtVidFiveDisabled(true)
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'yt-vid-five',
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
            setYtVidFiveDisabled(false)
        }
    }

    const claimFollowBirds = async () => {
        setFollowBirdsDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'follow-birds-x',
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
            setFollowBirdsDisabled(false);
        }
    };

    const claimYoutubeBirds = async () => {
        setYoutubeBirdsDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'sub-birds-yt',
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
            setYoutubeBirdsDisabled(false)
        }
    }

    const claimPlayBirds = async () => {
        setPlayBirdsDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'play-birds',
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
            setPlayBirdsDisabled(false)
        }
    }

    /*const claimJoinTonAi = async () => {
        setJoinTonAiDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'ton-ai',
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
            setJoinTonAiDisabled(false);
        }
    };*/

    /*const claimPigsBot = async () => {
        setPigsBotDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'pigs-bot',
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
            setPigsBotDisabled(false);
        }
    };

    const claimPigsChannel = async () => {
        setPigsChannelDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'pigs-channel',
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
            setPigsChannelDisabled(false);
        }
    };*/

    /*const claimTonPartyBot = async () => {
        setTonPartyBotDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'ton-party-bot',
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
            setTonPartyBotDisabled(false);
        }
    };

    const claimTonPartyChannel = async () => {
        setTonPartyChannelDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'ton-party-channel',
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
            setTonPartyChannelDisabled(false);
        }
    };*/

    const claimYtVidSix = async () => {
        setYtVidSixDisabled(true)
        const points = 1000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'yt-vid-six',
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
            setYtVidSixDisabled(false)
        }
    }

    const claimTikTokAiDogs = async () => {
        setTikTokAiDogsDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'tiktok-aidogs',
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
            setTikTokAiDogsDisabled(false)
        }
    }

    const claimAiDogsUgc = async () => {
        setAiDogsUgcDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'aidogs-ugc',
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
            setAiDogsUgcDisabled(false)
        }
    }

    const claimSendToBinance = async () => {
        setSendToBinanceDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'send-to-binance',
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
            setSendToBinanceDisabled(false)
        }
    }

    const claimSendToHamster = async () => {
        setSendToHamsterDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'send-to-hamster',
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
            setSendToHamsterDisabled(false)
        }
    }

    const claimPiggy = async () => {
        setPiggyDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'piggy-bot',
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
            setPiggyDisabled(false)
        }
    }

    
    const claimDlCoin = async () => {
        setDlCoinDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'dl-coin-bot',
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
            setDlCoinDisabled(false);
        }
    };

    const claimDlCoinChannel = async () => {
        setDlCoinChannelDisabled(true)
        const points = 150;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'dl-coin-channel',
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
            setDlCoinChannelDisabled(false);
        }
    };

    const claimGhostDrive = async () => {
        setGhostDriveDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'ghost-drive-bot',
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
            setGhostDriveDisabled(false);
        }
    };

    const claimGhostDriveChannel = async () => {
        setGhostDriveChannelDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'ghost-drive-channel',
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
            setGhostDriveChannelDisabled(false);
        }
    };

    /*const claimPokemonBall = async () => {
        setPokemonBallDisabled(true)
        const points = 2000;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'pokemon-ball-bot',
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
            setPokemonBallDisabled(false);
        }
    };

    const claimPokemonBallChannel = async () => {
        setPokemonBallChannelDisabled(true)
        const points = 500;
        const updatePoints = await axios.post(`${import.meta.env.VITE_APP_URL}/update-task-points`, {
            pointsNo: points,
            user
        })

        const updateSocial = await axios.post(`${import.meta.env.VITE_APP_URL}/update-social-reward`, {
            claimTreshold: 'pokemon-bot-channel',
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
            setPokemonBallChannelDisabled(false);
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

    const openTg = () => {
        window.open("https://t.me/aidogs_community", "_blank");
    };

    const referralLink = `${import.meta.env.VITE_TEST_BOT_URL}?start=${referralCode}`;
    const encodedText = useMemo(() => {
        const text = `Are you a Telegram OG?\r\n\nJoin me on AIDOGS and be a part of the dog revolution.\r\n\nEarn 2,500 $AIDOGS when you signup.\r\n\nStart here: ${referralLink} \r\n\n #DOGS #Crypto #AIDOGS`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;

    const encodedToMarketText = useMemo(() => {
        const text = `I just claimed my free 2000 $AIDOGS just for being a Tomarket user.\n\nSignup and claim yours now: ${referralLink}\n\n #AIDOGS #Tomarket`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const urlToMarketGift = `https://twitter.com/intent/tweet?text=${encodedToMarketText}`;

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
                                {
                                    rearrangeRewards(socialTasks).map((task: any) => (
                                        !task.rewardClaimed &&
                                        <>
                                            {
                                                task.claimTreshold === 'telegram' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
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
                                                            <>
                                                                {
                                                                    tgStart &&
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                        openTg()
                                                                        setTgClaim(true)
                                                                        setTgStart(false)
                                                                    }}>
                                                                        Start
                                                                    </button>
                                                                }
                                                                {
                                                                    tgClaim &&
                                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                        toast("Confirming, please wait...", {
                                                                            className: "",
                                                                            duration: 799,
                                                                            style: {
                                                                            background: "#363636",
                                                                            color: "#fff",
                                                                            },
                                                                        });
                                                                        setTimeout(() => {
                                                                            setEngageTelegram(true)
                                                                        }, 5000)
                                                                    }}>
                                                                        Check
                                                                    </button>
                                                                }
                                                            </>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageTelegram &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimTg();
                                                            }} disabled={tgDisabled}>
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
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
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
                                                                }, 5000)
                                                            }}>
                                                                Follow
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageFollow &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimFollow();
                                                            }} disabled={followDisabled}>
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
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
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
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={async () => {
                                                                window.open(url, '_blank');
                                                                setTimeout(() => {
                                                                    setEngageRepost(true)
                                                                }, 5000)
                                                            }}>
                                                                Share
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageRepost &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimShare();
                                                            }} disabled={repostDisabled}>
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
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
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
                                                            }} disabled={twoFrensDisabled}>
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
                                                task.claimTreshold === 'instagram' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="20px" height="20px"><path style={{stroke:'#000000',strokeWidth:2,strokeMiterlimit:10}} d="M16,46h18c6.627,0,12-5.373,12-12V16c0-6.627-5.373-12-12-12H16C9.373,4,4,9.373,4,16v18C4,40.627,9.373,46,16,46z"/><circle style={{stroke:'#000000',strokeWidth:2,strokeMiterlimit:10}} cx="25" cy="25" r="10"/><circle cx="37" cy="13" r="2"/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Follow on Insta</p>
                                                            <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageInstagram &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={async () => {
                                                                window.open('https://www.instagram.com/aidogscomm?igsh=MjhqdTh1bWptbmE5&utm_source=qr', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageInstagram(true)
                                                                }, 5000)
                                                            }}>
                                                                Follow
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageInstagram &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimInsta();
                                                            }} disabled={instagramDisabled}>
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
                                                task.claimTreshold === 'youtube' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="25px" height="25px"><rect  x="0" y="0" width="20px" height="20px" style={{fill: 'none'}}/><path d="M24,40l-2,0l0,-1c-0.37,0.438 -0.563,0.574 -0.979,0.782c-0.417,0.233 -0.836,0.218 -1.23,0.218c-0.484,0 -1.034,-0.437 -1.291,-0.765c-0.232,-0.3 -0.5,-0.61 -0.5,-1.235l0,-9l2,0l0,8c0,0.23 0.268,1.007 1,1c0.813,-0.008 0.819,-0.767 1,-1l0,-8l2,0l0,11Zm4,0l-2,0l0,-14l2,0l0,4c0.23,-0.36 0.575,-0.643 0.9,-0.805c0.324,-0.165 0.648,-0.255 0.973,-0.255c0.649,0 1.159,0.23 1.505,0.671c0.349,0.441 0.622,1.026 0.622,1.889l0,6c0,0.741 -0.251,1.202 -0.576,1.6c-0.321,0.392 -0.802,0.894 -1.424,0.9c-1.051,0.011 -1.614,-0.549 -2,-1l0,1Zm-11,-12l-2,0l0,12l-2,0l0,-12l-2,0l0,-2l6,0l0,2Zm18,7l0,1.546c0,0.557 0.075,0.917 0.216,1.126c0.138,0.23 0.417,0.332 0.784,0.328c0.406,-0.004 0.663,-0.085 0.801,-0.269c0.14,-0.165 0.199,-0.628 0.199,-1.231l0,-0.5l2,0l0,0.592c0,1.093 -0.088,1.902 -0.624,2.435c-0.508,0.557 -1.3,0.815 -2.338,0.815c-0.951,0 -1.692,-0.279 -2.227,-0.858c-0.53,-0.579 -0.808,-1.369 -0.808,-2.392l0,-4.708c0,-0.904 0.317,-1.574 0.9,-2.173c0.467,-0.479 1.346,-0.711 2.295,-0.711c0.951,0 1.617,0.201 2.122,0.734c0.514,0.533 0.68,1.152 0.68,2.15l0,3.116l-4,0Zm-5,-3c0,-1.001 -0.448,-1.5 -1,-1.5c-0.552,0 -0.991,0.497 -1,1l0,6c0.009,0.288 0.448,0.5 1,0.5c0.552,0 1,-0.425 1,-0.977l0,-5.023Zm7,1l0,-1c0,-0.615 -0.448,-1 -1,-1c-0.552,0 -0.991,0.463 -1,1l0,1l2,0Z"/><path d="M19,5l-2,6l-2,-6l-2,0l3,9l0,6l2,0l0,-6l3,-9l-2,0Zm6,12c0,0.969 -0.676,1 -1,1c-0.3,0 -1,-0.013 -1,-1l0,-5c0,-0.815 0.433,-1 1,-1c0.3,0 1,-0.002 1,1l0,5Zm1.24,-7.278c-0.627,-0.576 -1.27,-0.722 -2.24,-0.722c-1.068,0 -1.591,0.168 -2.242,0.701c-0.625,0.53 -0.799,0.937 -0.758,2.299l0,5c0,0.996 0.162,1.652 0.765,2.236c0.625,0.579 1.216,0.764 2.235,0.764c1.065,0 1.648,-0.184 2.248,-0.765c0.627,-0.558 0.752,-1.237 0.752,-2.235l0,-5c0,-0.882 -0.157,-1.721 -0.76,-2.278Zm6.76,-0.722l0,8c-0.011,0.683 -0.816,1 -1,1c-0.208,0 -1,-0.042 -1,-1l0,-8l-2,0l0,9c0,0.972 0.98,2 2,2c1.02,0 1.559,-0.513 2,-1l0,1l2,0l0,-11l-2,0Z" style={{fillRule: 'nonzero'}}/><path d="M40.584,22.001c0.709,0.011 1.415,0.108 2.091,0.329c0.546,0.179 1.067,0.437 1.535,0.773c0.529,0.381 0.985,0.861 1.339,1.409c0.248,0.384 0.446,0.8 0.594,1.233c0.24,0.699 0.345,1.433 0.357,2.171c0.017,3.417 0.052,6.836 -0.002,10.253c-0.019,0.733 -0.132,1.463 -0.379,2.156c-0.153,0.43 -0.356,0.842 -0.609,1.222c-0.361,0.544 -0.823,1.017 -1.358,1.391c-0.452,0.316 -0.953,0.56 -1.477,0.732c-0.649,0.212 -1.327,0.311 -2.007,0.328c-10.111,0.158 -20.226,0.191 -30.336,0c-0.609,-0.019 -1.213,-0.116 -1.792,-0.312c-0.402,-0.136 -0.789,-0.318 -1.15,-0.541c-0.293,-0.181 -0.568,-0.389 -0.822,-0.62c-0.88,-0.8 -1.487,-1.864 -1.802,-3.005c-0.166,-0.604 -0.248,-1.226 -0.264,-1.851c-0.051,-3.279 -0.052,-6.559 0,-9.838c0.019,-0.733 0.132,-1.463 0.379,-2.156c0.153,-0.43 0.356,-0.842 0.609,-1.222c0.361,-0.543 0.823,-1.017 1.358,-1.391c0.452,-0.316 0.953,-0.56 1.477,-0.732c0.649,-0.212 1.327,-0.31 2.007,-0.328c10.083,-0.158 20.168,-0.054 30.252,-0.001Zm-30.079,1.999c-0.425,0.002 -0.849,0.043 -1.262,0.146c-0.641,0.16 -1.244,0.469 -1.708,0.944c-0.161,0.166 -0.305,0.349 -0.427,0.544c-0.167,0.266 -0.296,0.555 -0.391,0.855c-0.148,0.468 -0.209,0.957 -0.217,1.447c-0.016,3.231 -0.05,6.461 0.001,9.691c0.012,0.441 0.067,0.88 0.179,1.307c0.21,0.798 0.619,1.552 1.233,2.111c0.164,0.149 0.341,0.283 0.529,0.399c0.232,0.144 0.481,0.26 0.739,0.348c0.407,0.137 0.832,0.2 1.26,0.208c10.061,0.063 20.124,0.157 30.185,-0.001c0.398,-0.011 0.795,-0.057 1.182,-0.158c0.621,-0.163 1.206,-0.469 1.657,-0.931c0.151,-0.155 0.286,-0.325 0.404,-0.507c0.169,-0.262 0.301,-0.547 0.398,-0.844c0.153,-0.462 0.219,-0.946 0.232,-1.432c0.054,-3.417 0.054,-6.836 0,-10.254c-0.013,-0.485 -0.079,-0.97 -0.232,-1.432c-0.097,-0.297 -0.229,-0.582 -0.398,-0.844c-0.118,-0.182 -0.253,-0.352 -0.404,-0.507c-0.451,-0.462 -1.036,-0.768 -1.657,-0.931c-0.387,-0.101 -0.784,-0.147 -1.182,-0.158c-10.039,-0.157 -20.081,-0.001 -30.121,-0.001Z" style={{fillRule:'nonzero'}}/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Subscribe to Youtube</p>
                                                            <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageYoutube &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://www.youtube.com/@aidogscomm', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageYoutube(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageYoutube &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimYoutube();
                                                            }} disabled={youtubeDisabled}>
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
                                                task.claimTreshold === 'yt-vid-one' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="25px" height="25px"><rect  x="0" y="0" width="20px" height="20px" style={{fill: 'none'}}/><path d="M24,40l-2,0l0,-1c-0.37,0.438 -0.563,0.574 -0.979,0.782c-0.417,0.233 -0.836,0.218 -1.23,0.218c-0.484,0 -1.034,-0.437 -1.291,-0.765c-0.232,-0.3 -0.5,-0.61 -0.5,-1.235l0,-9l2,0l0,8c0,0.23 0.268,1.007 1,1c0.813,-0.008 0.819,-0.767 1,-1l0,-8l2,0l0,11Zm4,0l-2,0l0,-14l2,0l0,4c0.23,-0.36 0.575,-0.643 0.9,-0.805c0.324,-0.165 0.648,-0.255 0.973,-0.255c0.649,0 1.159,0.23 1.505,0.671c0.349,0.441 0.622,1.026 0.622,1.889l0,6c0,0.741 -0.251,1.202 -0.576,1.6c-0.321,0.392 -0.802,0.894 -1.424,0.9c-1.051,0.011 -1.614,-0.549 -2,-1l0,1Zm-11,-12l-2,0l0,12l-2,0l0,-12l-2,0l0,-2l6,0l0,2Zm18,7l0,1.546c0,0.557 0.075,0.917 0.216,1.126c0.138,0.23 0.417,0.332 0.784,0.328c0.406,-0.004 0.663,-0.085 0.801,-0.269c0.14,-0.165 0.199,-0.628 0.199,-1.231l0,-0.5l2,0l0,0.592c0,1.093 -0.088,1.902 -0.624,2.435c-0.508,0.557 -1.3,0.815 -2.338,0.815c-0.951,0 -1.692,-0.279 -2.227,-0.858c-0.53,-0.579 -0.808,-1.369 -0.808,-2.392l0,-4.708c0,-0.904 0.317,-1.574 0.9,-2.173c0.467,-0.479 1.346,-0.711 2.295,-0.711c0.951,0 1.617,0.201 2.122,0.734c0.514,0.533 0.68,1.152 0.68,2.15l0,3.116l-4,0Zm-5,-3c0,-1.001 -0.448,-1.5 -1,-1.5c-0.552,0 -0.991,0.497 -1,1l0,6c0.009,0.288 0.448,0.5 1,0.5c0.552,0 1,-0.425 1,-0.977l0,-5.023Zm7,1l0,-1c0,-0.615 -0.448,-1 -1,-1c-0.552,0 -0.991,0.463 -1,1l0,1l2,0Z"/><path d="M19,5l-2,6l-2,-6l-2,0l3,9l0,6l2,0l0,-6l3,-9l-2,0Zm6,12c0,0.969 -0.676,1 -1,1c-0.3,0 -1,-0.013 -1,-1l0,-5c0,-0.815 0.433,-1 1,-1c0.3,0 1,-0.002 1,1l0,5Zm1.24,-7.278c-0.627,-0.576 -1.27,-0.722 -2.24,-0.722c-1.068,0 -1.591,0.168 -2.242,0.701c-0.625,0.53 -0.799,0.937 -0.758,2.299l0,5c0,0.996 0.162,1.652 0.765,2.236c0.625,0.579 1.216,0.764 2.235,0.764c1.065,0 1.648,-0.184 2.248,-0.765c0.627,-0.558 0.752,-1.237 0.752,-2.235l0,-5c0,-0.882 -0.157,-1.721 -0.76,-2.278Zm6.76,-0.722l0,8c-0.011,0.683 -0.816,1 -1,1c-0.208,0 -1,-0.042 -1,-1l0,-8l-2,0l0,9c0,0.972 0.98,2 2,2c1.02,0 1.559,-0.513 2,-1l0,1l2,0l0,-11l-2,0Z" style={{fillRule: 'nonzero'}}/><path d="M40.584,22.001c0.709,0.011 1.415,0.108 2.091,0.329c0.546,0.179 1.067,0.437 1.535,0.773c0.529,0.381 0.985,0.861 1.339,1.409c0.248,0.384 0.446,0.8 0.594,1.233c0.24,0.699 0.345,1.433 0.357,2.171c0.017,3.417 0.052,6.836 -0.002,10.253c-0.019,0.733 -0.132,1.463 -0.379,2.156c-0.153,0.43 -0.356,0.842 -0.609,1.222c-0.361,0.544 -0.823,1.017 -1.358,1.391c-0.452,0.316 -0.953,0.56 -1.477,0.732c-0.649,0.212 -1.327,0.311 -2.007,0.328c-10.111,0.158 -20.226,0.191 -30.336,0c-0.609,-0.019 -1.213,-0.116 -1.792,-0.312c-0.402,-0.136 -0.789,-0.318 -1.15,-0.541c-0.293,-0.181 -0.568,-0.389 -0.822,-0.62c-0.88,-0.8 -1.487,-1.864 -1.802,-3.005c-0.166,-0.604 -0.248,-1.226 -0.264,-1.851c-0.051,-3.279 -0.052,-6.559 0,-9.838c0.019,-0.733 0.132,-1.463 0.379,-2.156c0.153,-0.43 0.356,-0.842 0.609,-1.222c0.361,-0.543 0.823,-1.017 1.358,-1.391c0.452,-0.316 0.953,-0.56 1.477,-0.732c0.649,-0.212 1.327,-0.31 2.007,-0.328c10.083,-0.158 20.168,-0.054 30.252,-0.001Zm-30.079,1.999c-0.425,0.002 -0.849,0.043 -1.262,0.146c-0.641,0.16 -1.244,0.469 -1.708,0.944c-0.161,0.166 -0.305,0.349 -0.427,0.544c-0.167,0.266 -0.296,0.555 -0.391,0.855c-0.148,0.468 -0.209,0.957 -0.217,1.447c-0.016,3.231 -0.05,6.461 0.001,9.691c0.012,0.441 0.067,0.88 0.179,1.307c0.21,0.798 0.619,1.552 1.233,2.111c0.164,0.149 0.341,0.283 0.529,0.399c0.232,0.144 0.481,0.26 0.739,0.348c0.407,0.137 0.832,0.2 1.26,0.208c10.061,0.063 20.124,0.157 30.185,-0.001c0.398,-0.011 0.795,-0.057 1.182,-0.158c0.621,-0.163 1.206,-0.469 1.657,-0.931c0.151,-0.155 0.286,-0.325 0.404,-0.507c0.169,-0.262 0.301,-0.547 0.398,-0.844c0.153,-0.462 0.219,-0.946 0.232,-1.432c0.054,-3.417 0.054,-6.836 0,-10.254c-0.013,-0.485 -0.079,-0.97 -0.232,-1.432c-0.097,-0.297 -0.229,-0.582 -0.398,-0.844c-0.118,-0.182 -0.253,-0.352 -0.404,-0.507c-0.451,-0.462 -1.036,-0.768 -1.657,-0.931c-0.387,-0.101 -0.784,-0.147 -1.182,-0.158c-10.039,-0.157 -20.081,-0.001 -30.121,-0.001Z" style={{fillRule:'nonzero'}}/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Watch YouTube Video</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageYtVidOne &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://youtu.be/z_VeGCOwNG4?si=1HwQJhxTVVeMDXRq', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageYtVidOne(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageYtVidOne &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimYtVidOne();
                                                            }} disabled={ytVidOneDisabled}>
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
                                                task.claimTreshold === 'yt-vid-three' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="25px" height="25px"><rect  x="0" y="0" width="20px" height="20px" style={{fill: 'none'}}/><path d="M24,40l-2,0l0,-1c-0.37,0.438 -0.563,0.574 -0.979,0.782c-0.417,0.233 -0.836,0.218 -1.23,0.218c-0.484,0 -1.034,-0.437 -1.291,-0.765c-0.232,-0.3 -0.5,-0.61 -0.5,-1.235l0,-9l2,0l0,8c0,0.23 0.268,1.007 1,1c0.813,-0.008 0.819,-0.767 1,-1l0,-8l2,0l0,11Zm4,0l-2,0l0,-14l2,0l0,4c0.23,-0.36 0.575,-0.643 0.9,-0.805c0.324,-0.165 0.648,-0.255 0.973,-0.255c0.649,0 1.159,0.23 1.505,0.671c0.349,0.441 0.622,1.026 0.622,1.889l0,6c0,0.741 -0.251,1.202 -0.576,1.6c-0.321,0.392 -0.802,0.894 -1.424,0.9c-1.051,0.011 -1.614,-0.549 -2,-1l0,1Zm-11,-12l-2,0l0,12l-2,0l0,-12l-2,0l0,-2l6,0l0,2Zm18,7l0,1.546c0,0.557 0.075,0.917 0.216,1.126c0.138,0.23 0.417,0.332 0.784,0.328c0.406,-0.004 0.663,-0.085 0.801,-0.269c0.14,-0.165 0.199,-0.628 0.199,-1.231l0,-0.5l2,0l0,0.592c0,1.093 -0.088,1.902 -0.624,2.435c-0.508,0.557 -1.3,0.815 -2.338,0.815c-0.951,0 -1.692,-0.279 -2.227,-0.858c-0.53,-0.579 -0.808,-1.369 -0.808,-2.392l0,-4.708c0,-0.904 0.317,-1.574 0.9,-2.173c0.467,-0.479 1.346,-0.711 2.295,-0.711c0.951,0 1.617,0.201 2.122,0.734c0.514,0.533 0.68,1.152 0.68,2.15l0,3.116l-4,0Zm-5,-3c0,-1.001 -0.448,-1.5 -1,-1.5c-0.552,0 -0.991,0.497 -1,1l0,6c0.009,0.288 0.448,0.5 1,0.5c0.552,0 1,-0.425 1,-0.977l0,-5.023Zm7,1l0,-1c0,-0.615 -0.448,-1 -1,-1c-0.552,0 -0.991,0.463 -1,1l0,1l2,0Z"/><path d="M19,5l-2,6l-2,-6l-2,0l3,9l0,6l2,0l0,-6l3,-9l-2,0Zm6,12c0,0.969 -0.676,1 -1,1c-0.3,0 -1,-0.013 -1,-1l0,-5c0,-0.815 0.433,-1 1,-1c0.3,0 1,-0.002 1,1l0,5Zm1.24,-7.278c-0.627,-0.576 -1.27,-0.722 -2.24,-0.722c-1.068,0 -1.591,0.168 -2.242,0.701c-0.625,0.53 -0.799,0.937 -0.758,2.299l0,5c0,0.996 0.162,1.652 0.765,2.236c0.625,0.579 1.216,0.764 2.235,0.764c1.065,0 1.648,-0.184 2.248,-0.765c0.627,-0.558 0.752,-1.237 0.752,-2.235l0,-5c0,-0.882 -0.157,-1.721 -0.76,-2.278Zm6.76,-0.722l0,8c-0.011,0.683 -0.816,1 -1,1c-0.208,0 -1,-0.042 -1,-1l0,-8l-2,0l0,9c0,0.972 0.98,2 2,2c1.02,0 1.559,-0.513 2,-1l0,1l2,0l0,-11l-2,0Z" style={{fillRule: 'nonzero'}}/><path d="M40.584,22.001c0.709,0.011 1.415,0.108 2.091,0.329c0.546,0.179 1.067,0.437 1.535,0.773c0.529,0.381 0.985,0.861 1.339,1.409c0.248,0.384 0.446,0.8 0.594,1.233c0.24,0.699 0.345,1.433 0.357,2.171c0.017,3.417 0.052,6.836 -0.002,10.253c-0.019,0.733 -0.132,1.463 -0.379,2.156c-0.153,0.43 -0.356,0.842 -0.609,1.222c-0.361,0.544 -0.823,1.017 -1.358,1.391c-0.452,0.316 -0.953,0.56 -1.477,0.732c-0.649,0.212 -1.327,0.311 -2.007,0.328c-10.111,0.158 -20.226,0.191 -30.336,0c-0.609,-0.019 -1.213,-0.116 -1.792,-0.312c-0.402,-0.136 -0.789,-0.318 -1.15,-0.541c-0.293,-0.181 -0.568,-0.389 -0.822,-0.62c-0.88,-0.8 -1.487,-1.864 -1.802,-3.005c-0.166,-0.604 -0.248,-1.226 -0.264,-1.851c-0.051,-3.279 -0.052,-6.559 0,-9.838c0.019,-0.733 0.132,-1.463 0.379,-2.156c0.153,-0.43 0.356,-0.842 0.609,-1.222c0.361,-0.543 0.823,-1.017 1.358,-1.391c0.452,-0.316 0.953,-0.56 1.477,-0.732c0.649,-0.212 1.327,-0.31 2.007,-0.328c10.083,-0.158 20.168,-0.054 30.252,-0.001Zm-30.079,1.999c-0.425,0.002 -0.849,0.043 -1.262,0.146c-0.641,0.16 -1.244,0.469 -1.708,0.944c-0.161,0.166 -0.305,0.349 -0.427,0.544c-0.167,0.266 -0.296,0.555 -0.391,0.855c-0.148,0.468 -0.209,0.957 -0.217,1.447c-0.016,3.231 -0.05,6.461 0.001,9.691c0.012,0.441 0.067,0.88 0.179,1.307c0.21,0.798 0.619,1.552 1.233,2.111c0.164,0.149 0.341,0.283 0.529,0.399c0.232,0.144 0.481,0.26 0.739,0.348c0.407,0.137 0.832,0.2 1.26,0.208c10.061,0.063 20.124,0.157 30.185,-0.001c0.398,-0.011 0.795,-0.057 1.182,-0.158c0.621,-0.163 1.206,-0.469 1.657,-0.931c0.151,-0.155 0.286,-0.325 0.404,-0.507c0.169,-0.262 0.301,-0.547 0.398,-0.844c0.153,-0.462 0.219,-0.946 0.232,-1.432c0.054,-3.417 0.054,-6.836 0,-10.254c-0.013,-0.485 -0.079,-0.97 -0.232,-1.432c-0.097,-0.297 -0.229,-0.582 -0.398,-0.844c-0.118,-0.182 -0.253,-0.352 -0.404,-0.507c-0.451,-0.462 -1.036,-0.768 -1.657,-0.931c-0.387,-0.101 -0.784,-0.147 -1.182,-0.158c-10.039,-0.157 -20.081,-0.001 -30.121,-0.001Z" style={{fillRule:'nonzero'}}/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Watch YouTube Video</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageYtVidThree &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://youtu.be/J56VoQdUmV8?si=BrUfCoaphy-6HwOC', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageYtVidThree(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageYtVidThree &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimYtVidThree();
                                                            }} disabled={ytVidThreeDisabled}>
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
                                                task.claimTreshold === 'five-frens' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Invite 5 frens</p>
                                                            <span className='text-[#A6A6A6]'>+5000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageFiveFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                setEngageFiveFrens(true)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageFiveFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimFiveFrens();
                                                            }} disabled={fiveFrensDisabled}>
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
                                                task.claimTreshold === 'ten-frens' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Invite 10 frens</p>
                                                            <span className='text-[#A6A6A6]'>+10000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageTenFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                setEngageTenFrens(true)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageTenFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimTenFrens();
                                                            }} disabled={tenFrensDisabled}>
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
                                                task.claimTreshold === 'twenty-frens' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Invite 20 frens</p>
                                                            <span className='text-[#A6A6A6]'>+20000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageTwentyFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                setEngageTwentyFrens(true)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageTwentyFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimTwentyFrens();
                                                            }} disabled={twentyFrensDisabled}>
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
                                                task.claimTreshold === 'thirty-frens' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Invite 30 frens</p>
                                                            <span className='text-[#A6A6A6]'>+30000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageThirtyFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                setEngageThirtyFrens(true)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageThirtyFrens &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimThirtyFrens();
                                                            }} disabled={thirtyFrensDisabled}>
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
                                                task.claimTreshold === 'yt-vid-two' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="25px" height="25px"><rect  x="0" y="0" width="20px" height="20px" style={{fill: 'none'}}/><path d="M24,40l-2,0l0,-1c-0.37,0.438 -0.563,0.574 -0.979,0.782c-0.417,0.233 -0.836,0.218 -1.23,0.218c-0.484,0 -1.034,-0.437 -1.291,-0.765c-0.232,-0.3 -0.5,-0.61 -0.5,-1.235l0,-9l2,0l0,8c0,0.23 0.268,1.007 1,1c0.813,-0.008 0.819,-0.767 1,-1l0,-8l2,0l0,11Zm4,0l-2,0l0,-14l2,0l0,4c0.23,-0.36 0.575,-0.643 0.9,-0.805c0.324,-0.165 0.648,-0.255 0.973,-0.255c0.649,0 1.159,0.23 1.505,0.671c0.349,0.441 0.622,1.026 0.622,1.889l0,6c0,0.741 -0.251,1.202 -0.576,1.6c-0.321,0.392 -0.802,0.894 -1.424,0.9c-1.051,0.011 -1.614,-0.549 -2,-1l0,1Zm-11,-12l-2,0l0,12l-2,0l0,-12l-2,0l0,-2l6,0l0,2Zm18,7l0,1.546c0,0.557 0.075,0.917 0.216,1.126c0.138,0.23 0.417,0.332 0.784,0.328c0.406,-0.004 0.663,-0.085 0.801,-0.269c0.14,-0.165 0.199,-0.628 0.199,-1.231l0,-0.5l2,0l0,0.592c0,1.093 -0.088,1.902 -0.624,2.435c-0.508,0.557 -1.3,0.815 -2.338,0.815c-0.951,0 -1.692,-0.279 -2.227,-0.858c-0.53,-0.579 -0.808,-1.369 -0.808,-2.392l0,-4.708c0,-0.904 0.317,-1.574 0.9,-2.173c0.467,-0.479 1.346,-0.711 2.295,-0.711c0.951,0 1.617,0.201 2.122,0.734c0.514,0.533 0.68,1.152 0.68,2.15l0,3.116l-4,0Zm-5,-3c0,-1.001 -0.448,-1.5 -1,-1.5c-0.552,0 -0.991,0.497 -1,1l0,6c0.009,0.288 0.448,0.5 1,0.5c0.552,0 1,-0.425 1,-0.977l0,-5.023Zm7,1l0,-1c0,-0.615 -0.448,-1 -1,-1c-0.552,0 -0.991,0.463 -1,1l0,1l2,0Z"/><path d="M19,5l-2,6l-2,-6l-2,0l3,9l0,6l2,0l0,-6l3,-9l-2,0Zm6,12c0,0.969 -0.676,1 -1,1c-0.3,0 -1,-0.013 -1,-1l0,-5c0,-0.815 0.433,-1 1,-1c0.3,0 1,-0.002 1,1l0,5Zm1.24,-7.278c-0.627,-0.576 -1.27,-0.722 -2.24,-0.722c-1.068,0 -1.591,0.168 -2.242,0.701c-0.625,0.53 -0.799,0.937 -0.758,2.299l0,5c0,0.996 0.162,1.652 0.765,2.236c0.625,0.579 1.216,0.764 2.235,0.764c1.065,0 1.648,-0.184 2.248,-0.765c0.627,-0.558 0.752,-1.237 0.752,-2.235l0,-5c0,-0.882 -0.157,-1.721 -0.76,-2.278Zm6.76,-0.722l0,8c-0.011,0.683 -0.816,1 -1,1c-0.208,0 -1,-0.042 -1,-1l0,-8l-2,0l0,9c0,0.972 0.98,2 2,2c1.02,0 1.559,-0.513 2,-1l0,1l2,0l0,-11l-2,0Z" style={{fillRule: 'nonzero'}}/><path d="M40.584,22.001c0.709,0.011 1.415,0.108 2.091,0.329c0.546,0.179 1.067,0.437 1.535,0.773c0.529,0.381 0.985,0.861 1.339,1.409c0.248,0.384 0.446,0.8 0.594,1.233c0.24,0.699 0.345,1.433 0.357,2.171c0.017,3.417 0.052,6.836 -0.002,10.253c-0.019,0.733 -0.132,1.463 -0.379,2.156c-0.153,0.43 -0.356,0.842 -0.609,1.222c-0.361,0.544 -0.823,1.017 -1.358,1.391c-0.452,0.316 -0.953,0.56 -1.477,0.732c-0.649,0.212 -1.327,0.311 -2.007,0.328c-10.111,0.158 -20.226,0.191 -30.336,0c-0.609,-0.019 -1.213,-0.116 -1.792,-0.312c-0.402,-0.136 -0.789,-0.318 -1.15,-0.541c-0.293,-0.181 -0.568,-0.389 -0.822,-0.62c-0.88,-0.8 -1.487,-1.864 -1.802,-3.005c-0.166,-0.604 -0.248,-1.226 -0.264,-1.851c-0.051,-3.279 -0.052,-6.559 0,-9.838c0.019,-0.733 0.132,-1.463 0.379,-2.156c0.153,-0.43 0.356,-0.842 0.609,-1.222c0.361,-0.543 0.823,-1.017 1.358,-1.391c0.452,-0.316 0.953,-0.56 1.477,-0.732c0.649,-0.212 1.327,-0.31 2.007,-0.328c10.083,-0.158 20.168,-0.054 30.252,-0.001Zm-30.079,1.999c-0.425,0.002 -0.849,0.043 -1.262,0.146c-0.641,0.16 -1.244,0.469 -1.708,0.944c-0.161,0.166 -0.305,0.349 -0.427,0.544c-0.167,0.266 -0.296,0.555 -0.391,0.855c-0.148,0.468 -0.209,0.957 -0.217,1.447c-0.016,3.231 -0.05,6.461 0.001,9.691c0.012,0.441 0.067,0.88 0.179,1.307c0.21,0.798 0.619,1.552 1.233,2.111c0.164,0.149 0.341,0.283 0.529,0.399c0.232,0.144 0.481,0.26 0.739,0.348c0.407,0.137 0.832,0.2 1.26,0.208c10.061,0.063 20.124,0.157 30.185,-0.001c0.398,-0.011 0.795,-0.057 1.182,-0.158c0.621,-0.163 1.206,-0.469 1.657,-0.931c0.151,-0.155 0.286,-0.325 0.404,-0.507c0.169,-0.262 0.301,-0.547 0.398,-0.844c0.153,-0.462 0.219,-0.946 0.232,-1.432c0.054,-3.417 0.054,-6.836 0,-10.254c-0.013,-0.485 -0.079,-0.97 -0.232,-1.432c-0.097,-0.297 -0.229,-0.582 -0.398,-0.844c-0.118,-0.182 -0.253,-0.352 -0.404,-0.507c-0.451,-0.462 -1.036,-0.768 -1.657,-0.931c-0.387,-0.101 -0.784,-0.147 -1.182,-0.158c-10.039,-0.157 -20.081,-0.001 -30.121,-0.001Z" style={{fillRule:'nonzero'}}/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Watch YouTube Video</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageYtVidTwo &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://youtu.be/ssZfO6PAyDs?si=3QWEeILtunO8qOKs', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageYtVidTwo(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageYtVidTwo &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimYtVidTwo();
                                                            }} disabled={ytVidTwoDisabled}>
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
                                                task.claimTreshold === 'rt-tag-three-frens-five' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>RT and Tag 3 frens</p>
                                                            <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageRtTagThreeFrensFive &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={async () => {
                                                                window.open('https://x.com/aidogscomm/status/1832376968999747746?s=19', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageRtTagThreeFrensFive(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageRtTagThreeFrensFive &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimRtTagThreeFrensFive();
                                                            }} disabled={rtTagThreeFrensFiveDisabled}>
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
                                                task.claimTreshold === 'yt-vid-four' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="25px" height="25px"><rect  x="0" y="0" width="20px" height="20px" style={{fill: 'none'}}/><path d="M24,40l-2,0l0,-1c-0.37,0.438 -0.563,0.574 -0.979,0.782c-0.417,0.233 -0.836,0.218 -1.23,0.218c-0.484,0 -1.034,-0.437 -1.291,-0.765c-0.232,-0.3 -0.5,-0.61 -0.5,-1.235l0,-9l2,0l0,8c0,0.23 0.268,1.007 1,1c0.813,-0.008 0.819,-0.767 1,-1l0,-8l2,0l0,11Zm4,0l-2,0l0,-14l2,0l0,4c0.23,-0.36 0.575,-0.643 0.9,-0.805c0.324,-0.165 0.648,-0.255 0.973,-0.255c0.649,0 1.159,0.23 1.505,0.671c0.349,0.441 0.622,1.026 0.622,1.889l0,6c0,0.741 -0.251,1.202 -0.576,1.6c-0.321,0.392 -0.802,0.894 -1.424,0.9c-1.051,0.011 -1.614,-0.549 -2,-1l0,1Zm-11,-12l-2,0l0,12l-2,0l0,-12l-2,0l0,-2l6,0l0,2Zm18,7l0,1.546c0,0.557 0.075,0.917 0.216,1.126c0.138,0.23 0.417,0.332 0.784,0.328c0.406,-0.004 0.663,-0.085 0.801,-0.269c0.14,-0.165 0.199,-0.628 0.199,-1.231l0,-0.5l2,0l0,0.592c0,1.093 -0.088,1.902 -0.624,2.435c-0.508,0.557 -1.3,0.815 -2.338,0.815c-0.951,0 -1.692,-0.279 -2.227,-0.858c-0.53,-0.579 -0.808,-1.369 -0.808,-2.392l0,-4.708c0,-0.904 0.317,-1.574 0.9,-2.173c0.467,-0.479 1.346,-0.711 2.295,-0.711c0.951,0 1.617,0.201 2.122,0.734c0.514,0.533 0.68,1.152 0.68,2.15l0,3.116l-4,0Zm-5,-3c0,-1.001 -0.448,-1.5 -1,-1.5c-0.552,0 -0.991,0.497 -1,1l0,6c0.009,0.288 0.448,0.5 1,0.5c0.552,0 1,-0.425 1,-0.977l0,-5.023Zm7,1l0,-1c0,-0.615 -0.448,-1 -1,-1c-0.552,0 -0.991,0.463 -1,1l0,1l2,0Z"/><path d="M19,5l-2,6l-2,-6l-2,0l3,9l0,6l2,0l0,-6l3,-9l-2,0Zm6,12c0,0.969 -0.676,1 -1,1c-0.3,0 -1,-0.013 -1,-1l0,-5c0,-0.815 0.433,-1 1,-1c0.3,0 1,-0.002 1,1l0,5Zm1.24,-7.278c-0.627,-0.576 -1.27,-0.722 -2.24,-0.722c-1.068,0 -1.591,0.168 -2.242,0.701c-0.625,0.53 -0.799,0.937 -0.758,2.299l0,5c0,0.996 0.162,1.652 0.765,2.236c0.625,0.579 1.216,0.764 2.235,0.764c1.065,0 1.648,-0.184 2.248,-0.765c0.627,-0.558 0.752,-1.237 0.752,-2.235l0,-5c0,-0.882 -0.157,-1.721 -0.76,-2.278Zm6.76,-0.722l0,8c-0.011,0.683 -0.816,1 -1,1c-0.208,0 -1,-0.042 -1,-1l0,-8l-2,0l0,9c0,0.972 0.98,2 2,2c1.02,0 1.559,-0.513 2,-1l0,1l2,0l0,-11l-2,0Z" style={{fillRule: 'nonzero'}}/><path d="M40.584,22.001c0.709,0.011 1.415,0.108 2.091,0.329c0.546,0.179 1.067,0.437 1.535,0.773c0.529,0.381 0.985,0.861 1.339,1.409c0.248,0.384 0.446,0.8 0.594,1.233c0.24,0.699 0.345,1.433 0.357,2.171c0.017,3.417 0.052,6.836 -0.002,10.253c-0.019,0.733 -0.132,1.463 -0.379,2.156c-0.153,0.43 -0.356,0.842 -0.609,1.222c-0.361,0.544 -0.823,1.017 -1.358,1.391c-0.452,0.316 -0.953,0.56 -1.477,0.732c-0.649,0.212 -1.327,0.311 -2.007,0.328c-10.111,0.158 -20.226,0.191 -30.336,0c-0.609,-0.019 -1.213,-0.116 -1.792,-0.312c-0.402,-0.136 -0.789,-0.318 -1.15,-0.541c-0.293,-0.181 -0.568,-0.389 -0.822,-0.62c-0.88,-0.8 -1.487,-1.864 -1.802,-3.005c-0.166,-0.604 -0.248,-1.226 -0.264,-1.851c-0.051,-3.279 -0.052,-6.559 0,-9.838c0.019,-0.733 0.132,-1.463 0.379,-2.156c0.153,-0.43 0.356,-0.842 0.609,-1.222c0.361,-0.543 0.823,-1.017 1.358,-1.391c0.452,-0.316 0.953,-0.56 1.477,-0.732c0.649,-0.212 1.327,-0.31 2.007,-0.328c10.083,-0.158 20.168,-0.054 30.252,-0.001Zm-30.079,1.999c-0.425,0.002 -0.849,0.043 -1.262,0.146c-0.641,0.16 -1.244,0.469 -1.708,0.944c-0.161,0.166 -0.305,0.349 -0.427,0.544c-0.167,0.266 -0.296,0.555 -0.391,0.855c-0.148,0.468 -0.209,0.957 -0.217,1.447c-0.016,3.231 -0.05,6.461 0.001,9.691c0.012,0.441 0.067,0.88 0.179,1.307c0.21,0.798 0.619,1.552 1.233,2.111c0.164,0.149 0.341,0.283 0.529,0.399c0.232,0.144 0.481,0.26 0.739,0.348c0.407,0.137 0.832,0.2 1.26,0.208c10.061,0.063 20.124,0.157 30.185,-0.001c0.398,-0.011 0.795,-0.057 1.182,-0.158c0.621,-0.163 1.206,-0.469 1.657,-0.931c0.151,-0.155 0.286,-0.325 0.404,-0.507c0.169,-0.262 0.301,-0.547 0.398,-0.844c0.153,-0.462 0.219,-0.946 0.232,-1.432c0.054,-3.417 0.054,-6.836 0,-10.254c-0.013,-0.485 -0.079,-0.97 -0.232,-1.432c-0.097,-0.297 -0.229,-0.582 -0.398,-0.844c-0.118,-0.182 -0.253,-0.352 -0.404,-0.507c-0.451,-0.462 -1.036,-0.768 -1.657,-0.931c-0.387,-0.101 -0.784,-0.147 -1.182,-0.158c-10.039,-0.157 -20.081,-0.001 -30.121,-0.001Z" style={{fillRule:'nonzero'}}/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Watch YouTube Video</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageYtVidFour &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://youtu.be/oQUgnloOS6Q?si=EBSqlYaq1HfYz7p4', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageYtVidFour(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageYtVidFour &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimYtVidFour();
                                                            }} disabled={ytVidFourDisabled}>
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
                                                task.claimTreshold === 'yt-vid-five' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="25px" height="25px"><rect  x="0" y="0" width="20px" height="20px" style={{fill: 'none'}}/><path d="M24,40l-2,0l0,-1c-0.37,0.438 -0.563,0.574 -0.979,0.782c-0.417,0.233 -0.836,0.218 -1.23,0.218c-0.484,0 -1.034,-0.437 -1.291,-0.765c-0.232,-0.3 -0.5,-0.61 -0.5,-1.235l0,-9l2,0l0,8c0,0.23 0.268,1.007 1,1c0.813,-0.008 0.819,-0.767 1,-1l0,-8l2,0l0,11Zm4,0l-2,0l0,-14l2,0l0,4c0.23,-0.36 0.575,-0.643 0.9,-0.805c0.324,-0.165 0.648,-0.255 0.973,-0.255c0.649,0 1.159,0.23 1.505,0.671c0.349,0.441 0.622,1.026 0.622,1.889l0,6c0,0.741 -0.251,1.202 -0.576,1.6c-0.321,0.392 -0.802,0.894 -1.424,0.9c-1.051,0.011 -1.614,-0.549 -2,-1l0,1Zm-11,-12l-2,0l0,12l-2,0l0,-12l-2,0l0,-2l6,0l0,2Zm18,7l0,1.546c0,0.557 0.075,0.917 0.216,1.126c0.138,0.23 0.417,0.332 0.784,0.328c0.406,-0.004 0.663,-0.085 0.801,-0.269c0.14,-0.165 0.199,-0.628 0.199,-1.231l0,-0.5l2,0l0,0.592c0,1.093 -0.088,1.902 -0.624,2.435c-0.508,0.557 -1.3,0.815 -2.338,0.815c-0.951,0 -1.692,-0.279 -2.227,-0.858c-0.53,-0.579 -0.808,-1.369 -0.808,-2.392l0,-4.708c0,-0.904 0.317,-1.574 0.9,-2.173c0.467,-0.479 1.346,-0.711 2.295,-0.711c0.951,0 1.617,0.201 2.122,0.734c0.514,0.533 0.68,1.152 0.68,2.15l0,3.116l-4,0Zm-5,-3c0,-1.001 -0.448,-1.5 -1,-1.5c-0.552,0 -0.991,0.497 -1,1l0,6c0.009,0.288 0.448,0.5 1,0.5c0.552,0 1,-0.425 1,-0.977l0,-5.023Zm7,1l0,-1c0,-0.615 -0.448,-1 -1,-1c-0.552,0 -0.991,0.463 -1,1l0,1l2,0Z"/><path d="M19,5l-2,6l-2,-6l-2,0l3,9l0,6l2,0l0,-6l3,-9l-2,0Zm6,12c0,0.969 -0.676,1 -1,1c-0.3,0 -1,-0.013 -1,-1l0,-5c0,-0.815 0.433,-1 1,-1c0.3,0 1,-0.002 1,1l0,5Zm1.24,-7.278c-0.627,-0.576 -1.27,-0.722 -2.24,-0.722c-1.068,0 -1.591,0.168 -2.242,0.701c-0.625,0.53 -0.799,0.937 -0.758,2.299l0,5c0,0.996 0.162,1.652 0.765,2.236c0.625,0.579 1.216,0.764 2.235,0.764c1.065,0 1.648,-0.184 2.248,-0.765c0.627,-0.558 0.752,-1.237 0.752,-2.235l0,-5c0,-0.882 -0.157,-1.721 -0.76,-2.278Zm6.76,-0.722l0,8c-0.011,0.683 -0.816,1 -1,1c-0.208,0 -1,-0.042 -1,-1l0,-8l-2,0l0,9c0,0.972 0.98,2 2,2c1.02,0 1.559,-0.513 2,-1l0,1l2,0l0,-11l-2,0Z" style={{fillRule: 'nonzero'}}/><path d="M40.584,22.001c0.709,0.011 1.415,0.108 2.091,0.329c0.546,0.179 1.067,0.437 1.535,0.773c0.529,0.381 0.985,0.861 1.339,1.409c0.248,0.384 0.446,0.8 0.594,1.233c0.24,0.699 0.345,1.433 0.357,2.171c0.017,3.417 0.052,6.836 -0.002,10.253c-0.019,0.733 -0.132,1.463 -0.379,2.156c-0.153,0.43 -0.356,0.842 -0.609,1.222c-0.361,0.544 -0.823,1.017 -1.358,1.391c-0.452,0.316 -0.953,0.56 -1.477,0.732c-0.649,0.212 -1.327,0.311 -2.007,0.328c-10.111,0.158 -20.226,0.191 -30.336,0c-0.609,-0.019 -1.213,-0.116 -1.792,-0.312c-0.402,-0.136 -0.789,-0.318 -1.15,-0.541c-0.293,-0.181 -0.568,-0.389 -0.822,-0.62c-0.88,-0.8 -1.487,-1.864 -1.802,-3.005c-0.166,-0.604 -0.248,-1.226 -0.264,-1.851c-0.051,-3.279 -0.052,-6.559 0,-9.838c0.019,-0.733 0.132,-1.463 0.379,-2.156c0.153,-0.43 0.356,-0.842 0.609,-1.222c0.361,-0.543 0.823,-1.017 1.358,-1.391c0.452,-0.316 0.953,-0.56 1.477,-0.732c0.649,-0.212 1.327,-0.31 2.007,-0.328c10.083,-0.158 20.168,-0.054 30.252,-0.001Zm-30.079,1.999c-0.425,0.002 -0.849,0.043 -1.262,0.146c-0.641,0.16 -1.244,0.469 -1.708,0.944c-0.161,0.166 -0.305,0.349 -0.427,0.544c-0.167,0.266 -0.296,0.555 -0.391,0.855c-0.148,0.468 -0.209,0.957 -0.217,1.447c-0.016,3.231 -0.05,6.461 0.001,9.691c0.012,0.441 0.067,0.88 0.179,1.307c0.21,0.798 0.619,1.552 1.233,2.111c0.164,0.149 0.341,0.283 0.529,0.399c0.232,0.144 0.481,0.26 0.739,0.348c0.407,0.137 0.832,0.2 1.26,0.208c10.061,0.063 20.124,0.157 30.185,-0.001c0.398,-0.011 0.795,-0.057 1.182,-0.158c0.621,-0.163 1.206,-0.469 1.657,-0.931c0.151,-0.155 0.286,-0.325 0.404,-0.507c0.169,-0.262 0.301,-0.547 0.398,-0.844c0.153,-0.462 0.219,-0.946 0.232,-1.432c0.054,-3.417 0.054,-6.836 0,-10.254c-0.013,-0.485 -0.079,-0.97 -0.232,-1.432c-0.097,-0.297 -0.229,-0.582 -0.398,-0.844c-0.118,-0.182 -0.253,-0.352 -0.404,-0.507c-0.451,-0.462 -1.036,-0.768 -1.657,-0.931c-0.387,-0.101 -0.784,-0.147 -1.182,-0.158c-10.039,-0.157 -20.081,-0.001 -30.121,-0.001Z" style={{fillRule:'nonzero'}}/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Watch YouTube Video</p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageYtVidFive &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://youtu.be/MSIXr5UwoX4?si=Xrt-piY5jxdesb3V', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageYtVidFive(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageYtVidFive &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimYtVidFive();
                                                            }} disabled={ytVidFiveDisabled}>
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
                                                task.claimTreshold === 'yt-vid-six' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <>
                                                                <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="25px" height="25px"><rect  x="0" y="0" width="20px" height="20px" style={{fill: 'none'}}/><path d="M24,40l-2,0l0,-1c-0.37,0.438 -0.563,0.574 -0.979,0.782c-0.417,0.233 -0.836,0.218 -1.23,0.218c-0.484,0 -1.034,-0.437 -1.291,-0.765c-0.232,-0.3 -0.5,-0.61 -0.5,-1.235l0,-9l2,0l0,8c0,0.23 0.268,1.007 1,1c0.813,-0.008 0.819,-0.767 1,-1l0,-8l2,0l0,11Zm4,0l-2,0l0,-14l2,0l0,4c0.23,-0.36 0.575,-0.643 0.9,-0.805c0.324,-0.165 0.648,-0.255 0.973,-0.255c0.649,0 1.159,0.23 1.505,0.671c0.349,0.441 0.622,1.026 0.622,1.889l0,6c0,0.741 -0.251,1.202 -0.576,1.6c-0.321,0.392 -0.802,0.894 -1.424,0.9c-1.051,0.011 -1.614,-0.549 -2,-1l0,1Zm-11,-12l-2,0l0,12l-2,0l0,-12l-2,0l0,-2l6,0l0,2Zm18,7l0,1.546c0,0.557 0.075,0.917 0.216,1.126c0.138,0.23 0.417,0.332 0.784,0.328c0.406,-0.004 0.663,-0.085 0.801,-0.269c0.14,-0.165 0.199,-0.628 0.199,-1.231l0,-0.5l2,0l0,0.592c0,1.093 -0.088,1.902 -0.624,2.435c-0.508,0.557 -1.3,0.815 -2.338,0.815c-0.951,0 -1.692,-0.279 -2.227,-0.858c-0.53,-0.579 -0.808,-1.369 -0.808,-2.392l0,-4.708c0,-0.904 0.317,-1.574 0.9,-2.173c0.467,-0.479 1.346,-0.711 2.295,-0.711c0.951,0 1.617,0.201 2.122,0.734c0.514,0.533 0.68,1.152 0.68,2.15l0,3.116l-4,0Zm-5,-3c0,-1.001 -0.448,-1.5 -1,-1.5c-0.552,0 -0.991,0.497 -1,1l0,6c0.009,0.288 0.448,0.5 1,0.5c0.552,0 1,-0.425 1,-0.977l0,-5.023Zm7,1l0,-1c0,-0.615 -0.448,-1 -1,-1c-0.552,0 -0.991,0.463 -1,1l0,1l2,0Z"/><path d="M19,5l-2,6l-2,-6l-2,0l3,9l0,6l2,0l0,-6l3,-9l-2,0Zm6,12c0,0.969 -0.676,1 -1,1c-0.3,0 -1,-0.013 -1,-1l0,-5c0,-0.815 0.433,-1 1,-1c0.3,0 1,-0.002 1,1l0,5Zm1.24,-7.278c-0.627,-0.576 -1.27,-0.722 -2.24,-0.722c-1.068,0 -1.591,0.168 -2.242,0.701c-0.625,0.53 -0.799,0.937 -0.758,2.299l0,5c0,0.996 0.162,1.652 0.765,2.236c0.625,0.579 1.216,0.764 2.235,0.764c1.065,0 1.648,-0.184 2.248,-0.765c0.627,-0.558 0.752,-1.237 0.752,-2.235l0,-5c0,-0.882 -0.157,-1.721 -0.76,-2.278Zm6.76,-0.722l0,8c-0.011,0.683 -0.816,1 -1,1c-0.208,0 -1,-0.042 -1,-1l0,-8l-2,0l0,9c0,0.972 0.98,2 2,2c1.02,0 1.559,-0.513 2,-1l0,1l2,0l0,-11l-2,0Z" style={{fillRule: 'nonzero'}}/><path d="M40.584,22.001c0.709,0.011 1.415,0.108 2.091,0.329c0.546,0.179 1.067,0.437 1.535,0.773c0.529,0.381 0.985,0.861 1.339,1.409c0.248,0.384 0.446,0.8 0.594,1.233c0.24,0.699 0.345,1.433 0.357,2.171c0.017,3.417 0.052,6.836 -0.002,10.253c-0.019,0.733 -0.132,1.463 -0.379,2.156c-0.153,0.43 -0.356,0.842 -0.609,1.222c-0.361,0.544 -0.823,1.017 -1.358,1.391c-0.452,0.316 -0.953,0.56 -1.477,0.732c-0.649,0.212 -1.327,0.311 -2.007,0.328c-10.111,0.158 -20.226,0.191 -30.336,0c-0.609,-0.019 -1.213,-0.116 -1.792,-0.312c-0.402,-0.136 -0.789,-0.318 -1.15,-0.541c-0.293,-0.181 -0.568,-0.389 -0.822,-0.62c-0.88,-0.8 -1.487,-1.864 -1.802,-3.005c-0.166,-0.604 -0.248,-1.226 -0.264,-1.851c-0.051,-3.279 -0.052,-6.559 0,-9.838c0.019,-0.733 0.132,-1.463 0.379,-2.156c0.153,-0.43 0.356,-0.842 0.609,-1.222c0.361,-0.543 0.823,-1.017 1.358,-1.391c0.452,-0.316 0.953,-0.56 1.477,-0.732c0.649,-0.212 1.327,-0.31 2.007,-0.328c10.083,-0.158 20.168,-0.054 30.252,-0.001Zm-30.079,1.999c-0.425,0.002 -0.849,0.043 -1.262,0.146c-0.641,0.16 -1.244,0.469 -1.708,0.944c-0.161,0.166 -0.305,0.349 -0.427,0.544c-0.167,0.266 -0.296,0.555 -0.391,0.855c-0.148,0.468 -0.209,0.957 -0.217,1.447c-0.016,3.231 -0.05,6.461 0.001,9.691c0.012,0.441 0.067,0.88 0.179,1.307c0.21,0.798 0.619,1.552 1.233,2.111c0.164,0.149 0.341,0.283 0.529,0.399c0.232,0.144 0.481,0.26 0.739,0.348c0.407,0.137 0.832,0.2 1.26,0.208c10.061,0.063 20.124,0.157 30.185,-0.001c0.398,-0.011 0.795,-0.057 1.182,-0.158c0.621,-0.163 1.206,-0.469 1.657,-0.931c0.151,-0.155 0.286,-0.325 0.404,-0.507c0.169,-0.262 0.301,-0.547 0.398,-0.844c0.153,-0.462 0.219,-0.946 0.232,-1.432c0.054,-3.417 0.054,-6.836 0,-10.254c-0.013,-0.485 -0.079,-0.97 -0.232,-1.432c-0.097,-0.297 -0.229,-0.582 -0.398,-0.844c-0.118,-0.182 -0.253,-0.352 -0.404,-0.507c-0.451,-0.462 -1.036,-0.768 -1.657,-0.931c-0.387,-0.101 -0.784,-0.147 -1.182,-0.158c-10.039,-0.157 -20.081,-0.001 -30.121,-0.001Z" style={{fillRule:'nonzero'}}/></svg>
                                                            </>
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>These Crypto Scams Could Drain Your Wallet </p>
                                                            <span className='text-[#A6A6A6]'>+1000 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageYtVidSix &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://youtu.be/nc6p__Opot4?si=H2DoVygvl-65fujH', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageYtVidSix(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageYtVidSix &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimYtVidSix();
                                                            }} disabled={ytVidSixDisabled}>
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
                                                task.claimTreshold === 'tiktok-aidogs' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Follow on TikTok</p>
                                                            <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageTikTokAiDogs &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open(' https://www.tiktok.com/@aidogscomm', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageTiktokAiDogs(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageTikTokAiDogs &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimTikTokAiDogs();
                                                            }} disabled={tikTokAiDogsDisabled}>
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
                                                task.claimTreshold === 'aidogs-ugc' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Join AiDogs Ugc Channel</p>
                                                            <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageAiDogsUgc &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('  https://t.me/aidogsugc', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageAiDogsUgc(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageAiDogsUgc &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimAiDogsUgc();
                                                            }} disabled={aiDogsUgcDisabled}>
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
                                                task.claimTreshold === 'send-to-binance' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Send your AiDogs invite URL to Binance</p>
                                                            <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageSendToBinance &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://x.com/binance/status/1834250575027851466?s=19', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageSendToBinance(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageSendToBinance &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimSendToBinance();
                                                            }} disabled={sendToBinanceDisabled}>
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
                                                task.claimTreshold === 'send-to-hamster' &&
                                                <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                                    <div className='flex items-center'>
                                                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                            <img className="w-full" src={logoBig} alt="" />
                                                        </div>
                                                        <div className='flex flex-col pl-5'>
                                                            <p className='text-white text-bold taskTitle' onClick={() => {}}>Send your AiDogs invite URL to Hamster</p>
                                                            <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="">
                                                        {
                                                            !task.rewardClaimed && !engageSendToHamster &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://x.com/hamster_kombat/status/1834251006193836164?s=19', '_blank');
                                                                setTimeout(() => {
                                                                    setEngageSendToHamster(true)
                                                                }, 5000)
                                                            }}>
                                                                Start
                                                            </button>
                                                        }
                                                        {
                                                            !task.rewardClaimed && engageSendToHamster &&
                                                            <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                                claimSendToHamster();
                                                            }} disabled={sendToHamsterDisabled}>
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
                            </div>
                        </>
                    }
                    
                    {
                        currentView === 'Partners' &&
                        <div className="flex flex-col gap-3 my-3">
                        {
                            rearrangeRewards(socialTasks).map((task: any) => (
                                !task.rewardClaimed &&
                                <>
                                    {
                                        task.claimTreshold === 'gift-for-tomarket' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Celebrate Gift For Tomarket Users</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageToMarketGift &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={async () => {
                                                        window.open(urlToMarketGift, '_blank');
                                                        setTimeout(() => {
                                                            setEngageToMarketGift(true)
                                                        }, 5000)
                                                    }}>
                                                        Share
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageToMarketGift &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimToMarket();
                                                    }} disabled={toMarketGiftDisabled}>
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
                                        task.claimTreshold === 'invite-url-tomarket' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Send your invite URL to Tomarket</p>
                                                    <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageInviteTomarket &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={async () => {
                                                        window.open('https://x.com/TomarketFarmer/status/1830637993847378211?s=19', '_blank');
                                                        setTimeout(() => {
                                                            setEngageInviteToMarket(true)
                                                        }, 5000)
                                                    }}>
                                                        Start
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageInviteTomarket &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimInviteToMarket();
                                                    }} disabled={inviteTomarketDisabled}>
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
                                        task.claimTreshold === 'join-goats' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join GOATS</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageJoinGoats &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/realgoats_bot/run?startapp=15a53980-df21-4471-94b5-8adb00f41c54', '_blank');
                                                        setTimeout(() => {
                                                            setEngageJoinGoats(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageJoinGoats &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimJoinGoats();
                                                    }} disabled={joinGoatsDisabled}>
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
                                        task.claimTreshold === 'follow-birds-x' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Follow Birds on X</p>
                                                    <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageFollowBirds &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://x.com/TheBirdsDogs', '_blank');
                                                        setTimeout(() => {
                                                            setEngageFollowBirds(true)
                                                        }, 5000)
                                                    }}>
                                                        Follow
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageFollowBirds &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimFollowBirds();
                                                    }} disabled={followBirdsDisabled}>
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
                                        task.claimTreshold === 'sub-birds-yt' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join Birds Telegram</p>
                                                    <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                </div>
                                            </div>
                                            
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageYoutubeBirds &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://t.me/+PLeoc54Kw5oxN2M9', '_blank');
                                                        setTimeout(() => {
                                                            setEngageYoutubeBirds(true)
                                                        }, 5000)
                                                    }}>
                                                        Start
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageYoutubeBirds &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimYoutubeBirds();
                                                    }} disabled={youtubeBirdsDisabled}>
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
                                        task.claimTreshold === 'play-birds' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Play BIRDS</p>
                                                    <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                </div>
                                            </div>
                                            
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engagePlayBirds &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://t.me/birdx2_bot/birdx?startapp=1920150983', '_blank');
                                                        setTimeout(() => {
                                                            setEngagePlayBirds(true)
                                                        }, 5000)
                                                    }}>
                                                        Start
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engagePlayBirds &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimPlayBirds();
                                                    }} disabled={playBirdsDisabled}>
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
                                    {/*
                                        task.claimTreshold === 'ton-ai' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join TonAi</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageJoinTonAi &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/PeaAIBot/App?startapp=sid-66d828e3841369003ba7e67b', '_blank');
                                                        setTimeout(() => {
                                                            setEngageJoinTonAi(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageJoinTonAi &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimJoinTonAi();
                                                    }} disabled={joinTonAiDisabled}>
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
                                    */}
                                    {
                                        task.claimTreshold === 'hold-coin-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Play HoldCoin</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageHoldCoin &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/theHoldCoinBot/app?startapp=ref_yoiyTgVL', '_blank');
                                                        setTimeout(() => {
                                                            setEngageHoldCoin(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageHoldCoin &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimHoldCoin();
                                                    }} disabled={holdCoinDisabled}>
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
                                        task.claimTreshold === 'hold-coin-channel' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join HoldCoin Channel</p>
                                                    <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageHoldCoinChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/+hp2cVksOOh9lN2Q1', '_blank');
                                                        setTimeout(() => {
                                                            setEngageHoldCoinChannel(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageHoldCoinChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimHoldCoinChannel();
                                                    }} disabled={holdCoinChannelDisabled}>
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
                                    {/*
                                        task.claimTreshold === 'fish-coin-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join Fish</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageFishCoin &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/fishing_bowl_bot/fish?startapp=EQC0IERgAcF43DTAj-vJe58ARq1sd7B-lOagI-c3HAIo-y6W', '_blank');
                                                        setTimeout(() => {
                                                            setEngageFishCoin(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageFishCoin &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimFishCoin();
                                                    }} disabled={fishCoinDisabled}>
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
                                        task.claimTreshold === 'fish-coin-channel' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join Fish Channel</p>
                                                    <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageFishCoinChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/+xIPbexMUSB1lZDBk', '_blank');
                                                        setTimeout(() => {
                                                            setEngageFishCoinChannel(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageFishCoinChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimFishCoinChannel();
                                                    }} disabled={fishChannelDisabled}>
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
                                    */}
                                    {
                                        task.claimTreshold === 'piggy-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                    <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Play PiggyPiggy</p>
                                                    <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                </div>
                                            </div>
                                            
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engagePiggy &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {window.open('https://t.me/PiggyPiggyofficialbot/game?startapp=share_6106532625', '_blank');
                                                        setTimeout(() => {
                                                            setEngagePiggy(true)
                                                        }, 5000)
                                                    }}>
                                                        Start
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engagePiggy &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimPiggy();
                                                    }} disabled={piggyDisabled}>
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
                                        task.claimTreshold === 'dl-coin-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Play DLCoin</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageDlCoin &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/DLCoinBot/app?startapp=i_13628839653', '_blank');
                                                        setTimeout(() => {
                                                            setEngageDlCoin(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageDlCoin &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimDlCoin();
                                                    }} disabled={dlCoinDisabled}>
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
                                        task.claimTreshold === 'dl-coin-channel' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join DlCoin Channel</p>
                                                    <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageDlCoinChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/+DztFJQr8dPMyMTQ0', '_blank');
                                                        setTimeout(() => {
                                                            setEngageDlCoinChannel(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageDlCoinChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimDlCoinChannel();
                                                    }} disabled={dlCoinChannelDisabled}>
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
                                        task.claimTreshold === 'ghost-drive-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Play Ghost Drive</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageGhostDrive &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/ghostdrive_bot?start=QCL7Yrigko', '_blank');
                                                        setTimeout(() => {
                                                            setEngageGhostDrive(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageGhostDrive &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimGhostDrive();
                                                    }} disabled={ghostDriveDisabled}>
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
                                        task.claimTreshold === 'ghost-drive-channel' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join Ghost Drive Channel</p>
                                                    <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageGhostDriveChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('http://t.me/ghostdrive_web3', '_blank');
                                                        setTimeout(() => {
                                                            setEngageGhostDriveChannel(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageGhostDriveChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimGhostDriveChannel();
                                                    }} disabled={ghostDriveChannelDisabled}>
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
                                    {/*
                                        task.claimTreshold === 'pokemon-ball-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Play Pokemon Ball</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engagePokemonBall &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('http://t.me/PokemonBall_bot?start=6106532625', '_blank');
                                                        setTimeout(() => {
                                                            setEngagePokemonBall(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engagePokemonBall &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimPokemonBall();
                                                    }} disabled={pokemonBallDisabled}>
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
                                        task.claimTreshold === 'pokemon-bot-channel' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join Pokemon Ball Channel</p>
                                                    <span className='text-[#A6A6A6]'>+500 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engagePokemonBallChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/+6dMVsdwxF0JiZmIy', '_blank');
                                                        setTimeout(() => {
                                                            setEngagePokemonBallChannel(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engagePokemonBallChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimPokemonBallChannel();
                                                    }} disabled={pokemonBallChannelDisabled}>
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
                                    */}
                                    {/*
                                        task.claimTreshold === 'pigs-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join Pigs</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engagePigsBot &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/PigshouseBot?start=6374484959', '_blank');
                                                        setTimeout(() => {
                                                            setEngagePigsBot(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engagePigsBot &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimPigsBot();
                                                    }} disabled={pigsBotDisabled}>
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
                                    */}
                                    {/*
                                        task.claimTreshold === 'pigs-channel' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join Pigs Tg Channel</p>
                                                    <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engagePigsChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/+O-k5HRrBaMI1NjZk', '_blank');
                                                        setTimeout(() => {
                                                            setEngagePigsChannel(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engagePigsChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimPigsChannel();
                                                    }} disabled={pigsChannelDisabled}>
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
                                    */}
                                    {/*
                                        task.claimTreshold === 'ton-party-bot' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join TonParty</p>
                                                    <span className='text-[#A6A6A6]'>+2000 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageTonPartyBot &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/tonparty_bot/party?startapp=ref_Ub5gbwDL', '_blank');
                                                        setTimeout(() => {
                                                            setEngageTonPartyBot(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageTonPartyBot &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimTonPartyBot();
                                                    }} disabled={tonPartyBotDisabled}>
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
                                        task.claimTreshold === 'ton-party-channel' &&
                                        <div className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3'>
                                            <div className='flex items-center'>
                                                <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                                <img className="w-full" src={logoBig} alt="" />
                                                </div>
                                                <div className='flex flex-col pl-5'>
                                                    <p className='text-white text-bold taskTitle' onClick={() => {}}>Join TonParty Tg Channel</p>
                                                    <span className='text-[#A6A6A6]'>+150 $AIDOGS</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    !task.rewardClaimed && !engageTonPartyChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        window.open('https://t.me/+5ITZoOxz9io1NWVk', '_blank');
                                                        setTimeout(() => {
                                                            setEngageTonPartyChannel(true)
                                                        }, 5000)
                                                    }}>
                                                        Join
                                                    </button>
                                                }
                                                {
                                                    !task.rewardClaimed && engageTonPartyChannel &&
                                                    <button className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px] ${task.rewardClaimed && "opacity-50"}`} onClick={() => {
                                                        claimTonPartyChannel();
                                                    }} disabled={tonPartyChannelDisabled}>
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
                                    */}
                                </>
                            ))
                        }
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
