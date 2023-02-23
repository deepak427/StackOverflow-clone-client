const verifyReducer = (state = null, action) => {
    switch (action.type) {
        case 'VERIFY':
            return action.payload
        case 'BOT_OUT':
            localStorage.clear()
            return action.payload
        default:
            return state;
    }
}

export default verifyReducer;