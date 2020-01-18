import React, { Component } from 'react'
import '../assets/scss/modal.scss';
import Picto from 'Pictos/warning.png'

class ErrorModalComponent extends Component {
    
    close_error_modal = () => {
        const { hide_error_messages } = this.props
        hide_error_messages()
    }
    
    get_messages = ()=> {
        const { errorMessages } = this.props

        if (!errorMessages) return ''
        const messageList = Object
        .keys(errorMessages)
        .map(message => {
            return (
                    <p className="item-center" key={message}>{errorMessages[message][0]}</p>
                    )
                })
                return messageList
            }
            
    render() {
        return (
            <div id="error-container">
                <img src={Picto} width="100px" className="item-center" alt=""/>
                <div className="item-center">
                    {this.get_messages()}
                </div>
                <button className="btn--success item-center" onClick={this.close_error_modal}> Fermer</button>
            </div>
        )
    }
}
export default ErrorModalComponent