import {UPDATE_TICKET, CREATE_TICKET} from '../actions/ticketAction';

const initialState = {
    ticket: {
        departure: {
            station: null,
            train: null
        },
        comeBack: {
            station: null,
            train: null
        },
        customerType: {
            id: null,
            number: null
        }
    }
}
export default function(store = initialState, actions) {
    switch(actions.type) {
        case UPDATE_TICKET:
            console.log('action', actions.payload)
            return {
                ...store,
                ticket: actions.payload
            }
        default:
            return store
    }
}