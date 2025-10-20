import { create } from 'zustand'

export const useUserStore = create((set) => ({
  userData: null,
  fetchUser: async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/me/', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.status === 200) {
        const userData = await response.json()

        set({ userData })
      } else {
        set({ userData: null })
      }
    } catch (error) {
      set({ userData: null })
    }
  },
}))
