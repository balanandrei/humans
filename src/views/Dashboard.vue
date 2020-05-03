<template>
    <div v-if="authenticated">
        <h1>Dashboard</h1>

        Welcome, {{ user.first_name }}!
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'dashboard',
    components: {
        
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    }
}
</script>