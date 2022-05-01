import * as axios from "axios";

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
    unfollow(userId){
        return instance.delete(`follow/${userId}`).then(response => response.data)
    },
    follow(userId){
        return instance.post(`follow/${userId}`).then(response => response.data)
    }

}


export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId || MY_ID}`)
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId || MY_ID}`)
    },
    updateStatus(status){
        return instance.put(`profile/status`,{status: status})
    }


}


export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe= false) {
        return instance.post('auth/login',{email, password, rememberMe})
    },
    logout(){
        return instance.delete('auth/login')
    }
}





