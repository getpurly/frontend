import { useQuery } from '@tanstack/react-query'

import { fetchData } from '../api/client'

export function useProjects() {
  return useQuery({
    queryKey: ['projects', 'list'],
    queryFn: async () => fetchData('projects/'),
  })
}

export function useProject(id) {
  return useQuery({
    queryKey: ['project', 'detail'],
    queryFn: async () => fetchData(`projects/${id}`),
  })
}
