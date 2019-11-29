import React, { Component, Fragment } from 'react'

class rideComponent extends Component {

    departure_list = () => {
        const departureList = this.props.rides.map(ride => {
            return (
                <button onClick={() => { this.props.station_selection('one-way', ride) }}
                    key={ride.id}
                    className={
                        this.props.ticket.departure.station == ride.id ? ' w25 flex-container--column departure-station selected' : 'w25 flex-container--column departure-station'
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
        const comeBackList = this.props.rides.map(ride => {
            return (
                <button
                    onClick={() => { this.props.station_selection('return', ride) }}
                    key={ride.id}
                    className={
                        this.props.ticket.comeBack.station == ride.id ? ' w25 flex-container--column departure-station selected' : 'w25 flex-container--column departure-station'
                    }>
                    <img src={require('../assets/pictos/come_back_picto.png')} alt="" />
                    <p className="item-center Plight">RETOUR</p>
                    <p>{ride.title}</p>
                </button>
            )
        })
        return comeBackList
    }
    render() {
        return (
            <Fragment>
                <section className="departure-selection flex-container">
                    {this.departure_list()}
                </section>
                <section className="come-back-selection flex-container">
                    {this.come_back_list()}
                </section>
            </Fragment>
        )
    }
}
export default rideComponent
