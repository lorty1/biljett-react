import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderDetailTicketList from '../components/orderDetailTicketListComponent.jsx'
import '../assets/scss/orderDetail.scss'

class OrderDetailContainer extends Component {
    ticket_list = ()=> {
        const list = this.props.order.tickets_list.map((ticket,index)=> {
            return (
                <OrderDetailTicketList
                index={index}
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
                <div className="ticket-list grid-4 has-gutter">
                    {this.ticket_list()}
                </div>
                <div  className="item-center">OrderDetailContainer</div>
                <button>Imprimer</button>
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