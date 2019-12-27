import React, { Component } from 'react'
import { connect } from 'react-redux'
import { update_search_filter, get_order_list } from '../actions/orderAction'
import { debounce } from '../utils/index'
import CalendarContainer from '../container/calendarContainer'
import Logo from "../assets/pictos/logo_biljett.jpg"
import Clock from "../assets/pictos/timer.png"
import MagnifingGlass from "../assets/pictos/loupe_picto.png"

import '../assets/scss/header.scss'

class HeaderContainer extends Component {
    state = {
        hour: '',
        date: '',
        search: ''
    }
    componentDidMount() {
        (function() {// function for nav-button

            // old browser or not ?
        if ( !('querySelector' in document && 'addEventListener' in window) ) {
            return;
            }
            window.document.documentElement.className += ' js-enabled';
            
            function toggleNav() {
            
            // Define targets by their class or id
            var button = document.querySelector('.nav-button');
            var target = document.querySelector('body > nav');
            
            // click-touch event
            if ( button ) {
              button.addEventListener('click',
              function (e) {
                  button.classList.toggle('is-active');
                target.classList.toggle('is-opened');
                e.preventDefault();
              }, false );
            }
            } // end toggleNav()
            
            toggleNav();
            }());
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

    handle_search = debounce((str) => { 
        this.props.update_search_filter(str).then(()=> {
            this.props.get_order_list(1,str)
        })
    },800)
    render() {
        return (
            <div id="header-container" className="green-bkg">
            <div id="search-component" className="flex-container--column w15 pas">
                <div className="flex-container">
                    <button onClick={this.props.full_screen_mode} className="nav-button is-active" type="button" role="button" aria-label="open/close navigation"><i></i></button>
                    <img src={MagnifingGlass} alt="magnifing glass picto"/>
                </div>
                <input onChange={(event)=> {this.handle_search(event.target.value)}} type="text"/>
            </div>
                
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
                        <img src={Clock} width="70px" alt="timer" />
                    </div>
                    <p className="item-center txtcenter">{this.state.hour}</p>

                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        orderSelected: store.orderStore.orderSelected,
        searchFilter: store.orderStore.searchFilter
    }
}
const mapDispatchToProps = {
    update_search_filter,
    get_order_list
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)