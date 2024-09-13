import { useCallback, useEffect, useMemo, useState } from "react";
import logoBig from "../../assets/img/logobig.png";
import Footer from "../../components/footer";
//import { toast } from "react-hot-toast";
import axios from "axios";
import { capitalizeAllFirstLetters } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import medal from "../../assets/img/medal.png";
import BottomSheet from "../../components/BottomSheet";
import { toast } from 'react-hot-toast';


const Contest = () => {
    const colorCodes = useMemo(() => ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF", "#000000", "#A6A6A6"], []);
    const getUserCookies = sessionStorage.getItem('authUserLoggedInAI');
    const getUserCookiesParsed = JSON.parse(getUserCookies as string);

    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
    const [referralLeaderboard, setReferralLeaderboard] = useState<any>([]);
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
    //const [engageFollowBirds, setEngageFollowBirds] = useState(false);
    const [engageYoutube, setEngageYoutube] = useState(false);
    //const [engageYoutubeBirds, setEngageYoutubeBirds] = useState(false);
    //const [engagePlayBirds, setEngagePlayBirds] = useState(false);
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
    const [engagePokemonBall, setEngagePokemonBall] = useState(false);
    const [engagePokemonBallChannel, setEngagePokemonBallChannel] = useState(false);
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
    //const [followBirdsDisabled, setFollowBirdsDisabled] = useState(false);
    const [youtubeDisabled, setYoutubeDisabled] = useState(false);
    //const [youtubeBirdsDisabled, setYoutubeBirdsDisabled] = useState(false);
    //const [playBirdsDisabled, setPlayBirdsDisabled] = useState(false);
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
    const [pokemonBallDisabled, setPokemonBallDisabled] = useState(false);
    const [pokemonBallChannelDisabled, setPokemonBallChannelDisabled] = useState(false);
    const [tgStart, setTgStart] = useState(true);
    const [tgClaim, setTgClaim] = useState(false);
    const [pointsToday, setPointsToday] = useState(0);

    const [referees, setReferees] = useState(0);
    const navigate = useNavigate();

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

            const getReferralsLeaderboard = await axios.post(`${import.meta.env.VITE_APP_URL}/referral-leaderboard-data`, {user})
            console.log(getReferralsLeaderboard?.data)
            const sortedData = getReferralsLeaderboard.data.leaderboardData.map((board: any, index: number) => {
                return {
                    id: board.userId, 
                    name: board.firstName.length > 10 ? board.firstName.slice(0, -2) : board.firstName, 
                    points: board.referralPoints, 
                    position: index + 1
                }
                })
            setReferralLeaderboard(sortedData);
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

    function sortArrayByPointsDescending(arr: any) {
        return arr.sort((a: any, b: any) => b.points - a.points);
    }

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

    /*const claimFollowBirds = async () => {
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

    const claimJoinTonAi = async () => {
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

    const claimPokemonBall = async () => {
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
    };


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
                        <div className="flex flex-col gap-3 my-3">
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
                                    {/*
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
                                    {
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
                                    {
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
                                    }
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
                        <div className=" flex justify-between items-center px-3 py-3 w-full gap-5 mt-2 border-b-[1px]">
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
                        </div>
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
