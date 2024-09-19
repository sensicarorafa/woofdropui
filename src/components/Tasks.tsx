import { FC, useState } from 'react';

const TaskComponent:FC<any> = ({ tasks, updateTaskStatus }) => {
    const [loadingTask, setLoadingTask] = useState(null); // Track task that is loading
    const [claimingTask, setClaimingTask] = useState(null); // Track task being claimed
    const [displayClaimButton, setDisplayClaimButton] = useState<any>({}); // Track if claim button should be shown

    const handleTaskClick = (task: any, taskId: any) => {
        setLoadingTask(taskId); // Start loader for this task
        window.open(task.taskUrl, '_blank');
        setTimeout(() => {
            setLoadingTask(null); // Stop loader
            setDisplayClaimButton((prev: any) => ({ ...prev, [taskId]: true })); // Show claim button for this task
        }, 5000); // 5 second delay
    };

    const handleClaimClick = async (task: any) => {
        setClaimingTask(task.claimTreshold); // Start loader on claim button
        await updateTaskStatus(task.claimTreshold, task.taskPoints); // Execute backend function
        setClaimingTask(null); // Stop loader
    };

    return (
        <div>
            {tasks.map((task: any) => (
                !task?.rewardClaimed && task?.taskUrl?.length > 0 && task?.taskStatus !== 'paused' &&
                <div key={task.claimTreshold} className='flex justify-between py-2 w-full items-center bg-white/20 rounded-md px-3 my-3'>
                    <div className='flex items-center'>
                        <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                            <img className="w-full" src={'/path/to/logo'} alt="" />
                        </div>
                        <div className='flex flex-col pl-5'>
                            <p className='text-white text-bold taskTitle'>{task.taskText}</p>
                            <span className='text-[#A6A6A6]'>+{task.taskPoints} $AIDOGS</span>
                        </div>
                    </div>

                    <div>
                        {!displayClaimButton[task.claimTreshold] && (
                            <button
                                className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 ${loadingTask === task.claimTreshold && "opacity-50"}`}
                                onClick={() => handleTaskClick(task, task.claimTreshold)}
                                disabled={loadingTask === task.claimTreshold}
                            >
                                {loadingTask === task.claimTreshold ? 'Loading...' : task.btnText}
                            </button>
                        )}

                        {displayClaimButton[task.claimTreshold] && !task.rewardClaimed && (
                            <button
                                className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 ${claimingTask === task.claimTreshold && "opacity-50"}`}
                                onClick={() => handleClaimClick(task)}
                                disabled={claimingTask === task.claimTreshold}
                            >
                                {claimingTask === task.claimTreshold ? 'Claiming...' : 'Claim'}
                            </button>
                        )}

                        {task.rewardClaimed && (
                            <button className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2 opacity-50" disabled>
                                Done
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskComponent;
