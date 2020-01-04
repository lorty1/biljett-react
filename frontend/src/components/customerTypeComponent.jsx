import React, { Component, Fragment } from 'react'

class customerTypeComponent extends Component {
    customer_list = () => {
        const customers = this.props.customers.map(customer => {
            return (
                <button className={"btn--customer flex-container " + (
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
                        (()=> {
                            switch(customer.slug){
                                case 'adult':
                                    return require('../assets/pictos/adult_picto.png')
                                case 'children':
                                    return require('../assets/pictos/children_picto.png')
                                case 'free':
                                    return require('../assets/pictos/star_picto.png')
                                case 'adult-voucher':
                                    return require('../assets/pictos/voucher_adult.png')
                                case 'children-voucher':
                                    return require('../assets/pictos/voucher_children.png')
                                case 'group':
                                    return require('../assets/pictos/voucher_group.png')
                                default:
                                    ''
                            }
                        })()
                    } alt="" />
                    {(()=> {
                        switch(customer.slug){
                            case 'adult':
                            case 'children':
                                return(
                                    <div className="item-center flex-container--column">
                                        <p className="item-center u-capitalize"> {customer.title}</p>
                                        <p className="txt-violet item-center u-uppercase">Tarif {customer.price} €</p>
                                    </div>
                                )
                            case 'free':
                            case 'group':
                                return (
                                    <div className="item-center flex-container--column">
                                        <p className="item-center u-capitalize">Tarif</p>
                                        <p className={
                                            "item-center u-uppercase"
                                            + (customer.slug == 'free' ? ' txt-violet' : ' txt-white')}> {customer.title}</p>
                                    </div>
                                )
                            case 'children-voucher':
                                return (
                                    <div className="item-center flex-container--column">
                                        <p className="item-center u-capitalize">Enfant</p>
                                        <p className="txt-white item-center u-uppercase">pass Voucher</p>
                                    </div>
                                )
                            case 'adult-voucher':
                                return (
                                    <div className="item-center flex-container--column">
                                        <p className="item-center u-capitalize">Adulte</p>
                                        <p className="txt-white item-center u-uppercase">pass Voucher</p>
                                    </div>
                                )
                            default:
                                null
                    }})()}
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
