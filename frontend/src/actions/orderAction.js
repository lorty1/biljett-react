export const GET_ORDER = 'GET_ORDER'
export const CREATE_ORDER = 'CREATE_ORDER'
export const GET_ORDER_LIST = 'GET_ORDER_LIST'
export const ACCESS_FORBIDDEN = 'ACCESS_FORBIDDEN'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const UPDATE_PENDING = 'UPDATE_PENDING'

export const get_cookie = ()=> {
        var name = 'csrftoken';
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        console.log('cookie', cookieValue)
    return cookieValue;
    //return document.cookie.split('=')[1]
}

export function update_search_filter(str) {
    return dispatch=> {
        return new Promise((resolve, reject)=> {
            dispatch({
                type: UPDATE_FILTER,
                payload: str
            })
            resolve()
        })
        reject()
    }
}

export function get_order_list(index, filter) {
    if(!index) {
        index = 1
    }
    return (dispatch) => {
        Axios({
            method: 'get',
            url: '/api/order/',
            headers: {
                "X-CSRFToken": get_cookie()
            },
            params: {
                page: index,
                search: filter
            }
        }).then(response => {
            dispatch({
                type: GET_ORDER_LIST,
                payload: response.data
            })
        }).catch(error => {
            if (error.response.status == 403) {
                dispatch({
                    type: ACCESS_FORBIDDEN
                })
            }
        })
    }
}
export function get_order(id) {
    return dispatch => {
        Axios({
            method: 'get',
            url: `/api/order/${id}`
        }).then(response => {
            dispatch({
                type: GET_ORDER,
                payload: response.data
            })
        }).catch(error => {
            if(error.response.status == 403) {
                dispatch({
                    type: ACCESS_FORBIDDEN
                })
            }
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
        }).catch(error => {
            if(error.response.status == 403) {
                dispatch({
                    type: ACCESS_FORBIDDEN
                })
            }
        })
    }
}
export const order_update = data => {
    return dispatch => {
            return new Promise((resolve, reject) => {
                Axios({
                    method: 'patch',
                    url: 'api/order/',
                    headers: {
                        "X-CSRFToken": get_cookie()
                    },
                    data: data,
                }).then(response=> {
                    dispatch({
                        type: UPDATE_ORDER,
                        payload: {
                            order: response.data,
                        }
                    })
                    resolve()
                }).catch(error=> {
                    if(error.response.status == 403) {
                        dispatch({
                            type: ACCESS_FORBIDDEN
                        })
                    }
                    reject(error)
                })
            })
    }
}