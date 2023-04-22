import React,{useState, useEffect} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Ticket from "./Ticket";
import { useViewportSize } from '@mantine/hooks';

function Download({ tickets }) {
    const ticket = 'url("/assets/ticket.png")';
    const [widtht, setWidtht] = useState('399px')
    const { height, width } = useViewportSize();


    useEffect(()=>{
        if(width > 1000) setWidtht('795px')
        else if((width > 500)) setWidtht('399px')
        else setWidtht('270px')
    },[width])

    const styles = {
        width: widtht,
        objectFit:'cover',

    };
    const generateTicket = () => {
        const input = document.getElementById("pdf-content");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save("ticket.pdf");
        });
    };

    return (
        <div className="flex h-auto flex-col">
            <button
                onClick={generateTicket}
                className="rounded-full border border-white px-5 py-2.5  text-center font-medium bg-[#E94E77] hover:bg-[#C15B8A] text-white "
            >
                Download Ticket
            </button>

            <div className="fixed top-0 left-0 right-0 bottom-0 -z-20">
                <div
                    className="mt-10  top-72 h-auto"
                    id="pdf-content"
                    style={styles}
                >
                    {tickets.map((ticket, i) => {
                        return <Ticket key={i} ticket={ticket} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Download;
