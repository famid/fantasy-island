import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Ticket from "./Ticket";
import { useViewportSize } from "@mantine/hooks";
import * as ReactDOM from "react-dom/client";

function Download({ tickets }) {
    const ticket = 'url("/assets/ticket.png")';
    const [widtht, setWidtht] = useState("399px");
    const { height, width } = useViewportSize();
    const [prepareTicket, setPrepareTicket] = useState(true)

    useEffect(() => {
        if (width > 1000) setWidtht("795px");
        else if (width > 500) setWidtht("399px");
        else setWidtht("270px");
    }, [width]);

    const styles = {
        width: widtht,
        objectFit: "cover",
    };

    const generateTicket = async () => {
        setPrepareTicket(false)
        const ticketsPerPage = 4;
        const pages = Math.ceil(tickets.length / ticketsPerPage);
        const pdf = new jsPDF();
        let pageIndex = 0;

        const ticketWidth = 735;
       // const ticketHeight = ticketWidth * 1.4142;
        const promises = [];

        for (let i = 0; i < pages; i++) {
            const div = document.createElement("div");
            div.style =
                `margin-top:40px; top:72px;height:1093px; width:${widtht};object-fit:cover; `;
            div.id = `page-${i}`;

            const pageTickets = tickets.slice(
                pageIndex,
                pageIndex + ticketsPerPage
            );
            pageIndex += ticketsPerPage;


            const ticketElements = pageTickets.map((ticket, i) => {
                return <Ticket key={i} ticket={ticket} />;
            });

            document.getElementById("pdf-content").appendChild(div);

            ReactDOM.createRoot(div).render(ticketElements);

            promises.push(
                new Promise((resolve) => {

                    html2canvas(document.getElementById(`page-${i}`)).then(
                          async (canvas) => {

                            const imgData =  canvas.toDataURL("image/png");
                            pdf.addImage(imgData, "PNG", 0, 0);
                            if (i < pages - 1) {
                                pdf.addPage();
                            }
                            resolve();
                        }
                    );
                })
            );
        }


        await Promise.all(promises);
        !prepareTicket && pdf.save("tickets.pdf")

    };

    return (
        <div className="flex h-auto flex-col">
            <button
                onClick={generateTicket}
                className="rounded-full border border-white px-5 py-2.5  text-center font-medium bg-[#E94E77] hover:bg-[#C15B8A] text-white "
            >
                {
                    prepareTicket ?  'Prepare Ticket' : 'Download Ticket'
                }

            </button>

            <div
                id="pdf-content"
                className="fixed top-0 left-0 right-0 bottom-0 overflow-auto -z-20"
            ></div>
        </div>
    );
}

export default Download;
