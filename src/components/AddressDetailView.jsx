import { useAddress } from '../hooks/addresses'
import { addressDetailRoute } from '../router'
import { ErrorAlert } from './shared/ErrorAlert'
import { Spinner } from './shared/Spinner'

export function AddressDetailView() {
  const { id } = addressDetailRoute.useParams()
  const { data: address, isLoading, error } = useAddress(id)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Address: {address.name}</h1>
    </div>
  )
}
