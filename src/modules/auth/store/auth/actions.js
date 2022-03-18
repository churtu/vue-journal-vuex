

// export const myAction = async ({ commit }) => {

import authAPI from "../../../../api/authAPI"

// }

export const createUser = async ({ commit }, user) => {
    try {
        const {name, email, password} = user
        const {data} = await authAPI.post(':signUp', {email, password, returnSecureToken: true})
        const { idToken, refreshToken } = data
        await authAPI.post(':update', {displayName: name, idToken})
        delete user.password
        commit('loginUser', { user, idToken, refreshToken})
        return { ok: true }
    } catch (error) {
        return { ok:false, message: error.response.data.error.message }
    }
}

export const signInUser = async ({ commit }, user) => {
    try {
        const {email, password} = user
        const {data} = await authAPI.post(':signInWithPassword', {email, password, returnSecureToken: true})
        const { idToken, refreshToken, displayName } = data
        delete user.password
        user.name = displayName
        commit('loginUser', { user, idToken, refreshToken})
        return { ok: true }
    } catch (error) {
        return {ok:false, message: error.response.data.error.message}
    } 
}

export const checkAuthentication = async ({ commit }) => {
    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!idToken){
        commit('logout')
        return{ ok:false, message:'No hay token' }
    }

    try {
        const { data } = await authAPI.post(':lookup', {idToken})
        const { email, displayName } = data.users[0]
        const user = {
            name:displayName, email
        }
        commit('loginUser', {user, idToken, refreshToken})
        return { ok:true }
    } catch (error) {
        commit('logout')
        return {ok:false, message:error.response.data.error.message}
    }
}
