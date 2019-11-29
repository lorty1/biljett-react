const initialState = {
    date: null
}

export default function(store=initialState, actions) {
    switch(actions.type) {
        case '@@INIT':
            return {
                ...store,
                date: new Date().toISOString().split('T')[0]
            }    

        default:
            return store
    }
}