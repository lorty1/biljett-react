export const GET_DATE = 'GET_DATE'
export const UPDATE_DATE = 'UPDATE_DATE'

export const update_date = date => {
     return dispatch => {
        dispatch({
            type: UPDATE_DATE,
            payload: date
        })
     }
}