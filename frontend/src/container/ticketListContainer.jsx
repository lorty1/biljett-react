import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/scss/ticketList.scss'

class TicketListContainer extends Component {
    list = () => {
        const ticketIteration = this.props.order.tickets_list.map((ticket, index) => {
                return (
                    <div
                    key={ticket.id}
                    className={
                        this.props.deleteTicketMode == false ? 'item' : 'item-deleted'    
                    }
                    onClick={
                    this.props.deleteTicketMode == true ?
                        ()=>this.props.delete_items_list(index, ticket):
                        null
                    }>
                        <div>
                            <p className="u-bold">Ticket n° {index + 1}</p>
                            <p>Aller - {ticket.train_departure.ride.departure.title} - {ticket.train_departure.ride.departure_hour}</p>
                            {ticket.train_arrival ?
                                <p>Retour -{ticket.train_arrival.ride.departure.title} - {ticket.train_arrival.ride.departure_hour}</p>
                                :
                                null
                            }
                            <p>{ticket.number} Tarif(s) {ticket.customer_type.title}</p>
                        </div>
                    </div>
                )
        })
        return ticketIteration.reverse()
    }
    render() {
        return (
            <div id="ticket-list" className="border-left grey-bkg w15">
                <div className="ticket-register Plight">
                    <p>Récapitulatif <br />ticket</p>
                </div>
                <div className="list-items ">
                    {this.props.order.tickets_list ? this.list() : null}
                </div>
                {(()=> {
                    switch(this.props.ridePanel) {
                        case 'ride':
                            return (
                                <button onClick={
                                    () => this.props.switch_order_panel()} id="ticket-list-button" className="border-top Plight btn--success">
                                    Valider
                                </button>                                
                            )
                        case 'order':
                            return (
                                <button onClick={
                                    () => this.props.switch_ride_panel()} id="ticket-list-button" className="border-top Plight btn--success">
                                    Ajouter
                                </button> 
                                )
                    }
                })()}
            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        order: store.orderStore.orderSelected
    }
}

export default connect(mapStateToProps, null)(TicketListContainer)