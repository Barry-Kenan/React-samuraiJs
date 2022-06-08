import {InferActionsTypes} from "./redux-store";

type DialogType = {
    id: number
    name:string
}
type MessageType = {
    id:number
    message:string | null
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



const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {

    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            let newMessageText= action.newMessageText
            return {
                ...state,
                messages : [...state.messages, {id: 4, message: newMessageText}]
            };
        default: return state;
    }
}

export const actions = {
    sendMessage: (newMessageText: string | null) => ({type: 'SN/DIALOGS/SEND_MESSAGE', newMessageText} as const)
}

type ActionsType = InferActionsTypes<typeof actions>


export default dialogsReducer;