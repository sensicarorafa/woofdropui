import bgBlurImg2 from "../../assets/img/bg-blur-2.png";
import { NavLink } from "react-router-dom";
import yellowStar from "../../assets/img/yellow-star.png";
import gift from "../../assets/img/gift.png";
import Footer from "../../components/footer";
import { claimTask, getTasks, getUser } from "../../api";
import { useEffect, useState } from "react";

const Earn = () => {
    const tasks: { id: number; name: string; reward: number; to: string }[] = [
        {
            id: 1,
            name: "Join Channel",
            reward: 40000,
            to: "https://t.me/FitCoinEarn",
        },
        {
            id: 2,
            name: "Follow Twitter",
            reward: 100000,
            to: "https://twitter.com/FitcoinEarn",
        },
    ];

    const [taskList, setTasks] = useState<any[]>(JSON.parse(sessionStorage.getItem("claimedTasks") || "[]"));

    const handleFocus = () => {
        let taskToClaim = JSON.parse(sessionStorage.getItem("taskToClaim") || "{}");
        if (!!taskToClaim.taskId) {
            claimTask(Number(sessionStorage.getItem("tid")), taskToClaim.taskId, taskToClaim.points).then(async () => {
                await getUser(Number(sessionStorage.getItem("tid"))).then((res) => {
                    if (res.status == 200) {
                        sessionStorage.setItem("points", res.data.points);
                    }
                });
                await getTasks(Number(sessionStorage.getItem("tid"))).then((res) => {
                    if (res.status == 200) {
                        setTasks(res.data);
                    }
                });
                sessionStorage.removeItem("taskToClaim");
            });
        }
    };

    useEffect(() => {
        getTasks(Number(sessionStorage.getItem("tid"))).then((res) => {
            if (res.status == 200) {
                sessionStorage.setItem("claimedTasks", JSON.stringify(res.data));
                setTasks(res.data);
            }
        });

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    const claim = (e: React.MouseEvent, taskId: number, points: number) => {
        e.preventDefault();
        sessionStorage.setItem("taskToClaim", JSON.stringify({ taskId, points }));
        let task = tasks.find((t: any) => t.id === taskId);
        let taskLink = task ? task.to : "";
        if (taskLink) {
            window.open(taskLink, "_blank");
        }
    };

    return (
        <section className="h-screen w-full bg-[#060c1d] flex flex-col items-center overflow-hidden relative font-ZillaSlab text-xs small-mobile:text-base md:hidden">
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                <div className="absolute top-0 bottom-0 left-0 right-0 z-[-10]">
                    <img src={bgBlurImg2} className="w-full h-full" alt="" />
                </div>
                <div className="fixed top-0 bottom-[10vh] w-full overflow-y-scroll">
                    <div className="flex flex-col items-center justify-start px-5 py-5 h-full relative z-40">
                        <div className="flex justify-start w-full">
                            <NavLink className="text-[#FEC95E] flex items-center gap-2 text-xl" to="/">
                                <i className="bx bx-arrow-back"></i> Earn
                            </NavLink>
                        </div>
                        <div className="flex flex-col gap-5 w-full pb-5">
                            <div className="flex justify-center items-center">
                                <div className="w-[196px]">
                                    <img className="w-full" src={gift} alt="" />
                                </div>
                            </div>
                            <h2 className="text-[#FFFFFF]">Task</h2>
                            {tasks.map((task) => {
                                let isTaskClaimed = taskList.find((t) => t.taskId == task.id);
                                return (
                                    <div key={task.id} className="bg-[#FFFFFF] bg-opacity-10 w-full px-3 py-5 rounded-lg flex flex-col gap-2">
                                        <h2 className="text-[#FFFFFF] font-bold text-xl">{task.name}</h2>
                                        <div className="flex justify-between items-center">
                                            <p className="text-[#FFFFFF] text-base flex items-center">
                                                <span className="pe-1">You'll earn</span> <img className="w-[10px]" src={yellowStar} alt="" />
                                                <span className="ps-1 text-[#FEC95E] font-sans">{task.reward.toLocaleString()}</span>
                                            </p>
                                            <div className="flex justify-center items-center">
                                                <button
                                                    className={`bg-gradient-to-r from-[#FFE2A7] to-[#FEC95E] text-[#B87C02] text-sm py-1 px-10 rounded-md font-Rockwell ${
                                                        isTaskClaimed && "filter grayscale"
                                                    }`}
                                                    onClick={(e) => claim(e, task.id, Number(task.reward))}
                                                    disabled={isTaskClaimed}
                                                >
                                                    {isTaskClaimed ? "Claimed" : "Claim"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Earn;
