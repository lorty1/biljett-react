import {GET_ORDER_LIST, GET_ORDER, CREATE_ORDER,UPDATE_ORDER, UPDATE_FILTER} from '../actions/orderAction.js'
import { CREATE_TICKET, DELETE_TICKET } from '../actions/ticketAction'

const initialState = {
    searchFilter: null,
    orders: [],
    orderSelected: {}
}
export default function(store=initialState, action) {
    switch(action.type) {
        case GET_ORDER_LIST:
            console.log('order', initialState)
            return {
                ...store,
                orders: action.payload
            }
        case GET_ORDER:
            console.log('order', initialState)
            return {
                ...store,
                orderSelected: action.payload
            }
        case CREATE_ORDER:
            return {
                ...store,
                orderSelected: action.payload.results[0],
                orders: action.payload
            }
        case CREATE_TICKET:
            console.log('ac', action.payload)
            return {
                ...store,
                orderSelected: action.payload.order
            }
        case UPDATE_FILTER:
            return {
                ...store,
                searchFilter: action.payload || initialState.searchFilter
            }
        case UPDATE_ORDER:
            return {
                ...store,
                orderSelected: action.payload
            }
        case DELETE_TICKET:
            return {
                ...store,
                orderSelected: action.payload
            }
        default:
            return store
    }
}