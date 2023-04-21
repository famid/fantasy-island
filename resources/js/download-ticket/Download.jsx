import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Ticket from "./Ticket";

function Download({ tickets }) {
    const ticket = 'url("/assets/ticket.png")';
    const styles = {
        // backgroundImage: ticket,
        width: "795px",
        // objectFit:'cover',
        // backgroundRepeat:'no-repeat',
        // backgroundPosition: "center",
        // height: "",
    };
    const generateTicket = () => {
        const input = document.getElementById("pdf-content");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save("download.pdf");
        });
    };
    return (
        <div className="flex h-auto flex-col">
            <button
                onClick={generateTicket}
                className="rounded-full border border-black px-5 py-2.5  text-center font-medium hover:bg-gray-200/25 "
            >
                Download Ticket
            </button>
            <div className="">
                <div
                    className="mt-10  top-72 h-auto"
                    id="pdf-content"
                    style={styles}
                >
                    {tickets.map((ticket, i) => {
                        return <Ticket ticket={ticket} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Download;
