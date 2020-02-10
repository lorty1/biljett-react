import React, {Fragment} from 'react'
import decrementArrow from 'Pictos/previous_arrow.png';
import incrementArrow from 'Pictos/next_arrow.png';

export default function orderDetailTicketListComponent({ ticket,placeDeleted,removed_ticket, index, place_to_deleted}) {
    return (
        <div className="ticket-deleted">
            <div onClick={()=>removed_ticket(ticket.id)}>
                <p className="item-center txtcenter txt-white mbs">Ticket n°{index + 1}</p>
                <div className="flex-container--column">
                    <p className="txtcenter mb0">{ticket.train_departure.ride.departure.title}:{ticket.train_departure.ride.departure_hour}</p>
                </div>
                <Fragment>
                    {ticket.train_arrival.ride ?
                    <div className="flex-container--column">
                        <p className="txtcenter">{ticket.train_arrival.ride.departure.title}:{ticket.train_arrival.ride.departure_hour}</p>
                    </div>:
                null
                    }
                </Fragment>
                <div className="detail-customer-info">
                    <p className=" mb0 txtcenter">Tarif</p>
                    <p className="mb0 txt-white txtcenter">{ticket.customer_type.title}</p>
                </div>
            </div>
            <div className="flex-container--column place-to-delete">
                <p className="txtcenter">Ticket à supprimer</p>
                <div className="flex-container">
                    <img onClick={()=> place_to_deleted('decrement', ticket.id)} className="w20" src={decrementArrow} alt=""/>
                    <p className="w50 item-center txtcenter">{placeDeleted}</p>
                    <img onClick={()=> place_to_deleted('increment', ticket.id)} className="w20" src={incrementArrow} alt=""/>
                </div>
            </div>
        </div>
    )
}
