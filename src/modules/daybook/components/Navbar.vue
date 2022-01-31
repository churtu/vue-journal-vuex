<template>
    <nav class="navbar bg-primary">
        <router-link :to="{name:'home'}" class="navbar-brand text-white">
            <img height="24" src="@/assets/logo.png" alt="vue-logo" class="d-inline-block align-text-top mx-2">
            Daybook
        </router-link>
        <div class="d-flex">
            <button class="btn btn-outline-info mx-2">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>
