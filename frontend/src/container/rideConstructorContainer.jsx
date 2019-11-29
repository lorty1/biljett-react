import React, { Component } from 'react'
import '../assets/scss/rideConstructor.scss'
import { update_ticket } from '../actions/ticketAction'
import { connect } from 'react-redux'
import Axios from 'axios'

class rideConstructorContainer extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        rides: [],
        trains: {
            departure: null,
            comeBack: null
        },
        customers: [],
        departureSelected: {},
        comeBackSelected: {},
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
    station_selection(direction, station) {
        if (direction == 'one-way') {
            this.state.departureSelected.id == station.id ?
                this.setState({ departureSelected: {} }) :
                this.setState({ departureSelected: station })
        } else {
            this.state.comeBackSelected.id == station.id ?
                this.setState({ comeBackSelected: {} }) :
                this.setState({ comeBackSelected: station })
        }
        this.get_trains(direction, station.id)
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
                date_on: this.props.date
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


    departure_list = () => {
        const departureList = this.state.rides.map(ride => {
            return (
                <button onClick={() => { this.station_selection('one-way', ride) }}
                    key={ride.id}
                    className={
                        this.state.departureSelected.id == ride.id ? ' w25 flex-container--column departure-station selected' : 'w25 flex-container--column departure-station'
                    }>
                    <img src={require('../assets/pictos/departure_picto.png')} alt="" />
                    <p className="item-center Plight">ALLER</p>
                    <p>{ride.title}</p>
                </button>
            )
        })
        return departureList
    }
    come_back_list = () => {
        const comeBackList = this.state.rides.map(ride => {
            return (
                <button
                    onClick={() => { this.station_selection('return', ride) }}
                    key={ride.id}
                    className={
                        this.state.comeBackSelected.id == ride.id ? ' w25 flex-container--column departure-station selected' : 'w25 flex-container--column departure-station'
                    }>
                    <img src={require('../assets/pictos/come_back_picto.png')} alt="" />
                    <p className="item-center Plight">RETOUR</p>
                    <p>{ride.title}</p>
                </button>
            )
        })
        return comeBackList
    }
    customer_list = () => {
        const customers = this.state.customers.map(customer => {
            return (
                <button className={"flex-container " + (
                    customer.slug == 'adult' ? 'adult-tarif' :
                        customer.slug == 'children' ? 'child-tarif' :
                            customer.slug == 'free' ? 'free-tarif' :
                                customer.slug == 'adult-voucher' ? 'adult-tarif-voucher' :
                                    customer.slug == 'children-voucher' ? 'child-tarif-voucher' :
                                        customer.slug == 'group' ? 'group-tarif' :
                                            '') + (this.props.ticket.customerType == customer.id ? ' selected' : '')
                }
                    key={customer.id}
                    onClick={() => { this.customer_selection(customer) }}
                >
                    <img src={
                        customer.slug == 'adult' ? require('../assets/pictos/adult_picto.png') :
                            customer.slug == 'children' ? require('../assets/pictos/children_picto.png') :
                                customer.slug == 'free' ? require('../assets/pictos/star_picto.png') :
                                    customer.slug == 'adult-voucher' ? require('../assets/pictos/voucher_adult.png') :
                                        customer.slug == 'children-voucher' ? require('../assets/pictos/voucher_children.png') :
                                            customer.slug == 'group' ? require('../assets/pictos/voucher_group.png') : ''
                    } alt="" />
                    <div className="item-center flex-container--column">
                        <p className="item-center u-capitalize"> {customer.title}</p>
                        <p className="item-center u-uppercase">{customer.information}</p>
                    </div>
                </button>
            )
        })
        return customers
    }
    customer_selection(customer) {
        console.log('sdfsdf', this.props)
        const ticket = { ...this.props.ticket }
        ticket.customerType !== customer.id ? ticket.customerType = ticket.customerType = customer.id : ticket.customerType = null
        return this.props.update_ticket(ticket)
    }

    render() {
        return (
            <div className="ride-constructor-container flex-container--column">
                <section className="departure-selection flex-container">
                    {this.departure_list()}
                </section>
                <section className="come-back-selection flex-container">
                    {this.come_back_list()}
                </section>
                <section className="grid-3 customer-selection">
                    {this.customer_list()}
                </section>
                <section className="place-selection" ></section>
                <button className="violet-bkg add-ticket-button"> Ajouter</button>

            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        ticket: store.ticketStore.ticket,
        date: store.dateStore.date
    }
}

const mapDispatchToProps = {
    update_ticket
}
export default connect(mapStateToProps, mapDispatchToProps)(rideConstructorContainer)
