import React, { Component } from 'react';
import increment from 'Pictos/increment_picto.png';
import decrement from 'Pictos/decrement_picto.png';
console.log('iuiu')
class placeComponent extends Component {
    list_place = () => {
        let { placeArray, placeSelected } = this.props
        const list = placeArray.map(element => {
            return (
                <button
                    className={this.props.placeSelected == element ? ' selected' : ''}
                    onClick={() => { this.props.place_selected(element) }} key={element}>{element}</button>
            )
        })
        return list
    }

    render() {
        console.log('init')
        return (
            <section className="place-selection" >
                <button disabled={this.props.placeArray[0] < 2} onClick={() => { this.props.update_index('decrement') }}>
                    <img src={decrement} width="48px" alt="decrement picto"/>
                </button>
                {this.list_place()}
                <button disabled={this.props.placeArray[this.props.placeArray.length - 1] >= 60} onClick={() => { this.props.update_index('increment') }}>
                    <img src={increment} width="48px" alt="increment_logo"/>
                </button>
            </section>
        )
    }
}
export default placeComponent
