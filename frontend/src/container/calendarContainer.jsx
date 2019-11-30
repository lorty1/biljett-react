import React, { Component } from 'react'
import { connect } from 'react-redux';
import Calendar from '../components/calendarComponent'

class CalendarContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    state = {
        show: false
    }
    show_calendar_component = () => {
        var show = {...this.state}
        console.log(show)
        show = true
        this.setState({show})
    }

    render() {
        return (
            <div className="mtauto mlauto mrauto">
                <p onClick={this.show_calendar_component}>{ this.props.date }</p>
                <Calendar/>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        date: store.dateStore.date
    }
}
export default connect(mapStateToProps, null) (CalendarContainer)
