import { useQuery } from '@tanstack/react-query'

import { fetchData } from '../api/client'

export function useRequisitionsMine({ pageIndex }) {
  return useQuery({
    queryKey: ['requisitions', 'mine', pageIndex],
    queryFn: async () => {
      const page = new URLSearchParams()

      page.set('page', String(pageIndex))

      return fetchData(`requisitions/mine/?${page.toString()}`)
    },
    keepPreviousData: true,
  })
}

export function useRequisition(id) {
  return useQuery({
    queryKey: ['requisition', id],
    queryFn: async () => fetchData(`requisitions/${id.toString()}`),
  })
}
