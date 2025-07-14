import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userData: null,
  userError: null,
  fetchUser: async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/me/', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.status === 403) {
        window.location.href = 'http://localhost:8000/accounts/login/'
        return
      }

      if (!response.ok) {
        throw new Error('Request failed with status code ${response.status}.')
      }

      const userData = await response.json()

      set({ userData })
    } catch (error) {
      set({ userError: error.message })
    } finally {
      set({ loading: false })
    }
  },
}))
