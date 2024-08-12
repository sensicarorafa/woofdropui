import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateDaysArray = (currentDate: string | number | Date) => {
    let dates = [];
    let date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay()); // Set to the start of the week (Sunday)

    for (let i = 0; i < 7; i++) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
};

// take an element to render as a prop, call it title
const DateCarousel = ({ title }: { title: any }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const changeMonth = (months: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + months);
        setCurrentDate(newDate);
    };

    const changeDay = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    };

    const formatMonthYear = (date: any) => {
        const options = { year: "numeric", month: "long" };
        return date.toLocaleDateString(undefined, options);
    };

    const daysArray = generateDaysArray(currentDate);

    return (
        <div className="carousel-container">
            <div className="flex flex-row justify-between px-[20px]">
                {title}
                <div className="month-year-slider">
                    <button onClick={() => changeMonth(-1)} className="arrow">
                        <i className="bx bxs-left-arrow"></i>
                    </button>
                    <div className="date-display">{formatMonthYear(currentDate)}</div>
                    <button onClick={() => changeMonth(1)} className="arrow">
                        <i className="bx bxs-right-arrow"></i>
                    </button>
                </div>
            </div>
            <div className="day-slider border-y-[1px]  border-opacity-20 border-y-[#FFFFFF] py-5">
                <button onClick={() => changeDay(-7)} className="arrow">
                    <i className="bx bxs-left-arrow"></i>
                </button>
                <div className="days-container">
                    {daysArray.map((date, index) => (
                        <div key={index} className={`day-item ${date.toDateString() === currentDate.toDateString() ? "selected" : ""}`} onClick={() => setCurrentDate(date)}>
                            <div>{date.getDate()}</div>
                            <div>{daysOfWeek[date.getDay()]}</div>
                        </div>
                    ))}
                </div>
                <button onClick={() => changeDay(7)} className="arrow">
                    <i className="bx bxs-right-arrow"></i>
                </button>
            </div>
        </div>
    );
};

export default DateCarousel;
