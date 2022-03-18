
import { useStore } from 'vuex'
import { computed } from 'vue'

const useAuth = () => {
    const store = useStore()

    const createUser = async( user ) =>{
        const response = await store.dispatch('auth/createUser', user)
        return response
    }   


    const signInUser = async(user) => {
        const response = await store.dispatch('auth/signInUser', user)
        return response
    }

    const checkAuthStatus = async() => {
        const response = await store.dispatch('auth/checkAuthentication')
        return response
    }

    const logout = () => {
        store.commit('auth/logout')
        store.commit('journal/clearEntries')
    }

    return {
        authStatus: computed(() => store.getters['auth/currentState']),
        checkAuthStatus,
        createUser,
        logout,
        signInUser,
        userName: computed(() => store.getters['auth/userName'])
    }
}

export default useAuth