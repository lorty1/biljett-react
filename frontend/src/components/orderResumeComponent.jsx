import React, { Component } from 'react'

class orderResumeComponent extends Component {
    decimal_price = value => {
        if (!value) {
            value = 0
        }
        return value.toFixed(2).replace('.',',')
    }
    item_list = () => {
        const list = Object
            .keys(this.props.ticketsSorted)
            .map(element => {
                return (
                    <tr>
                        <td colSpan="3">{this.props.ticketsSorted[element].count} tarif {element}</td>
                        <td className="txtcenter">{this.decimal_price(this.props.ticketsSorted[element].total)} €</td>
                    </tr>
                )
            })
        return list
    }
    render() {
        return (
            <div className= {"item-fluid flex-container--column" + (
                this.props.panelChoice == 'payment' ? ' payment-resume' :
                this.props.panelChoice == 'registration' ? ' registration-resume':
                 ''
            )}>
                <table>
                    <thead>
                        <tr>
                            <th className="txtcenter" colSpan="3">Descripif</th>
                            <th className="txtcenter">Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.item_list()}
                    </tbody>
                </table>
                <div className="mtauto total-section flex-container--column">
                    <div className="flex-container">
                        <p className="w75">Avoir</p>
                        <p>{this.decimal_price(this.props.avoir)} €</p>
                    </div>    
                    <div className="flex-container">
                        <p className="w75">Total</p>
                        <p>{this.decimal_price(this.props.total)} €</p>
                    </div>
                </div>
            </div>

        )
    }
}
export default orderResumeComponent