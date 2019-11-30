import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment)

export default class Month {

  constructor(month, year) {
    this.start = moment([year, month]);
    this.end = this.start.clone().endOf('month')
    this.month = month;
    this.year = year;
  }

  getWeekStart (){
    return this.start.weekday();
  }
  getDays(){
    let ranges = (moment.range(this.start, this.end));
    return Array.from(ranges.by('days'));
  }
  getFormatted () {
    console.log(this.start.format('MMMM YYYY').toUpperCase())
    return this.start.format('MMMM YYYY').toUpperCase()
  }
}