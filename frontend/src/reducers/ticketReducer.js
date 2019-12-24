import {
    UPDATE_TRAIN_TICKET,
    UPDATE_STATION_TICKET,
    UPDATE_CUSTOMER_TICKET,
    UPDATE_PLACE_TICKET
} from '../actions/ticketAction';
import { CREATE_ORDER } from '../actions/orderAction'

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
            price: null,
            number: null
        }
    }
}
export default function(store=initialState, action) {
    switch(action.type) {
        case UPDATE_STATION_TICKET:
            return {
                ...store,
                ticket: {
                    ...store.ticket,
                    [action.payload.direction]: {
                        ...store.ticket[action.payload.direction],
                        station: action.payload.station
                    }
                }
            }
        case UPDATE_TRAIN_TICKET:
            return {
                ...store,
                ticket: {
                    ...store.ticket,
                    [action.payload.direction]: {
                        ...store.ticket[action.payload.direction],
                        train: action.payload.train
                    }
                }
            }
        case UPDATE_CUSTOMER_TICKET:
            return {
                ...store,
                ticket: {
                    ...store.ticket,
                    customerType: {
                        ...store.ticket.customerType,
                        id: action.payload.id,
                        price: action.payload.price
                    }
                }
            }
        case UPDATE_PLACE_TICKET:
            return {
                ...store,
                ticket:{
                    ...store.ticket,
                    customerType: {
                        ...store.ticket.customerType,
                        number: action.payload
                    }
                }
            }
        case CREATE_ORDER:
            return initialState
        
        default:
            return store
    }
}