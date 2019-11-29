import {UPDATE_TICKET} from '../actions/ticketAction';

const initialState = {
    ticket: {
        departure: {},
        comeBack: {},
        customerType: {}
    }
}
export default function(store = initialState, actions) {
    switch(actions.type) {
        case UPDATE_TICKET:
            return {
                ...store,
                ticket: actions.payload
            }
        default:
            return store
    }
}