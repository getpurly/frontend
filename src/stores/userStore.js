import { create } from 'zustand'

import { fetchData } from '../api/client'

export const useUserStore = create((set) => ({
  userData: null,
  fetchUser: async () => {
    try {
      const userData = await fetchData('users/me/')

      set({ userData })
    } catch (error) {
      set({ userData: null })
    }
  },
}))
