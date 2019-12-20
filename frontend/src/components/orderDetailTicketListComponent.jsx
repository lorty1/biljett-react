import React from 'react'
import decrementArrow from '../assets/pictos/previous_arrow.png';
import incrementArrow from '../assets/pictos/next_arrow.png';

export default function orderDetailTicketListComponent({ ticket,placeDeleted, index, place_to_deleted }) {
    return (
        <div className="ticket-deleted">
            <div>
                <p className="item-center">Ticket n°{index + 1}</p>
                <div className="flex-container--column">
                    <p>{ticket.train_departure.ride.departure.title}:{ticket.train_departure.ride.departure_hour}</p>
                </div>
                <div className="detail-customer-info">
                    <p>{ticket.customer_type.information}</p>
                    <p>{ticket.customer_type.title}</p>
                </div>
            </div>
            <div className="flex-container">
                <img onClick={()=> place_to_deleted('decrement', ticket.id)} className="w25" src={decrementArrow} alt=""/>
                <p className="w50">{placeDeleted}</p>
                <img onClick={()=> place_to_deleted('increment', ticket.id)} className="w25" src={incrementArrow} alt=""/>
            </div>
        </div>
    )
}
