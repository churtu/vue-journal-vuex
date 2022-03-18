import axios from 'axios'

const authAPI = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key:' AIzaSyB2fwH1MeLTCBgQB2qFtI-v7u4Dga9i77s'
    }
})

export default authAPI
