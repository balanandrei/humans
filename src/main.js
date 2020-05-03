import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('@/store/subscriber')

Vue.config.productionTip = false;
Vue.config.devtools = true;

store.dispatch('auth/attempt', JSON.parse(localStorage.getItem('auth'))).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
