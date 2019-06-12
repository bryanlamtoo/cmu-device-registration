import axios from 'axios'

const server = 'api/v1/'
import state from '../store'


const apiClient = axios.create({
    baseURL: server,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export default {

    addNewUser(data) {
        return apiClient.post('/users', data, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    getUserList() {
        return apiClient.get('/users', {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    editUser(id, data) {
        return apiClient.put('/users/update/' + id, data, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    editDevice(deviceId, data) {
        return apiClient.put('/devices/update/' + deviceId, data, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    deleteUser(id) {
        return apiClient.delete('/users/' + id, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    addNewDevice(device) {

        return apiClient.post('/devices', device, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    getUserDeviceList(userId) {
        return apiClient.get('/devices/' + userId, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    getDeviceList() {
        return apiClient.get('/devices', {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    deleteDevice(deviceId) {
        return apiClient.delete('/devices/' + deviceId, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    changeDeviceStatus(deviceId, data) {
        return apiClient.put('/devices/status/' + deviceId, data, {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },
    getDevicesStats() {
        return apiClient.get('/devices/statistics', {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },
    getUsersStats() {
        return apiClient.get('/users/statistics', {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    getRecentlyAddedDevices() {
        return apiClient.get('/devices/recent', {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    getRecentlyLoggedIn() {

        return apiClient.get('/users/recent', {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    },

    signInUser(userData) {
        return apiClient.post('/auth/login', userData)
    },

    signOutUser() {
        apiClient.post('/auth/logout', {headers: {Authorization: "Bearer " + state.getters.tokenId}})
    }
}