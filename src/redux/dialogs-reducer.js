const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs : [
        {id: 1, name: 'Nadya'},
        {id: 2, name: 'Berdy'},
        {id: 3, name: 'Arslan'},
        {id: 4, name: 'Tuwak'},
        {id: 5, name: 'Mekan'},
    ],
    messages : [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'Goodbye'},
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let message = action.newMessageText
            return {
                ...state,
                messages : [...state.messages , {id: 4, message}]
            }
        default: return state;
    }
}

export const sendMessage = (newMessageText) => {
    return {type: SEND_MESSAGE, newMessageText}
}


export default dialogsReducer;