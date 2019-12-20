import React, { Component } from 'react'
import { hot } from "react-hot-loader";
import { CSSTransition } from 'react-transition-group'

import HeaderContainer from './HeaderContainer.jsx'
import UserListContainer from './userListContainer.jsx'
import RideConstructorContainer from './rideConstructorContainer.jsx'
import TicketListContainer from './ticketListContainer.jsx'
import ErrorModalComponent from '../components/errorModalComponent.jsx'
import OrderDetailContainer from './orderDetailContainer.jsx'

import "../assets/scss/app.scss";
import '../assets/scss/common.scss'
import '../assets/scss/animation.css'
import Logo from "../assets/pictos/logo_biljett.jpg"

class App extends Component {
  state = {
    fullScreen: true,
    errorModal: false,
    errorMessages: [],
    ridePanel: true,
    deleteTicketMode: false,
    deleteItems: []
  }

  switch_delete_ticket_mode = mode => {
    let { deleteTicketMode } = this.state;
    if (mode !== 'credit') {
      deleteTicketMode = false;
    } else {
      deleteTicketMode = true
    }
    this.setState({ deleteTicketMode })
  }

  show_error_messages = messages => {
    let { errorModal, errorMessages } = this.state
    errorModal = true;
    errorMessages = messages
    this.setState({ errorModal, errorMessages })
  }
  hide_error_messages = () => {
    let { errorModal } = this.state;
    errorModal = false;
    this.setState({ errorModal })
  }
  full_screen_mode = () => {
    let { fullScreen } = this.state
    fullScreen = !fullScreen
    this.setState({ fullScreen })
  }
  switch_ride_panel = () => {
    let { ridePanel } = this.state
    ridePanel = !ridePanel
    this.setState({ ridePanel })
  }
  delete_items_list = (index, item) => {
    let { deleteItems } = this.state;
    if(deleteItems.length == 0) {
      deleteItems.push({
        index: index,
        placeDeleted: item.number,
        ticket: item
      })
    } else {
      // boucle permettant de détecter si le ticket est déjà présent dans la liste
      for ( var i = 0 ; i < deleteItems.length; i++ ) {
        if(deleteItems[i].ticket.id == item.id) {
          break
        }else if( (deleteItems[i].ticket.id !== item.id) && (i == deleteItems.length - 1)){
          deleteItems.push({
            index: index,
            placeDeleted: item.number,
            ticket: item
          })          
        }
      }
    }
    this.setState({ deleteItems })
  }
  update_deleteItems = item => {
    let { deleteItems } = this.state;
    for (var i = 0; i < deleteItems.length ; i++) {
      if (deleteItems[i].ticket.id == item.ticket.id){
        deleteItems[i].placeDeleted = item.placeDeleted
      }
    }
    this.setState({deleteItems})
  }
  
  clear_itemsDeleted = ()=> this.setState({deleteItems:[]})

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
            ></RideConstructorContainer> :
            <OrderDetailContainer
            clear_itemsDeleted={()=>this.clear_itemsDeleted()}  
            update_deleteItems={item=>this.update_deleteItems(item)}
              deleteItems={this.state.deleteItems}
              switch_delete_ticket_mode={mode => this.switch_delete_ticket_mode(mode)}
              show_error_messages={message => this.show_error_messages(message)}
            >
            </OrderDetailContainer>
          }
          <TicketListContainer
            deleteTicketMode={this.state.deleteTicketMode}
            delete_items_list={(index, item) => { this.delete_items_list(index, item) }}
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