import { useEffect, useState } from 'react'

import { requisitionDetailRoute } from '../router'

import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

export function RequisitionDetailView() {
  const [requisition, setRequisition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = requisitionDetailRoute.useParams()

  useEffect(() => {
    const fetchRequisition = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/requisitions/${id}`, {
          method: 'GET',
          credentials: 'include',
        })

        const jsonData = await response.json()

        if (response.status === 200) {
          setRequisition(jsonData)
          return
        }

        if (jsonData) {
          throw new Error(jsonData.errors[0].detail)
        } else {
          throw new Error(`HTTP ${response.status}`)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRequisition()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  return <div>Requisition Detail</div>
}
