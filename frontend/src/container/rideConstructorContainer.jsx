import React, { Component } from 'react';
import '../assets/scss/rideConstructor.scss';
import RideComponent from '../components/rideComponent';
import CustomerType from '../components/customerTypeComponent';
import { update_ticket, create_ticket } from '../actions/ticketAction';
import { display_date_formatted, ticket_date } from '../selectors/index';
import { connect } from 'react-redux';
import Axios from 'axios';

class rideConstructorContainer extends Component {
    state = {
        rides: [],
        trains: {
            departure: null,
            comeBack: null
        },
        customers: [],
        trainDepartureSelected: null,
        trainComeBackSelected: null,
        placeArray: [1,2,3,4,5,6],
        placeSelected: null,
        placesIndex: 1
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
        const {rides} = this.state
        if(prevProps.ticketDate !== this.props.ticketDate && this.props.ticket.departure.station){
            let {trainDepartureSelected, trainComeBackSelected} = this.state
            console.log('dep', trainDepartureSelected, 'back', trainComeBackSelected)
            trainDepartureSelected = null;
            trainComeBackSelected = null;
            this.setState({trainDepartureSelected, trainComeBackSelected})
            this.get_trains()
        }
    }
    station_selection(direction, station) {
        console.log(this.props.ticket,'=>', {...this.props.ticket})
        const {ticket} = this.props
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
            this.get_trains()
    }

    get_trains = () => {
        console.log('date7987987', this.props.ticketDate)
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
        })
    }
    train_selection = (train,direction) => {
        const {ticket} = this.props
        if (direction == 'one-way') {
            ticket.departure.train == train ? 
            (ticket.departure.train = null, this.setState({trainDepartureSelected : null})) : 
            (ticket.departure.train = train, this.setState({trainDepartureSelected : train}))
        }else {
            ticket.comeBack.train == train ? 
            (ticket.comeBack.train = null,this.setState({trainComeBackSelected : null})) : 
            (ticket.comeBack.train = train, this.setState({trainComeBackSelected : train}))
        }
        this.props.update_ticket(ticket)
    }
    customer_selection(customer) {
        const ticket = { ...this.props.ticket }
        ticket.customerType.id !== customer.id ? ticket.customerType.id = customer.id : ticket.customerType.id = null
        return this.props.update_ticket(ticket)
    }
    list_place = ()=> {
        let { placeArray, placeSelected} = this.state
        const list = placeArray.map(element => {
            console.log(this.props.ticket.customerType.number == element)

            return (
                <button 
                className={placeSelected == element ? ' selected' : null}
                 onClick={()=> {this.place_selected(element)}} key={element}>{element}</button>
            )
        })
        return list
    }
    update_index = indexAction => {
        let { placeArray} = this.state
        if(indexAction == 'increment') {
            placeArray = placeArray.map(element => element += 6)
        }else {
            placeArray = placeArray.map(element => element -= 6)
        }
        return this.setState({placeArray})
    }
    place_selected = place => {
        let { ticket } = this.props
        let { placeSelected } = this.state
        if(place == placeSelected) {
            placeSelected = null;
            ticket.customerType.number = null;
        }else {
            placeSelected = place;
            ticket.customerType.number = place
        }
        
        this.setState({placeSelected});
        this.props.update_ticket(ticket)
    }
    new_ticket = () => {
        this.props.create_ticket(this.props.ticket)
    }
    render() {
        return (
            <div className="ride-constructor-container flex-container--column">
                <RideComponent 
                    rides={this.state.rides}
                    ticket={this.props.ticket}
                    station_selection={this.station_selection.bind(this)}
                    trains={this.state.trains}
                    trainDepartureSelected={this.state.trainDepartureSelected}
                    trainComeBackSelected={this.state.trainComeBackSelected}
                    train_selection = {this.train_selection.bind(this)}
                 ></RideComponent>
                <CustomerType
                    customers={this.state.customers}
                    ticket={this.props.ticket}
                    customer_selection={this.customer_selection.bind(this)}
                ></CustomerType>
                <section className="place-selection" >
                    <button disabled={this.state.placeArray[0] < 2} onClick={()=> {this.update_index('decrement')}}>-</button>
                    {this.list_place()}
                    <button  disabled={this.state.placeArray[this.state.placeArray.length - 1] >= 60} onClick={()=> {this.update_index('increment')}}> + </button>
                </section>
                <button onClick={()=> this.new_ticket()} className="violet-bkg add-ticket-button"> Ajouter</button>

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
    update_ticket,
    create_ticket
}
export default connect(mapStateToProps, mapDispatchToProps)(rideConstructorContainer)
