import Axios from "axios"

export const UPDATE_TRAIN_TICKET = 'UPDATE_TRAIN_TICKET'
export const UPDATE_STATION_TICKET = 'UPDATE_STATION_TICKET'
export const CREATE_TICKET = 'CREATE_TICKET'
export const DELETE_TICKET = 'DELETE_TICKET'
export const UPDATE_CUSTOMER_TICKET = 'UPDATE_CUSTOMER_TICKET'
export const UPDATE_PLACE_TICKET = 'UPDATE_PLACE_TICKET'

import { get_cookie } from './orderAction'

export const update_station_ticket = ride => {
    return dispatch=> {
        return new Promise((resolve,reject)=> {
            try {
                dispatch({
                    type: UPDATE_STATION_TICKET,
                    payload: {
                        direction: ride.direction,
                        station: ride.station
                    }
                })
                resolve('ok')
            }
            catch(error){
                console.log('error')
                reject(error)
            }
        })
    }
}

export const update_train_ticket = ride=> {
    return dispatch=> {
        dispatch({
            type: UPDATE_TRAIN_TICKET,
            payload:{
                direction: ride.direction,
                train: ride.train
            }
        })
    }
}
export const update_customer_ticket = customer => {
    console.log(customer)
    return dispatch=> {
        dispatch({
            type: UPDATE_CUSTOMER_TICKET,
            payload: {
                id: customer.id,
                price: customer.price
            }
        })
    }
}
export const update_place_ticket = place => {
    return dispatch => {
        dispatch({
            type: UPDATE_PLACE_TICKET,
            payload: place
        })
    }
}
// export const update_ticket = ticket => {
//     console.log('po',ticket)
//     return dispatch => {
//         dispatch({
//             type: UPDATE_TICKET,
//             payload: 2
//         })
//     }
// }
export const delete_ticket = tickets=> {
    return dispatch => {
        return new Promise((resolve, reject)=> {
            Axios({
                method: 'DELETE',
                url: 'api/ticket/',
                headers: {
                   'X-CSRFToken': get_cookie() 
                },
                data: tickets
            }).then(response=> {
                dispatch({
                    type: DELETE_TICKET,
                    payload: response.data
                })
                resolve()
            }).catch(err=> {
                reject(err)
            })
        })
    }
}
export const create_ticket = (order_id,ticket) => {
    return dispatch => {
        return new Promise((resolve,reject)=> { 
            Axios({
                method: 'post',
                url: '/api/ticket/',
                headers: {
                    "X-CSRFToken": get_cookie()
                },
                data: {
                    order_id: order_id || null,
                    ticket: ticket
                }
            }).then(response => {
                dispatch({
                    type: CREATE_TICKET,
                    payload: response.data
                })
                resolve(response)
            }).catch(error=> {
                reject(error)
            })
        })
    }
}