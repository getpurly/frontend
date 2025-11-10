import { useMutation, useQuery } from '@tanstack/react-query'

import { fetchData, submitData } from '../api/client'

export function useAddressesMine({ pageIndex }) {
  return useQuery({
    queryKey: ['addresses', 'mine', pageIndex],
    queryFn: async () => {
      const page = new URLSearchParams()

      page.set('page', String(pageIndex))

      return fetchData(`addresses/mine/?${page.toString()}`)
    },
    keepPreviousData: true,
  })
}

export function useAddress(id) {
  return useQuery({
    queryKey: ['address', id],
    queryFn: async () => fetchData(`addresses/${id.toString()}`),
  })
}

export function useCreateAddress() {
  return useMutation({
    mutationFn: async (payload) => submitData(`addresses/`, payload),
  })
}
