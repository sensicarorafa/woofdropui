import React, { useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import logoBig from "../../assets/img/logobig.png";
//import logoSm from "../../assets/img/logosm.svg";

import Footer from "../footer";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import BottomSheet from '../BottomSheet';
import Countdown from '../Countdown';
import lock from '../../assets/img/lock.png';



const HomeTab = () => {
    // Cache sessionStorage values

    const getUserCookies = sessionStorage.getItem('authUserLoggedInAI');
    const getUserCookiesParsed = JSON.parse(getUserCookies as string);

    const [totalPoints, setTotalPoints] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.pointsNo : 0);
    const [socialTasks, setSocialTasks] = useState<any>(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.socialRewardDeets : []);
    const [dailyLoginTasks, setDailyLoginTasks] = useState<any>(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralRewardDeets : []);
    const [referralCode, setReferralCode] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralCode : '');
    const [pointsToday, setPointsToday] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.pointsToday : 0);
    const [referees, setReferees] = useState(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.referralPoints : 0);
    const [lastLogin, setLastLogin] = useState<any>(getUserCookiesParsed ? getUserCookiesParsed?.data?.userData?.lastLogin : null)
    //const [engageTask, setEngageTask] = useState(false);

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
    const [engageFishCoin, setEngageFishCoin] = useState(false);
    const [engageFishCoinChannel, setEngageFishCoinChannel] = useState(false);
    const [engageYtVidThree, setEngageYtVidThree] = useState(false);
    const [engageYtVidFour, setEngageYtVidFour] = useState(false);
    const [engageYtVidFive, setEngageYtVidFive] = useState(false);
    const [engageYtVidSix, setEngageYtVidSix] = useState(false);
    const [engageTikTokAiDogs, setEngageTiktokAiDogs] = useState(false);
    const [engageAiDogsUgc, setEngageAiDogsUgc] = useState(false);
    const [engageSendToBinance, setEngageSendToBinance] = useState(false);
    const [engageSendToHamster, setEngageSendToHamster] = useState(false);
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
    const [ytVidFourDisabled, setYtVidFourDisabled] = useState(false);
    const [ytVidFiveDisabled, setYtVidFiveDisabled] = useState(false);
    const [joinGoatsDisabled, setJoinGoatsDisabled] = useState(false);
    //const [joinTonAiDisabled, setJoinTonAiDisabled] = useState(false);
    const [holdCoinDisabled, setHoldCoinDisabled] = useState(false);
    const [holdCoinChannelDisabled, setHoldCoinChannelDisabled] = useState(false);
    //const [pigsBotDisabled, setPigsBotDisabled] = useState(false);
    //const [pigsChannelDisabled, setPigsChannelDisabled] = useState(false);
    //const [tonPartyBotDisabled, setTonPartyBotDisabled] = useState(false);
    //const [tonPartyChannelDisabled, setTonPartyChannelDisabled] = useState(false);
    const [fishCoinDisabled, setFishCoinDisabled] = useState(false);
    const [fishChannelDisabled, setFishChannelDisabled] = useState(false);
    const [ytVidSixDisabled, setYtVidSixDisabled] = useState(false);
    const [tikTokAiDogsDisabled, setTikTokAiDogsDisabled] = useState(false);
    const [aiDogsUgcDisabled, setAiDogsUgcDisabled] = useState(false);
    const [sendToBinanceDisabled, setSendToBinanceDisabled] = useState(false);
    const [sendToHamsterDisabled, setSendToHamsterDisabled] = useState(false);
    const [tgStart, setTgStart] = useState(true);
    const [tgClaim, setTgClaim] = useState(false);
    const [open, setOpenModal] = useState<boolean>(false);
    //const [openBirds, setOpenModalBirds] = useState<boolean>(false);
    const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setHoldCoinChannelDisabled(false);
        }
    };

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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setYtVidFiveDisabled(false)
        }
    }

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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setSendToHamsterDisabled(false)
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setTonPartyChannelDisabled(false);
        }
    };*/

    const claimFishCoin = async () => {
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
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
            setTotalPoints(updatePoints?.data?.userData?.pointsNo);
            setPointsToday(updatePoints?.data?.userData?.pointsToday);
            setSocialTasks(updateSocial?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(updatePoints?.data?.userData?.referralRewardDeets);
            setReferees(updatePoints?.data?.userData?.referralPoints);
            setFishChannelDisabled(false);
        }
    };

    const getPoints = async (idx: number) => {
        if (idx === 0) return 75;
        if(idx === 1) return 100;
        if(idx === 2) return 125;
        if(idx === 3) return 150;
        if(idx === 4) return 175;
        if(idx === 5) return 200;
        if(idx === 6) return 300;
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
        return socialRewardDeets.sort((a: any, b: any) => {
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
            console.log(getUserData?.data, pointsToday)
            setTotalPoints(getUserData?.data?.userData?.pointsNo);
            setPointsToday(getUserData?.data?.userData?.pointsToday);
            setSocialTasks(getUserData?.data?.userData?.socialRewardDeets);
            setDailyLoginTasks(getUserData?.data?.userData?.referralRewardDeets);
            setReferees(getUserData?.data?.userData?.referralPoints);
            setReferralCode(getUserData?.data?.userData?.referralCode);
            setLastLogin(getUserData?.data?.userData?.lastLogin);
        }

        if (user) {
          fetchUserData();
        }
    }, [user])
    
    const referralLink = `${import.meta.env.VITE_TEST_BOT_URL}?start=${referralCode}`;
    const encodedText = useMemo(() => {
        const text = `Are you a Telegram OG??\r\n\nJoin me on AIDOGS and be a part of the dog revolution.\r\n\nEarn 2,500 $AIDOGS when you signup.\r\n\nStart here: ${referralLink} \r\n\n #DOGS #Crypto #AIDOGS`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;

    const encodedToMarketText = useMemo(() => {
        const text = `I just claimed my free 2000 $AIDOGS just for being a Tomarket user.\n\nSignup and claim yours now: ${referralLink}\n\n #AIDOGS #Tomarket`;
        return encodeURIComponent(text);
    }, [referralLink]);

    const urlToMarketGift = `https://twitter.com/intent/tweet?text=${encodedToMarketText}`;

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
      

    return (
        <div className="flex flex-col  items-center w-full justify-end  h-[100%] overflow-hidden">
            {open && 
            <div className='absolute m-auto bg-[#210133] bg-opacity-95 flex items-center h-[100%] w-full top-0  z-[100]'  onClick={closeModal}>
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
                <div className='bg-[#180026] rounded-md px-6 py-4'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={15}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="flex h-[125px] flex-col rounded-lg justify-center align-center items-center text-white bg-white/15 py-5">
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <img className="w-full" src={logoBig} alt="" />
                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-4'>
                                    <p className='text-sm'>Daily Reward</p>
                                </div>
                                <div className="flex flex-col rounded-lg bg-white/20 justify-center align-center m-auto items-center">
                                    {lastLogin &&
                                        <>{
                                            isTimeDifference24HoursOrMore(lastLogin) ?
                                            <button className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]" onClick={handleOpenBottomSheet}>Claim</button> : <Countdown targetTime={lastLogin} />
                                            
                                        }</>
                                    }
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex h-[125px] flex-col rounded-lg justify-center align-center items-center text-white bg-white/15 py-5'>
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" /></svg>
                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-4'>
                                    <p className='text-sm'>Join Telegram</p>
                                </div>
                                <div className="flex flex-col rounded-lg bg-white/20 justify-center align-center m-auto items-center">
                                    <button className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 rounded-[1px]" onClick={() => {openTg()}}>
                                        Join
                                    </button>
                                </div>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex h-[125px] flex-col rounded-lg justify-center align-center items-center text-white bg-white/15 py-5'>
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-4'>
                                    <p className='text-sm'> Follow On X</p>
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

                <div className="w-full flex flex-col pt-7 px-4 relative z-10 gap-5">
                    <p className='text-white text-xl pb-5'>Tasks</p>
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
                                */}
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
                                {
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
                        dailyLoginTasks.map((task: any, idx: any) => (
                            idx !== 7 && idx !== 8 && idx !== 9 &&
                            <div className={`relative flex flex-col gap-1 rounded-lg ${isFirstUnclaimedReward(dailyLoginTasks, idx) && !task.rewardClaimed ? 'border border-white bg-[#C8D5ED]' : 'bg-[#C8D5ED]'} text-white mx-1 my-3 p-1 cursor-pointer`} onClick={() => dailyTasksClaimInit(task, idx)}>
                                <p className={`text-center text-white text-xs absolute top-[-2vh] left-1/2 transform ${isFirstUnclaimedReward(dailyLoginTasks, idx) && !task.rewardClaimed ? 'bg-[#3F015F] bg-opacity-85' : 'bg-[#3F015F]'} -translate-x-1/2 w-[80%] mx-auto px-2 py-1 rounded-md`}>Day {idx + 1}</p>
                                <div className="flex justify-center items-center w-[40%] mx-auto mt-4">
                                    {
                                        task.rewardClaimed &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34.151" height="35.176" viewBox="0 0 49.914 45.791">
                                            <g id="Group_2130" data-name="Group 2130" transform="translate(-40.356 -168.605)">
                                            <path id="Path_621" data-name="Path 621" d="M5.888,168.115a3.092,3.092,0,0,0,1.129.412,3.856,3.856,0,0,0,1.317-.017,3.25,3.25,0,0,0,.97-.331,2.846,2.846,0,0,0,.724-.529,3.337,3.337,0,0,0,.468-.613,2.228,2.228,0,0,0,.256-.588,1.1,1.1,0,0,0,.033-.453.49.49,0,0,0-.2-.3.446.446,0,0,0-.364-.1.683.683,0,0,0-.328.191,4.025,4.025,0,0,0-.335.351,1.96,1.96,0,0,1-.438.37,1.6,1.6,0,0,1-.606.239,1.406,1.406,0,0,1-.819-.084,1.442,1.442,0,0,1-.619-.507,1.981,1.981,0,0,1-.326-.814,2.212,2.212,0,0,1,.082-1.143.813.813,0,0,1,.615-.606.554.554,0,0,1,.392.068.41.41,0,0,1,.211.291,1.142,1.142,0,0,1-.089.454,1.117,1.117,0,0,0-.082.5.647.647,0,0,0,.382.508,1.117,1.117,0,0,0,.673.082,1.266,1.266,0,0,0,.926-.653,1.652,1.652,0,0,0,.2-1.127,1.451,1.451,0,0,0-.519-.868,2.384,2.384,0,0,0-1.075-.5,3.575,3.575,0,0,0-1.353-.009,3.144,3.144,0,0,0-2.1,1.229A3.063,3.063,0,0,0,4.555,166a3.368,3.368,0,0,0,.479,1.267,2.717,2.717,0,0,0,.853.851Z" transform="translate(36.521 29.953)" fill="#e2e2e2"/>
                                            <path id="Path_622" data-name="Path 622" d="M52.571,155.963a1.849,1.849,0,0,1,.435.631,3.855,3.855,0,0,1,.3,1.687,1.632,1.632,0,0,1-.2.711.66.66,0,0,1-.472.357.646.646,0,0,1-.548-.178,1.718,1.718,0,0,1-.434-.6,3.354,3.354,0,0,1-.249-.816,3.446,3.446,0,0,1-.044-.87,2.015,2.015,0,0,1,.2-.747.621.621,0,0,1,.446-.371.64.64,0,0,1,.559.194Zm-2.878-.256a3.094,3.094,0,0,0-.462,2.434,3.207,3.207,0,0,0,.706,1.574,2.726,2.726,0,0,0,1.3.855,3.755,3.755,0,0,0,3.14-.555,2.755,2.755,0,0,0,.937-1.247,3.179,3.179,0,0,0,.13-1.722,3.091,3.091,0,0,0-1.272-2.129,3.441,3.441,0,0,0-4.48.788Z" transform="translate(-1.647 36.688)" fill="#e2e2e2"/>
                                            <path id="Path_623" data-name="Path 623" d="M100.395,149.192a.981.981,0,0,0,.69.1q1.1-.194.953-1.073l-.679-3.854a1.641,1.641,0,0,0-.3-.737,1.021,1.021,0,0,0-.526-.364,1.58,1.58,0,0,0-.706-.017,1.225,1.225,0,0,0-1.066.846l-.808,2.773-1.646-2.387a1.81,1.81,0,0,0-.252-.261.871.871,0,0,0-.342-.159,1.169,1.169,0,0,0-.5-.009,1.373,1.373,0,0,0-.985.53,1.511,1.511,0,0,0-.128,1.082l.682,3.863a.969.969,0,0,0,.3.647.8.8,0,0,0,.6.073.7.7,0,0,0,.486-.268.784.784,0,0,0,.074-.588l-.443-2.508,1.357,1.688a4.27,4.27,0,0,0,.632.634.652.652,0,0,0,.514.115.632.632,0,0,0,.36-.186,1.154,1.154,0,0,0,.23-.456l.708-2.464.409,2.322a.917.917,0,0,0,.386.658Z" transform="translate(-40.009 46.246)" fill="#e2e2e2"/>
                                            <path id="Path_624" data-name="Path 624" d="M151.643,140.065a.683.683,0,0,1-.189.348,1.057,1.057,0,0,1-.323.213,2.033,2.033,0,0,1-.431.121l-.344-1.949a3.06,3.06,0,0,1,.505-.057.912.912,0,0,1,.358.068.523.523,0,0,1,.268.249,1.724,1.724,0,0,1,.153.507,1.271,1.271,0,0,1,0,.5Zm1.021-2.236a2.7,2.7,0,0,0-.922-.284,3.553,3.553,0,0,0-1.091.032l-1.577.278a1.137,1.137,0,0,0-.725.4,1.04,1.04,0,0,0-.151.854l.66,3.74a1.483,1.483,0,0,0,.431.942,1.057,1.057,0,0,0,.855.137,1.041,1.041,0,0,0,.762-.449,1.581,1.581,0,0,0,.086-1.07l-.087-.5.505-.089a3.748,3.748,0,0,0,1.3-.466,2.23,2.23,0,0,0,.835-.865,1.746,1.746,0,0,0,.17-1.158,2.192,2.192,0,0,0-.364-.9,1.942,1.942,0,0,0-.682-.6Z" transform="translate(-86.232 51.116)" fill="#e2e2e2"/>
                                            <path id="Path_625" data-name="Path 625" d="M189.464,132.775a1.3,1.3,0,0,0-.819-.057.956.956,0,0,0-.674.425,1.1,1.1,0,0,0-.14.814l.661,3.748a1.829,1.829,0,0,0,.253.714.785.785,0,0,0,.441.329,1.611,1.611,0,0,0,.677.013l2.313-.408a1.622,1.622,0,0,0,.754-.278.678.678,0,0,0,.13-.663.749.749,0,0,0-.318-.584,1.309,1.309,0,0,0-.749-.023l-1.515.267-.626-3.552a.98.98,0,0,0-.392-.744Z" transform="translate(-120.099 55.246)" fill="#e2e2e2"/>
                                            <path id="Path_626" data-name="Path 626" d="M226.194,124.57a1.272,1.272,0,0,0,.686-.281.8.8,0,0,0-.233-1.114,1.5,1.5,0,0,0-.8-.025l-2.871.507a.932.932,0,0,0-.823,1.241l.66,3.739a1.547,1.547,0,0,0,.418.945.982.982,0,0,0,.816.144l2.871-.507a1.433,1.433,0,0,0,.737-.3.669.669,0,0,0,.147-.638.59.59,0,0,0-.309-.481,1.344,1.344,0,0,0-.738-.02l-1.924.331-.166-.939,1.435-.253a1.508,1.508,0,0,0,.682-.252.46.46,0,0,0,.15-.469.632.632,0,0,0-.281-.481,1.112,1.112,0,0,0-.686-.033l-1.523.269-.184-1.037,1.931-.341Z" transform="translate(-149.419 63.423)" fill="#e2e2e2"/>
                                            <path id="Path_627" data-name="Path 627" d="M259.345,116.251a2.166,2.166,0,0,0-.581.17.617.617,0,0,0-.293.284.759.759,0,0,0-.035.453.694.694,0,0,0,.39.58,1.6,1.6,0,0,0,.868.029l.753-.133.594,3.267a1.621,1.621,0,0,0,.418.945.952.952,0,0,0,.807.146,1.248,1.248,0,0,0,.551-.216.794.794,0,0,0,.268-.472,2.141,2.141,0,0,0-.018-.823l-.565-3.207.824-.146a2,2,0,0,0,.537-.159.66.66,0,0,0,.3-.285.735.735,0,0,0,.048-.479.759.759,0,0,0-.329-.572,1.173,1.173,0,0,0-.749-.051l-3.793.669Z" transform="translate(-180.424 69.884)" fill="#e2e2e2"/>
                                            <path id="Path_628" data-name="Path 628" d="M307.127,113.766a1.343,1.343,0,0,0-.738-.02l-1.924.331-.166-.939,1.436-.253a1.508,1.508,0,0,0,.682-.252.46.46,0,0,0,.15-.469.631.631,0,0,0-.281-.481,1.112,1.112,0,0,0-.686-.034l-1.523.269-.183-1.037,1.931-.341a1.272,1.272,0,0,0,.686-.281.8.8,0,0,0-.233-1.114,1.5,1.5,0,0,0-.8-.025l-2.871.507a.931.931,0,0,0-.823,1.241l.66,3.739a1.547,1.547,0,0,0,.418.945.982.982,0,0,0,.816.144l2.871-.507a1.409,1.409,0,0,0,.737-.3.667.667,0,0,0,.147-.638.592.592,0,0,0-.309-.481Z" transform="translate(-217.451 75.41)" fill="#e2e2e2"/>
                                            <path id="Path_629" data-name="Path 629" d="M75.678,190.745q.677.044,1.363.038a18.46,18.46,0,0,0,3.009-.278l.214-.042q.507-.1,1-.218a18.37,18.37,0,0,0,2.032-.629c.218-.082.437-.167.651-.258s.4-.17.594-.261q.4-.181.778-.383c.144-.076.288-.151.43-.232a18.22,18.22,0,0,0,1.777-1.127c.389-.28.76-.578,1.126-.886.433-.366.852-.746,1.248-1.148a18.031,18.031,0,0,0,1.369-1.558,18.369,18.369,0,0,0,3.7-8.513l-.724.128a17.616,17.616,0,0,1-1.522,4.745c-.2.414-.414.821-.645,1.218-.134.229-.271.453-.415.674q-.43.664-.918,1.29a17.733,17.733,0,0,1-2.769,2.831l-.033.026c-.313.255-.636.5-.967.731l-.184.127c-.287.2-.58.383-.878.562q-.336.2-.683.39-.693.376-1.426.69a17.566,17.566,0,0,1-2.2.772q-.441.125-.894.226c-.261.058-.524.112-.791.159a17.464,17.464,0,0,1-1.981.233c-.218.013-.437.022-.655.028l-.277.006A17.813,17.813,0,0,1,75.06,190h0a17.7,17.7,0,0,1-13.525-8.847l-.724.128a18.439,18.439,0,0,0,10.854,8.751,18.2,18.2,0,0,0,3.268.657c.248.026.5.048.747.064Z" transform="translate(-11.597 18.878)" fill="#e2e2e2"/>
                                            <path id="Path_630" data-name="Path 630" d="M75.69,35.783c-.418-.29-.849-.561-1.289-.817q-.478-.277-.974-.524c-.112-.057-.227-.112-.341-.166-.36-.17-.724-.334-1.094-.481-.218-.087-.437-.17-.66-.248a18.263,18.263,0,0,0-12.2.006c-.218.077-.437.157-.651.243q-.568.227-1.114.486c-.147.07-.293.143-.438.216q-.247.125-.489.258a18.364,18.364,0,0,0-1.588.982l-.15.1a18.236,18.236,0,0,0-2.776,2.413q-.629.669-1.188,1.4a18.085,18.085,0,0,0-1.043,1.5,18.324,18.324,0,0,0-2.555,6.875l.724-.128A17.659,17.659,0,0,1,62.185,33.462h0c.548-.1,1.1-.163,1.639-.208q.5-.042,1-.054c.523-.013,1.043,0,1.558.029a17.443,17.443,0,0,1,3.268.526,17.72,17.72,0,0,1,10.932,8.376L81.306,42A18.382,18.382,0,0,0,75.69,35.78Z" transform="translate(0.083 140.837)" fill="#e2e2e2"/>
                                            <path id="Path_631" data-name="Path 631" d="M51.844,186.916a19.784,19.784,0,0,1-21-10.389l-3.34.588c.513.615,1.512.974,1.908,1.64.468.786.17,2.091.727,2.808s1.9.762,2.536,1.407.664,1.987,1.376,2.552,2.023.285,2.8.762,1.117,1.771,1.946,2.151,2.029-.205,2.9.073,1.5,1.452,2.4,1.623,1.917-.687,2.831-.626,1.806,1.047,2.724,1c.9-.049,1.691-1.127,2.6-1.288s2.022.581,2.882.32c.88-.267,1.394-1.5,2.22-1.867s2.1.083,2.875-.38.987-1.793,1.7-2.346,2.054-.422,2.7-1.06.527-1.975,1.092-2.687,1.892-.9,2.368-1.673.041-2.041.421-2.869,1.624-1.32,1.9-2.189-.449-1.988-.278-2.887c.144-.76.961-1.44,1.232-2.193l-3.34.588a19.782,19.782,0,0,1-16.183,16.946Z" transform="translate(16.862 23.893)" fill="#e2e2e2"/>
                                            <path id="Path_632" data-name="Path 632" d="M33.373,3.594h0a19.872,19.872,0,0,1,4.253-.287c.2.007.4.019.6.033a19.644,19.644,0,0,1,3.159.485A19.8,19.8,0,0,1,54.374,13.98l3.338-.588c-.514-.613-1.51-.973-1.907-1.637-.468-.786-.17-2.091-.725-2.808s-1.9-.76-2.536-1.407-.664-1.987-1.376-2.552-2.023-.285-2.8-.762-1.117-1.771-1.944-2.151S44.4,2.28,43.526,2,42.021.55,41.121.379s-1.917.687-2.831.626-1.806-1.046-2.724-1c-.9.05-1.691,1.127-2.6,1.288S30.945.716,30.084.977c-.88.267-1.394,1.5-2.22,1.867s-2.1-.083-2.875.379S24,5.015,23.287,5.569s-2.054.422-2.7,1.06S20.06,8.6,19.5,9.316s-1.893.9-2.37,1.673-.041,2.041-.421,2.869-1.623,1.32-1.9,2.189.45,1.988.278,2.887c-.144.759-.958,1.439-1.231,2.191l3.34-.588A19.783,19.783,0,0,1,33.373,3.594Z" transform="translate(28.524 168.597)" fill="#e2e2e2"/>
                                            <path id="Path_633" data-name="Path 633" d="M12.84,170.713l47.9-8.445-.17-.969-47.9,8.446Z" transform="translate(29.532 30.797)" fill="#e2e2e2"/>
                                            <path id="Path_634" data-name="Path 634" d="M47.9,89.47l-2.017.355h0l-3.34.59v0h0v0l-1.509.265-.724.128v0h0v0L7.59,96.579h0l-.724.128v0h0v0l-1.509.265h0l-3.341.59v0L0,97.915l.17.967,47.9-8.445Z" transform="translate(40.356 92.165)" fill="#e2e2e2"/>
                                            <path id="Path_635" data-name="Path 635" d="M146.146,71.5l-1.006-.211a.624.624,0,0,1-.415-.316l-.527-.958a.584.584,0,0,0-1.105.2l-.168,1.081a.624.624,0,0,1-.281.438l-.874.543a.669.669,0,0,0,.211,1.2l1.006.211A.624.624,0,0,1,143.4,74l.529.958a.584.584,0,0,0,1.105-.2l.167-1.081a.62.62,0,0,1,.283-.438l.874-.543a.67.67,0,0,0-.211-1.2Z" transform="translate(-80.517 109.068)" fill="#e2e2e2"/>
                                            <path id="Path_636" data-name="Path 636" d="M104.989,92.164l-.692-.146a.425.425,0,0,1-.284-.217l-.363-.658a.4.4,0,0,0-.76.134l-.115.743a.429.429,0,0,1-.194.3l-.6.373a.461.461,0,0,0,.146.824l.692.146a.432.432,0,0,1,.285.217l.363.658a.4.4,0,0,0,.76-.134l.115-.743a.432.432,0,0,1,.194-.3l.6-.374a.46.46,0,0,0-.146-.824Z" transform="translate(-46.602 90.929)" fill="#e2e2e2"/>
                                            <path id="Path_637" data-name="Path 637" d="M197.778,74.7l-.692-.146a.432.432,0,0,1-.285-.217l-.363-.66a.4.4,0,0,0-.76.134l-.115.743a.429.429,0,0,1-.194.3l-.6.373a.46.46,0,0,0,.146.824l.692.146a.432.432,0,0,1,.285.217l.363.66a.4.4,0,0,0,.76-.134l.115-.743a.429.429,0,0,1,.194-.3l.6-.374a.46.46,0,0,0-.146-.824Z" transform="translate(-125.874 105.852)" fill="#e2e2e2"/>
                                            <path id="Path_638" data-name="Path 638" d="M175.988,222.988l-.692-.146a.432.432,0,0,1-.285-.217l-.363-.66a.4.4,0,0,0-.76.134l-.115.743a.425.425,0,0,1-.194.3l-.6.373a.46.46,0,0,0,.146.824l.692.146a.429.429,0,0,1,.284.217l.363.66a.4.4,0,0,0,.76-.134l.115-.744a.428.428,0,0,1,.194-.3l.6-.373a.46.46,0,0,0-.146-.824Z" transform="translate(-107.258 -20.84)" fill="#e2e2e2"/>
                                            </g>
                                        </svg>
                                    }
                                    {
                                        isFirstUnclaimedReward(dailyLoginTasks, idx) && !task.rewardClaimed &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34.151" height="35.176" viewBox="0 0 34.151 35.176">
                                            <g id="Group_2132" data-name="Group 2132" transform="translate(-148.237 -172.082)">
                                                <path id="Path_611" data-name="Path 611" d="M279.436,263.05a17.076,17.076,0,1,0,17.076,17.076A17.094,17.094,0,0,0,279.436,263.05Z" transform="translate(-114.123 -89.943)" fill="#d4923a"/>
                                                <path id="Path_612" data-name="Path 612" d="M304.7,279.1a16.051,16.051,0,1,1-16.051-16.051A16.052,16.052,0,0,1,304.7,279.1Z" transform="translate(-123.339 -89.943)" fill="#f8e75d"/>
                                                <path id="Path_613" data-name="Path 613" d="M318,295.789a3.01,3.01,0,0,1-6.02,0,2.971,2.971,0,0,1,.044-.512,16.1,16.1,0,0,1,2.751-2.489c.071,0,.143-.008.215-.008A3.01,3.01,0,0,1,318,295.79Z" transform="translate(-158.78 -116.699)" fill="#fbfadf"/>
                                                <path id="Path_614" data-name="Path 614" d="M304.7,423.55a16.051,16.051,0,0,1-32.1,0Z" transform="translate(-123.339 -234.391)" fill="#f6c22e"/>
                                                <path id="Path_615" data-name="Path 615" d="M340.214,319.052A11.612,11.612,0,1,1,328.6,307.44,11.613,11.613,0,0,1,340.214,319.052Z" transform="translate(-163.289 -129.893)" fill="#f47d35"/>
                                                <path id="Path_616" data-name="Path 616" d="M317.3,335.135A11.612,11.612,0,1,1,328.881,345.9,11.612,11.612,0,0,1,317.3,335.135Z" transform="translate(-163.568 -145.13)" fill="#f89f32"/>
                                                <path id="Path_617" data-name="Path 617" d="M370.09,350.366a1.351,1.351,0,0,0-1.066-.87q-1.931-.309-3.854-.606c-.586-1.15-1.171-2.305-1.742-3.459a1.254,1.254,0,0,0-2.269,0c-.571,1.154-1.155,2.309-1.742,3.459q-1.923.3-3.854.606a1.351,1.351,0,0,0-1.066.87,1.172,1.172,0,0,0,.316,1.27c.927.863,1.868,1.747,2.808,2.641-.2,1.245-.392,2.486-.558,3.721a1.359,1.359,0,0,0,.552,1.255,1.252,1.252,0,0,0,1.332.144c1.1-.561,2.215-1.146,3.346-1.743,1.132.6,2.249,1.181,3.346,1.742a1.177,1.177,0,0,0,.581.13,1.332,1.332,0,0,0,.752-.274,1.362,1.362,0,0,0,.553-1.255q-.251-1.854-.559-3.721c.941-.894,1.881-1.778,2.808-2.641a1.172,1.172,0,0,0,.316-1.27Z" transform="translate(-196.98 -163.436)" fill="#fcf054"/>
                                                <path id="Path_618" data-name="Path 618" d="M279.436,252.8a17.076,17.076,0,1,0,17.076,17.077A17.1,17.1,0,0,0,279.436,252.8Zm0,1.025a16.051,16.051,0,1,1-16.051,16.051A16.051,16.051,0,0,1,279.436,253.825Z" transform="translate(-114.123 -80.718)" fill="#d4923a"/>
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
