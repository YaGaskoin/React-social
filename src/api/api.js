import * as axios from "axios";

let baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
    headers: {"API-KEY": '4c5c5fd9-9c56-4870-a95d-7054b64c6939'},
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get('users?page=' + currentPage + '&count=' + pageSize,
            {
                withCredentials: true,
            }).then(response => {
            return response.data
        })
    },
    follow(userId) {
        return instance.post('follow/' + userId)
    },
    unfollow(userId) {
        return instance.delete('follow/' + userId)
    },
    getProfile(userId) {
         return profileApi.getProfile(userId)
    }
}

export const profileApi = {
     getProfile(userId) {
         return instance.get('profile/' + userId)
    },
    getStatus(userId){
         return instance.get('/profile/status/' + userId)
    },
    updateStatus(status){
         return instance.put('/profile/status/', {
             status: status
         })
    }
}
export const authApi = {
    me(){
        return instance.get('auth/me')
    }
}


