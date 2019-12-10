import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_order_list, create_order, get_order } from '../actions/orderAction'

import '../assets/scss/orderList.scss'
import PreviousArrow from '../assets/pictos/previous_arrow.png'
import NextArrow from '../assets/pictos/next_arrow.png'

class userListContainer extends Component {
    constructor(props) {
        super(props)
        this.props.get_order_list(1,null)
    }
    order_list = () => {
        const orders = this.props.orderList.results

        // for (var i = orders.length; i < 10; i++) {
        //     orders.push({ reference: `po-${i}` })
        // }
        const list = orders.map(order => {
            
            return (
                <div key={order.reference}className="users-list-item">
                    <p className="pointer" onClick={()=> this.props.get_order(order.id) }>{order.reference}</p>
                </div>
            )
        })
        return list
    }
    render() {
        return (
            <div id="user-list-container" className="flex-container--column border-right w15">
                    <button onClick={this.props.create_order} className="new-command-button Plight txt-white ">
                       <p>Nouvelle <br/>Commande</p>
                    </button>
                <div className="order-register Plight">
                    <p>Commande <br/>Enregistrée </p>
                </div>
                <div className="users-list">
                    {
                        this.props.orderList.results ? this.order_list() : <p>Aucune commande</p>
                    }
                </div>
                <div className="grid-2 pagination-arrow">
                    <button onClick={()=> this.props.get_order_list(this.props.orderList.current - 1), this.props.searchFilter} disabled={ !this.props.orderList.previous } className="flex-container green-bkg">
                        <img className="item-center" src={PreviousArrow} alt="previous arrow" />
                    </button>
                    <button onClick={()=> this.props.get_order_list(this.props.orderList.current + 1, this.props.searchFilter)} disabled={ !this.props.orderList.next } className="flex-container green-bkg">
                        <img className="item-center" src={NextArrow} alt="next-arrow" />
                    </button>
                </div>
            </div >
        )
    }
}
const mapStateToProps = store => {
    return {
        orderList: store.orderStore.orders,
        search: store.orderStore.searchFilter
    }
}
const mapDispatchToProps = {
    get_order_list,
    create_order,
    get_order
}

export default connect(mapStateToProps, mapDispatchToProps)(userListContainer)