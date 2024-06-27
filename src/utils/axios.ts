import axios from 'axios';
import config from '@/config';

const onSuccess = (res: any) => {
    return res;
}

const onFailure = (err: any) => {
    console.log(err)
}

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use(onSuccess, onFailure)

export const getAnnouncements = function() {
    return axios({
        method: 'GET',
        url: '/announcement/get'
    })
}

export const login = function(query: any) {
    return axios({
        method: 'POST',
        url: '/auth/connect',
        data: JSON.stringify(query)
    })
}

export const getDepositAddr = function(query: any) {
    return axios({
        method: 'POST',
        url: '/auth/get_deposit_address',
        data: JSON.stringify(query)
    })
}

export const getProfile = function(query: any) {
    return axios({
        method: 'POST',
        url: '/auth/profile',
        data: JSON.stringify(query)
    })
}

export const updateProfile = function(query: any) {
    return axios({
        method: 'POST',
        url: '/auth/update',
        data: JSON.stringify(query)
    })
}

export const createCharacter = function(data: FormData) {
    return axios({
        method: 'POST',
        url: '/character/create',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateCharacter = function(data: FormData) {
    return axios({
        method: 'POST',
        url: '/character/update',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

// search character with keyword
export const getCharacters = function(query: any) {
    return axios({
        method: 'POST',
        url: '/character/get',
        data: JSON.stringify(query)
    })
}

export const getMyCharacters = function(query: any) {
    return axios({
        method: 'POST',
        url: '/character/my',
        data: JSON.stringify(query)
    })
}

export const getHotCharacters = function() {
    return axios({
        method: 'GET',
        url: '/character/hots',
    })
}

export const getFeaturedCharacters = function() {
    return axios({
        method: 'GET',
        url: '/character/featured',
    })
}

export const getNewestCharacters = function() {
    return axios({
        method: 'GET',
        url: '/character/newest',
    })
}

export const startChat = function(query: any) {
    return axios({
        method: 'POST',
        url: '/chat/start',
        data: JSON.stringify(query)
    })
}

export const getAllChats = function(query: any) {
    return axios({
        method: 'POST',
        url: '/chat/all',
        data: JSON.stringify(query)
    })
}

export const getChat = function(query: any) {
    return axios({
        method: 'POST',
        url: '/chat/get',
        data: JSON.stringify(query)
    })
}