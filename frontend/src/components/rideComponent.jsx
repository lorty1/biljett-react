import React, { Component, Fragment } from 'react'

class rideComponent extends Component {

    departure_list = () => {
        const departureList = this.props.rides.map(ride => {
            return (
                <button onClick={() => { this.props.station_selection('one-way', ride) }}
                    key={ride.id}
                    className={
                        'w25 flex-container--column departure-station'+
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
        const trains = this.props.trains.departure
        if(!trains || !this.props.ticket.departure.station) return []
        for (var i = trains.length;i < 12; i++) {
            trains.push({title: '-'})
        }
        const trainList = trains.map(train => {
            if(train.title !== '-') {
                return (
                    <button 
                        key={train.id}
                        onClick={
                            train.remaining > 0 ?
                            () => {this.props.train_selection(train.id,'one-way')} :
                            null
                        }
                        className={
                            "flex-container--column train-item" +
                            (this.props.ticket.departure.train == train.id ? ' selected' : '') +
                            (train.remaining === 0 ? ' completed' : '')
                        }>
                        <p className="item-center">{train.ride.departure_hour}</p>
                        {train.remaining > 0 ?
                            <p className="item-center">{train.remaining}</p> :
                            <p>Complet</p>
                        }
                    </button>
                )
            }else {
                return (
                    <button key={Date.now()} className="flex-container train-item">
                        <p className="item-center">{train.title}</p>
                    </button>
                )
            }
        })
        return trainList
    }
    train_comeBack_list = () => {

        
        const trains = this.props.trains.comeBack
        if(!trains || !this.props.ticket.comeBack.station) return ''
        for (var i = trains.length;i < 12; i++) {
            trains.push({title: '-'})
        }
        
        const trainList = trains.map(train => {
            return (
                train.title !== '-' ?
                    <button 
                    key={train.id}
                    className={"flex-container--column train-item" + 
                    (this.props.ticket.comeBack.train == train.id ? ' selected' : '') +
                    (train.remaining < 1 ? ' completed' : '')}
                    onClick={() => {this.props.train_selection(train.id,'come-back')}}>
                        <p className="item-center">{train.ride.departure_hour}</p>
                        {train.remaining > 0 ?
                        <p className="item-center">{train.remaining}</p>:
                        <p>Complet</p>}
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
                    <div className="train-selection border-left">
                    {this.train_departure_list()}
                    </div>
                </section>
                <section className="come-back-selection flex-container">
                    {this.come_back_list()}
                    <div className="train-selection border-left">
                        {this.train_comeBack_list()}
                    </div>
                </section>
            </Fragment>
        )
    }
}
export default rideComponent
