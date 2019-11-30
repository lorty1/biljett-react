import React, { Component } from 'react'
import Moment from 'moment'
import Month from '../utils/month'

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
    return this.date.unix() == day.unix();
  }
  selectDate = (day) => {
    this.date = day.clone();
    this.$emit('dateSelect', this.date)
  }
  nextMonth = () => {
    let month = (this.state.month.month) + 1;
    let year = this.state.month.year;
    if (month > 11) {
      year = (this.state.month.year) + 1
      month = 0
    }
    this.month = new Month(month, year);
  }
  prevMonth = () => {
    let month = (this.state.month.month) - 1;
    let year = this.state.month.year;
    if (month < 0) {
      year = (this.state.month.year) - 1
      month = 11
    }
    this.setState({month: new Month(month, year)});
  }
  days_list = () => {
    this.state.days.map(day => {
      return (
        <p>{day}</p>
      )
    })
  }
  days_number_list = () => {
    this.state.month.getDays().map(day => {
      return (
        <span class="datepicker__day__text">{day.format('D')}</span>
      )
    })
  }
  year = () => {
    return this.state.date.format('YYYY')
  }
  date_formatted = () => {
    return this.state.date.format('dddd DD MMMM')
  }
  render() {
    return (
      <div className="datepicker">
        <div className="datepicker__header">
          <div className="datepicker__year">
            {this.year()}
          </div>
          <div className="datepicker__date"></div>
            <p>{this.date_formatted()}</p>
          </div>
          <div className="datepicker__control">
            <div className="datepicker__month">
              {this.state.month.getFormatted()}
              <button className="datepicker__next" onclick={this.nextMonth()}>Next</button>
              <button className="datepicker__prev" onclick={this.prevMonth()}>Prev</button>
            </div>
            </div>
            <div className="datepicker__week">
              <div className="datepicker__weekday">
                {this.days_list()}
              </div>
            </div>
            <div className="datepicker__days">
              <div className="datepicker__day" style="{width:(month.getWeekStart() * 41) + 'px'}">
              </div>
              <div className="datepicker__day" onclick={()=> {this.selectDate()}}>
                <span className="datepicker__day__text">{day.format('D')}</span>
              </div>
            </div>
          </div>
        )
      }
    }
export default CalendarComponent