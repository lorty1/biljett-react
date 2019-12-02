import Moment from 'moment'

export const display_date_formatted = (store) => {
    return store.dateStore.date.format('dddd DD MMMM')
}
export const ticket_date = store => {
    return store.dateStore.date.format('YYYY-MM-DD')
}