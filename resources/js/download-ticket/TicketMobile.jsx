import React, { useState ,useEffect} from "react";

const TicketMobile = ({ ticket }) => {

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
            <div className="absolute top-[115px] left-[26px] h-[7px] bg-white font-semibold text-[4px] leading-[0px] px-1">
                TICKET NO: {ticket.unique_code}
            </div>
            <div className="absolute top-[123px] left-[238px] h-[7px] bg-white font-semibold text-[4px] leading-[0px] px-1">
                TICKET NO: {ticket.unique_code}
            </div>
            <div className="absolute top-[88px] left-[21px] h-3 bg-transparent text-yellow-200 text-sm font-semibold text-[7px] leading-[0px] ">
                {date}
            </div>
            <img src="/assets/ticket.png" alt="" />
        </div>
    );
};

export default TicketMobile;
