
import { useAuthStore } from '@/stores/authStore'

export function authMiddleware({ next, router }) {
    const authStore = useAuthStore()

    const isAuthenticated =  authStore.token ? true : false;// check if the user is authenticated
    console.log('isAuthenticated' , isAuthenticated);
    if (!isAuthenticated) {
      return router.push({ name: 'login' });
    } else {
      next()
    }
  }