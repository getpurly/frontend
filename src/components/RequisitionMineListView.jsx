import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { requisitionDetailRoute } from '../router'

import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

export function RequisitionMineListView() {
  const [requisitions, setRequisitions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/requisitions/mine', {
          method: 'GET',
          credentials: 'include',
        })

        const jsonData = await response.json()

        if (response.status === 200) {
          setRequisitions(jsonData)
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
    fetchRequisitions()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!requisitions?.results || requisitions.results.length === 0) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-semibold">My Requisitions</h1>
        You haven't created any requisitions yet.
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">My Requisitions</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>External Reference</th>
              <th>Status</th>
              <th>Project</th>
              <th>Supplier</th>
              <th>Total Amount</th>
              <th>Currency</th>
              <th>Submitted At</th>
              <th>Approved At</th>
              <th>Rejected At</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {requisitions.results.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link
                    className="link"
                    to={requisitionDetailRoute.to}
                    params={{ id: String(item.id) }}
                  >
                    {item.id}
                  </Link>
                </td>
                <td>{item.name}</td>
                <td>{item.external_reference ? item.external_reference : '-'}</td>
                <td>{item.status}</td>
                <td>{item.project ? item.project.name : '-'}</td>
                <td>{item.supplier}</td>
                <td>{item.total_amount}</td>
                <td>{item.currency}</td>
                <td>{item.submitted_at ? item.submitted_at : '-'}</td>
                <td>{item.approved_at ? item.approved_at : '-'}</td>
                <td>{item.rejected_at ? item.rejected_at : '-'}</td>
                <td>{item.created_at}</td>
                <td>{item.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
