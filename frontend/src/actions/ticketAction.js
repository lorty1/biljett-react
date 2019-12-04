import Axios from "axios"

export const UPDATE_TICKET = 'UPDATE_TICKET'
export const CREATE_TICKET = 'CREATE_TICKET'

import { get_cookie } from './orderAction'

export const update_ticket = ticket => {
    return dispatch => {
        dispatch({
            type: UPDATE_TICKET,
            payload: ticket
        })
    }
}
export const create_ticket = (order_id,ticket) => {
    return dispatch => {
        Axios({
            method: 'post',
            url: '/api/ticket/',
            headers: {
                "X-CSRFToken": get_cookie()
            },
            data: {
                order_id: order_id,
                ticket: ticket
            }
        }).then(response => {
            dispatch({
                type: CREATE_TICKET,
                payload: response.data
            })
        })
    }
}