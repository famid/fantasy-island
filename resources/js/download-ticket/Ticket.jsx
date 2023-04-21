import React from "react";

const Ticket = ({ conferenceName, date, location, ticketType, price }) => {
    return (
        <div className="ticket w-full h-auto relative">
            <div className="absolute top-[230px] left-[56px] h-3 bg-white font-semibold text-[10px] leading-[0px] ">
                TICKET NO: 23423423
            </div>
            <div className="absolute top-[245px] left-[480px] h-3 bg-white font-semibold text-[10px] leading-[0px] ">
                TICKET NO: 23423423
            </div>
            <div className="absolute top-[180px] left-[45px] h-3 bg-transparent text-yellow-200 text-sm font-semibold text-[10px] leading-[0px] ">
                22 MARCH - 9.00 AM
            </div>
            <img src="/assets/ticket.png" alt="" />
        </div>
    );
};

export default Ticket;
