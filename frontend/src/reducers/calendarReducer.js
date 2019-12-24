import { UPDATE_DATE } from '../actions/calendarAction';
import { CREATE_ORDER } from '../actions/orderAction'
import Moment from 'moment'
const initialState = {
    date: Moment()
}

export default function(store=initialState, actions) {
    switch(actions.type) {
        case '@@INIT':
            return {
                ...store,
                date: Moment()
            }
        case CREATE_ORDER:
            return {
                ...store,
                date: Moment()
            }
        case UPDATE_DATE:
            return {
                ...store,
                date: actions.payload
            }   

        default:
            return store
    }
}