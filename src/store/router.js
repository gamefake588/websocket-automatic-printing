import { defineStore } from 'pinia'
import { ref } from 'vue'

const useRouterStore = defineStore('route', () => {
  const router = ref([])

  const setRoutes = (r) => {
    router.value = r
  }

  return {
    router,
    setRoutes
  }
})

export default useRouterStore
