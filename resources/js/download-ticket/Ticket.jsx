import React from 'react';

const Ticket = ({ conferenceName, date, location, ticketType, price }) => {
  return (
    <div className="ticket">
      <h2>{conferenceName}</h2>
      <p>Date: {date}</p>
      <p>Location: {location}</p>
      <p>Ticket type: {ticketType}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Ticket;