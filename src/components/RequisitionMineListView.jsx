import { useEffect, useState } from 'react'

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

        if (!response.ok) {
          throw new Error(response.status)
        }

        const jsonData = await response.json()

        setRequisitions(jsonData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRequisitions()
  }, [])

  if (loading) {
    return <div>Loading requisitions...</div>
  }

  if (error) {
    return <div>Unexpected error while fetching requisitions: {error.message}</div>
  }

  if (!requisitions?.results || requisitions.results.length === 0) {
    return (
      <div>
        <h1>My Requisitions</h1>
        You haven't submitted any requisitions yet.
      </div>
    )
  }

  return (
    <div>
      <h1>My Requisitions</h1>
      <ul>
        {requisitions.results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
