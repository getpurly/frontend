import { create } from 'zustand'

export const useTokenStore = create((set) => ({
  token: null,
  fetchToken: () => {
    const match = document.cookie.match(/csrftoken=([^;]+)/)
    const token = match ? decodeURIComponent(match[1]) : null
    set({ token })
  },
}))
