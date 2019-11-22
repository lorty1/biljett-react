import {GET_ORDER_LIST} from '../actions'

const initialState = {
    order: []
}
export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ORDER_LIST:
            return {
                ...state,
                order: action.payload
            }
        default:
            return state
    }
}