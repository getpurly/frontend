import { useEffect, useState } from 'react'
import { Spinner } from './Spinner'

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

        if (response.ok) {
          const jsonData = await response.json()

          setRequisitions(jsonData)
        } else {
          throw new Error('Request failed with status code ${response.status}.')
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
    return <div>Error fetching requisition data: {error}</div>
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
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.external_reference}</td>
                <td>{item.status}</td>
                <td>{item.project}</td>
                <td>{item.supplier}</td>
                <td>{item.total_amount}</td>
                <td>{item.currency}</td>
                <td>{item.submitted_at}</td>
                <td>{item.approved_at}</td>
                <td>{item.rejected_at}</td>
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
