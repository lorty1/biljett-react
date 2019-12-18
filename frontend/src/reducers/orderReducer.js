import {GET_ORDER_LIST, GET_ORDER, CREATE_ORDER,UPDATE_ORDER, UPDATE_FILTER} from '../actions/orderAction.js'
import { CREATE_TICKET } from '../actions/ticketAction'

const initialState = {
    searchFilter: null,
    orders: [],
    orderSelected: {}
}
export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ORDER_LIST:
            return {
                ...state,
                orders: action.payload
            }
        case GET_ORDER:
            return {
                ...state,
                orderSelected: action.payload
            }
        case CREATE_ORDER:
            return {
                ...state,
                orderSelected: action.payload.results[0],
                orders: action.payload
            }
        case CREATE_TICKET:
            return {
                ...state,
                orderSelected: action.payload.order
            }
        case UPDATE_FILTER:
            return {
                ...state,
                searchFilter: action.payload || initialState.searchFilter
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orderSelected: action.payload
            }
        default:
            return state
    }
}