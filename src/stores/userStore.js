import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userData: null,
  loading: true,
  error: null,
  fetchUser: async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/me/', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.status === 401) {
        window.location.href = 'http://localhost:8000/accounts/login/'
        return
      }

      const userData = await response.json()

      set({ userData })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },
}))
