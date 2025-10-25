import { useQuery } from '@tanstack/react-query'

import { fetchData } from '../api/client'

export function useRequisitionMine() {
    return useQuery({
        queryKey: ['requisitions', 'mine'],
        queryFn: async () => fetchData('requisitions/mine')
    })
}

export function useRequisition(id) {
    return useQuery({
        queryKey: ['requisition', 'detail'],
        queryFn: async () => fetchData(`requisitions/${id}`)
    })
}