import axios from 'axios'

export default {
  namespaced: true,
  state: {
    auth: null,
    user: null
  },
  getters: {
      authenticated(state) {
          return state.auth && state.user
      },

      user(state) {
          return state.user
      },

      loggedIn(state) {
          return state.auth
      }
  },

  mutations: {
      SET_TOKEN(state, auth) {
        state.auth = auth
      },
      SET_USER(state, data) {
          state.user = data
      }
  },
  actions: {
    async signIn({ dispatch }, credentials) {
        const options = {
        url: 'https://cors-anywhere.herokuapp.com/https://api.heyhello.ro/api/login/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "email": credentials.email,
            'password': credentials.password
        }
        };

        await axios(options)
        .then(response => {
            return dispatch('attempt', {
                token: response.data.token,
                user_id: response.data.user_id
            })
        });
    },

    async attempt ({commit, state}, auth) {
        if(auth) {
            commit('SET_TOKEN', auth);
        }

        if(!state.auth) {
            return
        }
        try {
            let authConfig = {
                url: 'https://cors-anywhere.herokuapp.com/https://api.heyhello.ro/api/users/' + auth.user_id,
             }
            await axios(authConfig).then(response => {
                commit('SET_USER', response.data);
            });
        }
        catch(e) {
            commit('SET_TOKEN', null);
            commit('SET_USER', null);
        }
    },

    signOut({ commit }) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
    }
  },
  modules: {
  }
}
