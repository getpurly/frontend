import { useQuery } from '@tanstack/react-query'

import { fetchData } from '../api/client'

export function useProjects({ pageIndex }) {
  return useQuery({
    queryKey: ['projects', 'list', pageIndex],
    queryFn: async () => {
      const page = new URLSearchParams()

      page.set('page', String(pageIndex))

      return fetchData(`projects/?${page.toString()}`)
    },
    keepPreviousData: true,
  })
}

export function useProject(id) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => fetchData(`projects/${id.toString()}`),
  })
}
