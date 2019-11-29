export const UPDATE_TICKET = 'UPDATE_TICKET'

export function update_ticket(ticket) {
    console.log('ticket2', ticket)
    return dispatch => {
        dispatch({
            type: UPDATE_TICKET,
            payload: ticket
        })
    }
}