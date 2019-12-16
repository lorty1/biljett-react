import React, { Component } from 'react'
import { connect } from 'react-redux'
import jsPDF from 'jspdf'

import { backData } from '../utils/ticketB64.js';
import OrderDetailTicketList from '../components/orderDetailTicketListComponent.jsx';
import OrderResumeComponent from '../components/orderResumeComponent'

import '../assets/scss/orderDetail.scss'

class OrderDetailContainer extends Component {
    constructor(props) {
        super(props)
        this.total_price()
        this.ticket_sorted_by_customer()
    }
    state = {
        ticketsSorted: null,
        total: null,
        panelChoice: 'payment',
        paymentChoice: [
            { title: 'Espèce', paymentType: 'cash payment' },
            { title: 'Chèque', paymentType: 'check payment' },
            { title: 'CB', paymentType: 'CB payment' },
            { title: 'Cheques vacance', paymentType: 'chèque vacance' },
            { title: 'Pass Voucher', paymentType: 'voucher-pass tourisme' },
            { title: 'Office de tourisme', paymentType: 'office de tourisme' }
        ],
        paymentData: {
            payment_type: null,
            total: null
        }
    }
    total_price = () => {
        let total = this.props.order.tickets_list.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.customer_type.price * currentValue.number)
        }, 0)
        this.state.total = total
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
    ticket_list = () => {
        const list = this.props.order.tickets_list.map((ticket, index) => {
            return (
                <OrderDetailTicketList
                    index={index}
                    ticket={ticket}
                    key={ticket.id}
                ></OrderDetailTicketList>
            )
        })
        return list
    }
    payment_list = () => {
        const paymentList = this.state.paymentChoice.map(item => {
            return (
                <button
                    key={item.title}
                    className={
                        item.title == 'Espèce' ? ' cash-button' :
                            item.title == 'Chèque' ? ' cheque-button' :
                                item.title == 'CB' ? ' cb-button' :
                                    item.title == 'Pass-voucher' ? ' pass-voucher-button' :
                                        item.title == 'Cheques vacance' ? ' holiday-cheque' : ' turist-office-button'
                    }
                    onClick={() => { this.payment_selection(item) }}
                >{item.title}</button>
            )
        })
        return paymentList
    }
    payment_selection = payment => {
        console.log(payment)
        let { paymentData } = this.state
        paymentData.payment_type = payment;
        this.setState({ paymentData })
    }
    select_panel = panel => {
        console.log('panel', panel)
        let { panelChoice } = this.state;
        panelChoice = panel;
        this.setState({ panelChoice });
    }
    print_ticket = function(){
        let { tickets_list } = this.props.order;
        var img = backData
        var doc = new jsPDF('p', 'mm', [54,86.1])
        console.log('t', doc.internal.getCurrentPageInfo())
        let imgHeight = 86.1;
        let imgWidth = 54;

        for (let i = 0; i < tickets_list.length; i++) {
            let datePrint = tickets_list[i].train_departure.date_on.split('-');
            datePrint = datePrint[2] + '/' + datePrint[1] + '/' + datePrint[0]
            console.log(datePrint)
            for (let x = 0; x < tickets_list[i].number; x++) {
                doc.setFontSize(12);
                if (i == 0) {
                    if (x > 0) {
                        doc.addPage();
                    }
                    doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                    doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                    doc.text(tickets_list[i].train_departure.ride.departure_hour, 27, 67, 'center');
                    doc.text(datePrint, 27, 58, 'center');
                    if (tickets_list[i].train_arrival) {
                        doc.addPage();
                        doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                        doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                        doc.text(tickets_list[i].train_arrival.ride.departure_hour, 27, 67, 'center');
                        doc.text(datePrint, 27, 58, 'center');
                    }
                } else if (i > 0) {
                    doc.addPage();
                    doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                    doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                    doc.text(tickets_list[i].train_departure.ride.departure_hour, 27, 67, 'center');
                    doc.text(datePrint, 27, 58, 'center');
                    if (tickets_list[i].train_arrival) {
                        doc.addPage();
                        doc.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                        doc.text(tickets_list[i].customer_type.title, 27, 79, 0, 0, 'center');
                        doc.text(tickets_list[i].train_arrival.ride.departure_hour, 27, 67, 'center');
                        doc.text(datePrint, 27, 58, 'center');
                    }
                }
            }
        }
        doc.output('dataurlnewwindow')
        doc.autoPrint();
        //doc.save('tickets.pdf')
    }
    //doc.save('tickets.pdf')
    //doc.autoPrint();

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
                <OrderResumeComponent
                    panelChoice={this.state.panelChoice}
                    total={this.state.total}
                    ticketsSorted={this.state.ticketsSorted}
                ></OrderResumeComponent>
                <div className="grid-3 payment-list border-top">
                    {this.payment_list()}
                </div>
                <button onClick={() => this.print_ticket()} className="print-button border-top">Imprimer</button>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        order: store.orderStore.orderSelected
    }
}


export default connect(mapStateToProps, null)(OrderDetailContainer)