const SEND_MESSAGE = 'SEND-MESSAGE';


type DialogType = {
    id: number
    name:string
}
type MessageType = {
    id:number
    message:string
}

let initialState = {
    dialogs : [
        {id: 1, name: 'Nadya'},
        {id: 2, name: 'Berdy'},
        {id: 3, name: 'Arslan'},
        {id: 4, name: 'Tuwak'},
        {id: 5, name: 'Mekan'},
    ]as Array<DialogType>,
    messages : [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'Goodbye'},
    ]as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action:any):InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessageText= action.newMessageText
            return {
                ...state,
                messages : [...state.messages, {id: 4, message:newMessageText}]
            }
        default: return state;
    }
}



type SendMessageActionType = {
    type: typeof SEND_MESSAGE
    newMessageText: string | null
}

export const sendMessage = (newMessageText: string | null):SendMessageActionType => {
    return {type: SEND_MESSAGE, newMessageText}
}


export default dialogsReducer;