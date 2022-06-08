import { PhotosType, PostType, ProfileType } from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {profileAPI} from "../api/profile-api";



let initialState = {
    posts: [
        {id: 1, message: 'hello', likesCount: 51},
        {id: 2, message: 'ok Google', likesCount: 21},
        {id: 3, message: 'OK', likesCount: 1}
    ]as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action:ActionsType): InitialStateType => {

    switch (action.type) {
        case "SN/PROFILE/ADD-POST" :
            let message = action.newPostText
            return {
                ...state,
                posts: [...state.posts, {id: 5, message, likesCount: 2}]
            }
        case "SN/PROFILE/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SN/PROFILE/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SN/PROFILE/DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    addPost:  (newPostText:string)  => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile:ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile}as const),
    setStatus: (status:string) => ({type: 'SN/PROFILE/SET_STATUS', status}as const),
    deletePost: (postId:number) => ({type: 'SN/PROFILE/DELETE_POST', postId}as const),
    savePhotosSuccess: (photos:PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos}as const),
}

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    let photosData = await profileAPI.savePhoto(file)

    if (photosData.resultCode === 0) {
        dispatch(actions.savePhotosSuccess(photosData.data.photos))
    }
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch,getState) => {
    const userId = getState().auth.id
    let data = await profileAPI.saveProfile(profile)
    debugger;
    if (data.resultCode === 0) {
        if (userId != null){
            dispatch(getUserProfile(userId))
        }else{
            throw new Error("userId can't be null")
        }
    }else {
        dispatch(stopSubmit("edit-profile",{_error:data.messages[0]}));
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;