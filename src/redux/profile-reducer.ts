import {profileAPI} from "../api/api";
import { ContactsType, PhotosType, PostType } from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

let initialState = {
    posts: [
        {id: 1, message: 'hello', likesCount: 51},
        {id: 2, message: 'ok Google', likesCount: 21},
        {id: 3, message: 'hahha', likesCount: 1}
    ]as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action:ActionsType): InitialStateType => {

    switch (action.type) {
        case ADD_POST :
            let message = action.newPostText
            return {
                ...state,
                posts: [...state.posts, {id: 5, message, likesCount: 2}]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
}

type ActionsType = AddPostType | SetUserProfileType | SetStatusType | DeletePost | SavePhotosSuccessType


type AddPostType = {
    type: typeof ADD_POST
    newPostText: string
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
type DeletePost = {
    type: typeof DELETE_POST
    postId: number
}


type SavePhotosSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}


export const addPost = (newPostText:string) : AddPostType => {
    return {type: ADD_POST, newPostText}
}


export const setUserProfile = (profile:ProfileType) : SetUserProfileType => {
    return {type: SET_USER_PROFILE, profile}
}

export const setStatus = (status:string):SetStatusType => {
    return {type: SET_STATUS, status}
}
export const deletePost = (postId:number):DeletePost => {
    return {type: DELETE_POST, postId}
}
export const savePhotosSuccess = (photos:PhotosType):SavePhotosSuccessType => {
    return {type: SAVE_PHOTO_SUCCESS, photos}
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))

}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))

}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file:any):ThunkType => async (dispatch) => {
    let photosData = await profileAPI.savePhoto(file)

    if (photosData.resultCode === 0) {
        dispatch(savePhotosSuccess(photosData.data.photos))
    }
}
export const saveProfile = (profile:any):ThunkType => async (dispatch,getState) => {
    const userId = getState().auth.id
    let response = await profileAPI.saveProfile(profile)
    debugger;
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }else {
        dispatch(stopSubmit("edit-profile",{_error:response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;