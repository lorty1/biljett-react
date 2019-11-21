import style from "../assets/scss/app.scss";
import { hot } from "react-hot-loader";

import React, { Component } from 'react'

class App extends Component {
  state = {
    hour : ''
  }
  constructor(props){
    super(props)
    setInterval(()=> {
      const hour = new Date().toLocaleString([],{hour:'2-digit', minute:'2-digit',second:'2-digit'})
      this.setState({hour:hour})
    },1000)
  }
  componentDidMount(){
  }
  render() {
    return (
      <div>
        <div className="flex-container">
          <p className="u-bold">{this.state.hour}</p>
          <div className={style.app}>react Starter 🚀 </div>;
          <button className="btn--success">Valider</button>
        </div>
      </div>
    )
  }
}

export default hot(module)(App);