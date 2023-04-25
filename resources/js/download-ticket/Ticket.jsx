import React, { useState ,useEffect} from "react";

const Ticket = ({ ticket }) => {

    const [date, setDate] = useState("");

    useEffect(() => {
        const dateObj = new Date(ticket?.purchase_date);

        // Define an array of month names
        const monthNames = [
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY",
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
        ];

        // Get the day of the month and hour in 12-hour format
        const day = dateObj.getDate();
        const hour =
            dateObj.getHours() % 12 === 0 ? 12 : dateObj.getHours() % 12;

        // Get the minutes and AM/PM indicator
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        const amPm = dateObj.getHours() < 12 ? "AM" : "PM";

        // Get the month name
        const monthName = monthNames[dateObj.getMonth()];

        // Construct the formatted date string
        const formattedDate = `${day} ${monthName} - ${hour}.${minutes} ${amPm}`;
        setDate(formattedDate)
    });

    return (
        <div className="ticket w-full h-auto relative mb-4" id={`ticket-${ticket.id}`}>
            <div className="absolute top-[230px] left-[56px] h-3 bg-white font-semibold text-[10px] leading-[0px] ">
                TICKET NO: {ticket.unique_code}
            </div>
            <div className="absolute top-[247px] left-[475px] h-3 bg-white font-semibold text-[10px] leading-[0px] ">
                TICKET NO: {ticket.unique_code}
            </div>
            <div className="absolute top-[180px] left-[45px] h-3 bg-transparent text-yellow-200 text-sm font-semibold text-[10px] leading-[0px] ">
                {date}
            </div>
            <img src="/assets/ticket.png" alt="" />
        </div>
    );
};

export default Ticket;
