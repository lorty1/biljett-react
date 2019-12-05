import React, { Component } from 'react'
import { hot } from "react-hot-loader";
import '../assets/scss/common.scss'
import HeaderContainer from './HeaderContainer.jsx'
import UserListContainer from './userListContainer.jsx'
import RideConstructorContainer from './rideConstructorContainer.jsx'
import TicketListContainer from './ticketListContainer.jsx'
import  "../assets/scss/app.scss";
import Logo from "../assets/pictos/logo_biljett.jpg"

class App extends Component {
  render() {
    return (
      <div className="app-container global-container flex-container--column">
        <HeaderContainer />
        <div className="flex-container gridflow-1">
          <UserListContainer />
          <RideConstructorContainer />
          <TicketListContainer/>
        </div>
      </div>
    )
  }
}

export default hot(module)(App);