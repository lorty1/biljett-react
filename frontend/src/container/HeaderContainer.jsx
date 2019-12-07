import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarContainer from '../container/calendarContainer'
import Logo from "../assets/pictos/logo_biljett.jpg"
import Clock from "../assets/pictos/loupe_picto.png"

import '../assets/scss/header.scss'

class HeaderContainer extends Component {
    state = {
        hour: '',
        date: '',
    }
    componentDidMount() {
        const date = new Date().toLocaleString([], {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        })
        this.setState({ date: date })


        setInterval(() => {
            const hour = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            this.setState({ hour: hour })
        }, 1000)
    }
    render() {
        return (
            <div id="header-container" className="green-bkg">
                <div className="w15 pas"></div>
                <div className=" flex-container w70">

                    <div className="flex-container white-bkg w25" >
                        <img className="item-center" src={Logo} alt="biljett-logo" />
                    </div>
                    <div className="flex-container--column command-number w25 pas">
                        <div className="mtauto">
                            <p className="Plight mb0"> COMMANDE</p>
                            {this.props.orderSelected.reference ? <p className="mt0"> N° {this.props.orderSelected.reference}</p> : null}
                        </div>
                    </div>
                    <div className="flex-container date pas">
                        < CalendarContainer />
                    </div>
                </div>
                <div className="flex-container--column w15 pas">
                    <div className="item-center">
                        <img src={Clock} alt="" />
                    </div>
                    <p className="item-center">{this.state.hour}</p>

                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    console.log('store', store.orderStore.orders)
    return {
        orderSelected: store.orderStore.orderSelected,
    }
}
export default connect(mapStateToProps, null)(HeaderContainer)