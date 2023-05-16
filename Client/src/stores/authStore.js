import { defineStore } from 'pinia'
import router from '@/router'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    setToken(token) {
        console.log('setToken'  , token);
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
        this.token = null
        localStorage.removeItem('token')
        router.push({ name: "login" });

        // Redirect to the login page or some other page
    },
  },
})