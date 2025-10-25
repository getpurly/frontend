import { Link } from '@tanstack/react-router'

import { useAddressMine } from '../hooks/addresses'
import { addressDetailRoute } from '../router'
import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

export function AddressListMineView() {
  const { data: addresses, isLoading, error } = useAddressMine()

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  if (addresses.results.length === 0) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-semibold">My Addresses</h1>
        <p>You haven't created any addresses yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">My Adresses</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address Code</th>
              <th>Description</th>
              <th>Attention</th>
              <th>Phone</th>
              <th>Street 1</th>
              <th>Street 2</th>
              <th>City</th>
              <th>State</th>
              <th>ZIP Code</th>
              <th>Country</th>
              <th>Delivery Instructions</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {addresses.results.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link
                    className="link"
                    to={addressDetailRoute.to}
                    params={{ id: String(item.id) }}
                  >
                    {item.id}
                  </Link>
                </td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
