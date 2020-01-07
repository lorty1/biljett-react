import React, { Component } from 'react'
import { connect } from 'react-redux'
import jsPDF from 'jspdf'
import { order_update } from '../actions/orderAction'
import { delete_ticket } from '../actions/ticketAction'
import { debounce } from '../utils/index'
import { backData } from '../utils/ticketB64.js';
import OrderDetailTicketList from '../components/orderDetailTicketListComponent.jsx';
import OrderResumeComponent from '../components/orderResumeComponent'

import '../assets/scss/orderDetail.scss'

class OrderDetailContainer extends Component {
    constructor(props) {
        super(props)
        this.ticket_sorted_by_customer()
    }
    state = {
        ticketsSorted: null,
        total: this.props.order.total,
        email: null,
        phone: null,
        name: null,
        panelChoice: 'payment',
        paymentChoice: [
            { title: 'Espèce', paymentType: 'cash payment' },
            { title: 'Chèque', paymentType: 'check payment' },
            { title: 'CB', paymentType: 'CB payment' },
            { title: 'Cheques vacances', paymentType: 'chèque vacances' },
            { title: 'Pass Voucher', paymentType: 'voucher-pass tourisme' },
            { title: 'Office de tourisme', paymentType: 'office de tourisme' }
        ],
        paymentType: null,
    }
    ticket_sorted_by_customer = () => {
        let initialTicketsSorted = {}
        for (var ticket of this.props.order.tickets_list) {
            let title = ticket.customer_type.title
            if (!initialTicketsSorted.hasOwnProperty(`${title}`)) {
                initialTicketsSorted[`${title}`] = { count: ticket.number, total: ticket.customer_type.price * ticket.number }
            } else {
                initialTicketsSorted[`${title}`].count += ticket.number
                initialTicketsSorted[`${title}`].total += ticket.customer_type.price * ticket.number

            }
        }
        this.state.ticketsSorted = initialTicketsSorted
    }

    removed_ticket = id => this.props.removed_ticket(id) 

    ticket_list = () => {
        const list = this.props.deleteItems.map(ticket => {
            return (
                <OrderDetailTicketList
                    removed_ticket={id=> this.removed_ticket(id)}
                    place_to_deleted={(action, id)=>this.place_to_deleted(action, id)}
                    index={ticket.index}
                    placeDeleted={ticket.placeDeleted}
                    ticket={ticket.ticket}
                    key={ticket.ticket.id}
                ></OrderDetailTicketList>
            )
        })
        return list
    }
    place_to_deleted = (action, id) => {
        let item = this.get_ticket(id)
        if(action == 'decrement') {
            if(item.placeDeleted >= 2) {
                item.placeDeleted -= 1;
                this.props.update_deleteItems(item);
            }else {
                this.props.removed_ticket(id)
            }
        }else {
            if(item.placeDeleted < item.ticket.number) {
                item.placeDeleted += 1;
                this.props.update_deleteItems(item);
            }
        }
    }
    get_ticket = id => {
        return this.props.deleteItems.find(item => item.ticket.id == id)
    }
    payment_list = () => {
        const paymentList = this.state.paymentChoice.map(item => {
            return (
                <button
                    key={item.title}
                    className={(
                        item.title == 'Espèce' ? ' cash-button' :
                            item.title == 'Chèque' ? ' cheque-button' :
                                item.title == 'CB' ? ' cb-button' :
                                    item.title == 'Pass-voucher' ? ' pass-voucher-button' :
                                        item.title == 'Cheques vacance' ? ' holiday-cheque' : ' turist-office-button')
                        + (item.paymentType == this.state.paymentType ? ' selected' : '')
                    }
                    onClick={() => { this.payment_selection(item) }}
                >{item.title}</button>
            )
        })
        return paymentList
    }
    payment_selection = payment => {
        let { paymentType } = this.state
        if (paymentType && paymentType == payment.paymentType) {
            paymentType = null;
        } else {
            paymentType = payment.paymentType;
        }
        this.setState({ paymentType })
    }
    select_panel = panel => {
        let { panelChoice } = this.state;
        panelChoice = panel;
        this.setState({ panelChoice });
        this.props.switch_delete_ticket_mode(panel)
    }
    /*
    Print function

    */
    print_ticket = function () {
        let { tickets_list, reference } = this.props.order;
        var img = backData
        var doc = new jsPDF('p', 'mm', [54, 86.1])
        let imgHeight = 86.1;
        let imgWidth = 54;

        for (let i = 0; i < tickets_list.length; i++) {
            let datePrint = tickets_list[i].train_departure.date_on.split('-');
            datePrint = datePrint[2] + '/' + datePrint[1] + '/' + datePrint[0]
            for (let x = 0; x < tickets_list[i].number; x++) {
                doc.setFontSize(12);
                if (i == 0) {
                    if (x > 0) {
                        doc.addPage();
                    }
                    doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                    doc.text(reference, 27, 50, 'center')
                    doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                    doc.text(tickets_list[i].train_departure.ride.departure_hour, 27, 67, 'center');
                    doc.text(datePrint, 27, 58, 'center');
                    if (tickets_list[i].train_arrival) {
                        doc.addPage();
                        doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                        doc.text(reference, 27, 50, 'center')
                        doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                        doc.text(tickets_list[i].train_arrival.ride.departure_hour, 27, 67, 'center');
                        doc.text(datePrint, 27, 58, 'center');
                    }
                } else if (i > 0) {
                    doc.addPage();
                    doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                    doc.text(reference, 27, 50, 'center')
                    doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                    doc.text(tickets_list[i].train_departure.ride.departure_hour, 27, 67, 'center');
                    doc.text(datePrint, 27, 58, 'center');
                    if (tickets_list[i].train_arrival) {
                        doc.addPage();
                        doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                        doc.text(reference, 27, 50, 'center')
                        doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                        doc.text(tickets_list[i].train_arrival.ride.departure_hour, 27, 67, 'center');
                        doc.text(datePrint, 27, 58, 'center');
                    }
                }
            }
        }
        doc.output('dataurlnewwindow')
        doc.autoPrint();
    }

    handle_name = debounce(event => {
        let { name } = this.state;
        name = event;
        this.setState({ name })
    }, 150)

    handle_email = debounce(event => {
        let { email } = this.state;
        email = event;
        this.setState({ email })
    }, 150)
    handle_phone = debounce(event => {
        let { phone } = this.state;
        phone = event;
        this.setState({ phone })
    })

    check_reservation_info = () => {
        let errors_message = {};
        let { name, email, phone } = this.state;
        let phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        let emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return new Promise((resolve, reject) => {
            if (name && phoneRegex.test(phone)) {
                if(email) {
                    if(emailRegex.test(email)) {
                        resolve()
                    }else {
                        errors_message.email = ['Un email valide est requis']
                        reject(errors_message)
                    }
                }else {
                    resolve()
                }
            }else {
                if (!name) {
                    errors_message.name = ['Un nom est requis !']
                }
                if (!phone || !phoneRegex.test(phone)) {
                    errors_message.email = ['Un numéro de téléphone valide est requis']
                }
                reject(errors_message)
            }
        })
    }
    // reservation function
    order_registered = () => {
        this.check_reservation_info()
            .then(() => {
                let { name, email, phone } = this.state;
                let data = {
                    id: this.props.order.id,
                    name: name,
                    email: email,
                    phone: phone,
                    is_booked: true,
                    book_to: new Date(this.props.order.tickets_list[0].train_departure.date_on)
                }
                this.props.order_update(data)
            })
            .catch(errors => {
                this.props.show_error_messages(errors)
            })
    }
    // order validate, if order is good we print all tickets of order
    order_booked = () => {
        let { paymentType } = this.state;
        if (!paymentType) {
            return this.props.show_error_messages({ paiement: ['Aucun paiement n\'est sélectionné'] })
        }
        let data = {
            id: this.props.order.id,
            is_booked: true,
            generated: true,
            payment: paymentType
        }
        if(this.props.order.generated == true) { // if order has already printed just print tickets
            return this.print_ticket()
        }else {// else order is updated in BDD and tickets are printed
            this.props.order_update(data)
            .then(this.print_ticket())
        }
    }
    panel_render = () => {
            return (
                <div className="item-fluid grid-5 has-gutter pas avoir-list">
                    {this.ticket_list()}
                </div>
            )
        }
    order_detail_render = () => {
        return (
            <div className="flex-container--column item-fluid">
                <OrderResumeComponent
                    avoir={this.props.order.avoir}
                    panelChoice={this.state.panelChoice}
                    total={this.props.order.total}
                    ticketsSorted={this.state.ticketsSorted}
                ></OrderResumeComponent>
                {this.state.panelChoice == 'payment' ?
                    <div className="grid-3 payment-list border-top">
                        {this.payment_list()}
                    </div>
                    :
                    <div className="grid-3 registration-info border-top">
                        <div className="flex-container--column">
                            <label htmlFor="name">Nom*</label>
                            <input id="name" placeholder={this.props.order.name} onChange={event => this.handle_name(event.target.value)} name="name" type="text" />
                        </div>
                        <div className="flex-container--column">
                            <label htmlFor="email">Email</label>
                            <input id="email" placeholder={this.props.order.email} onChange={event => this.handle_email(event.target.value)} name="email" type="email" />
                        </div>
                        <div className="flex-container--column">
                            <label htmlFor="phone">Téléphone*</label>
                            <input id="phone" placeholder={this.props.order.phone} onChange={event => this.handle_phone(event.target.value)} name="phone" type="text" />
                        </div>
                    </div>

                }
            </div>
        )
    }
    ticket_deleted = ()=> {
        const list = this.props.deleteItems.map(item => {
            return {
                id:item.ticket.id,
                placeDeleted: item.placeDeleted,
                order_id:this.props.order.id
            }
        })
            this.props.delete_ticket(list) //MAJ BDD
        .then(()=> {
            this.props.clear_itemsDeleted() //clear deleted tickets panel
        }).then(()=> {
            this.ticket_sorted_by_customer() // refresh the list of ticket for resume panel
        })
    }
    render() {
        return (
            <div id="order-detail" className="flex-container item-fluid">
                <div className="grid-3 status-panel">
                    
                    <button onClick={() => this.select_panel('payment')}
                        className={
                            "payment-button u-uppercase" + (this.state.panelChoice !== 'payment' ? ' border-panel' : '')
                        }>Paiement</button>
                    <button onClick={() => this.select_panel('registration')}
                        className={
                            "register-button u-uppercase" + (this.state.panelChoice !== 'registration' ? ' border-panel' : '')
                        }>Reservation</button>
                    <button onClick={() => this.select_panel('credit')}
                        className={
                            "delete-button u-uppercase" + (this.state.panelChoice !== 'credit' ? ' border-panel' : '')
                        }>Avoir / Annulation</button>
                </div>
                {this.state.panelChoice == 'credit' ?this.panel_render() : this.order_detail_render()}
                {this.state.panelChoice == 'payment' ?
                    <button onClick={() => this.order_booked()} className="print-button border-top">Imprimer</button>
                    : this.state.panelChoice == 'registration' ?
                        <button onClick={() => this.order_registered()} className={
                            "print-button border-top"
                            +(this.props.status ? ' selected' : '')
                        }>Réserver</button>
                        :
                        <button onClick={() => this.ticket_deleted()} className="print-button border-top">Supprimer</button>
                }
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        order: store.orderStore.orderSelected,
        status: store.orderStore.status
    }
}
const mapDispatchToProps = {
    order_update,
    delete_ticket
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailContainer)