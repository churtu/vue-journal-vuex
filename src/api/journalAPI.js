import axios from 'axios'

const journalAPI = axios.create({
    baseURL: 'https://vue-demos-a8f2a-default-rtdb.firebaseio.com'
})

journalAPI.interceptors.request.use((config) => {
    config.params = {
        auth: localStorage.getItem('idToken')
    }
    return config
})

export default journalAPI
