import React, { useRef } from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import Ticket from './TicketPdf';

const ConferenceTicket = () => {
  const conferenceName = 'React Conference 2023';
  const date = 'May 12-14, 2023';
  const location = 'San Francisco, CA';
  const ticketType = 'Regular';
  const price = 499;
  const ticketRef = useRef();

  const TicketPDF = () => (
    <Document>
      <Page>
        <Text>{conferenceName}</Text>
        <Text>Date: {date}</Text>
        <Text>Location: {location}</Text>
        <Text>Ticket type: {ticketType}</Text>
        <Text>Price: ${price}</Text>
      </Page>
    </Document>
  );

  return (
    <div>
      <h1>Conference Ticket</h1>
      <Ticket ref={ticketRef} conferenceName={conferenceName} date={date} location={location} ticketType={ticketType} price={price} />
      <PDFDownloadLink document={<TicketPDF />} fileName="conference-ticket.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default ConferenceTicket;