import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";


let store = {
    _state : {
        profilePage : {
            posts : [
                {id: 1, message: 'hello', likesCount : 51 },
                {id: 1, message: 'ok Google', likesCount : 21 },
                {id: 1, message: 'hahha', likesCount : 1}
            ],
            newPostText : 'Barry_Kenan'
        },
        messagesPage : {
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
            ],
            newMessageText : 'Hello there'
        }
    },
    _callSubscriber () {console.log('state changed')},

    getState(){
        return this._state
    },
    subscribe (observer)  {
        this._callSubscriber =observer
    },


    dispatch(action){
        profileReducer(this._state.profilePage, action)
        dialogsReducer(this._state.messagesPage, action)

        this._callSubscriber(this._state)
    }
}



export default store;
window.store = store;