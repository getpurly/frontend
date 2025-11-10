import { create } from 'zustand'

export const useFlashStore = create((set) => ({
  flash: {
    recordId: null,
    message: null,
  },
  setFlash: (message, recordId, timeout = 3000) => {
    set({
      flash: {
        recordId,
        message,
      },
    })

    setTimeout(() => set({ flash: { message: null, recordId: null } }), timeout)
  },
}))
