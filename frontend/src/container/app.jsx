import React, { Component } from 'react'
import { hot } from "react-hot-loader";
import { CSSTransition } from 'react-transition-group'

import HeaderContainer from './HeaderContainer.jsx'
import UserListContainer from './userListContainer.jsx'
import RideConstructorContainer from './rideConstructorContainer.jsx'
import TicketListContainer from './ticketListContainer.jsx'
import ErrorModalComponent from '../components/errorModalComponent.jsx'
import OrderDetailContainer from './orderDetailContainer.jsx'

import  "../assets/scss/app.scss";
import '../assets/scss/common.scss'
import '../assets/scss/animation.css'
import Logo from "../assets/pictos/logo_biljett.jpg"

class App extends Component {
  state = {
    fullScreen:true,
    errorModal: false,
    errorMessages: [],
    ridePanel: true
  }
  show_error_messages = messages => {
    let { errorModal, errorMessages } = this.state
    errorModal = true;
    errorMessages = messages
    this.setState({errorModal, errorMessages})
  }
  hide_error_messages = () => {
    let {errorModal } = this.state;
    errorModal = false;
    this.setState({ errorModal })
  }
  full_screen_mode = () => {
    let { fullScreen } = this.state
    fullScreen = !fullScreen
    this.setState({ fullScreen })
  }
  switch_ride_panel = ()=> {
    console.log('yep order deral')
    let { ridePanel } = this.state
    ridePanel = !ridePanel
    this.setState({ ridePanel })
  }

  render() {
    return (
      <div className="app-container global-container flex-container--column">
        <HeaderContainer full_screen_mode={this.full_screen_mode} ></HeaderContainer>
        <div className="flex-container gridflow-1">
          <CSSTransition
            in={this.state.fullScreen}
            classNames="translate"
            timeout={1000}
            unmountOnExit
          >
            <UserListContainer />
          </CSSTransition>
          {this.state.ridePanel ?
            <RideConstructorContainer
            show_error_messages={this.show_error_messages.bind(this)}
            ></RideConstructorContainer>:
            <OrderDetailContainer>

            </OrderDetailContainer>
          }
          <TicketListContainer
          ridePanel={this.state.ridePanel}
          switch_ride_panel={this.switch_ride_panel}
          ></TicketListContainer>
        </div>
          <CSSTransition
            in={this.state.errorModal}
            classNames="alert"
            timeout={1000}
            unmountOnExit
          >
              <ErrorModalComponent
              className="modal"
              errorMessages={this.state.errorMessages}
              hide_error_messages={this.hide_error_messages}
              ></ErrorModalComponent>
          </CSSTransition>
      </div>
    )
  }
}

export default hot(module)(App);