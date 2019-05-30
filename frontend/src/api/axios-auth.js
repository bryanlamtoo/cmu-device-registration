import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {

    signInUser(data) {

        return instance.post('/verifyCustomToken?key=AIzaSyAGKgwwFbccaEoUcfYraGfJjqEcYenUIts', data)
    }
}