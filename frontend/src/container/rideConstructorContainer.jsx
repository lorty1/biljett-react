import React, { Component } from 'react'
import '../assets/scss/rideConstructor.scss'
import RideComponent from '../components/rideComponent'
import CustomerType from '../components/customerTypeComponent'
import { update_ticket } from '../actions/ticketAction'
import { display_date_formatted, ticket_date } from '../selectors/index'
import { connect } from 'react-redux'
import Axios from 'axios'

class rideConstructorContainer extends Component {
    state = {
        rides: [],
        trains: {
            departure: null,
            comeBack: null
        },
        customers: [],
        ticket: {
            departure: {},
            comeBack: {},
            customerType: {}
        }
    }
    componentDidMount() {
        Axios.all([
            Axios.get('/api/departure'),
            Axios.get('/api/customer-type')
        ]).then(
            Axios.spread((rides, customerType) => {

                this.setState({ rides: rides.data, customers: customerType.data })
            })
        )
    }
    componentDidUpdate(prevProps, prevState) { 
        console.log('prev',prevProps.ticketDate)
        if(prevProps.ticketDate !== this.props.ticketDate && this.props.ticket.departure.station){
            return this.setState({dateMirror: this.props.ticketDate})
        }
    }
    station_selection(direction, station) {
        const ticket = {...this.props.ticket}
        if (direction == 'one-way') {
            ticket.departure.station == station.id ?
                ticket.departure.station = null :
                ticket.departure.station = station.id
            } else {
                ticket.comeBack.station == station.id ?
                ticket.comeBack.station = null :
                ticket.comeBack.station = station.id
            }
            this.props.update_ticket(ticket)
    }

    get_trains = (direction, station) => {
        console.log('dfg', direction)
        const trains = { ...this.state.trains }
        let ride = ''
        if (direction == 'one-way') {
            ride = station
        } else {
            ride = station
        }
        console.log('train', ride)
        if (!ride) return '';

        Axios({
            method: 'get',
            url: '/api/trains',
            params: {
                departure: ride,
                date_on: this.props.ticketDate
            }
        }).then(response => {
            if (direction == 'one-way') {
                trains.departure = response.data
            } else {
                trains.comeBack = response.data
            }
            this.setState({ trains })
        })
    }

    customer_selection(customer) {
        const ticket = { ...this.props.ticket }
        ticket.customerType !== customer.id ? ticket.customerType = ticket.customerType = customer.id : ticket.customerType = null
        return this.props.update_ticket(ticket)
    }
    render() {
        return (
            <div className="ride-constructor-container flex-container--column">
                <RideComponent 
                    rides={this.state.rides}
                    ticket={this.props.ticket}
                    station_selection={this.station_selection.bind(this)}
                    trains={this.state.trains}
                    station_selection={this.station_selection.bind(this)}
                 ></RideComponent>
                <CustomerType
                    customers={this.state.customers}
                    ticket={this.props.ticket}
                    customer_selection={this.customer_selection.bind(this)}
                ></CustomerType>
                <section className="place-selection" ></section>
                <button className="violet-bkg add-ticket-button"> Ajouter</button>

            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        ticket: store.ticketStore.ticket,
        showDate: display_date_formatted(store),
        ticketDate: ticket_date(store)
    }
}

const mapDispatchToProps = {
    update_ticket
}
export default connect(mapStateToProps, mapDispatchToProps)(rideConstructorContainer)
