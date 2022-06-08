import axios from "axios";
import {UsersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "1d01db9e-fee3-47f8-b73b-9140c0446149"
    }
})


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired=10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}