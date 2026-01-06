import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token')
  }),

  actions: {
    async login(email, password) {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })

      this.user = res.data.user
      this.token = res.data.token
      localStorage.setItem('token', res.data.token)
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
