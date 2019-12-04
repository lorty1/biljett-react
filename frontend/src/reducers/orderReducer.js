import {GET_ORDER_LIST, GET_ORDER, CREATE_ORDER} from '../actions/orderAction.js'
import { CREATE_TICKET } from '../actions/ticketAction'

const initialState = {
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
            console.log('get_order2')
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
                orderSelected: action.payload
            }
        default:
            return state
    }
}