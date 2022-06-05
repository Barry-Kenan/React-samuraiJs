import axios from "axios";

const MY_ID = 17012

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "1d01db9e-fee3-47f8-b73b-9140c0446149"
    }
})


export const userAPI = {
    getUsers(currentPage=1,pageSize=10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId:number){
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    follow(userId:number){
        return instance.post(`follow/${userId}`).then(response => response.data)
    }

}


export const profileAPI = {
    getProfile(userId:number){
        return instance.get(`profile/${userId || MY_ID}`)
    },
    getStatus(userId:number){
        return instance.get(`profile/status/${userId || MY_ID}`)
    },
    updateStatus(status:string){
        return instance.put(`profile/status`,{status: status})
    },
    savePhoto(photoFile:any){
        const formData = new FormData();
        formData.append("image",photoFile);

        return instance.put(`profile/photo`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile:any){
        return instance.put(`profile`, profile)
    }
}


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    Captcha=10
}

type MeResponseType = {
    data: {
        id:number
        email:string
        login:string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId:number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    authMe() {
        return instance.get<MeResponseType>(`auth/me`).then(res=> res.data)
    },
    login(email:string, password:string, rememberMe= false, captcha:string| null) {
        return instance.post<LoginResponseType>('auth/login',{email, password, rememberMe, captcha}).then(res=>res.data)
    },
    logout(){
        return instance.delete('auth/login')
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}





