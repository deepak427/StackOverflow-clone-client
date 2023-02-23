const askQuestionReducer = (state = [], action) => {
    switch (action.type) {
        case 'CHAT_UPDATE':
            return [...state, ...action.payload]
        default:
            return state;
    }
}

export default askQuestionReducer;