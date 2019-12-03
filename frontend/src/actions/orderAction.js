export const GET_ORDER = 'GET_ORDER'
export const CREATE_ORDER = 'CREATE_ORDER'
export const GET_ORDER_LIST = 'GET_ORDER_LIST'
export const UPDATE_TICKET = 'UPDATE_TICKET'

export const get_cookie = ()=> {
    return document.cookie.split('=')[1]
}

export function get_order_list(index) {
    if(!index) {
        index = 1
    }
    console.log('index', index)
    return dispatch => {

        Axios({
            method: 'get',
            url: '/api/order/',
            headers: {
                "X-CSRFToken": get_cookie()
            },
            params: {
                page: index
            }
        }).then(response => {
            dispatch({
                type: GET_ORDER_LIST,
                payload: response.data
            })
        })
    }
}
export function get_order(id) {
    console.log('orderid', id)
    return dispatch => {
        Axios({
            method: 'get',
            url: `/api/order/${id}`
        }).then(response => {
            dispatch({
                type: GET_ORDER,
                payload: response.data
            })
        })
    }
}
export function create_order(reference) {
    return dispatch => {
        Axios({
            method: 'post',
            url: 'api/order/',
            data: {
                reference: Date.now()
            },
            headers: {
                "X-CSRFToken": get_cookie()
            },
        }).then(response => {
            dispatch({
                type: CREATE_ORDER,
                payload: response.data
            })
        })
    }
}