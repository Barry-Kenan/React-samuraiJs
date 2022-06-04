import {userAPI} from "../api/api";
import {UsersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import { Dispatch } from "redux";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'




let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>  // array of user id
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action:ActionsType): InitialStateType => {

    switch (action.type) {
        case FOLLOW :
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

type ActionsType = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingProgressType


type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}

export const followSuccess = (userId:number):FollowSuccessType => {
    return {type: FOLLOW, userId}
}

type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollowSuccess = (userId:number):UnfollowSuccessType => {
    return {type: UNFOLLOW, userId}
}

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}

export const setUsers = (users:Array<UsersType>):SetUsersType => {
    return {type: SET_USERS, users}
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage:number):SetCurrentPageType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}

export const setTotalUsersCount = (count:number):SetTotalUsersCountType => {
    return {type: SET_TOTAL_USERS_COUNT, count}
}

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching:boolean
    userId:number
}

export const toggleFollowingProgress = (isFetching:boolean, userId:number): ToggleFollowingProgressType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (page:number, pageSize:number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let data = await userAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator:(userId:number)=> FollowSuccessType | UnfollowSuccessType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}


export const follow = (userId:number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess)
    }
}

export const unfollow = (userId:number):ThunkType => {
    return async (dispatch:any) => {
        _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess)
    }
}

export default usersReducer;