import React, { Component } from 'react';
import '../assets/scss/rideConstructor.scss';
import RideComponent from 'Components/rideComponent';
import PlaceComponent from 'Components/placeComponent';
import  CustomerType from 'Components/customerTypeComponent';
import { update_place_ticket, update_customer_ticket, update_train_ticket, update_station_ticket, create_ticket } from 'Actions/ticketAction';
import { display_date_formatted, ticket_date } from '../selectors/index';
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
        // if date has changed, train's list reloaded
        if (prevProps.ticketDate !== this.props.ticketDate && this.props.ticket.departure.station) {
            let { trainDepartureSelected, trainComeBackSelected } = this.state
            trainDepartureSelected = trainComeBackSelected = null;
            this.setState({ trainDepartureSelected, trainComeBackSelected })
            this.get_trains()
        }
        // reset customer and place if order has changed !
        if(prevProps.order.id && prevProps.order.id !== this.props.order.id) {
            let { customerChoosen, placeSelected } = this.state
            customerChoosen = placeSelected = null
            this.setState({ customerChoosen, placeSelected })
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
            }).then( ()=> {
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
            }).catch(error => {
                this.props.show_error_messages(error.response.data)
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
        let { customerChoosen } = this.state;
        let { ticket } = this.props;
        if(customerChoosen !== customer.id) {
            customerSelected.id = customerChoosen = customer.id
            customerSelected.price = customer.price
        }else {
            customerSelected.id = customerChoosen = null
            customerSelected.price = null
        }
        this.setState({ customerChoosen })
        return this.props.update_customer_ticket(customerSelected)
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
        let { customerChoosen, placeSelected } = this.state;
        const { ticket } = this.props
        const { id } = this.props.order
        this.props.create_ticket(id, ticket)
            .then(response => {
                customerChoosen = null
                placeSelected = null
                this.setState({customerChoosen, placeSelected})
                this.get_trains()
            })
            .catch(error => {
                this.props.show_error_messages(error.response.data)
            })
    }
    render() {
        return (
            <div className="ride-constructor-container flex-container--column">
                <RideComponent
                    rides={this.state.rides}
                    station_selection={(direction,station)=>this.station_selection(direction, station)}
                    trainDepartureSelected={this.state.trainDepartureSelected}
                    trainComeBackSelected={this.state.trainComeBackSelected}
                    ticket={this.props.ticket}
                    trains={this.state.trains}
                    train_selection={(train, direction)=>this.train_selection(train, direction)}
                ></RideComponent>
                <CustomerType
                    customerChoosen={this.state.customerChoosen}
                    customers={this.state.customers}
                    customer_selection={ customer => this.customer_selection(customer) }
                ></CustomerType>
                <PlaceComponent
                    placeArray={this.state.placeArray}
                    placeSelected={this.state.placeSelected}
                    update_index={direction => this.update_index(direction)}
                    place_selected={place=> this.place_selected(place)}>
                </PlaceComponent>
                <button 
                    onClick={() => this.new_ticket()} 
                    className="border-top violet-bkg add-ticket-button"> 
                    Ajouter un ticket
                </button>
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
