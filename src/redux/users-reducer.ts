import {UsersType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {userAPI} from "../api/users-api";
import {APIResponseType} from "../api/api";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,  // array of user id
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/USERS/FOLLOW" :
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case "SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case 'SN/USERS/SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'SN/USERS/SET_FILTER':
            return {...state, filter: action.payload}
        default:
            return state
    }
}

export type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER',payload: filter} as const),
    setTotalUsersCount: (count: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}


export type ThunkType = BaseThunkType<ActionsType>

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))
        let data = await userAPI.getUsers(page, pageSize,filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
                                   userId: number,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}


export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch ) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess)
    }
}

export default usersReducer;