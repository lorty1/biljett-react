import React, { Component } from 'react'
import Moment from 'moment'
import Month from '../utils/month'
import '../assets/scss/calendar.scss'

class CalendarComponent extends Component {

  constructor(props) {
    super(props)
  }
  state = {
    date: Moment(),
    month: new Month(Moment().month(), Moment().year()),
    days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  }
  isSelected = (day) => {
    return this.state.date.unix() == day.unix();
  }
  selectDate = (day) => {
    let date = { ...this.state }
    date = day.clone();
    this.setState({ date })
    //this.$emit('dateSelect', this.date)
  }
  nextMonth = () => {
    let month = (this.state.month.month) + 1;
    let year = this.state.month.year;
    if (month > 11) {
      year = (this.state.month.year) + 1
      month = 0
    }
    this.setState({ month: new Month(month, year) })
  }
  prevMonth = () => {
    let month = (this.state.month.month) - 1;
    let year = this.state.month.year;
    if (month < 0) {
      year = (this.state.month.year) - 1
      month = 11
    }
    this.setState({ month: new Month(month, year) });
  }
  days_list = () => {
    const weekDay = this.state.days.map(day => {
      return (
        <div className="datepicker__weekday">
          {day}
        </div>
      )
    })
    return weekDay
  }
  days_number_list = () => {
    const days = this.state.month.getDays().map(day => {
      return (
        <div className={"datepicker__day" + (this.isSelected(day) ? ' selectedDate' : '') } 
        onClick={() => { this.selectDate(day) }} >
          <span 
          className="datepicker__day__text" onClick={() => { this.selectDate(day) }} >{day.format('D')}</span>
        </div>
      )
    })
    return days
  }
  year = () => {
    return this.state.date.format('YYYY')
  }
  date_formatted = () => {
    return this.state.date.format('dddd DD MMMM')
  }
  render() {
    return (
      <div id="calendar-component">
        <div className="datepicker">
          <div className="datepicker__header">
            <div className="datepicker__year txtcenter">
              {this.year()}
            </div>
            <div className="datepicker__date"></div>
            <p className="txtcenter">{this.date_formatted()}</p>
          </div>
          <div className="datepicker__control">
            <div className="datepicker__month">
              {this.state.month.getFormatted()}
              <button className="datepicker__next button-trans" onClick={() => { this.nextMonth() }}>Next</button>
              <button className="datepicker__prev button-trans" onClick={() => { this.prevMonth() }}>Prev</button>
            </div>
          </div>
          <div className="datepicker__week">
            {this.days_list()}
          </div>
          <div className="datepicker__days">
            <div className="datepicker__day" style={{ width: (this.state.month.getWeekStart() * 41) + 'px' }}>
            </div>
            {this.days_number_list()}
          </div>
          <div className="grid-2 has-gutter mtm pls prs">
            <button className="btn--danger action-btn">Annuler</button>
            <button className="btn--success action-btn">Valider</button>
          </div>
        </div>
      </div>
    )
  }
}
export default CalendarComponent