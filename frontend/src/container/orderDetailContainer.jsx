import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderDetailTicketList from '../components/orderDetailTicketListComponent.jsx'
import '../assets/scss/orderDetail.scss'

class OrderDetailContainer extends Component {
    ticket_list = ()=> {
        const list = this.props.order.tickets_list.map(ticket=> {
            return (
                <OrderDetailTicketList
                ticket={ticket}
                key={ticket.id}
                ></OrderDetailTicketList>
            )
        })
        return list
    }

    render() {
        return (
            <div id="order-detail" className="flex-container item-fluid">
                <div className="ticket-list grid-6">
                    {this.ticket_list()}
                </div>
                <p  className="item-center">OrderDetailContainer</p>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        order: store.orderStore.orderSelected
    }
}


export default connect(mapStateToProps, null) (OrderDetailContainer)