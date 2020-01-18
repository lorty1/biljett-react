import React, { Component } from 'react';
import '../assets/scss/rideConstructor.scss';
import RideComponent from 'Components/rideComponent';
import  CustomerType from 'Components/customerTypeComponent';
import { update_place_ticket, update_customer_ticket, update_train_ticket, update_station_ticket, create_ticket } from 'Actions/ticketAction';
import { display_date_formatted, ticket_date } from '../selectors/index';
import increment from 'Pictos/increment_picto.png';
import decrement from 'Pictos/decrement_picto.png';
import { connect } from 'react-redux';
import Axios from 'axios';
class rideConstructorContainer extends Component {
    constructor(props) {
        super(props)
        Axios.all([
            Axios.get('/api/departure'),
            Axios.get('/api/customer-type')
        ]).then(
            Axios.spread((rides, customerType) => {
                this.setState({ rides: rides.data, customers: customerType.data })
            })
        ).catch(err=> {
            this.props.show_error_messages(err.response.data)
        })

    }
    state = {
        rides: [],
        trains: {
            departure: null,
            comeBack: null
        },
        customers: [],
        customerChoosen: null,
        trainDepartureSelected: null,
        trainComeBackSelected: null,
        placeArray: [1, 2, 3, 4, 5, 6],
        placeSelected: null,
        placesIndex: 1
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ticketDate !== this.props.ticketDate && this.props.ticket.departure.station) {
            let { trainDepartureSelected, trainComeBackSelected } = this.state
            trainDepartureSelected = null;
            trainComeBackSelected = null;
            this.setState({ trainDepartureSelected, trainComeBackSelected })
            this.get_trains().then(r => {
                let { trainDepartureSelected, trainComeBackSelected } = this.state;
                trainDepartureSelected = null;
                trainComeBackSelected = null
                this.setState({ trainDepartureSelected, trainComeBackSelected })
            })
        }
    }
    station_selection(direction, station) {
        const { ticket } = this.props
        if (direction == 'one-way') {
            let departureStation;
            ticket.departure.station == station.id ?
            departureStation = null :
            departureStation = station.id
            this.props.update_station_ticket({
                direction: 'departure',
                station: departureStation
            }).then(response=> {
                this.get_trains()
            })
        } else {
            let comeBackStation;
            ticket.comeBack.station == station.id ?
                comeBackStation = null :
                comeBackStation = station.id
                this.props.update_station_ticket({
                    direction: 'comeBack',
                    station: comeBackStation
                }).then(()=> {
                    this.get_trains()
                })
        }
    }

    get_trains = () => {
        return new Promise((resolve, reject) => {
            let { trains } = this.state
            Axios({
                method: 'get',
                url: '/api/trains',
                params: {
                    departure: this.props.ticket.departure.station,
                    comeBack: this.props.ticket.comeBack.station,
                    date_on: this.props.ticketDate
                }
            }).then(response => {
                trains.departure = response.data.departure
                trains.comeBack = response.data.comeBack
                this.setState({ trains })
                resolve()
            }).catch(error => {
                reject(error.response.data[0])
            })
        })
    }
    train_selection = (train, direction) => {
        const { ticket } = this.props;
        if (direction == 'one-way') {
            var departureTrain;
            if(ticket.departure.train == train) {
                departureTrain = null;
                this.setState({ trainDepartureSelected: null })
            }else {
                departureTrain = train;
                this.setState({ trainDepartureSelected: train });
            }
            this.props.update_train_ticket({
                direction: 'departure',
                train: departureTrain
            })
        } else {
            var comeBackTrain;
            if(ticket.comeBack.train == train) {
                comeBackTrain = null;
                this.setState({ trainDepartureSelected: null })
            }else {
                comeBackTrain = train;
                this.setState({ trainDepartureSelected: train });
            }
            this.props.update_train_ticket({
                direction: 'comeBack',
                train: comeBackTrain
            })
        }
    }
    customer_selection(customer) {
        var customerSelected = {}
        let { customerChoosen } = this.state
        if(ticket.customerType.id !== customer.id) {
            customerSelected.id = customerChoosen = customer.id
            customerSelected.price = customer.price
        }else {
            customerSelected.id = customerChoosen = null
            customerSelected.price = null
        }
        this.setState({ customerChoosen })
        return this.props.update_customer_ticket(customerSelected)
    }
    list_place = () => {
        let { placeArray, placeSelected } = this.state
        const list = placeArray.map(element => {

            return (
                <button
                    className={this.props.ticket.customerType.number == element ? ' selected' : ''}
                    onClick={() => { this.place_selected(element) }} key={element}>{element}</button>
            )
        })
        return list
    }
    update_index = indexAction => {
        let { placeArray } = this.state
        if (indexAction == 'increment') {
            placeArray = placeArray.map(element => element += 6)
        } else {
            placeArray = placeArray.map(element => element -= 6)
        }
        return this.setState({ placeArray })
    }
    place_selected = place => {
        var numberPlace;
        var { placeSelected } = this.state;
        if (place == placeSelected) {
            placeSelected = numberPlace = null;
        } else {
            placeSelected = numberPlace = place;
        }

        this.setState({ placeSelected });
        this.props.update_place_ticket(numberPlace)
    }
    new_ticket = () => {
        const { ticket } = this.props
        const { id } = this.props.order
        this.props.create_ticket(id, ticket)
            .then(response => {
                this.get_trains()
            })
            .catch(errpr => {
                this.props.show_error_messages(error.response.data)
            })
    }
    render() {
        return (
            <div className="ride-constructor-container flex-container--column">
                <RideComponent
                    rides={this.state.rides}
                    ticket={this.props.ticket}
                    station_selection={(direction,station)=>this.station_selection(direction, station)}
                    trainDepartureSelected={this.state.trainDepartureSelected}
                    trainComeBackSelected={this.state.trainComeBackSelected}
                    trains={this.state.trains}
                    train_selection={(train, direction)=>this.train_selection(train, direction)}
                ></RideComponent>
                <CustomerType
                    customerChoosen={this.state.customerChoosen}
                    customers={this.state.customers}
                    ticket={this.props.ticket}
                    customer_selection={ customer => this.customer_selection(customer) }
                ></CustomerType>
                <section className="place-selection" >
                    <button disabled={this.state.placeArray[0] < 2} onClick={() => { this.update_index('decrement') }}>
                        <img src={decrement} width="48px" alt="decrement picto"/>
                    </button>
                    {this.list_place()}
                    <button disabled={this.state.placeArray[this.state.placeArray.length - 1] >= 60} onClick={() => { this.update_index('increment') }}>
                        <img src={increment} width="48px" alt="increment_logo"/>
                    </button>
                </section>
                <button onClick={() => this.new_ticket()} className="border-top violet-bkg add-ticket-button"> Ajouter un ticket</button>

            </div>
        )
    }
}
const mapStateToProps = store => {
    return {
        order: store.orderStore.orderSelected,
        ticket: store.ticketStore.ticket,
        ticketDate: ticket_date(store.dateStore.date)
    }
}

const mapDispatchToProps = {
    create_ticket,
    update_station_ticket,
    update_train_ticket,
    update_customer_ticket,
    update_place_ticket
}
export default connect(mapStateToProps, mapDispatchToProps)(rideConstructorContainer)
