import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if(mutation) {
                axios.defaults.headers.common['Authorization'] = `Token ${mutation.payload.token}`
                localStorage.setItem('auth', JSON.stringify(mutation.payload))
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('auth')
            }
            break;
    }
})