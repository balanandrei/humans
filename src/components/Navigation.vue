<template>
    <nav>
        <ul>
            <li>
                <router-link
                    :to="{
                        name: 'home'
                    }"
                >
                    Home
                </router-link>
            </li>
            <template v-if="authenticated">
                <li>{{ user.first_name }} {{user.last_name }}</li>
                <li>
                    <router-link
                        :to="{
                            name: 'dashboard'
                        }"
                    >
                        Dashboard
                    </router-link>            
                </li>
                <li>
                    <a href="" @click.prevent="signOut">Sign Out</a>         
                </li>
            </template>
            <template v-if="!loggedIn">
                <li>
                    <router-link
                        :to="{
                            name: 'signin'
                        }"
                    >
                        Sign In
                    </router-link>            
                </li>
            </template>
        </ul>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            loggedIn: 'auth/loggedIn'
        })
    },

    methods: {
        ...mapActions({
            signOutAction: 'auth/signOut'
        }),

        signOut() {
            this.signOutAction().then(() => {
                this.$router.replace({
                    name: 'home'
                })
            })
        }
    }
}
</script>

<style scoped>
    ul {
        padding: 10px 20px;
        margin: 0;
        display: flex;
        flex-direction: row;
    }

    li {
        list-style: none;
        padding-right: 20px;
    }
</style>