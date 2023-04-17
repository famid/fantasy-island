import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Download() {
    const ticket = 'url("/assets/images/ticket.png")';
    const styles = {
        backgroundImage: ticket,
        width: "300px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100px",
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
        <div className="relative">
            <button
                onClick={generateTicket}
                class="rounded-full border border-black px-5 py-2.5  text-center font-medium hover:bg-gray-200/25"
            >
                Download Ticket
            </button>
            <div
                className="absolute -top-[100px] -z-[100]"
                id="pdf-content"
                style={styles}
            ></div>
        </div>
    );
}

export default Download;
