import React, { Component } from 'react'
import { connect } from 'react-redux'
import TicketList from '../components/ticketListComponent'
import '../assets/scss/ticketList.scss'

class TicketListContainer extends Component {
    list = () => {
        const ticketIteration = this.props.order.tickets_list.map((ticket, index) => {
            return (
                <TicketList ticket={ticket} index={index}></TicketList>
            )

        })
        return ticketIteration.reverse()
    }
    componentDidMount() {
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
                <button id="ticket-list-button" className="border-top Plight btn--success">Valider</button>
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