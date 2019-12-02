import React, { Component, Fragment } from 'react'

class rideComponent extends Component {

    departure_list = () => {
        const departureList = this.props.rides.map(ride => {
            return (
                <button onClick={() => { this.props.station_selection('one-way', ride) }}
                    key={ride.id}
                    className={'w25 flex-container--column departure-station'+
                        (this.props.ticket.departure.station == ride.id ? ' selected' : '')
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
                    className={'w25 flex-container--column departure-station' +
                        (this.props.ticket.comeBack.station == ride.id ? ' selected' : '')
                    }>
                    <img src={require('../assets/pictos/come_back_picto.png')} alt="" />
                    <p className="item-center Plight">RETOUR</p>
                    <p>{ride.title}</p>
                </button>
            )
        })
        return comeBackList
    }
    train_departure_list = () => {
        console.log('trainde parture')
        const trains = this.props.trains.departure
        if(!trains) return ''
        for (var i = trains.length;i < 12; i++) {
            trains.push({title: '-'})
        }
        const trainList = trains.map(train => {
            return (
                train.title !== '-' ?
                    <button key={train.id }
                    className={"flex-container--column train-item" + 
                    (this.props.trainDepartureSelected == train.id ? ' selected' : '')}
                    onClick={() => {this.props.train_selection(train.id,'one-way')}}>
                        <p className="item-center">{train.ride.departure_hour}</p>
                        <p className="item-center">{train.total_capacity}</p>
                    </button>
                :<button key={Date.now()}className="flex-container train-item">
                    <p className="item-center">{train.title}</p>
                </button>

            )
        })
        return trainList
    }
    train_comeBack_list = () => {

        console.log('pr',this.props)
        const trains = this.props.trains.comeBack
        if(!trains || !this.props.ticket.comeBack.station) return ''
        for (var i = trains.length;i < 12; i++) {
            trains.push({title: '-'})
        }
        console.log('trains', trains)
        const trainList = trains.map(train => {
            return (
                train.title !== '-' ?
                    <button 
                    key={train.id}
                    className={"flex-container--column train-item" + 
                    (this.props.ticket.comeBack.train == train.id ? ' selected' : '')}
                    onClick={() => {this.props.train_selection(train.id,'come-back')}}>
                        <p className="item-center">{train.ride.departure_hour}</p>
                        <p className="item-center">{train.total_capacity}</p>
                    </button>
                :<button key={Date.now()}className="flex-container train-item">
                    <p className="item-center">{train.title}</p>
                </button>

            )
        })
        return trainList
    }
    render() {
        return (
            <Fragment>
                <section className="departure-selection flex-container">
                    {this.departure_list()}
                    <div className="train-selection">
                    {this.train_departure_list()}
                    </div>
                </section>
                <section className="come-back-selection flex-container">
                    {this.come_back_list()}
                    <div className="train-selection">
                        {this.train_comeBack_list()}
                    </div>
                </section>
            </Fragment>
        )
    }
}
export default rideComponent
