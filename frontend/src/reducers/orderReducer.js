import {GET_ORDER_LIST, UPDATE_PENDING, GET_ORDER, CREATE_ORDER,UPDATE_ORDER, UPDATE_FILTER} from '../actions/orderAction.js'
import { CREATE_TICKET, DELETE_TICKET } from '../actions/ticketAction'

const initialState = {
    searchFilter: null,
    status: false,
    orders: [],
    orderSelected: {}
}
export default function(store=initialState, action) {
    switch(action.type) {
        case GET_ORDER_LIST:
            return {
                ...store,
                orders: action.payload
            }
        case GET_ORDER:
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
            return {
                ...store,
                orderSelected: action.payload.order
            }
        case UPDATE_FILTER:
            return {
                ...store,
                searchFilter: action.payload || initialState.searchFilter
            }
        case UPDATE_PENDING:
            return {
                ...store,
                status: true
            }
        case UPDATE_ORDER:
            const index = store.orders.results.findIndex(order=> order.id == action.payload.order.id)
            return {
                ...store,
                orders: {
                    ...store.orders,
                    results: store.orders.results.map((element, i)=> i == index ? element = action.payload.order : element = element
                    )
                },
                status: false,
                orderSelected: action.payload.order
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