import React from "react";
import notify from "../order/components/notify";


function Ticket({ ticket, csrfToken }) {
    const markUserHandler = async () => {
        try {
            const response = await fetch(`admin/tickets/${ticket.id}/use`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                notify(
                    `${ticket.id} ticket has been marked as used successfully`
                );
                setTimeout(()=>{
                  location.reload()
              },1300)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex gap-1 mb-1 p-1 bg-slate-200">
            {ticket.ticket_used_status === 1 && (
                <span className="bg-red-100">{ "Used"}</span>
            )}

            <span>{ticket.unique_code}</span>
            {ticket.ticket_used_status === 0 && (
                <button
                    onClick={markUserHandler}
                    className="bg-blue-400 hover:bg-blue-500 text-[10px] text-white p-1"
                >
                    Mark Used
                </button>
            )}
        </div>
    );
}

export default Ticket;
