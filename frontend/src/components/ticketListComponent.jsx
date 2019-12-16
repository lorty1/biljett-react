import React, { Fragment} from 'react'

const TicketList = ({ticket, index})=> {
    return (
        <div className="item ">
            <div>
                <p>Ticket n° {index + 1}</p>
                <p>{ticket.train_departure.ride.departure.title} : {ticket.train_departure.ride.departure_hour}</p>
                {ticket.train_arrival ?
                    <p>{ticket.train_arrival.ride.departure.title} : {ticket.train_arrival.ride.departure_hour}</p>:
                    null
                }
                <p>{ticket.customer_type.title}: {ticket.number}</p>
        </div>
    </div>
    )
}
export default TicketList
