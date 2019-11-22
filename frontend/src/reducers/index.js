import { combineReducers } from 'redux'
import OrderList from './userReducer'

const rootReducer = combineReducers({
    orderList: OrderList
})
export default rootReducer