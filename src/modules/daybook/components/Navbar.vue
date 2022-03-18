<template>
    <nav class="navbar bg-primary">
        <router-link :to="{name:'home'}" class="navbar-brand text-white">
            <img height="24" src="@/assets/logo.png" alt="vue-logo" class="d-inline-block align-text-top mx-2">
            {{userName}}
        </router-link>
        <div class="d-flex">
            <button class="btn btn-outline-info mx-2" @click="onLogout">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useAuth from '../../auth/composables/useAuth'

export default {
    setup() {
        const {userName, logout } = useAuth()
        const router = useRouter()


        return {
            userName,
            onLogout: () => {
                logout()
                router.push({name:'login'})

            }
        }
    }
}
</script>
