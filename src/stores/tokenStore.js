import { create } from 'zustand'

export const useTokenStore = create((set) => ({
  csrfToken: null,
  fetchToken: () => {
    const match = document.cookie.match(/csrftoken=([^;]+)/)
    const csrfToken = match[1] || null

    set({ csrfToken })
  },
}))
