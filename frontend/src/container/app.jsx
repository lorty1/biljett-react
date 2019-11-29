import React, { Component } from 'react'
import { hot } from "react-hot-loader";
import '../assets/scss/common.scss'
import HeaderContainer from './HeaderContainer.jsx'
import UserListContainer from './userListContainer.jsx'
import RideConstructorContainer from './rideConstructorContainer.jsx'
import  "../assets/scss/app.scss";
import Logo from "../assets/pictos/logo_biljett.jpg"

class App extends Component {
  render() {
    return (
      <div className="app-container global-container flex-container--column">
        <HeaderContainer />
        <div className="grid-6 grid-flow-1">
          <UserListContainer />
          <RideConstructorContainer />
          <div className="ticket-list"></div>
        </div>
      </div>
    )
  }
}

export default hot(module)(App);