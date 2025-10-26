import { useQuery } from '@tanstack/react-query'

import { fetchData } from '../api/client'

export function useAddressesMine() {
  return useQuery({
    queryKey: ['addresses', 'mine'],
    queryFn: async () => fetchData('addresses/mine'),
  })
}

export function useAddress(id) {
  return useQuery({
    queryKey: ['address', 'detail'],
    queryFn: async () => fetchData(`addresses/${id}`),
  })
}
