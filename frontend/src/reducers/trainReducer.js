import {GET_TRAIN_LIST} from '../actions/trainAction';

const initialState = {
    trains = {
        departure: null,
        comeBack: null
    }
}
export default function(store = initialState, actions) {
    switch(actions.type) {
        case GET_TRAIN_LIST:
            return {
                ...store,
                trains: actions.payload
            }
        default:
            return store
    }
}