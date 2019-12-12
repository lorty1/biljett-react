import React from 'react'

export default function orderDetailTicketListComponent({ ticket }) {
    return (
            <div  className={"item-center flex-container--column " + (
                    ticket.customer_type.slug == 'adult' ? 'adult-tarif' :
                        ticket.customer_type.slug == 'children' ? 'child-tarif' :
                            ticket.customer_type.slug == 'free' ? 'free-tarif' :
                                ticket.customer_type.slug == 'adult-voucher' ? 'adult-tarif-voucher' :
                                    ticket.customer_type.slug == 'children-voucher' ? 'child-tarif-voucher' :
                                        ticket.customer_type.slug == 'group' ? 'group-tarif' :
                                            '')
                }>
                <img src={
                    ticket.customer_type.slug == 'adult' ? require('../assets/pictos/adult_picto.png') :
                    ticket.customer_type.slug == 'children' ? require('../assets/pictos/children_picto.png') :
                    ticket.customer_type.slug == 'free' ? require('../assets/pictos/star_picto.png') :
                    ticket.customer_type.slug == 'adult-voucher' ? require('../assets/pictos/voucher_adult.png') :
                    ticket.customer_type.slug == 'children-voucher' ? require('../assets/pictos/voucher_children.png') :
                    ticket.customer_type.slug == 'group' ? require('../assets/pictos/voucher_group.png') : ''
                } alt="" />
                <div className="item-center flex-container--column">
                    <p className="item-center">Départ</p>
                    <p className="item-center">{ticket.train_departure.ride.departure.title}: {ticket.train_departure.ride.departure_hour}</p>
                </div>
                <div className="item-center flex-container--column">
                <p className="item-center">Retour</p>
                {ticket.train_arrival ?
                    <p className="item-center">{ticket.train_arrival.ride.departure.title}: {ticket.train_arrival.ride.departure_hour}</p>:
                    <p className="item-center">Aucun</p>
                }
                </div>
                <div className="item-center ticket-number">
                    <p>{ticket.number}</p>
                </div>
            </div>
    )
}
