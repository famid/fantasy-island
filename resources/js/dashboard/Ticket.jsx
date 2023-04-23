
import React from 'react'

function Ticket({ticket}) {
    console.log(ticket)
  return (
    <div className='flex gap-1 mb-1 p-1 bg-slate-200'>
      <span className='bg-red-400'>{ticket.ticket_used_status === 1 ? 'Used': 'Not Used'}</span>
      <span>{ticket.unique_code}</span>
      <button>Mark Used</button>

    </div>
  )
}

export default Ticket
