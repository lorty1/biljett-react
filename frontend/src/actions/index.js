import Axios from "axios"
export const GET_ORDER_LIST = 'GET_ORDER_LIST'

export function get_order_list() {
    return dispatch => {
        Axios({
            method: 'get',
            url: '/api/departure/'
        }).then(response => {
            dispatch({
                type: GET_ORDER_LIST,
                payload: response.data
            })
        })
    }
}