import React, { Component } from 'react'
import { connect } from 'react-redux';
import Calendar from '../components/calendarComponent';
import { update_date } from '../actions/calendarAction';
import { display_date_formatted } from '../selectors/index'

class CalendarContainer extends Component {
    constructor(props) {
        super(props)
        
    }
    state = {
        show: false
    }
    show_calendar_component = () => {
        var show = {...this.state}
        show = true
        this.setState({show})
    }
    send_new_date = date => {
        this.props.update_date(date)
        this.setState({show: false})
    }
    render() {
        return (
            <div className="mtauto mlauto mrauto">
                <p onClick={this.show_calendar_component}>{ this.props.dateFormatted }</p>
                {this.state.show ?
                 <Calendar 
                    date={this.props.date}
                    send_new_date={this.send_new_date}
                    dateFormatted={this.props.dateFormatted}>
                </Calendar>
                  : null}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        date: store.dateStore.date,
        dateFormatted: display_date_formatted(store)
    }
}
const mapDispatchToProps = {
    update_date
}
export default connect(mapStateToProps, mapDispatchToProps) (CalendarContainer)
