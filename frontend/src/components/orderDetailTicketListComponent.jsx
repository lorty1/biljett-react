import React from 'react'

export default function orderDetailTicketListComponent({ ticket, index }) {
    return (
            <div  className={"flex-container--column " + (
                ticket.customer_type.slug == 'adult' ? 'adult-tarif' :
                    ticket.customer_type.slug == 'children' ? 'child-tarif' :
                        ticket.customer_type.slug == 'free' ? 'free-tarif' :
                            ticket.customer_type.slug == 'adult-voucher' ? 'adult-tarif-voucher' :
                                ticket.customer_type.slug == 'children-voucher' ? 'child-tarif-voucher' :
                                    ticket.customer_type.slug == 'group' ? 'group-tarif' :
                                        '')
            }>
                <p className="item-center">Ticket n°{ index + 1 }</p>
                <div className="detail-customer-info">
                   <p>{ticket.customer_type.information}</p>
                   <p>{ticket.customer_type.title}</p>
                </div>
                <div className="ticket-number item-center">
                    <p>{ ticket.number }</p>
                </div>
            </div>
    )
}
