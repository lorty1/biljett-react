import React, { Component, Fragment } from 'react'

class customerTypeComponent extends Component {
    customer_list = () => {
        console.log('yeah',this.props)
        const customers = this.props.customers.map(customer => {
            return (
                <button className={"flex-container " + (
                    customer.slug == 'adult' ? 'adult-tarif' :
                        customer.slug == 'children' ? 'border-right child-tarif' :
                            customer.slug == 'free' ? 'free-tarif' :
                                customer.slug == 'adult-voucher' ? 'adult-tarif-voucher' :
                                    customer.slug == 'children-voucher' ? 'border-right child-tarif-voucher' :
                                        customer.slug == 'group' ? 'group-tarif' :
                                            '') + (this.props.ticket.customerType.id == customer.id ? ' selected' : '')
                }
                    key={customer.id}
                    onClick={()=> {this.props.customer_selection(customer)}}
                >
                    <img src={
                        customer.slug == 'adult' ? require('../assets/pictos/adult_picto.png') :
                            customer.slug == 'children' ? require('../assets/pictos/children_picto.png') :
                                customer.slug == 'free' ? require('../assets/pictos/star_picto.png') :
                                    customer.slug == 'adult-voucher' ? require('../assets/pictos/voucher_adult.png') :
                                        customer.slug == 'children-voucher' ? require('../assets/pictos/voucher_children.png') :
                                            customer.slug == 'group' ? require('../assets/pictos/voucher_group.png') : ''
                    } alt="" />
                    <div className="item-center flex-container--column">
                        <p className="item-center u-capitalize"> {customer.title}</p>
                        <p className="item-center u-uppercase">{customer.information}</p>
                    </div>
                </button>
            )
        })
        return customers
    }
    render() {
        return (
            <Fragment>
                <section className="grid-3 customer-selection border-top border-bottom">
                    {this.customer_list()}
                </section>
            </Fragment>
        )
    }
}
export default customerTypeComponent
