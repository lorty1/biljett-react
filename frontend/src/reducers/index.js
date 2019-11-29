import { combineReducers } from 'redux'
import Orders from './orderReducer'
import Ticket from './ticketReducer'
import Calendar from './calendarReducer'

const rootReducer = combineReducers({
    orderStore: Orders,
    ticketStore: Ticket,
    dateStore: Calendar
})
export default rootReducer