import axios from 'axios'

const server = 'http://localhost:4000/api/v1/'

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
        return apiClient.post('/users', data)
    },

    getUserList() {
        return apiClient.get('/users')
    },

    editUser(id){
        return apiClient.patch('/users',id)
    },

    deleteUser(id){
        return apiClient.delete('/users',id)
    }
}