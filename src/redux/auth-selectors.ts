import {AppStateType} from "./redux-store";

export const selectIsAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const selectCurrentLogin = (state:AppStateType) => {
    return state.auth.login
}



/*для создания сложных селекторов нужно использовать библиотеку reselect (reactJs путь самурая 84 урок)*/