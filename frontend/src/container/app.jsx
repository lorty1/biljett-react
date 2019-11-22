import React, { Component } from 'react'
import { hot } from "react-hot-loader";
import '../assets/scss/common.scss'
import HeaderContainer from './headerContainer'

import style from "../assets/scss/app.scss";
import Logo from "../assets/pictos/logo_biljett.jpg"

class App extends Component {
  render() {
    return (
      <div className="app-container global-container">
        <HeaderContainer />
      </div>
    )
  }
}

export default hot(module)(App);