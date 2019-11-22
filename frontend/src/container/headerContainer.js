import React, { Component } from 'react'
import Logo from "../assets/pictos/logo_biljett.jpg"
import Clock from "../assets/pictos/loupe_picto.png"

export default class headerContainer extends Component {
    state = {
        hour : '',
        date: '',
      }
      componentDidMount(){
            const date = new Date().toLocaleString([],{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            })
            this.setState({date: date})
          

        setInterval(()=> {
          const hour = new Date().toLocaleString([],{hour:'2-digit', minute:'2-digit',second:'2-digit'})
          this.setState({hour:hour})
        },1000)
      }
    render() {
        return (
            <div className="header-container green-bkg">
                <div></div>
                <div className="flex-container white-bkg" >
                    <img className="item-center" src={Logo} alt="biljett-logo" />
                </div>
            <div className="flex-container">
               <p className="mtauto mlauto mrauto">{this.state.date}</p>
            </div>
            <div className="flex-container--column">
                <div className="item-center">
                <img src={Clock} alt="" />
                </div>
                <p className="item-center">{this.state.hour}</p>

            </div>
            </div>
        )
    }
}
