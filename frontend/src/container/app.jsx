import React, { Component } from 'react'
import { hot } from "react-hot-loader";
import '../assets/scss/common.scss'
import HeaderContainer from './HeaderContainer.jsx'
import UserListContainer from './userListContainer.jsx'
import RideConstructorContainer from './rideConstructorContainer.jsx'
import TicketListContainer from './ticketListContainer.jsx'
import ErrorModalComponent from '../components/errorModalComponent.jsx'
import  "../assets/scss/app.scss";
import { CSSTransition } from 'react-transition-group'
import '../assets/scss/animation.css'
import Logo from "../assets/pictos/logo_biljett.jpg"

class App extends Component {
  state = {
    errorModal: false,
    errorMessages: []
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
    this.setState({errorModal})
  }
  render() {
    return (
      <div className="app-container global-container flex-container--column">
        <HeaderContainer />
        <div className="flex-container gridflow-1">
          <UserListContainer />
          <RideConstructorContainer
          show_error_messages={this.show_error_messages.bind(this)}
          ></RideConstructorContainer>
          <TicketListContainer/>
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