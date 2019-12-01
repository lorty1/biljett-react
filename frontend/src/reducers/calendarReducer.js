import { UPDATE_DATE } from '../actions/calendarAction'
import Moment from 'moment'
const initialState = {
    date: null
}

export default function(store=initialState, actions) {
    switch(actions.type) {
        case '@@INIT':
            return {
                ...store,
                date: Moment()
            }
        case UPDATE_DATE:
            console.log('sdff',actions.payload)
            return {
                ...store,
                date: actions.payload
            }   

        default:
            return store
    }
}