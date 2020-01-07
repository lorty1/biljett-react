import React, { Component, Fragment } from 'react'

class customerTypeComponent extends Component {
    customer_list = () => {
        const customers = this.props.customers.map(customer => {
            switch(customer.slug) {
                case 'adult':
                    return(
                        <button key={customer.id} onClick={()=>this.props.customer_selection(customer)}
                        className={"btn--customer flex-container adult-tarif" +
                        (this.props.ticket.customerType.id == customer.id ? ' selected' : '')}>
                            <img src={require('../assets/pictos/adult_picto.png')} alt=""/>
                            <div className="item-center flex-container--column">
                                <p className="item-center u-capitalize"> {customer.title}</p>
                                <p className="txt-violet item-center u-uppercase">Tarif {customer.price} €</p>
                            </div>
                        </button>
                    )
                case 'children':
                    return(
                        <button key={customer.id} onClick={()=>this.props.customer_selection(customer)} 
                        className={"btn--customer flex-container border-right child-tarif" +
                         (this.props.ticket.customerType.id == customer.id ? ' selected' : '') }>
                            <img src={require('../assets/pictos/children_picto.png')} alt=""/>
                            <div className="item-center flex-container--column">
                                <p className="item-center u-capitalize"> {customer.title}</p>
                                <p className="txt-violet item-center u-uppercase">Tarif {customer.price} €</p>
                            </div>
                        </button>
                    )
                case 'free':
                    return(
                        <button key={customer.id} onClick={()=>this.props.customer_selection(customer)} 
                        className={"btn--customer flex-container free-tarif" +
                        (this.props.ticket.customerType.id == customer.id ? ' selected' : '')}>
                            <img src={require('../assets/pictos/star_picto.png')} alt=""/>
                            <div className="item-center flex-container--column">
                                <p className="item-center u-capitalize">Tarif</p>
                                <p className={
                                    "item-center u-uppercase"
                                    + (customer.slug == 'free' ? ' txt-violet' : ' txt-white')}> {customer.title}
                                </p>
                            </div>
                        </button>
                    )
                case 'adult-voucher':
                    return(
                        <button key={customer.id} onClick={()=>this.props.customer_selection(customer)}
                        className={"btn--customer flex-container adult-tarif-voucher" +
                        (this.props.ticket.customerType.id == customer.id ? ' selected' : '')}>
                            <img src={require('../assets/pictos/voucher_adult.png')} alt=""/>
                            <div className="item-center flex-container--column">
                                <p className="item-center u-capitalize">Adulte</p>
                                <p className="txt-white item-center u-uppercase">pass Voucher</p>
                            </div>
                        </button>
                    )
                case 'children-voucher':
                    return(
                        <button key={customer.id} onClick={()=>this.props.customer_selection(customer)}
                        className={"btn--customer flex-container border-right child-tarif-voucher" +
                        (this.props.ticket.customerType.id == customer.id ? ' selected' : '')}>
                            <img src={require('../assets/pictos/voucher_children.png')} alt=""/>
                            <div className="item-center flex-container--column">
                                <p className="item-center u-capitalize">Enfant</p>
                                <p className="txt-white item-center u-uppercase">pass Voucher</p>
                            </div>  
                        </button>
                    )
                case 'group':
                return(
                    <button key={customer.id} onClick={()=>this.props.customer_selection(customer)}
                    className={"btn--customer flex-container group-tarif" +
                    (this.props.ticket.customerType.id == customer.id ? ' selected' : '')}>
                        <img src={require('../assets/pictos/voucher_group.png')} alt=""/>
                        <div className="item-center flex-container--column">
                            <p className="item-center u-capitalize">Tarif</p>
                            <p className={
                                "item-center u-uppercase"
                                + (customer.slug == 'free' ? ' txt-violet' : ' txt-white')}> {customer.title}
                            </p>
                        </div>
                    </button>
                )

            }
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
