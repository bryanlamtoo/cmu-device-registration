import axios from 'axios'

const server = 'api/v1/'

const apiClient = axios.create({
    baseURL: server,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {

    loginUser(data) {
        return apiClient.post('/auth/login', data)
    },

    addNewUser(data) {
        return apiClient.post('/users', data)
    },

    getUserList() {
        return apiClient.get('/users')
    },

    editUser(id, data) {
        return apiClient.put('/users/update/' + id, data)
    },

    editDevice(deviceId, data) {
        return apiClient.put('/devices/update/' + deviceId, data)
    },

    deleteUser(id) {
        return apiClient.delete('/users/' + id)
    },

    addNewDevice(device) {

        return apiClient.post('/devices', device)
    },

    getUserDeviceList(userId) {
        return apiClient.get('/devices/' + userId)
    },

    getDeviceList() {
        return apiClient.get('/devices')
    },

    deleteDevice(deviceId) {
        return apiClient.delete('/devices/' + deviceId)
    },

    changeDeviceStatus(deviceId, data) {
        return apiClient.put('devices/status/' + deviceId, data)
    },
    getDevicesStats() {
        return apiClient.get('devices/stats')
    },
    getUsersStats() {
        return apiClient.get('users/stats')
    }
}